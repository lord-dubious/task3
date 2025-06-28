import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, RefreshCw, CheckCircle, AlertCircle, Bot } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useGoogleAI, GoogleAIModel } from '../../hooks/useGoogleAI';

export function GoogleAISettings() {
  const [googleAIKey, setGoogleAIKey] = useLocalStorage('googleAI_apiKey', '');
  const [selectedModel, setSelectedModel] = useLocalStorage('googleAI_selectedModel', 'gemini-1.5-flash');
  const [showKey, setShowKey] = useState(false);
  const [keyValidated, setKeyValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  
  const { models, isLoadingModels, error, fetchAvailableModels, validateApiKey } = useGoogleAI();

  useEffect(() => {
    if (googleAIKey && models.length === 0) {
      fetchAvailableModels(googleAIKey);
    }
  }, [googleAIKey, models.length, fetchAvailableModels]);

  const handleApiKeyChange = async (newKey: string) => {
    setGoogleAIKey(newKey);
    setKeyValidated(false);
    
    if (newKey.trim()) {
      setIsValidating(true);
      const isValid = await validateApiKey(newKey);
      setKeyValidated(isValid);
      setIsValidating(false);
      
      if (isValid) {
        await fetchAvailableModels(newKey);
      }
    }
  };

  const handleRefreshModels = async () => {
    if (googleAIKey) {
      await fetchAvailableModels(googleAIKey);
    }
  };

  const getModelDisplayInfo = (model: GoogleAIModel) => {
    const info = [model.displayName];
    if (model.inputTokenLimit) {
      info.push(`${(model.inputTokenLimit / 1000).toFixed(0)}K tokens`);
    }
    return info.join(' • ');
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Bot className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Google AI Configuration</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="relative">
              <Input
                label="Google AI API Key"
                type={showKey ? 'text' : 'password'}
                value={googleAIKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="Enter your Google AI API key"
                leftIcon={<Key className="w-4 h-4" />}
                rightIcon={
                  <div className="flex items-center space-x-2">
                    {isValidating && (
                      <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                    )}
                    {googleAIKey && !isValidating && (
                      keyValidated ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="hover:text-white transition-colors"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                }
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-400">
                Get your API key from{' '}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Google AI Studio
                </a>
              </p>
              {keyValidated && (
                <span className="text-xs text-green-400 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Valid
                </span>
              )}
            </div>
          </div>

          {keyValidated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Model Selection
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefreshModels}
                    disabled={isLoadingModels}
                    className="text-xs"
                  >
                    <RefreshCw className={`w-3 h-3 mr-1 ${isLoadingModels ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
                
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isLoadingModels || models.length === 0}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none disabled:opacity-50"
                >
                  {isLoadingModels ? (
                    <option>Loading models...</option>
                  ) : models.length === 0 ? (
                    <option>No models available</option>
                  ) : (
                    models.map((model) => (
                      <option key={model.name} value={model.name}>
                        {getModelDisplayInfo(model)}
                      </option>
                    ))
                  )}
                </select>
                
                {selectedModel && models.length > 0 && (
                  <div className="mt-2 p-3 bg-gray-800/50 rounded-lg">
                    {(() => {
                      const model = models.find(m => m.name === selectedModel);
                      return model ? (
                        <div className="text-sm">
                          <p className="text-white font-medium">{model.displayName}</p>
                          {model.description && (
                            <p className="text-gray-400 mt-1">{model.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            {model.inputTokenLimit && (
                              <span>Input: {(model.inputTokenLimit / 1000).toFixed(0)}K tokens</span>
                            )}
                            {model.outputTokenLimit && (
                              <span>Output: {(model.outputTokenLimit / 1000).toFixed(0)}K tokens</span>
                            )}
                            {(selectedModel.includes('vision') || selectedModel.includes('1.5') || selectedModel.includes('2.0')) && (
                              <span className="text-purple-400">✓ Vision Support</span>
                            )}
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium mb-2">Vision Capabilities</h4>
                <p className="text-blue-200 text-sm mb-2">
                  Models with vision support can analyze images and generate contextual content:
                </p>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• <strong>gemini-1.5-flash</strong> - Fast vision analysis</li>
                  <li>• <strong>gemini-1.5-pro</strong> - Advanced vision understanding</li>
                  <li>• <strong>gemini-2.0-flash</strong> - Latest vision model</li>
                </ul>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <p className="text-yellow-300 text-sm">
                      {error}. Using fallback models.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}