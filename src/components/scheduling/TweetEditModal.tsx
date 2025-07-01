import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, Clock, Bot, AlertCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Tweet } from '../../hooks/useTweets';
import { useAgents } from '../../hooks/useAgents';
import { useTwitterAuth } from '../../hooks/useTwitterAuth';

interface TweetEditModalProps {
  isOpen: boolean;
  tweet: Tweet | null;
  onClose: () => void;
  onSave: (tweetId: string, updates: Partial<Tweet>) => void;
  isLoading?: boolean;
}

export function TweetEditModal({
  isOpen,
  tweet,
  onClose,
  onSave,
  isLoading = false
}: TweetEditModalProps) {
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { agents } = useAgents();
  const { connectedAccounts } = useTwitterAuth();

  useEffect(() => {
    if (tweet) {
      setContent(tweet.content);
      setSelectedAgent(tweet.agent_id || '');
      setSelectedAccount(tweet.twitter_account_id || '');
      
      if (tweet.scheduled_for) {
        const scheduledDateTime = new Date(tweet.scheduled_for);
        setScheduledDate(scheduledDateTime.toISOString().split('T')[0]);
        setScheduledTime(scheduledDateTime.toTimeString().slice(0, 5));
      }
    }
  }, [tweet]);

  const characterCount = content.length;
  const maxCharacters = 280;
  const isOverLimit = characterCount > maxCharacters;

  const handleSave = () => {
    if (!tweet) return;
    
    setError(null);

    if (!content.trim()) {
      setError('Tweet content cannot be empty');
      return;
    }

    if (isOverLimit) {
      setError('Tweet exceeds character limit');
      return;
    }

    let scheduledFor: string | null = null;
    if (scheduledDate && scheduledTime) {
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const now = new Date();

      if (scheduledDateTime <= now && tweet.status === 'scheduled') {
        setError('Scheduled time must be in the future');
        return;
      }

      scheduledFor = scheduledDateTime.toISOString();
    }

    const updates: Partial<Tweet> = {
      content: content.trim(),
      scheduled_for: scheduledFor,
      agent_id: selectedAgent || null,
      twitter_account_id: selectedAccount || null,
    };

    // If changing from failed to scheduled, reset retry count and failure reason
    if (tweet.status === 'failed' && scheduledFor) {
      updates.status = 'scheduled';
      updates.retry_count = 0;
      updates.failure_reason = null;
    }

    onSave(tweet.id, updates);
  };

  if (!isOpen || !tweet) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-400" />
              Edit Tweet
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Tweet Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-200">
                  Tweet Content
                </label>
                <span className={`text-sm ${
                  isOverLimit ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {characterCount}/{maxCharacters}
                </span>
              </div>
              <TextareaAutosize
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none focus:border-purple-500 focus:outline-none"
                minRows={3}
                maxRows={8}
              />
            </div>

            {/* Scheduling */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
              <Input
                label="Time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                leftIcon={<Clock className="w-4 h-4" />}
              />
            </div>

            {/* Agent Selection */}
            {agents.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  AI Agent
                </label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">No agent</option>
                  {agents.filter(a => a.enabled).map(agent => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Account Selection */}
            {connectedAccounts.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Twitter Account
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Default account</option>
                  {connectedAccounts.map(account => (
                    <option key={account.id} value={account.id}>
                      @{account.username}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tweet Status Info */}
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  tweet.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                  tweet.status === 'posted' ? 'bg-green-500/20 text-green-300' :
                  tweet.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {tweet.status}
                </span>
              </div>
              
              {tweet.retry_count > 0 && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-400">Retry attempts:</span>
                  <span className="text-gray-300">{tweet.retry_count}</span>
                </div>
              )}
              
              {tweet.failure_reason && (
                <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-300">
                  <strong>Last error:</strong> {tweet.failure_reason}
                </div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2"
              >
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!content.trim() || isOverLimit || isLoading}
              isLoading={isLoading}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}