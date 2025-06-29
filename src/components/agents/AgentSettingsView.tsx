import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bot, Download, Upload, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { AgentList } from './AgentList';
import { AgentForm } from './AgentForm';
import { AgentImportExport } from './AgentImportExport';
import { useAgents } from '../../hooks/useAgents';
import { useNotifications } from '../../hooks/useNotifications';
import { Agent } from '../../types';

export function AgentSettingsView() {
  const { agents, loading, createAgent, updateAgent, deleteAgent, toggleAgent } = useAgents();
  const { user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleCreateNew = () => {
    if (!user) {
      showError('Authentication Required', 'Please sign in to create agents');
      return;
    }
    setEditingAgent(null);
    setShowForm(true);
  };

  const handleEdit = (agent: Agent) => {
    if (!user) {
      showError('Authentication Required', 'Please sign in to edit agents');
      return;
    }
    setEditingAgent(agent);
    setShowForm(true);
  };

  const handleSave = async (agentData: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsSubmitting(true);
      
      if (editingAgent) {
        await updateAgent(editingAgent.id, agentData);
        showSuccess('Agent updated', `${agentData.name} has been updated successfully`);
      } else {
        await createAgent(agentData);
        showSuccess('Agent created', `${agentData.name} has been created successfully`);
      }
      
      setShowForm(false);
      setEditingAgent(null);
    } catch (error) {
      showError('Failed to save agent', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAgent(null);
  };

  const handleExportAgent = (agent: Agent) => {
    const exportData = {
      name: agent.name,
      username: agent.username,
      system_prompt: agent.system_prompt,
      bio: agent.bio,
      lore: agent.lore,
      message_examples: agent.message_examples,
      post_examples: agent.post_examples,
      adjectives: agent.adjectives,
      topics: agent.topics,
      style_config: agent.style_config,
      enabled: agent.enabled,
      exported_at: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${agent.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAll = () => {
    const exportData = {
      agents: agents.map(agent => ({
        name: agent.name,
        username: agent.username,
        system_prompt: agent.system_prompt,
        bio: agent.bio,
        lore: agent.lore,
        message_examples: agent.message_examples,
        post_examples: agent.post_examples,
        adjectives: agent.adjectives,
        topics: agent.topics,
        style_config: agent.style_config,
        enabled: agent.enabled
      })),
      exported_at: new Date().toISOString(),
      version: '1.0',
      total_agents: agents.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `all-agents-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {!user && (
        <div className="mb-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-yellow-300 font-medium">Authentication Required</p>
              <p className="text-yellow-200 text-sm">
                Please sign in to manage AI agents and access all features.
              </p>
            </div>
          </div>
        </div>
      )}

    <div className="h-full flex">
      {/* Left Panel - Agent List */}
      <div className="w-1/2 pr-3">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Bot className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">AI Agents</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImportExport(true)}
               disabled={!user}
                leftIcon={<FileText className="w-4 h-4" />}
              >
                Import/Export
              </Button>
              <Button
                onClick={handleCreateNew}
               disabled={!user}
                leftIcon={<Plus className="w-4 h-4" />}
               disabled={showForm || !user}
              >
                New Agent
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <AgentList
              agents={agents}
              selectedAgent={selectedAgent}
              onSelect={setSelectedAgent}
              onEdit={handleEdit}
              onDelete={deleteAgent}
              onToggle={toggleAgent}
              onExport={handleExportAgent}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Agent Form or Details */}
      <div className="w-1/2 pl-3">
        <AnimatePresence mode="wait">
          {showForm ? (
            <AgentForm
              key="form"
              agent={editingAgent}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          ) : selectedAgent ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedAgent.enabled ? 'bg-purple-600' : 'bg-gray-600'
                    }`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedAgent.name}</h3>
                      {selectedAgent.username && (
                        <p className="text-gray-400">@{selectedAgent.username}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(selectedAgent)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleExportAgent(selectedAgent)}
                    leftIcon={<Download className="w-4 h-4" />}
                  >
                    Export
                  </Button>
                </div>

                <div className="space-y-6">
                  {selectedAgent.system_prompt && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">System Prompt</h4>
                      <p className="text-gray-400 text-sm bg-gray-800/50 rounded-lg p-3">
                        {selectedAgent.system_prompt}
                      </p>
                    </div>
                  )}

                  {selectedAgent.bio && selectedAgent.bio.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Bio</h4>
                      <ul className="space-y-1">
                        {selectedAgent.bio.map((item, index) => (
                          <li key={index} className="text-gray-400 text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedAgent.topics && selectedAgent.topics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAgent.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAgent.adjectives && selectedAgent.adjectives.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Traits</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAgent.adjectives.map((trait, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAgent.post_examples && selectedAgent.post_examples.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Post Examples</h4>
                      <div className="space-y-2">
                        {selectedAgent.post_examples.slice(0, 3).map((example, index) => (
                          <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">{example}</p>
                          </div>
                        ))}
                        {selectedAgent.post_examples.length > 3 && (
                          <p className="text-gray-500 text-xs">
                            +{selectedAgent.post_examples.length - 3} more examples
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select an Agent</h3>
                <p className="text-gray-400">
                  Choose an agent from the list to view details or create a new one.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Import/Export Modal */}
      <AgentImportExport
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        agents={agents}
        onImport={createAgent}
        onExportAll={handleExportAll}
      />
    </div>
    </>
  );
}