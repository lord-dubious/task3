import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Edit, Trash2, Power, PowerOff, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { Agent } from '../../types';

interface AgentListProps {
  agents: Agent[];
  selectedAgent?: Agent | null;
  onSelect: (agent: Agent) => void;
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onExport: (agent: Agent) => void;
  loading?: boolean;
}

export function AgentList({
  agents,
  selectedAgent,
  onSelect,
  onEdit,
  onDelete,
  onToggle,
  onExport,
  loading
}: AgentListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No AI Agents</h3>
        <p className="text-gray-400 mb-4">
          Create your first AI agent to start generating personalized content.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {agents.map((agent, index) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedAgent?.id === agent.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'hover:border-purple-500/50'
            }`}
            onClick={() => onSelect(agent)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  agent.enabled ? 'bg-purple-600' : 'bg-gray-600'
                }`}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold truncate">{agent.name}</h3>
                    {agent.username && (
                      <span className="text-gray-400 text-sm">@{agent.username}</span>
                    )}
                    <div className={`w-2 h-2 rounded-full ${
                      agent.enabled ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  {agent.system_prompt && (
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {agent.system_prompt}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    {agent.topics && agent.topics.length > 0 && (
                      <span>{agent.topics.length} topics</span>
                    )}
                    {agent.adjectives && agent.adjectives.length > 0 && (
                      <span>{agent.adjectives.length} traits</span>
                    )}
                    {agent.post_examples && agent.post_examples.length > 0 && (
                      <span>{agent.post_examples.length} examples</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(agent.id);
                  }}
                  className={agent.enabled ? 'text-green-400' : 'text-gray-400'}
                >
                  {agent.enabled ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(agent);
                  }}
                  className="text-blue-400"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExport(agent);
                  }}
                  className="text-purple-400"
                >
                  <Download className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this agent?')) {
                      onDelete(agent.id);
                    }
                  }}
                  className="text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}