import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Twitter, Bot, Calendar } from 'lucide-react';
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
      <div className="min-h-screen bg-md3-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-md3-primary to-md3-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-elevation-2">
            <CheckSquare className="w-8 h-8 text-md3-on-primary" />
          </div>
          <p className="md3-body-large text-md3-on-surface-variant">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-md3-background flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-md3-primary via-md3-primary-container to-md3-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elevation-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <CheckSquare className="w-10 h-10 text-md3-on-primary relative z-10" />
            </div>
            <h1 className="md3-display-medium text-md3-on-background mb-4">
              Tasker <span className="text-md3-primary">Pro</span>
            </h1>
            <p className="md3-title-medium text-md3-on-surface-variant mb-8 max-w-2xl mx-auto">
              AI-powered task and social media management that helps you organize, schedule, and optimize your productivity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-md3-surface-container rounded-2xl p-6 border border-md3-outline-variant">
              <div className="w-12 h-12 bg-md3-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-md3-on-primary-container" />
              </div>
              <h3 className="md3-title-medium text-md3-on-surface mb-2">AI-Powered Content</h3>
              <p className="md3-body-medium text-md3-on-surface-variant">Generate engaging tweets with advanced AI assistance</p>
            </div>
            <div className="bg-md3-surface-container rounded-2xl p-6 border border-md3-outline-variant">
              <div className="w-12 h-12 bg-md3-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-md3-on-primary-container" />
              </div>
              <h3 className="md3-title-medium text-md3-on-surface mb-2">Smart Scheduling</h3>
              <p className="md3-body-medium text-md3-on-surface-variant">Schedule posts at optimal times for maximum engagement</p>
            </div>
            <div className="bg-md3-surface-container rounded-2xl p-6 border border-md3-outline-variant">
              <div className="w-12 h-12 bg-md3-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Twitter className="w-6 h-6 text-md3-on-primary-container" />
              </div>
              <h3 className="md3-title-medium text-md3-on-surface mb-2">Multi-Account</h3>
              <p className="md3-body-medium text-md3-on-surface-variant">Manage multiple Twitter accounts from one dashboard</p>
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
                variant="filled"
                className="px-8"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                }}
                variant="outlined"
                size="lg"
                className="px-8"
              >
                Sign In
              </Button>
            </div>
            <p className="md3-body-small text-md3-on-surface-variant">
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