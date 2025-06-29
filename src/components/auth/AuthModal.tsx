import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signin') {
      await signInWithEmail(email, password);
    } else if (mode === 'signup') {
      await signUpWithEmail(email, password, fullName);
    } else if (mode === 'forgot') {
      await resetPassword(email);
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-md3-scrim/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-md3-surface-container rounded-3xl p-8 w-full max-w-md border border-md3-outline-variant shadow-elevation-3"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="md3-headline-small text-md3-on-surface">
              {mode === 'signin' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h2>
            <button
              onClick={onClose}
              className="text-md3-on-surface-variant hover:text-md3-on-surface transition-colors p-2 rounded-full hover:bg-md3-on-surface/8"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-md3-error-container border border-md3-error rounded-xl p-4 mb-4"
            >
              <p className="md3-body-small text-md3-on-error-container">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Input
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                leftIcon={<User className="w-4 h-4" />}
                required
              />
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            {mode !== 'forgot' && (
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-md3-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
            )}

            <Button
              type="submit"
              variant="filled"
              className="w-full"
              isLoading={loading}
            >
              {mode === 'signin' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Link'}
            </Button>
          </form>

          {mode !== 'forgot' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-md3-outline-variant"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-md3-surface-container md3-body-small text-md3-on-surface-variant">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                variant="outlined"
                className="w-full"
                isLoading={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </>
          )}

          <div className="mt-6 text-center md3-body-small">
            {mode === 'signin' && (
              <>
                <p className="text-md3-on-surface-variant">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-md3-primary hover:text-md3-primary/80 font-medium"
                  >
                    Sign up
                  </button>
                </p>
                <button
                  onClick={() => setMode('forgot')}
                  className="text-md3-primary hover:text-md3-primary/80 font-medium mt-2 block mx-auto"
                >
                  Forgot password?
                </button>
              </>
            )}
            {mode === 'signup' && (
              <p className="text-md3-on-surface-variant">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-md3-primary hover:text-md3-primary/80 font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p className="text-md3-on-surface-variant">
                Remember your password?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-md3-primary hover:text-md3-primary/80 font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}