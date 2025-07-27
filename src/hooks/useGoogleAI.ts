import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { toast } from 'sonner';
import { useLocalStorage } from './useLocalStorage';

export interface GoogleAIModel {
  name: string;
  displayName: string;
  description?: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  supportedGenerationMethods?: string[];
}

export function useGoogleAI() {
  const [models, setModels] = useState<GoogleAIModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedKey, setLastFetchedKey] = useState<string>('');

  const fetchAvailableModels = useCallback(async (apiKey: string) => {
    if (!apiKey || apiKey === lastFetchedKey) {
      setError('API key is required');
      return [];
    }

    setIsLoadingModels(true);
    setError(null);

    try {
      const genAI = new GoogleGenAI({ apiKey });
      
      // Fetch available models
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Filter and format models that support generateContent
      const availableModels: GoogleAIModel[] = data.models
        .filter((model: { name: string; supportedGenerationMethods?: string[] }) => 
          model.supportedGenerationMethods?.includes('generateContent') &&
          !model.name.includes('embedding') // Exclude embedding models
        )
        .map((model: { name: string; displayName?: string; description?: string; inputTokenLimit?: number; outputTokenLimit?: number; supportedGenerationMethods?: string[] }) => ({
          name: model.name.replace('models/', ''), // Remove 'models/' prefix
          displayName: model.displayName || model.name.replace('models/', ''),
          description: model.description,
          inputTokenLimit: model.inputTokenLimit,
          outputTokenLimit: model.outputTokenLimit,
          supportedGenerationMethods: model.supportedGenerationMethods
        }))
        .sort((a: GoogleAIModel, b: GoogleAIModel) => a.displayName.localeCompare(b.displayName));

      setModels(availableModels);
      setLastFetchedKey(apiKey);
      return availableModels;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch models';
      setError(errorMessage);
      toast.warning('Model fetch failed', { description: 'Using fallback models' });
      
      // Return fallback models if API fails
      const fallbackModels: GoogleAIModel[] = [
        {
          name: 'gemini-1.5-flash',
          displayName: 'Gemini 1.5 Flash',
          description: 'Fast and versatile performance across a diverse variety of tasks'
        },
        {
          name: 'gemini-1.5-pro',
          displayName: 'Gemini 1.5 Pro',
          description: 'Complex reasoning tasks requiring more intelligence'
        },
        {
          name: 'gemini-pro',
          displayName: 'Gemini Pro',
          description: 'Best for text-only prompts'
        }
      ];
      
      setModels(fallbackModels);
      return fallbackModels;
    } finally {
      setIsLoadingModels(false);
    }
  }, [lastFetchedKey]);

  const validateApiKey = useCallback(async (apiKey: string) => {
    if (!apiKey) return false;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  return {
    models,
    isLoadingModels,
    error,
    fetchAvailableModels,
    validateApiKey
  };
}
