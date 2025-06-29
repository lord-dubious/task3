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
        className="flex items-center space-x-1 relative"
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
            className="absolute right-0 top-full mt-2 w-80 bg-md3-surface-container border border-md3-outline-variant rounded-2xl shadow-elevation-3 z-[9999] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold flex items-center">
                <Zap className="w-4 h-4 mr-2 text-md3-primary" />
                Quick Settings
              </h3>
            </div>

            <div className="p-4 space-y-4">
              {/* AI Model Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-4 h-4 text-md3-primary" />
                  <label className="md3-body-medium font-medium text-md3-on-surface">AI Model</label>
                </div>
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={isLoadingModels}
                  className="w-full bg-md3-surface-container-high border border-md3-outline rounded-lg px-3 py-2 text-md3-on-surface md3-body-small focus:border-md3-primary focus:outline-none"
                >
                  {availableModels.map(model => (
                    <option key={model.name} value={model.name}>
                      {model.displayName}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between mt-1">
                  <p className="md3-body-small text-md3-on-surface-variant">
                    Current: {getModelDisplayName(selectedModel)}
                  </p>
                  {isLoadingModels && (
                    <div className="w-3 h-3 border border-md3-primary border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                {!googleAIKey && (
                  <p className="md3-body-small text-yellow-400 mt-1">
                    ⚠️ Set API key in settings to load all models
                  </p>
                )}
              </div>

              {/* Theme Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="w-4 h-4 text-md3-primary" />
                  <label className="md3-body-medium font-medium text-md3-on-surface">Theme</label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg md3-body-small transition-colors ${
                      theme === 'dark' 
                        ? 'bg-md3-primary text-md3-on-primary' 
                        : 'bg-md3-surface-container text-md3-on-surface hover:bg-md3-surface-container-high'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg md3-body-small transition-colors ${
                      theme === 'light' 
                        ? 'bg-md3-primary text-md3-on-primary' 
                        : 'bg-md3-surface-container text-md3-on-surface hover:bg-md3-surface-container-high'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('auto')}
                    className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg md3-body-small transition-colors ${
                      theme === 'auto' 
                        ? 'bg-md3-primary text-md3-on-primary' 
                        : 'bg-md3-surface-container text-md3-on-surface hover:bg-md3-surface-container-high'
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
                    <Zap className="w-4 h-4 text-md3-primary" />
                    <label className="md3-body-medium font-medium text-md3-on-surface">Auto-optimize Media</label>
                  </div>
                  <button
                    onClick={() => setAutoOptimize(!autoOptimize)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      autoOptimize ? 'bg-md3-primary' : 'bg-md3-outline'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        autoOptimize ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="md3-body-small text-md3-on-surface-variant mt-1">
                  Automatically compress and optimize uploaded images
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-md3-outline-variant bg-md3-surface-container-low">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to full settings - you'd implement this based on your routing
                    window.location.hash = '#settings';
                  }}
                  className="md3-body-small"
                >
                  Full Settings
                </Button>
                <div className="md3-body-small text-md3-on-surface-variant flex items-center justify-end">
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