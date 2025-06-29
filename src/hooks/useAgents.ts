import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Agent } from '../types';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAgents = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setAgents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const createAgent = async (agentData: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { data, error: createError } = await supabase
        .from('agents')
        .insert({
          ...agentData,
          user_id: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;

      setAgents(prev => [data, ...prev]);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create agent';
      setError(errorMessage);
      toast.error('Failed to create agent', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setAgents(prev => prev.map(agent => agent.id === id ? data : agent));
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update agent';
      setError(errorMessage);
      toast.error('Failed to update agent', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const deleteAgent = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('agents')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setAgents(prev => prev.filter(agent => agent.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete agent';
      setError(errorMessage);
      toast.error('Failed to delete agent', { description: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const toggleAgent = async (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;

    await updateAgent(id, { enabled: !agent.enabled });
  };

  return {
    agents,
    loading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
    toggleAgent,
    refetch: fetchAgents,
  };
}