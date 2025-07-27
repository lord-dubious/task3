import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useScheduledTweets } from '../../hooks/useScheduledTweets';
import { useNotifications } from '../../hooks/useNotifications';

interface CronJobStatusProps {
  className?: string;
}

interface CronStatus {
  jobname: string;
  schedule: string;
  active: boolean;
}

export function CronJobStatus({ className = '' }: CronJobStatusProps) {
  const [cronStatus, setCronStatus] = useState<CronStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    triggerManualProcessing, 
    getCronJobStatus, 
    isProcessing, 
    error 
  } = useScheduledTweets();
  const { showSuccess, showError } = useNotifications();

  const fetchCronStatus = useCallback(async () => {
    setLoading(true);
    try {
      const status = await getCronJobStatus();
      setCronStatus(status?.[0] || null);
    } catch (err) {
      console.error('Failed to fetch cron status:', err);
    } finally {
      setLoading(false);
    }
  }, [getCronJobStatus]);

  useEffect(() => {
    fetchCronStatus();
  }, [fetchCronStatus]);

  const handleManualTrigger = async () => {
    try {
      await triggerManualProcessing();
      showSuccess('Processing triggered', 'Scheduled tweets are being processed');
    } catch {
      showError('Failed to trigger processing', 'Please try again');
    }
  };

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-medium text-white">Cron Job Status</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchCronStatus}
            disabled={loading}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {cronStatus ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Job Name:</span>
              <span className="text-white font-mono">{cronStatus.jobname}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Schedule:</span>
              <span className="text-white font-mono">{cronStatus.schedule}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Status:</span>
              <div className="flex items-center space-x-1">
                {cronStatus.active ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Active</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-red-400" />
                    <span className="text-red-400">Inactive</span>
                  </>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-700">
              <Button
                onClick={handleManualTrigger}
                disabled={isProcessing}
                isLoading={isProcessing}
                size="sm"
                className="w-full text-xs"
                leftIcon={<Play className="w-3 h-3" />}
              >
                Trigger Manual Processing
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-300 text-sm">Cron job not configured</p>
            <p className="text-gray-400 text-xs mt-1">
              Contact your administrator to set up scheduled processing
            </p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
          <h4 className="text-blue-300 font-medium text-sm mb-1">How it works:</h4>
          <ul className="text-blue-200 text-xs space-y-1">
            <li>• Cron job runs every 5 minutes automatically</li>
            <li>• Processes tweets scheduled for the current time</li>
            <li>• Posts to Twitter and updates status in database</li>
            <li>• Manual trigger available for immediate processing</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
