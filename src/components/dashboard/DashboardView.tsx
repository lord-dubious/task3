import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, TrendingUp, Users, Bot, Zap } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function DashboardView() {
  const stats = [
    {
      title: 'Scheduled Tweets',
      value: 24,
      change: '+12% from last week',
      changeType: 'positive' as const,
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'AI Generated',
      value: 18,
      change: '+25% from last week',
      changeType: 'positive' as const,
      icon: Bot,
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      title: 'Total Engagement',
      value: '2.4K',
      change: '+8% from last week',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-700'
    },
    {
      title: 'New Followers',
      value: 156,
      change: '+15% from last week',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'from-orange-500 to-orange-700'
    }
  ];

  const recentTweets = [
    {
      id: 1,
      content: "Just shipped a new feature! 🚀 The future of social media automation is here. What do you think about AI-powered content creation?",
      scheduledFor: "2024-01-15T10:00:00Z",
      status: 'scheduled' as const
    },
    {
      id: 2,
      content: "Building in public: Day 30 of creating the ultimate Twitter scheduling tool. The AI integration is getting smarter every day! 🤖",
      scheduledFor: "2024-01-15T14:30:00Z",
      status: 'scheduled' as const
    },
    {
      id: 3,
      content: "Hot take: The best productivity hack is not working harder, but working smarter. Automation tools are game-changers for creators. 💡",
      scheduledFor: "2024-01-15T18:00:00Z",
      status: 'draft' as const
    }
  ];

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
            <div className="space-y-4">
              {recentTweets.map((tweet, index) => (
                <motion.div
                  key={tweet.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-purple-500 bg-dark-800/50 rounded-r-lg p-4"
                >
                  <p className="text-gray-300 mb-2">{tweet.content}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tweet.status === 'scheduled' 
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {tweet.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                    </span>
                    <span className="text-gray-400">
                      {new Date(tweet.scheduledFor).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">AI Assistant</h3>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="text-purple-300 font-medium">TweetBot Pro</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Ready to help you create engaging content! I can generate tweets, optimize timing, and analyze trends.
              </p>
              <Button variant="primary" size="sm" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Compose Tweet
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
              <Button variant="secondary" className="w-full justify-start">
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