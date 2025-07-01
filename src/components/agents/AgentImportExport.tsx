import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  Download, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Bot,
  Users,
  Calendar,
  Eye
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Agent } from '../../types';

interface AgentImportExportProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  onImport: (agentData: Omit<Agent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Agent>;
  onExportAll: () => void;
}

interface ImportedAgent {
  name: string;
  username?: string;
  system_prompt?: string;
  bio?: string[];
  lore?: string[];
  message_examples?: any;
  post_examples?: string[];
  adjectives?: string[];
  topics?: string[];
  style_config?: any;
  enabled?: boolean;
  exported_at?: string;
  version?: string;
}

interface ImportData {
  agents?: ImportedAgent[];
  // Single agent format
  name?: string;
  username?: string;
  system_prompt?: string;
  bio?: string[];
  lore?: string[];
  message_examples?: any;
  post_examples?: string[];
  adjectives?: string[];
  topics?: string[];
  style_config?: any;
  enabled?: boolean;
  exported_at?: string;
  version?: string;
  total_agents?: number;
}

export function AgentImportExport({
  isOpen,
  onClose,
  agents,
  onImport,
  onExportAll
}: AgentImportExportProps) {
  const [dragOver, setDragOver] = useState(false);
  const [importData, setImportData] = useState<ImportData | null>(null);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.endsWith('.json')) {
      setError('Please select a JSON file');
      return;
    }

    try {
      setError(null);
      const text = await file.text();
      const data = JSON.parse(text) as ImportData;
      
      // Validate the data structure
      if (!validateImportData(data)) {
        setError('Invalid agent data format');
        return;
      }

      setImportData(data);
      
      // Auto-select all agents for import
      if (data.agents) {
        setSelectedAgents(data.agents.map((_, index) => index));
      } else {
        setSelectedAgents([0]); // Single agent
      }
    } catch (err) {
      setError('Failed to parse JSON file');
      console.error('Import error:', err);
    }
  };

  const validateImportData = (data: ImportData): boolean => {
    // Check if it's a single agent
    if (data.name && typeof data.name === 'string') {
      return true;
    }
    
    // Check if it's multiple agents
    if (data.agents && Array.isArray(data.agents)) {
      return data.agents.every(agent => 
        agent.name && typeof agent.name === 'string'
      );
    }
    
    return false;
  };

  const handleImport = async () => {
    if (!importData) return;

    // Check authentication before proceeding
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      setImportResults({
        success: 0,
        failed: selectedAgents.length,
        errors: ['Authentication required. Please refresh the page and try again.']
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    try {
      // Handle single agent import
      if (importData.name && !importData.agents) {
        if (selectedAgents.includes(0)) {
          try {
            await onImport({
              name: importData.name,
              username: importData.username || null,
              system_prompt: (importData as any).system || importData.system_prompt || null,
              bio: importData.bio || null,
              lore: importData.lore || null,
              message_examples: (importData as any).messageExamples || importData.message_examples || null,
              post_examples: (importData as any).postExamples || importData.post_examples || null,
              adjectives: importData.adjectives || null,
              topics: importData.topics || null,
              style_config: (importData as any).style || importData.style_config || null,
              enabled: importData.enabled !== false
            });
            results.success++;
          } catch (err) {
            results.failed++;
            results.errors.push(`Failed to import ${importData.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
          }
        }
      }
      
      // Handle multiple agents import
      if (importData.agents) {
        for (const [index, agent] of importData.agents.entries()) {
          if (!selectedAgents.includes(index)) continue;
          
          try {
            await onImport({
              name: agent.name,
              username: agent.username || null,
              system_prompt: (agent as any).system || agent.system_prompt || null,
              bio: agent.bio || null,
              lore: agent.lore || null,
              message_examples: (agent as any).messageExamples || agent.message_examples || null,
              post_examples: (agent as any).postExamples || agent.post_examples || null,
              adjectives: agent.adjectives || null,
              topics: agent.topics || null,
              style_config: (agent as any).style || agent.style_config || null,
              enabled: agent.enabled !== false
            });
            results.success++;
          } catch (err) {
            results.failed++;
            results.errors.push(`Failed to import ${agent.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
          }
        }
      }
    } catch (err) {
      results.failed++;
      results.errors.push(`Import failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    setImportResults(results);
    setIsImporting(false);
    
    // Clear import data after successful import
    if (results.success > 0) {
      setTimeout(() => {
        setImportData(null);
        setSelectedAgents([]);
        if (results.failed === 0) {
          onClose();
        }
      }, 2000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const toggleAgentSelection = (index: number) => {
    setSelectedAgents(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const selectAllAgents = () => {
    if (!importData) return;
    
    const totalAgents = importData.agents ? importData.agents.length : 1;
    const allIndices = Array.from({ length: totalAgents }, (_, i) => i);
    
    if (selectedAgents.length === totalAgents) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(allIndices);
    }
  };

  const getAgentsToDisplay = (): ImportedAgent[] => {
    if (!importData) return [];
    
    if (importData.agents) {
      return importData.agents;
    } else if (importData.name) {
      return [importData as ImportedAgent];
    }
    
    return [];
  };

  const resetImport = () => {
    setImportData(null);
    setSelectedAgents([]);
    setImportResults(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-900 rounded-2xl p-6 w-full max-w-4xl border border-gray-700 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Import/Export Agents</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Section */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Export Agents</h3>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-medium">Current Agents</p>
                      <p className="text-gray-400 text-sm">{agents.length} agents configured</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bot className="w-8 h-8 text-purple-400" />
                      <span className="text-2xl font-bold text-white">{agents.length}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={onExportAll}
                    disabled={agents.length === 0}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="w-full"
                  >
                    Export All Agents
                  </Button>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-300 font-medium mb-2">Export Features</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Export individual agents or all at once</li>
                    <li>• JSON format for easy sharing and backup</li>
                    <li>• Includes all agent configuration and personality data</li>
                    <li>• Compatible with other TweetScheduler Pro instances</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Import Section */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Import Agents</h3>
                </div>

                {!importData ? (
                  <>
                    <div
                      className={`
                        border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                        ${dragOver 
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-gray-600 hover:border-purple-500/50'
                        }
                      `}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg mb-2">
                        Drop JSON file here or click to upload
                      </p>
                      <p className="text-gray-500 text-sm">
                        Import agent configurations from JSON files
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-300 font-medium">File Loaded Successfully</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetImport}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Agents Found: </span>
                          <span className="text-white">{getAgentsToDisplay().length}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Version: </span>
                          <span className="text-white">{importData.version || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Agent Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">Select Agents to Import</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={selectAllAgents}
                        >
                          {selectedAgents.length === getAgentsToDisplay().length ? 'Deselect All' : 'Select All'}
                        </Button>
                      </div>
                      
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {getAgentsToDisplay().map((agent, index) => (
                          <div
                            key={index}
                            className={`
                              p-3 rounded-lg border cursor-pointer transition-all
                              ${selectedAgents.includes(index)
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-gray-600 hover:border-purple-500/50'
                              }
                            `}
                            onClick={() => toggleAgentSelection(index)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={selectedAgents.includes(index)}
                                  onChange={() => toggleAgentSelection(index)}
                                  className="w-4 h-4"
                                />
                                <div>
                                  <p className="text-white font-medium">{agent.name}</p>
                                  {agent.username && (
                                    <p className="text-gray-400 text-sm">@{agent.username}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                {agent.topics && agent.topics.length > 0 && (
                                  <span>{agent.topics.length} topics</span>
                                )}
                                {agent.post_examples && agent.post_examples.length > 0 && (
                                  <span>{agent.post_examples.length} examples</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleImport}
                      disabled={selectedAgents.length === 0 || isImporting}
                      isLoading={isImporting}
                      leftIcon={<Upload className="w-4 h-4" />}
                      className="w-full"
                    >
                      Import {selectedAgents.length} Agent{selectedAgents.length !== 1 ? 's' : ''}
                    </Button>
                  </div>
                )}

                {/* Import Results */}
                {importResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg p-4 border ${
                      importResults.failed === 0
                        ? 'bg-green-500/20 border-green-500/30'
                        : 'bg-yellow-500/20 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {importResults.failed === 0 ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      )}
                      <span className={`font-medium ${
                        importResults.failed === 0 ? 'text-green-300' : 'text-yellow-300'
                      }`}>
                        Import Complete
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-gray-400">Successful: </span>
                        <span className="text-green-400">{importResults.success}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Failed: </span>
                        <span className="text-red-400">{importResults.failed}</span>
                      </div>
                    </div>
                    {importResults.errors.length > 0 && (
                      <div className="mt-2">
                        <p className="text-red-300 text-sm font-medium mb-1">Errors:</p>
                        <ul className="text-red-200 text-xs space-y-1">
                          {importResults.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}
              </div>
            </Card>
          </div>

          {/* Usage Instructions */}
          <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">How to Use</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <p className="font-medium text-gray-300 mb-1">Exporting:</p>
                <ul className="space-y-1">
                  <li>• Click "Export All" to download all agents as JSON</li>
                  <li>• Use the download button on individual agents</li>
                  <li>• Share files with team members or backup configurations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-300 mb-1">Importing:</p>
                <ul className="space-y-1">
                  <li>• Drag and drop JSON files or click to upload</li>
                  <li>• Select which agents to import</li>
                  <li>• Duplicate names will be automatically handled</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}