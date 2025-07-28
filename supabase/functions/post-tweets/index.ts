import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface TwitterCredentials {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

interface Tweet {
  id: string;
  user_id: string;
  content: string;
  media_urls: string[] | null;
  scheduled_for: string;
  status: string;
  twitter_account_id: string | null;
  agent_id: string | null;
  retry_count: number;
}



// Twitter API v2 helper functions
async function createTwitterHeaders(credentials: TwitterCredentials, method: string, url: string) {
  const oauth = {
    oauth_consumer_key: credentials.apiKey,
    oauth_token: credentials.accessToken,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_nonce: Math.random().toString(36).substring(2, 15),
    oauth_version: '1.0'
  };

  // Create signature base string
  const parameterString = Object.keys(oauth)
    .sort()
    .map(key => `${key}=${encodeURIComponent(oauth[key as keyof typeof oauth])}`)
    .join('&');

  const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(parameterString)}`;
  
  // Create signing key
  const signingKey = `${encodeURIComponent(credentials.apiSecret)}&${encodeURIComponent(credentials.accessTokenSecret)}`;
  
  // Generate signature using Web Crypto API
  const encoder = new TextEncoder();
  const keyData = encoder.encode(signingKey);
  const messageData = encoder.encode(signatureBaseString);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  
  oauth['oauth_signature' as keyof typeof oauth] = signatureBase64;

  // Create authorization header
  const authHeader = 'OAuth ' + Object.keys(oauth)
    .sort()
    .map(key => `${key}="${encodeURIComponent(oauth[key as keyof typeof oauth])}"`)
    .join(', ');

  return {
    'Authorization': authHeader,
    'Content-Type': 'application/json',
  };
}

async function postTweetToTwitter(tweet: Tweet, credentials: TwitterCredentials): Promise<{ success: boolean; twitterPostId?: string; error?: string }> {
  try {
    const twitterApiUrl = 'https://api.twitter.com/2/tweets';

    // Define proper interface for tweet data
    interface TwitterTweetData {
      text: string;
      media?: {
        media_ids: string[];
      };
    }

    const tweetData: TwitterTweetData = {
      text: tweet.content
    };

    // Add media if present
    if (tweet.media_urls && tweet.media_urls.length > 0) {
      // Note: For media uploads, you would need to first upload media to Twitter
      // This is a simplified version - in production, implement media upload flow
      console.log('Media URLs found but media upload not implemented in this demo:', tweet.media_urls);
    }

    const headers = await createTwitterHeaders(
      credentials,
      'POST',
      twitterApiUrl,
      JSON.stringify(tweetData)
    );

    const response = await fetch(twitterApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(tweetData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Twitter API error:', response.status, errorData);
      return {
        success: false,
        error: `Twitter API error: ${response.status} - ${errorData}`
      };
    }

    const result = await response.json();
    return {
      success: true,
      twitterPostId: result.data?.id
    };
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error posting to Twitter'
    };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with explicit environment variable checks
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL environment variable is not set. Please configure this in your Edge Function environment.');
    }

    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseServiceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set. Please configure this in your Edge Function environment.');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting scheduled tweet processing...');

    // Get current time with a small buffer (5 minutes) to catch tweets that should be posted
    const now = new Date();
    const bufferTime = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes buffer

    // Fetch scheduled tweets that are due to be posted
    const { data: scheduledTweets, error: tweetsError } = await supabase
      .from('tweets')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', bufferTime.toISOString())
      .order('scheduled_for', { ascending: true });

    if (tweetsError) {
      console.error('Error fetching scheduled tweets:', tweetsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch scheduled tweets' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Found ${scheduledTweets?.length || 0} scheduled tweets to process`);

    if (!scheduledTweets || scheduledTweets.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No scheduled tweets to process',
          processed: 0 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let successCount = 0;
    let failureCount = 0;
    const results = [];

    // Process each scheduled tweet
    for (const tweet of scheduledTweets) {
      try {
        console.log(`Processing tweet ${tweet.id} for user ${tweet.user_id}`);

        // Get user's Twitter credentials
        const { data: userSettings, error: settingsError } = await supabase
          .from('user_settings')
          .select('twitter_credentials')
          .eq('user_id', tweet.user_id)
          .single();

        if (settingsError || !userSettings?.twitter_credentials) {
          console.error(`No Twitter credentials found for user ${tweet.user_id}`);
          
          // Update tweet status to failed
          await supabase
            .from('tweets')
            .update({
              status: 'failed',
              failure_reason: 'No Twitter credentials configured',
              retry_count: tweet.retry_count + 1,
              last_attempt_at: new Date().toISOString()
            })
            .eq('id', tweet.id);

          failureCount++;
          results.push({
            tweetId: tweet.id,
            success: false,
            error: 'No Twitter credentials configured'
          });
          continue;
        }

        // Post tweet to Twitter
        const twitterResult = await postTweetToTwitter(tweet, userSettings.twitter_credentials);

        if (twitterResult.success) {
          // Update tweet status to posted
          await supabase
            .from('tweets')
            .update({
              status: 'posted',
              twitter_post_id: twitterResult.twitterPostId,
              last_attempt_at: new Date().toISOString()
            })
            .eq('id', tweet.id);

          successCount++;
          results.push({
            tweetId: tweet.id,
            success: true,
            twitterPostId: twitterResult.twitterPostId
          });

          console.log(`Successfully posted tweet ${tweet.id} to Twitter`);
        } else {
          // Update tweet status to failed
          await supabase
            .from('tweets')
            .update({
              status: 'failed',
              failure_reason: twitterResult.error,
              retry_count: tweet.retry_count + 1,
              last_attempt_at: new Date().toISOString()
            })
            .eq('id', tweet.id);

          failureCount++;
          results.push({
            tweetId: tweet.id,
            success: false,
            error: twitterResult.error
          });

          console.error(`Failed to post tweet ${tweet.id}:`, twitterResult.error);
        }
      } catch (error) {
        console.error(`Error processing tweet ${tweet.id}:`, error);
        
        // Update tweet status to failed
        await supabase
          .from('tweets')
          .update({
            status: 'failed',
            failure_reason: error instanceof Error ? error.message : 'Unknown processing error',
            retry_count: tweet.retry_count + 1,
            last_attempt_at: new Date().toISOString()
          })
          .eq('id', tweet.id);

        failureCount++;
        results.push({
          tweetId: tweet.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown processing error'
        });
      }
    }

    console.log(`Completed processing: ${successCount} successful, ${failureCount} failed`);

    return new Response(
      JSON.stringify({
        message: 'Scheduled tweet processing completed',
        processed: scheduledTweets.length,
        successful: successCount,
        failed: failureCount,
        results
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
