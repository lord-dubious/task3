import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/auth/me', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setAuthState({ user: data.user, loading: false, error: null });
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Auth check failed'
      });
    }
  };

  const signInWithGoogle = () => {
    window.location.href = '/auth/google';
  };

  const signInWithTwitter = () => {
    window.location.href = '/auth/twitter';
  };

  const signOut = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setAuthState({ user: null, loading: false, error: null });
      toast.success('Signed out successfully');
    } catch {
      toast.error('Sign out failed');
    }
  };

  return {
    ...authState,
    signInWithGoogle,
    signInWithTwitter,
    signOut,
    refetch: checkAuthStatus,
  };
}
