import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, TrendingUp, Users, Bot, Zap, Clock, CheckCircle, XCircle, CheckSquare } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTweets } from '../../hooks/useTweets';
import { useAgents } from '../../hooks/useAgents';
import { format } from 'date-fns';

export function DashboardView() {
  const { 
    tweets, 
    loading, 
    getScheduledTweets, 
    getPostedTweets, 
    getFailedTweets,
    getDraftTweets 
  } = useTweets();
  const { agents } = useAgents();

  const scheduledTweets = getScheduledTweets();
  const postedTweets = getPostedTweets();
  const failedTweets = getFailedTweets();
  const draftTweets = getDraftTweets();
  const enabledAgents = agents.filter(agent => agent.enabled);

  // Calculate engagement stats (mock for now since we don't have real Twitter data)
  const totalEngagement = postedTweets.length * 50; // Mock calculation
  const newFollowers = Math.floor(postedTweets.length * 2.5); // Mock calculation

  const stats = [
    {
      title: 'Scheduled Tweets',
      value: scheduledTweets.length,
      change: scheduledTweets.length > 0 ? `${scheduledTweets.length} ready to post` : 'No tweets scheduled',
      changeType: 'neutral' as const,
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'AI Generated',
      value: tweets.filter(tweet => tweet.agent_id).length,
      change: `${enabledAgents.length} active agents`,
      changeType: 'positive' as const,
      icon: Bot,
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      title: 'Total Engagement',
      value: totalEngagement > 1000 ? `${(totalEngagement / 1000).toFixed(1)}K` : totalEngagement,
      change: postedTweets.length > 0 ? `From ${postedTweets.length} posts` : 'No posts yet',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-700'
    },
    {
      title: 'New Followers',
      value: newFollowers,
      change: postedTweets.length > 0 ? 'This month' : 'Start posting to grow',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'from-orange-500 to-orange-700'
    }
  ];

  // Get recent tweets (last 5)
  const recentTweets = tweets
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400';
      case 'posted':
        return 'bg-green-500/20 text-green-400';
      case 'failed':
        return 'bg-md3-error-container text-md3-on-error-container';
      case 'draft':
      default:
        return 'bg-md3-surface-variant text-md3-on-surface-variant';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-3 h-3" />;
      case 'posted':
        return <CheckCircle className="w-3 h-3" />;
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="h-24 bg-gray-800"></Card>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-pulse">
            <Card className="h-96 bg-gray-800"></Card>
          </div>
          <div className="animate-pulse">
            <Card className="h-96 bg-gray-800"></Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            {recentTweets.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-12 h-12 text-md3-on-surface-variant mx-auto mb-4" />
                <h4 className="md3-title-medium text-md3-on-surface mb-2">No tweets yet</h4>
                <p className="md3-body-medium text-md3-on-surface-variant mb-4">
                  Start by composing your first tweet or setting up an AI agent.
                </p>
                <Button variant="filled">
                  <Zap className="w-4 h-4 mr-2" />
                  Compose Tweet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTweets.map((tweet, index) => (
                  <motion.div
                    key={tweet.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-md3-primary bg-md3-surface-container rounded-r-2xl p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full md3-label-small flex items-center space-x-1 ${getStatusColor(tweet.status)}`}>
                          {getStatusIcon(tweet.status)}
                          <span className="capitalize">{tweet.status}</span>
                        </span>
                        {tweet.agent_id && (
                          <span className="px-2 py-1 bg-md3-primary-container text-md3-on-primary-container rounded-full md3-label-small flex items-center space-x-1">
                            <Bot className="w-3 h-3" />
                            <span>AI Generated</span>
                          </span>
                        )}
                      </div>
                      <span className="text-md3-on-surface-variant md3-body-small">
                        {format(new Date(tweet.created_at), 'MMM d, h:mm a')}
                      </span>
                    </div>
                    
                    <p className="text-md3-on-surface mb-2 line-clamp-3 md3-body-medium">{tweet.content}</p>
                    
                    <div className="flex items-center justify-between md3-body-small">
                      <div className="flex items-center space-x-4 text-md3-on-surface-variant">
                        {tweet.media_urls && tweet.media_urls.length > 0 && (
                          <span className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{tweet.media_urls.length} media</span>
                          </span>
                        )}
                        {tweet.scheduled_for && (
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {format(new Date(tweet.scheduled_for), 'MMM d, h:mm a')}
                            </span>
                          </span>
                        )}
                      </div>
                      
                      {tweet.failure_reason && (
                        <span className="text-md3-error md3-body-small">
                          Failed: {tweet.failure_reason}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="md3-title-medium text-md3-on-surface mb-4">AI Assistant</h3>
            <div className="bg-gradient-to-br from-md3-primary/20 to-md3-primary-container/20 rounded-2xl p-4 border border-md3-primary/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-md3-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-md3-on-primary" />
                </div>
                <span className="text-md3-primary font-medium md3-label-large">TaskBot Pro</span>
              </div>
              <p className="text-md3-on-surface md3-body-small mb-4">
                {enabledAgents.length > 0 
                  ? `You have ${enabledAgents.length} active AI agent${enabledAgents.length !== 1 ? 's' : ''} ready to help create content!`
                  : 'Set up AI agents to automatically generate personalized content for your brand.'
                }
              </p>
              <Button variant="filled" size="sm" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                {enabledAgents.length > 0 ? 'Start Creating' : 'Setup Agents'}
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="md3-title-medium text-md3-on-surface mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-md3-on-surface-variant md3-body-small">Draft Tweets</span>
                <span className="text-md3-on-surface font-medium md3-body-medium">{draftTweets.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-md3-on-surface-variant md3-body-small">Failed Posts</span>
                <span className={`font-medium md3-body-medium ${failedTweets.length > 0 ? 'text-md3-error' : 'text-green-400'}`}>
                  {failedTweets.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-md3-on-surface-variant md3-body-small">Active Agents</span>
                <span className="text-md3-primary font-medium md3-body-medium">{enabledAgents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-md3-on-surface-variant md3-body-small">Total Tweets</span>
                <span className="text-md3-on-surface font-medium md3-body-medium">{tweets.length}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="md3-title-medium text-md3-on-surface mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outlined" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Compose Tweet
              </Button>
              <Button variant="outlined" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
              <Button variant="outlined" className="w-full justify-start">
                <Bot className="w-4 h-4 mr-2" />
                Create AI Agent
              </Button>
              <Button variant="outlined" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}