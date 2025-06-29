import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Twitter, Bot, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal } from './AuthModal';
import { Button } from '../ui/Button';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              TweetScheduler <span className="text-purple-400">Pro</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              AI-powered Twitter management that helps you create, schedule, and optimize your social media presence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <Bot className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">AI-Powered Content</h3>
              <p className="text-gray-400 text-sm">Generate engaging tweets with advanced AI assistance</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-gray-400 text-sm">Schedule posts at optimal times for maximum engagement</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <Twitter className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Multi-Account</h3>
              <p className="text-gray-400 text-sm">Manage multiple Twitter accounts from one dashboard</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                size="lg"
                className="px-8"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                }}
                variant="secondary"
                size="lg"
                className="px-8"
              >
                Sign In
              </Button>
            </div>
            <p className="text-gray-500 text-sm">
              No credit card required • Free forever plan available
            </p>
          </motion.div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      </div>
    );
  }

  return <>{children}</>;
}