import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Agent } from '../../types';

interface AgentFormProps {
  agent?: Agent | null;
  onSave: (agentData: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AgentForm({ agent, onSave, onCancel, isLoading }: AgentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    system_prompt: '',
    bio: [''],
    lore: [''],
    message_examples: [''],
    post_examples: [''],
    adjectives: [''],
    topics: [''],
    style_config: {
      all: [''],
      chat: [''],
      post: ['']
    },
    enabled: true
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name || '',
        username: agent.username || '',
        system_prompt: agent.system_prompt || '',
        bio: Array.isArray(agent.bio) ? agent.bio : agent.bio ? [agent.bio] : [''],
        lore: agent.lore || [''],
        message_examples: agent.message_examples || [''],
        post_examples: agent.post_examples || [''],
        adjectives: agent.adjectives || [''],
        topics: agent.topics || [''],
        style_config: {
          all: agent.style_config?.all || [''],
          chat: agent.style_config?.chat || [''],
          post: agent.style_config?.post || ['']
        },
        enabled: agent.enabled !== false
      });
    }
  }, [agent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      bio: formData.bio.filter(item => item.trim()),
      lore: formData.lore.filter(item => item.trim()),
      message_examples: formData.message_examples.filter(item => item.trim()),
      post_examples: formData.post_examples.filter(item => item.trim()),
      adjectives: formData.adjectives.filter(item => item.trim()),
      topics: formData.topics.filter(item => item.trim()),
      style_config: {
        all: formData.style_config.all.filter(item => item.trim()),
        chat: formData.style_config.chat.filter(item => item.trim()),
        post: formData.style_config.post.filter(item => item.trim())
      }
    };

    await onSave(cleanedData);
  };

  const addArrayItem = (field: string, subField?: string) => {
    setFormData(prev => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof typeof prev],
            [subField]: [...(prev[field as keyof typeof prev] as any)[subField], '']
          }
        };
      }
      return {
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), '']
      };
    });
  };

  const removeArrayItem = (field: string, index: number, subField?: string) => {
    setFormData(prev => {
      if (subField) {
        const fieldData = prev[field as keyof typeof prev] as any;
        return {
          ...prev,
          [field]: {
            ...fieldData,
            [subField]: fieldData[subField].filter((_: any, i: number) => i !== index)
          }
        };
      }
      return {
        ...prev,
        [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
      };
    });
  };

  const updateArrayItem = (field: string, index: number, value: string, subField?: string) => {
    setFormData(prev => {
      if (subField) {
        const fieldData = prev[field as keyof typeof prev] as any;
        const newArray = [...fieldData[subField]];
        newArray[index] = value;
        return {
          ...prev,
          [field]: {
            ...fieldData,
            [subField]: newArray
          }
        };
      }
      const newArray = [...(prev[field as keyof typeof prev] as string[])];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const renderArrayField = (
    title: string,
    field: string,
    placeholder: string,
    subField?: string
  ) => {
    const items = subField 
      ? (formData[field as keyof typeof formData] as any)[subField]
      : formData[field as keyof typeof formData] as string[];

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-200">{title}</label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addArrayItem(field, subField)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateArrayItem(field, index, e.target.value, subField)}
                placeholder={placeholder}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem(field, index, subField)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full"
    >
      <Card className="h-full">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Bot className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                {agent ? 'Edit Agent' : 'Create New Agent'}
              </h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name *"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Agent name"
                required
              />
              <Input
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                System Prompt
              </label>
              <textarea
                value={formData.system_prompt}
                onChange={(e) => setFormData(prev => ({ ...prev, system_prompt: e.target.value }))}
                placeholder="Define the agent's core personality and behavior..."
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {renderArrayField('Bio', 'bio', 'Add a bio line...')}
            {renderArrayField('Lore/Background', 'lore', 'Add background information...')}
            {renderArrayField('Message Examples', 'message_examples', 'Add example message...')}
            {renderArrayField('Post Examples', 'post_examples', 'Example post...')}
            {renderArrayField('Adjectives/Traits', 'adjectives', 'Add personality trait...')}
            {renderArrayField('Topics', 'topics', 'Add topic of expertise...')}

            <div className="space-y-4">
              <h4 className="text-md font-semibold text-white">Style Guidelines</h4>
              {renderArrayField('General Style', 'style_config', 'General style guideline...', 'all')}
              {renderArrayField('Chat Style', 'style_config', 'Chat-specific guideline...', 'chat')}
              {renderArrayField('Post Style', 'style_config', 'Post-specific guideline...', 'post')}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enabled"
                checked={formData.enabled}
                onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="enabled" className="text-sm text-gray-200">
                Enable this agent
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              leftIcon={<Save className="w-4 h-4" />}
            >
              {agent ? 'Update Agent' : 'Create Agent'}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}