import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface TweetDto {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  scheduledFor?: string | null;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  twitterAccountId?: string | null;
  agentId?: string | null;
  retryCount: number;
  lastAttemptAt?: string | null;
  failureReason?: string | null;
  twitterPostId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export function useTweets() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTweets = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/tweets');
      if (!res.ok) throw new Error('Failed to fetch tweets');
      const data: TweetDto[] = await res.json();
      setTweets(data);
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
    mediaUrls?: string[];
    scheduledFor?: string;
    twitterAccountId?: string;
    agentId?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweetData),
      });
      if (!res.ok) throw new Error('Failed to create tweet');
      const data: TweetDto = await res.json();
      setTweets(prev => [data, ...prev]);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create tweet';
      setError(errorMessage);
      toast.error('Failed to create tweet', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const updateTweet = async (id: string, updates: Partial<TweetDto>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const res = await fetch(`/api/tweets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update tweet');
      const data: TweetDto = await res.json();
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

      const res = await fetch(`/api/tweets/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete tweet');

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