import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { TwitterAccountCard } from '../twitter/TwitterAccountCard';
import { ConnectTwitterButton } from '../twitter/ConnectTwitterButton';
import { useTwitterAuth } from '../../hooks/useTwitterAuth';

export function TwitterIntegration() {
  const { 
    connectedAccounts, 
    isLoading, 
    error, 
    initiateTwitterAuth, 
    disconnectAccount 
  } = useTwitterAuth();

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Twitter className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Twitter Integration</h3>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {connectedAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <TwitterAccountCard
                  account={account}
                  onDisconnect={disconnectAccount}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: connectedAccounts.length * 0.1 }}
          >
            <ConnectTwitterButton
              onConnect={initiateTwitterAuth}
              isLoading={isLoading}
            />
          </motion.div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">How it works:</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Click "Connect Account" to authorize TweetScheduler Pro</li>
            <li>• You'll be redirected to Twitter for secure OAuth authentication</li>
            <li>• Once connected, you can schedule and post tweets directly</li>
            <li>• Your credentials are stored securely and never shared</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}