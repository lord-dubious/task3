import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Tweet {
  id: string;
  user_id: string;
  content: string;
  media_urls?: string[] | null;
  scheduled_for?: string | null;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  twitter_account_id?: string | null;
  agent_id?: string | null;
  retry_count: number;
  last_attempt_at?: string | null;
  failure_reason?: string | null;
  twitter_post_id?: string | null;
  created_at: string;
  updated_at: string;
}

export function useTweets() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTweets = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('tweets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setTweets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tweets');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  const createTweet = async (tweetData: {
    content: string;
    media_urls?: string[];
    scheduled_for?: string;
    twitter_account_id?: string;
    agent_id?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const status = tweetData.scheduled_for ? 'scheduled' : 'draft';

      const { data, error: createError } = await supabase
        .from('tweets')
        .insert({
          ...tweetData,
          user_id: user.id,
          status,
          retry_count: 0,
        })
        .select()
        .single();

      if (createError) throw createError;

      setTweets(prev => [data, ...prev]);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create tweet';
      setError(errorMessage);
      toast.error('Failed to create tweet', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const updateTweet = async (id: string, updates: Partial<Tweet>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('tweets')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setTweets(prev => prev.map(tweet => tweet.id === id ? data : tweet));
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update tweet';
      setError(errorMessage);
      toast.error('Failed to update tweet', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const deleteTweet = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('tweets')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setTweets(prev => prev.filter(tweet => tweet.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete tweet';
      setError(errorMessage);
      toast.error('Failed to delete tweet', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const getScheduledTweets = () => {
    return tweets.filter(tweet => tweet.status === 'scheduled');
  };

  const getDraftTweets = () => {
    return tweets.filter(tweet => tweet.status === 'draft');
  };

  const getPostedTweets = () => {
    return tweets.filter(tweet => tweet.status === 'posted');
  };

  const getFailedTweets = () => {
    return tweets.filter(tweet => tweet.status === 'failed');
  };

  const getTweetsByDateRange = (startDate: Date, endDate: Date) => {
    return tweets.filter(tweet => {
      if (!tweet.scheduled_for) return false;
      const tweetDate = new Date(tweet.scheduled_for);
      return tweetDate >= startDate && tweetDate <= endDate;
    });
  };

  return {
    tweets,
    loading,
    error,
    createTweet,
    updateTweet,
    deleteTweet,
    getScheduledTweets,
    getDraftTweets,
    getPostedTweets,
    getFailedTweets,
    getTweetsByDateRange,
    refetch: fetchTweets,
  };
}