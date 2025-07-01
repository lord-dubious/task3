import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Calendar, Sparkles, RefreshCw, Bot, Eye } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { MediaUpload } from './MediaUpload';
import { InlineSchedulePicker } from './InlineSchedulePicker';
import { useAI } from '../../hooks/useAI';
import { useAgents } from '../../hooks/useAgents';
import { useSupabaseStorage } from '../../hooks/useSupabaseStorage';
import { useNotifications } from '../../hooks/useNotifications';
import { MediaFile, Agent } from '../../types';

export function TweetComposer() {
  const [content, setContent] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [mediaAnalysis, setMediaAnalysis] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState<string | null>(null);
  
  const { generateTweet, improveTweet, analyzeMedia, isLoading, error } = useAI();
  const { agents } = useAgents();
  const { uploadMultipleFiles, uploading } = useSupabaseStorage();
  const { showSuccess, showError, showWarning } = useNotifications();

  const characterCount = content.length;
  const maxCharacters = 280;
  const isOverLimit = characterCount > maxCharacters;

  const buildAgentPrompt = (basePrompt: string, agent: Agent) => {
    let enhancedPrompt = basePrompt;
    
    if (agent.system_prompt) {
      enhancedPrompt = `${agent.system_prompt}\n\n${enhancedPrompt}`;
    }
    
    if (agent.bio && agent.bio.length > 0) {
      enhancedPrompt += `\n\nPersonality Bio:\n${agent.bio.join('\n')}`;
    }
    
    if (agent.topics && agent.topics.length > 0) {
      enhancedPrompt += `\n\nExpertise Topics: ${agent.topics.join(', ')}`;
    }
    
    if (agent.adjectives && agent.adjectives.length > 0) {
      enhancedPrompt += `\n\nPersonality Traits: ${agent.adjectives.join(', ')}`;
    }
    
    if (agent.style_config?.post && agent.style_config.post.length > 0) {
      enhancedPrompt += `\n\nPost Style Guidelines:\n${agent.style_config.post.join('\n')}`;
    }
    
    if (agent.post_examples && agent.post_examples.length > 0) {
      enhancedPrompt += `\n\nExample Posts:\n${agent.post_examples.slice(0, 3).join('\n')}`;
    }
    
    return enhancedPrompt;
  };

  const handleAnalyzeMedia = async () => {
    if (mediaFiles.length === 0) return;
    
    const apiKey = JSON.parse(localStorage.getItem('googleAI_apiKey') || '""');
    if (!apiKey) {
      showError('API Key Required', 'Please set your Google AI API key in settings first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analyses = await analyzeMedia(mediaFiles, apiKey);
      setMediaAnalysis(analyses);
    } catch (error) {
      console.error('Failed to analyze media:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAIGenerate = async () => {
    const apiKey = JSON.parse(localStorage.getItem('googleAI_apiKey') || '""');
    if (!apiKey) {
      showError('API Key Required', 'Please set your Google AI API key in settings first');
      return;
    }

    let prompt = aiPrompt;
    if (selectedAgent) {
      prompt = buildAgentPrompt(aiPrompt, selectedAgent);
    }

    const generatedContent = await generateTweet(prompt, undefined, selectedAgent, mediaFiles);
    if (generatedContent) {
      setContent(generatedContent);
    }
  };

  const handleAIImprove = async () => {
    if (!content.trim()) return;
    
    const apiKey = JSON.parse(localStorage.getItem('googleAI_apiKey') || '""');
    if (!apiKey) {
      showError('API Key Required', 'Please set your Google AI API key in settings first');
      return;
    }

    let improvementPrompt = 'Make it more engaging and viral';
    if (selectedAgent) {
      improvementPrompt = buildAgentPrompt(improvementPrompt, selectedAgent);
    }

    const improvedContent = await improveTweet(content, improvementPrompt, apiKey, undefined, selectedAgent, mediaFiles);
    if (improvedContent) {
      setContent(improvedContent);
    }
  };

  const handleMediaAdd = (files: File[]) => {
    const newMediaFiles: MediaFile[] = files.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      size: file.size,
      uploaded: false
    }));
    
    setMediaFiles(prev => [...prev, ...newMediaFiles]);
    setMediaAnalysis([]); // Clear previous analysis when new media is added
  };

  const handleMediaRemove = (id: string) => {
    setMediaFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
    setMediaAnalysis([]); // Clear analysis when media is removed
  };

  const handleTweet = async () => {
    if (!content.trim() || isOverLimit) return;

    try {
      // Upload media files if any
      let mediaUrls: string[] = [];
      if (mediaFiles.length > 0) {
        const files = mediaFiles.map(mf => mf.file);
        mediaUrls = await uploadMultipleFiles(files, 'tweets');
        
        // Update media files status
        setMediaFiles(prev => prev.map(mf => ({ ...mf, uploaded: true })));
      }

      // Here you would typically save the tweet to your database
      // and potentially schedule it or post it immediately
      console.log('Tweet data:', {
        content,
        mediaUrls,
        agentId: selectedAgent?.id,
        scheduledFor: null
      });

      // Reset form
      setContent('');
      setMediaFiles([]);
      setAiPrompt('');
      setMediaAnalysis([]);
      
      showSuccess('Tweet saved', 'Your tweet has been saved successfully');
    } catch (error) {
      showError('Failed to save tweet', 'Please try again');
    }
  };

  const handleScheduleTweet = async (scheduleData: {
    scheduledFor: string | null;
    twitterAccountId?: string;
    agentId?: string;
  }) => {
    if (!content.trim() || isOverLimit) return;

    try {
      // Upload media files if any
      let mediaUrls: string[] = [];
      if (mediaFiles.length > 0) {
        const files = mediaFiles.map(mf => mf.file);
        mediaUrls = await uploadMultipleFiles(files, 'tweets');
        
        // Update media files status
        setMediaFiles(prev => prev.map(mf => ({ ...mf, uploaded: true })));
      }

      // Here you would save the scheduled tweet to your database
      console.log('Scheduled tweet data:', {
        content,
        mediaUrls,
        scheduledFor: scheduleData.scheduledFor || scheduledDateTime,
        agentId: scheduleData.agentId || selectedAgent?.id,
        twitterAccountId: scheduleData.twitterAccountId,
      });

      // Reset form
      setContent('');
      setMediaFiles([]);
      setAiPrompt('');
      setMediaAnalysis([]);
      setShowSchedulePicker(false);
      setScheduledDateTime(null);
      
      if (scheduleData.scheduledFor || scheduledDateTime) {
        showSuccess('Tweet scheduled', 'Your tweet has been scheduled successfully');
      } else {
        showSuccess('Tweet saved', 'Your tweet has been saved as a draft');
      }
    } catch (error) {
      showError('Failed to schedule tweet', 'Please try again');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Compose Tweet</h2>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className={`text-xs sm:text-sm ${
                isOverLimit ? 'text-red-400' : 'text-gray-400'
              }`}>
                {characterCount}/{maxCharacters}
              </span>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 relative ${
                isOverLimit ? 'border-red-400' : 'border-purple-500'
              }`}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className={isOverLimit ? 'text-red-400' : 'text-purple-500'}
                    strokeDasharray={`${Math.min((characterCount / maxCharacters) * 87.96, 87.96)} 87.96`}
                  />
                </svg>
              </div>
            </div>
          </div>

          <TextareaAutosize
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-white text-base sm:text-lg placeholder-gray-400 resize-none border-none outline-none"
            minRows={3}
            maxRows={8}
          />

          {showMediaUpload && (
            <MediaUpload
              mediaFiles={mediaFiles}
              onMediaAdd={handleMediaAdd}
              onMediaRemove={handleMediaRemove}
            />
          )}

          {/* Inline Schedule Picker */}
          {showSchedulePicker && (
            <InlineSchedulePicker
              scheduledDateTime={scheduledDateTime}
              onScheduleChange={setScheduledDateTime}
              onClose={() => setShowSchedulePicker(false)}
            />
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-700 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMediaUpload(!showMediaUpload)}
                className={showMediaUpload ? 'text-purple-400' : ''}
              >
                <Image className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSchedulePicker(!showSchedulePicker)}
                className={showSchedulePicker ? 'text-purple-400' : ''}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              {scheduledDateTime && (
                <div className="text-xs text-purple-400 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(scheduledDateTime).toLocaleDateString()} at{' '}
                    {new Date(scheduledDateTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAIImprove}
                disabled={!content.trim() || isLoading}
                className="text-xs sm:text-sm"
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Improve
              </Button>
              <Button 
                variant="primary" 
                disabled={!content.trim() || isOverLimit || uploading}
                onClick={() => {
                  if (scheduledDateTime) {
                    handleScheduleTweet({ scheduledFor: scheduledDateTime });
                  } else {
                    handleTweet();
                  }
                }}
                isLoading={uploading}
                size="sm"
                className="text-xs sm:text-sm"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                {scheduledDateTime ? 'Schedule' : 'Tweet'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">AI Assistant</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Agent Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                AI Agent
              </label>
              <select
                value={selectedAgent?.id || ''}
                onChange={(e) => {
                  const agent = agents.find(a => a.id === e.target.value);
                  setSelectedAgent(agent || null);
                }}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="">No agent (default)</option>
                {agents.filter(a => a.enabled).map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              {selectedAgent && (
                <div className="mt-2 p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-purple-300 text-xs sm:text-sm font-medium">
                      {selectedAgent.name}
                    </span>
                  </div>
                  {selectedAgent.system_prompt && (
                    <p className="text-purple-200 text-xs mt-1 line-clamp-2">
                      {selectedAgent.system_prompt}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-purple-300">
                    ✨ This agent has its own personality and tone - no manual tone selection needed
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mediaFiles.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-800/50 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-xs sm:text-sm text-gray-300">
                      AI can analyze your media to create better content
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAnalyzeMedia}
                    disabled={isAnalyzing}
                    isLoading={isAnalyzing}
                    className="text-xs"
                  >
                    Analyze Media
                  </Button>
                </div>
              )}
              
              {mediaAnalysis.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 sm:p-4"
                >
                  <h4 className="text-purple-300 font-medium mb-2 flex items-center text-sm">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Media Analysis
                  </h4>
                  <div className="space-y-2">
                    {mediaAnalysis.map((analysis, index) => (
                      <div key={index} className="text-xs sm:text-sm text-purple-200 bg-purple-500/10 rounded p-2">
                        <span className="font-medium">Media {index + 1}:</span> {analysis}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  What should I tweet about?
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder={selectedAgent 
                      ? `Ask ${selectedAgent.name} to tweet about...` 
                      : "e.g., Latest React features, productivity tips... (Select an agent above for personalized content)"
                    }
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:border-purple-500 focus:outline-none"
                  />
                  <Button 
                    onClick={handleAIGenerate}
                    disabled={!aiPrompt.trim() || isLoading}
                    isLoading={isLoading}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    {selectedAgent ? `Ask ${selectedAgent.name}` : 'Generate'}
                  </Button>
                </div>
              </div>
            </div>

            {!selectedAgent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3"
              >
                <div className="flex items-center space-x-2">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <p className="text-blue-300 text-xs sm:text-sm">
                    <strong>Tip:</strong> Select an AI agent above to get personalized content with their unique personality, tone, and expertise!
                  </p>
                </div>
              </motion.div>
            )}

            {mediaFiles.length > 0 && mediaAnalysis.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3"
              >
                <div className="flex items-center space-x-2">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <p className="text-blue-300 text-xs sm:text-sm">
                    <strong>Tip:</strong> Analyze your media first to generate content that references your images/videos!
                  </p>
                </div>
              </motion.div>
            )}
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
              >
                <p className="text-red-300 text-xs sm:text-sm">{error}</p>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}