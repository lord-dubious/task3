import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { TweetCalendar } from './TweetCalendar';
import { ScheduleModal } from './ScheduleModal';
import { TweetEditModal } from './TweetEditModal';
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

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTweet, setEditingTweet] = useState<Tweet | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError, showPromise } = useNotifications();

  const scheduledTweets = getScheduledTweets();
  const postedTweets = getPostedTweets();
  const failedTweets = getFailedTweets();

  const handleScheduleTweet = async (scheduleData: {
    scheduledFor: string;
    twitterAccountId?: string;
    agentId?: string;
  }) => {
    try {
      setIsSubmitting(true);
      
      // This would typically come from a compose form
      // For now, we'll create a placeholder tweet
      await createTweet({
        content: 'Scheduled tweet placeholder - edit to add your content',
        scheduled_for: scheduleData.scheduledFor,
        twitter_account_id: scheduleData.twitterAccountId,
        agent_id: scheduleData.agentId,
      });

      setShowScheduleModal(false);
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="h-24 bg-gray-800"></Card>
            </div>
          ))}
        </div>
        <Card className="h-96 bg-gray-800 animate-pulse"></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Tweet Scheduler</h2>
          <p className="text-gray-400 mt-1">
            Manage your scheduled tweets and view posting calendar
          </p>
        </div>
        <Button
          onClick={() => setShowScheduleModal(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Schedule Tweet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Calendar */}
      <TweetCalendar
        tweets={tweets}
        onEditTweet={handleEditTweet}
        onDeleteTweet={handleDeleteTweet}
        onRetryTweet={handleRetryTweet}
      />

      {/* Modals */}
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleTweet}
        isLoading={isSubmitting}
      />

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