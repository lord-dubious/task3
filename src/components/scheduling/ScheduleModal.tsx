import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Bot, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAgents } from '../../hooks/useAgents';
import { useTwitterAuth } from '../../hooks/useTwitterAuth';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (scheduleData: {
    scheduledFor: string;
    twitterAccountId?: string;
    agentId?: string;
  }) => void;
  isLoading?: boolean;
}

export function ScheduleModal({
  isOpen,
  onClose,
  onSchedule,
  isLoading = false
}: ScheduleModalProps) {
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { agents } = useAgents();
  const { connectedAccounts } = useTwitterAuth();

  const handleSchedule = () => {
    setError(null);

    if (!scheduledDate || !scheduledTime) {
      setError('Please select both date and time');
      return;
    }

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const now = new Date();

    if (scheduledDateTime <= now) {
      setError('Scheduled time must be in the future');
      return;
    }

    onSchedule({
      scheduledFor: scheduledDateTime.toISOString(),
      twitterAccountId: selectedAccount || undefined,
      agentId: selectedAgent || undefined,
    });

    // Reset form
    setScheduledDate('');
    setScheduledTime('');
    setSelectedAgent('');
    setSelectedAccount('');
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5); // Minimum 5 minutes from now
    return now.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-400" />
              Schedule Tweet
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
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

            {agents.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  AI Agent (Optional)
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

            {connectedAccounts.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Twitter Account (Optional)
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

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-300 text-sm">
                <strong>Note:</strong> Tweets will be automatically posted at the scheduled time. 
                You can edit or cancel scheduled tweets from the calendar view.
              </p>
            </div>
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
              onClick={handleSchedule}
              disabled={!scheduledDate || !scheduledTime || isLoading}
              isLoading={isLoading}
            >
              Schedule Tweet
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}