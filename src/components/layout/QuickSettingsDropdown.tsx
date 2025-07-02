import React, { useState, useRef, useEffect } from 'react';
import { Settings, Bot, Zap, Palette, Monitor, Moon, Sun, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useGoogleAI } from '../../hooks/useGoogleAI';
import { useAuth } from '../../hooks/useAuth';

export function QuickSettingsDropdown() {
  const dropdownRef = useRef(null);
  const [selectedModel, setSelectedModel] = useLocalStorage('googleAI_selectedModel', 'gemini-1.5-flash');
  const [googleAIKey, setGoogleAIKey] = useLocalStorage('googleAI_apiKey', '');
  const [theme, setTheme] = useLocalStorage('app_theme', 'dark');
  const [autoOptimize, setAutoOptimize] = useLocalStorage('auto_optimize_media', true);

  const { models, fetchAvailableModels, isLoadingModels } = useGoogleAI();
  const { user } = useAuth();

  // Fetch models when component mounts or API key changes
  useEffect(() => {
    if (googleAIKey && models.length === 0) {
      fetchAvailableModels(googleAIKey);
    }
  }, [googleAIKey, models.length, fetchAvailableModels]);

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <Settings className="w-5 h-5" />
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-72 sm:w-80">
          <DropdownMenuLabel className="flex items-center">
            <Zap className="w-4 h-4 mr-2 text-purple-400" />
            Quick Settings
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {/* AI Model Selection */}
          <div className="p-3 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <label className="text-sm font-medium text-gray-200">AI Model</label>
              </div>
              <Select value={selectedModel} onValueChange={handleModelChange} disabled={isLoadingModels}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.name} value={model.name}>
                      {model.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!googleAIKey && (
                <p className="text-xs text-yellow-400">
                  ⚠️ Set API key in settings to load all models
                </p>
              )}
            </div>
            
            {/* Theme Selection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <label className="text-sm font-medium text-gray-200">Auto-optimize Media</label>
                </div>
                <Switch
                  checked={autoOptimize}
                  onCheckedChange={setAutoOptimize}
                />
              </div>
              <p className="text-xs text-gray-500">
                Automatically compress and optimize uploaded images
              </p>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <div className="p-2">
            <DropdownMenuItem className="text-xs text-gray-400 justify-center">
              v1.0.0
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}