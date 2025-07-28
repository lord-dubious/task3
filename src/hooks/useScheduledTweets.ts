import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useScheduledTweets() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const triggerManualProcessing = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Call the manual trigger function
      const { data, error: functionError } = await supabase
        .rpc('trigger_tweet_processing');

      if (functionError) {
        throw functionError;
      }

      toast.success('Tweet processing triggered', {
        description: 'Scheduled tweets are being processed manually'
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to trigger processing';
      setError(errorMessage);
      toast.error('Processing failed', { description: errorMessage });
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [user]);

  const getCronJobStatus = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      // Clear any previous errors before attempting the operation
      setError(null);

      const { data, error: statusError } = await supabase
        .from('cron_job_status')
        .select('*');

      if (statusError) {
        throw statusError;
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get cron status';
      setError(errorMessage);
      return null;
    }
  }, [user]);

  return {
    triggerManualProcessing,
    getCronJobStatus,
    isProcessing,
    error,
  };
}