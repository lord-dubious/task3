import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, BarChart3, Clock, CheckCircle, XCircle, Calendar, List } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { TweetCalendar } from './TweetCalendar';
import { TweetEditModal } from './TweetEditModal';
import { CronJobStatus } from './CronJobStatus';
import { InlineSchedulePicker } from '../compose/InlineSchedulePicker';
import type { Tweet } from '../../hooks/useTweets';
import { useTweets } from '../../hooks/useTweets';
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
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
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
        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs sm:text-sm transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs sm:text-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
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

      {/* Calendar/List View */}
      {viewMode === 'calendar' ? (
        <TweetCalendar
          tweets={tweets}
          onEditTweet={handleEditTweet}
          onDeleteTweet={handleDeleteTweet}
          onRetryTweet={handleRetryTweet}
        />
      ) : (
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <List className="w-5 h-5 mr-2 text-purple-400" />
            Tweet List View
          </h3>
          <div className="space-y-3">
            {tweets.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No tweets scheduled yet</p>
              </div>
            ) : (
              tweets.map((tweet) => (
                <div
                  key={tweet.id}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm line-clamp-2">{tweet.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>Status: {tweet.status}</span>
                      {tweet.scheduled_for && (
                        <span>Scheduled: {new Date(tweet.scheduled_for).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTweet(tweet)}
                      className="text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTweet(tweet.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

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
