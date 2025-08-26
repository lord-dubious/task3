import { useState, useEffect, useCallback } from 'react';
import type { Agent } from '../types';
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

      const res = await fetch('/api/agents');
      if (!res.ok) throw new Error('Failed to fetch agents');
      const data: Agent[] = await res.json();
      setAgents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const createAgent = async (agentData: Omit<Agent, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('Authentication required');

    try {
      setError(null);
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentData),
      });
      if (!res.ok) throw new Error('Failed to create agent');
      const data: Agent = await res.json();
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
      const res = await fetch(`/api/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update agent');
      const data: Agent = await res.json();
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
      const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete agent');
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