import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { TweetCalendar } from './TweetCalendar';
import { ScheduleModal } from './ScheduleModal';
import { TweetEditModal } from './TweetEditModal';
import { CronJobStatus } from './CronJobStatus';
import { InlineSchedulePicker } from '../compose/InlineSchedulePicker';
import { useTweets, Tweet } from '../../hooks/useTweets';
import { StatsCard } from '../dashboard/StatsCard';
import { useNotifications } from '../../hooks/useNotifications';

export function SchedulingView() {
  const {
    tweets,
    loading,
    createTweet,
    updateTweet,
    deleteTweet,
    getScheduledTweets,
    getPostedTweets,
    getFailedTweets
  } = useTweets();

  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTweet, setEditingTweet] = useState<Tweet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError, showPromise } = useNotifications();

  const scheduledTweets = getScheduledTweets();
  const postedTweets = getPostedTweets();
  const failedTweets = getFailedTweets();

  const handleScheduleTweet = async () => {
    if (!scheduledDateTime) return;

    try {
      setIsSubmitting(true);
      
      // This would typically come from a compose form
      // For now, we'll create a placeholder tweet
      await createTweet({
        content: 'Scheduled tweet placeholder - edit to add your content',
        scheduled_for: scheduledDateTime,
      });

      setShowSchedulePicker(false);
      setScheduledDateTime(null);
      showSuccess('Tweet scheduled', 'Your tweet has been scheduled successfully');
    } catch (error) {
      showError('Failed to schedule tweet', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTweet = (tweet: Tweet) => {
    setEditingTweet(tweet);
    setShowEditModal(true);
  };

  const handleUpdateTweet = async (tweetId: string, updates: Partial<Tweet>) => {
    try {
      setIsSubmitting(true);
      await updateTweet(tweetId, updates);
      setShowEditModal(false);
      setEditingTweet(null);
      showSuccess('Tweet updated', 'Your tweet has been updated successfully');
    } catch (error) {
      showError('Failed to update tweet', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    showPromise(
      deleteTweet(tweetId),
      {
        loading: 'Deleting tweet...',
        success: 'Tweet deleted successfully',
        error: 'Failed to delete tweet',
      }
    );
  };

  const handleRetryTweet = async (tweetId: string) => {
    try {
      await updateTweet(tweetId, {
        status: 'scheduled',
        failure_reason: null,
        retry_count: 0,
      });
      showSuccess('Tweet retry scheduled', 'Your tweet has been rescheduled for posting');
    } catch (error) {
      showError('Failed to retry tweet', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const stats = [
    {
      title: 'Scheduled',
      value: scheduledTweets.length,
      change: 'Ready to post',
      changeType: 'neutral' as const,
      icon: Clock,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Posted',
      value: postedTweets.length,
      change: 'Successfully published',
      changeType: 'positive' as const,
      icon: CheckCircle,
      gradient: 'from-green-500 to-green-700'
    },
    {
      title: 'Failed',
      value: failedTweets.length,
      change: failedTweets.length > 0 ? 'Need attention' : 'All good',
      changeType: failedTweets.length > 0 ? 'negative' : 'positive',
      icon: XCircle,
      gradient: 'from-red-500 to-red-700'
    },
    {
      title: 'Total Tweets',
      value: tweets.length,
      change: 'All time',
      changeType: 'neutral' as const,
      icon: BarChart3,
      gradient: 'from-purple-500 to-purple-700'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="h-20 sm:h-24 bg-gray-800"></Card>
            </div>
          ))}
        </div>
        <Card className="h-80 sm:h-96 bg-gray-800 animate-pulse"></Card>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Tweet Scheduler</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Manage your scheduled tweets and view posting calendar
          </p>
        </div>
        <Button
          onClick={() => setShowSchedulePicker(true)}
          leftIcon={<Plus className="w-3 h-3 sm:w-4 sm:h-4" />}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Schedule Tweet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Inline Schedule Picker */}
      {showSchedulePicker && (
        <InlineSchedulePicker
          scheduledDateTime={scheduledDateTime}
          onScheduleChange={setScheduledDateTime}
          onClose={() => setShowSchedulePicker(false)}
        />
      )}

      {/* Calendar */}
      <TweetCalendar
        tweets={tweets}
        onEditTweet={handleEditTweet}
        onDeleteTweet={handleDeleteTweet}
        onRetryTweet={handleRetryTweet}
      />

      {/* Cron Job Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Automated Processing</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your scheduled tweets are automatically processed every 5 minutes by our cron job system. 
              You can also trigger manual processing if needed.
            </p>
          </div>
        </div>
        <CronJobStatus />
      </div>

      {/* Schedule Confirmation */}
      {scheduledDateTime && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 shadow-xl">
            <p className="text-white text-xs sm:text-sm mb-2">
              Ready to schedule for {new Date(scheduledDateTime).toLocaleString()}
            </p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleScheduleTweet}
                isLoading={isSubmitting}
                className="text-xs"
              >
                Schedule
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScheduledDateTime(null)}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <TweetEditModal
        isOpen={showEditModal}
        tweet={editingTweet}
        onClose={() => {
          setShowEditModal(false);
          setEditingTweet(null);
        }}
        onSave={handleUpdateTweet}
        isLoading={isSubmitting}
      />
    </div>
  );
}