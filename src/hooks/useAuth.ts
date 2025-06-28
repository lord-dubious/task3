import { useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
      } else {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
        }));
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
        error: null,
      }));

      // Create or update user profile when user signs in
      if (event === 'SIGNED_IN' && session?.user) {
        await createOrUpdateProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const createOrUpdateProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name,
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating/updating profile:', error);
      }
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error);
    }
  };

  const signInWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        toast.error('Authentication Error', { description: error.message });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
      toast.error('Sign In Failed', { 
        description: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        toast.error('Sign In Failed', { description: error.message });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
      toast.error('Sign In Failed', { 
        description: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        toast.error('Sign Up Failed', { description: error.message });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
      toast.error('Sign Up Failed', { 
        description: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        toast.error('Sign Out Failed', { description: error.message });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
      toast.error('Sign Out Failed', { 
        description: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  const resetPassword = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        toast.error('Password Reset Failed', { description: error.message });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
        toast.success('Password Reset Email Sent', { 
          description: 'Check your email for password reset instructions' 
        });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
      toast.error('Password Reset Failed', { 
        description: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  return {
    ...authState,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    resetPassword,
  };
}