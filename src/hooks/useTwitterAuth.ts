import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { TwitterAccount, TwitterOAuthTokens } from '../types';
import { toast } from 'sonner';

export function useTwitterAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useLocalStorage<TwitterAccount[]>('twitter_accounts', []);

  const handleOAuthCallback = useCallback((tokens: TwitterOAuthTokens) => {
    const newAccount: TwitterAccount = {
      id: tokens.userId,
      username: tokens.screenName,
      displayName: tokens.screenName,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${tokens.screenName}`,
      isConnected: true,
      followers: Math.floor(Math.random() * 10000),
      following: Math.floor(Math.random() * 1000),
      accessToken: tokens.accessToken,
      accessTokenSecret: tokens.accessTokenSecret
    };

    setConnectedAccounts(prev => {
      const existing = prev.find(acc => acc.id === newAccount.id);
      if (existing) {
        return prev.map(acc => acc.id === newAccount.id ? newAccount : acc);
      }
      return [...prev, newAccount];
    });

    setError(null);
  }, [setConnectedAccounts]);

  const initiateTwitterAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would redirect to Twitter OAuth
      // For demo purposes, we'll simulate the OAuth flow
      const authUrl = `https://api.twitter.com/oauth/authorize?oauth_token=demo_token`;
      
      // Open popup window for OAuth
      const popup = window.open(
        authUrl,
        'twitter-auth',
        'width=600,height=600,scrollbars=yes,resizable=yes'
      );

      // Listen for the OAuth callback
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          // Simulate successful OAuth completion
          handleOAuthCallback({
            accessToken: 'demo_access_token',
            accessTokenSecret: 'demo_access_secret',
            userId: '123456789',
            screenName: 'demo_user'
          });
        }
      }, 1000);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to authenticate with Twitter';
      setError(errorMessage);
      toast.error('Twitter authentication failed', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, [handleOAuthCallback]);

  const disconnectAccount = useCallback((accountId: string) => {
    setConnectedAccounts(prev => prev.filter(acc => acc.id !== accountId));
  }, [setConnectedAccounts]);

  const getAccountByUsername = useCallback((username: string) => {
    return connectedAccounts.find(acc => acc.username === username);
  }, [connectedAccounts]);

  return {
    connectedAccounts,
    isLoading,
    error,
    initiateTwitterAuth,
    disconnectAccount,
    getAccountByUsername,
  };
}
