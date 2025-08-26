import { TwitterApi } from 'twitter-api-v2';
import { prisma } from '../prisma';

export interface TwitterCredentials {
  accessToken: string;
  accessTokenSecret: string;
  twitterApiKey?: string;
  twitterApiSecret?: string;
}

export class TwitterService {
  private getClient(credentials: TwitterCredentials): TwitterApi {
    // Use app-level credentials if available, otherwise fall back to user credentials
    const apiKey = credentials.twitterApiKey || process.env.TWITTER_API_KEY;
    const apiSecret = credentials.twitterApiSecret || process.env.TWITTER_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error('Twitter API credentials not configured');
    }

    return new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: credentials.accessToken,
      accessSecret: credentials.accessTokenSecret,
    });
  }

  async postTweet(userId: string, content: string, mediaUrls?: string[]): Promise<{ id: string; url: string }> {
    // Get user's Twitter credentials
    const settings = await prisma.userSettings.findUnique({
      where: { userId }
    });

    if (!settings?.accessToken || !settings?.accessTokenSecret) {
      throw new Error('User has not connected their Twitter account');
    }

    const credentials: TwitterCredentials = {
      accessToken: settings.accessToken,
      accessTokenSecret: settings.accessTokenSecret,
      twitterApiKey: settings.twitterApiKey || undefined,
      twitterApiSecret: settings.twitterApiSecret || undefined,
    };

    const client = this.getClient(credentials);

    try {
      const mediaIds: string[] = [];

      // Upload media if provided
      if (mediaUrls && mediaUrls.length > 0) {
        for (const mediaUrl of mediaUrls) {
          try {
            // Download media from URL
            const response = await fetch(mediaUrl);
            if (!response.ok) {
              throw new Error(`Failed to download media: ${response.statusText}`);
            }
            
            const buffer = await response.arrayBuffer();
            const mediaId = await client.v1.uploadMedia(Buffer.from(buffer), {
              mimeType: response.headers.get('content-type') || 'image/jpeg'
            });
            mediaIds.push(mediaId);
          } catch (error) {
            console.error('Failed to upload media:', error);
            // Continue without this media item
          }
        }
      }

      // Post tweet
      const tweet = await client.v2.tweet({
        text: content,
        ...(mediaIds.length > 0 && { media: { media_ids: mediaIds } })
      });

      if (!tweet.data) {
        throw new Error('Failed to post tweet - no data returned');
      }

      return {
        id: tweet.data.id,
        url: `https://twitter.com/user/status/${tweet.data.id}`
      };
    } catch (error) {
      console.error('Twitter API error:', error);
      throw new Error(`Failed to post tweet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async verifyCredentials(credentials: TwitterCredentials): Promise<{ valid: boolean; username?: string }> {
    try {
      const client = this.getClient(credentials);
      const user = await client.v2.me();
      
      return {
        valid: true,
        username: user.data?.username
      };
    } catch (error) {
      console.error('Twitter credentials verification failed:', error);
      return { valid: false };
    }
  }
}

export const twitterService = new TwitterService();
