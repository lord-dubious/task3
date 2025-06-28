import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useLocalStorage } from './useLocalStorage';
import { toast } from 'sonner';
import { Agent, MediaFile } from '../types';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel] = useLocalStorage('googleAI_selectedModel', 'gemini-2.5-flash');

  // Convert file to base64 for Google AI
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data:image/jpeg;base64, prefix
        resolve(base64.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Get MIME type for Google AI
  const getMimeType = (file: File): string => {
    return file.type;
  };

  // Analyze media content using Google AI Vision
  const analyzeMedia = async (
    mediaFiles: MediaFile[],
    apiKey: string,
    modelName?: string
  ): Promise<string[]> => {
    if (!apiKey || mediaFiles.length === 0) return [];

    if (!apiKey) {
      toast.error('API Key Required', { description: 'Please set your Google AI API key in settings' });
      return [];
    }

    try {
      const genAI = new GoogleGenAI({ apiKey });
      const modelToUse = modelName || selectedModel || 'gemini-1.5-flash';
      const model = genAI.getGenerativeModel({ model: modelToUse });

      const analyses: string[] = [];

      for (const mediaFile of mediaFiles) {
        if (mediaFile.type === 'image') {
          try {
            const base64Data = await fileToBase64(mediaFile.file);
            const mimeType = getMimeType(mediaFile.file);

            const result = await model.generateContentStream([
              {
                text: `Analyze this image and describe what you see. Focus on:
                - Main subjects and objects
                - Setting/location
                - Mood and atmosphere
                - Colors and lighting
                - Any text or branding visible
                - Overall composition and style
                
                Provide a detailed but concise description that could be used to generate a social media post.`
              },
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType
                }
              }
            ]);

            let description = '';
            for await (const chunk of result.stream) {
              description += chunk.text();
            }

            analyses.push(description);
          } catch (err) {
            console.error('Error analyzing image:', err);
            analyses.push(`Image: ${mediaFile.file.name} (analysis failed)`);
          }
        } else if (mediaFile.type === 'video') {
          // For videos, we'll provide a basic description since video analysis is more complex
          analyses.push(`Video: ${mediaFile.file.name} - ${(mediaFile.size / (1024 * 1024)).toFixed(1)}MB video file`);
        }
      }

      return analyses;
    } catch (err) {
      console.error('Error in media analysis:', err);
      return mediaFiles.map(mf => `${mf.type}: ${mf.file.name}`);
    }
  };

  const generateTweet = async (
    prompt: string, 
    apiKey?: string, 
    modelName?: string,
    agent?: Agent | null,
    mediaFiles?: MediaFile[]
  ) => {
    if (!apiKey) {
      toast.error('API Key Required', { description: 'Google AI API key is required' });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenAI({ apiKey });
      const modelToUse = modelName || selectedModel || 'gemini-1.5-flash';
      const model = genAI.getGenerativeModel({ model: modelToUse });

      // Analyze media if provided
      let mediaAnalyses: string[] = [];
      if (mediaFiles && mediaFiles.length > 0) {
        mediaAnalyses = await analyzeMedia(mediaFiles, apiKey, modelToUse);
      }

      let enhancedPrompt;
      
      if (agent) {
        // Use agent's personality and style
        enhancedPrompt = `
          Create a Twitter/X post with the following requirements:
          - Topic/Context: ${prompt}
          - Maximum 280 characters
          - Engaging and authentic
          - Include relevant hashtags if appropriate
          - Make it shareable and conversation-starting
          ${mediaAnalyses.length > 0 ? `\n          - Reference the attached media content described below` : ''}
          
          ${mediaAnalyses.length > 0 ? `\nMedia Content Analysis:\n${mediaAnalyses.map((analysis, i) => `${i + 1}. ${analysis}`).join('\n')}\n` : ''}
          
          Only return the tweet text, nothing else.
        `;
      } else {
        // Generic prompt without agent
        enhancedPrompt = `
          Create a Twitter/X post with the following requirements:
          - Topic/Context: ${prompt}
          - Tone: Professional and engaging
          - Maximum 280 characters
          - Engaging and authentic
          - Include relevant hashtags if appropriate
          - Make it shareable and conversation-starting
          ${mediaAnalyses.length > 0 ? `\n          - Reference the attached media content described below` : ''}
          
          ${mediaAnalyses.length > 0 ? `\nMedia Content Analysis:\n${mediaAnalyses.map((analysis, i) => `${i + 1}. ${analysis}`).join('\n')}\n` : ''}
          
          Only return the tweet text, nothing else.
        `;
      }

      // Enhance prompt with agent persona if provided
      if (agent) {
        let agentContext = '';
        
        if (agent.system_prompt) {
          agentContext += `Character: ${agent.system_prompt}\n`;
        }
        
        if (agent.bio && agent.bio.length > 0) {
          agentContext += `Bio: ${Array.isArray(agent.bio) ? agent.bio.join(' ') : agent.bio}\n`;
        }
        
        if (agent.adjectives && agent.adjectives.length > 0) {
          agentContext += `Personality traits: ${agent.adjectives.join(', ')}\n`;
        }
        
        if (agent.topics && agent.topics.length > 0) {
          agentContext += `Expertise areas: ${agent.topics.join(', ')}\n`;
        }
        
        if (agent.style_config?.post && agent.style_config.post.length > 0) {
          agentContext += `Style guidelines: ${agent.style_config.post.join(' ')}\n`;
        }
        
        if (agent.post_examples && agent.post_examples.length > 0) {
          agentContext += `Example posts:\n${agent.post_examples.slice(0, 2).join('\n')}\n`;
        }
        
        enhancedPrompt = `${agentContext}\n${enhancedPrompt}`;
      }

      // For multimodal input with images
      let content;
      if (mediaFiles && mediaFiles.some(mf => mf.type === 'image')) {
        const imageFiles = mediaFiles.filter(mf => mf.type === 'image');
        const parts = [{ text: enhancedPrompt }];
        
        for (const imageFile of imageFiles) {
          try {
            const base64Data = await fileToBase64(imageFile.file);
            const mimeType = getMimeType(imageFile.file);
            parts.push({
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            });
          } catch (err) {
            console.error('Error processing image for generation:', err);
          }
        }
        
        content = parts;
      } else {
        content = enhancedPrompt;
      }

      // Use streaming for real-time response
      const result = await model.generateContentStream(content);
      let text = '';
      
      for await (const chunk of result.stream) {
        text += chunk.text();
      }

      return text.trim();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate tweet';
      setError(errorMessage);
      toast.error('Generation Failed', { description: errorMessage });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const improveTweet = async (
    originalTweet: string, 
    improvement: string, 
    apiKey?: string, 
    modelName?: string,
    agent?: Agent | null,
    mediaFiles?: MediaFile[]
  ) => {
    if (!apiKey) {
      toast.error('API Key Required', { description: 'Google AI API key is required' });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenAI({ apiKey });
      const modelToUse = modelName || selectedModel || 'gemini-1.5-flash';
      const model = genAI.getGenerativeModel({ model: modelToUse });

      // Analyze media if provided
      let mediaAnalyses: string[] = [];
      if (mediaFiles && mediaFiles.length > 0) {
        mediaAnalyses = await analyzeMedia(mediaFiles, apiKey, modelToUse);
      }

      let prompt = `
        Improve this tweet based on the following request:
        
        Original tweet: "${originalTweet}"
        Improvement request: "${improvement}"
        ${mediaAnalyses.length > 0 ? `\nMedia Content: ${mediaAnalyses.join(' ')}\n` : ''}
        
        Requirements:
        - Keep it under 280 characters
        - Maintain the original message intent
        - Make it more engaging
        ${mediaAnalyses.length > 0 ? '- Consider the attached media content' : ''}
        - Only return the improved tweet text, nothing else
      `;

      // Enhance prompt with agent persona if provided
      if (agent) {
        let agentContext = '';
        
        if (agent.system_prompt) {
          agentContext += `Character: ${agent.system_prompt}\n`;
        }
        
        if (agent.style_config?.post && agent.style_config.post.length > 0) {
          agentContext += `Style guidelines: ${agent.style_config.post.join(' ')}\n`;
        }
        
        prompt = `${agentContext}\n${prompt}`;
      }

      // For multimodal input with images
      let content;
      if (mediaFiles && mediaFiles.some(mf => mf.type === 'image')) {
        const imageFiles = mediaFiles.filter(mf => mf.type === 'image');
        const parts = [{ text: prompt }];
        
        for (const imageFile of imageFiles) {
          try {
            const base64Data = await fileToBase64(imageFile.file);
            const mimeType = getMimeType(imageFile.file);
            parts.push({
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            });
          } catch (err) {
            console.error('Error processing image for improvement:', err);
          }
        }
        
        content = parts;
      } else {
        content = prompt;
      }

      // Use streaming for real-time response
      const result = await model.generateContentStream(content);
      let text = '';
      
      for await (const chunk of result.stream) {
        text += chunk.text();
      }

      return text.trim();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to improve tweet';
      setError(errorMessage);
      toast.error('Improvement Failed', { description: errorMessage });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateTweet,
    improveTweet,
    analyzeMedia,
    isLoading,
    error,
  };
}