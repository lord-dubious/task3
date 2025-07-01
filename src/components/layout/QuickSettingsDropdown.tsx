import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bot, Zap, Palette, Monitor, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useGoogleAI } from '../../hooks/useGoogleAI';
import { useAuth } from '../../hooks/useAuth';

export function QuickSettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useLocalStorage('googleAI_selectedModel', 'gemini-1.5-flash');
  const [googleAIKey, setGoogleAIKey] = useLocalStorage('googleAI_apiKey', '');
  const [theme, setTheme] = useLocalStorage('app_theme', 'dark');
  const [autoOptimize, setAutoOptimize] = useLocalStorage('auto_optimize_media', true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { models, fetchAvailableModels, isLoadingModels } = useGoogleAI();
  const { user } = useAuth();

  // Fetch models when component mounts or API key changes
  useEffect(() => {
    if (googleAIKey && models.length === 0) {
      fetchAvailableModels(googleAIKey);
    }
  }, [googleAIKey, models.length, fetchAvailableModels]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setIsOpen(false);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // Apply theme to document
    document.documentElement.className = newTheme;
  };

  const getModelDisplayName = (modelName: string) => {
    const model = models.find(m => m.name === modelName);
    return model?.displayName || modelName.replace('gemini-', 'Gemini ').replace('-', ' ');
  };

  // Get available models or fallback to common ones
  const availableModels = models.length > 0 ? models : [
    { name: 'gemini-1.5-flash', displayName: 'Gemini 1.5 Flash' },
    { name: 'gemini-1.5-pro', displayName: 'Gemini 1.5 Pro' },
    { name: 'gemini-2.0-flash-exp', displayName: 'Gemini 2.0 Flash (Experimental)' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1"
      >
        <Settings className="w-5 h-5" />
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-[9999] overflow-hidden"
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-dropdown overflow-hidden max-h-[80vh]"
          >
            <div className="p-3 sm:p-4 border-b border-gray-700 flex-shrink-0">
              <h3 className="text-white font-semibold flex items-center">
                <Zap className="w-4 h-4 mr-2 text-purple-400" />
                Quick Settings
              </h3>
            </div>

            <div className="p-3 sm:p-4 space-y-4 overflow-y-auto max-h-96">
              {/* AI Model Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <label className="text-sm font-medium text-gray-200">AI Model</label>
                </div>
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={isLoadingModels}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  {availableModels.map(model => (
                    <option key={model.name} value={model.name}>
                      {model.displayName}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Current: {getModelDisplayName(selectedModel)}
                  </p>
                  {isLoadingModels && (
                    <div className="w-3 h-3 border border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                {!googleAIKey && (
                  <p className="text-xs text-yellow-400 mt-1">
                    ⚠️ Set API key in settings to load all models
                  </p>
                )}
              </div>

              {/* Theme Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="w-4 h-4 text-purple-400" />
                  <label className="text-sm font-medium text-gray-200">Theme</label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      theme === 'dark' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      theme === 'light' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('auto')}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      theme === 'auto' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Auto</span>
                  </button>
                </div>
              </div>

              {/* Media Optimization Toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <label className="text-sm font-medium text-gray-200">Auto-optimize Media</label>
                  </div>
                  <button
                    onClick={() => setAutoOptimize(!autoOptimize)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      autoOptimize ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        autoOptimize ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Automatically compress and optimize uploaded images
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-800/50 flex-shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to full settings - you'd implement this based on your routing
                    window.location.hash = '#settings';
                  }}
                  className="text-xs"
                >
                  Full Settings
                </Button>
                <div className="text-xs text-gray-500 flex items-center justify-end">
                  <span>v1.0.0</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}