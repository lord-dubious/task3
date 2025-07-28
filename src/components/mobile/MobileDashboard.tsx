import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, Bot, Zap, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

const stats = [
  { title: 'Scheduled', value: '12', icon: Calendar, color: 'from-blue-500 to-blue-700' },
  { title: 'AI Generated', value: '8', icon: Bot, color: 'from-purple-500 to-purple-700' },
  { title: 'Engagement', value: '2.4K', icon: TrendingUp, color: 'from-green-500 to-green-700' },
  { title: 'Followers', value: '1.2K', icon: Users, color: 'from-orange-500 to-orange-700' },
];

const recentTweets = [
  { id: 1, content: 'Just launched our new AI feature! 🚀', status: 'posted', time: '2h ago' },
  { id: 2, content: 'Working on something exciting...', status: 'scheduled', time: 'Tomorrow 9 AM' },
  { id: 3, content: 'Thanks for all the support! 💜', status: 'draft', time: 'Draft' },
];

interface MobileDashboardProps {
  onNewTweet?: () => void;
  onSchedule?: () => void;
  onViewAll?: () => void;
  onGenerateContent?: () => void;
}

export function MobileDashboard({
  onNewTweet,
  onSchedule,
  onViewAll,
  onGenerateContent
}: MobileDashboardProps = {}) {
  return (
    <div className="pb-20 space-y-6">
      {/* Quick Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-16 flex-col space-y-1" onClick={onNewTweet}>
            <Plus className="w-6 h-6" />
            <span className="text-sm">New Tweet</span>
          </Button>
          <Button variant="secondary" className="h-16 flex-col space-y-1" onClick={onSchedule}>
            <Calendar className="w-6 h-6" />
            <span className="text-sm">Schedule</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <Button variant="ghost" size="sm" onClick={onViewAll}>View All</Button>
        </div>
        <div className="space-y-3">
          {recentTweets.map((tweet, index) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  tweet.status === 'posted' ? 'bg-green-500/20 text-green-300' :
                  tweet.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {tweet.status}
                </span>
                <span className="text-xs text-gray-400">{tweet.time}</span>
              </div>
              <p className="text-white text-sm">{tweet.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Assistant */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-purple-300 font-medium">AI Assistant</h4>
              <p className="text-purple-200 text-sm">Ready to help</p>
            </div>
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={onGenerateContent}>
            <Zap className="w-4 h-4 mr-2" />
            Generate Content
          </Button>
        </div>
      </div>
    </div>
  );
}
