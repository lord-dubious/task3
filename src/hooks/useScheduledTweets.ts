import { useState, useCallback } from 'react';
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
      const res = await fetch('/api/scheduler/process-now', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to trigger processing');

      toast.success('Tweet processing triggered', {
        description: 'Scheduled tweets are being processed manually'
      });

      return true;
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
      setError(null);
      const res = await fetch('/api/scheduler/status');
      if (!res.ok) throw new Error('Failed to get scheduler status');
      const json = await res.json();
      return json.status ? [json.status] : [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get scheduler status';
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