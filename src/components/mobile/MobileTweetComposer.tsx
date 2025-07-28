import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Calendar, Sparkles, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

interface MobileTweetComposerProps {
  onClose?: () => void;
  onTweet?: (content: string) => void;
}

export function MobileTweetComposer({ onClose, onTweet }: MobileTweetComposerProps = {}) {
  const [content, setContent] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useAuth();

  const characterCount = content.length;
  const maxCharacters = 280;
  const isOverLimit = characterCount > maxCharacters;

  const handleTweet = () => {
    if (content.trim() && !isOverLimit && onTweet) {
      onTweet(content);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold text-white">New Tweet</h2>
        <Button
          size="sm"
          disabled={!content.trim() || isOverLimit}
          className="px-6"
          onClick={handleTweet}
        >
          Tweet
        </Button>
      </div>

      {/* Composer */}
      <div className="flex-1 p-4">
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          
          <div className="flex-1">
            <TextareaAutosize
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-white text-lg placeholder-gray-400 resize-none border-none outline-none"
              minRows={4}
              maxRows={12}
            />
          </div>
        </div>
      </div>

      {/* Character Count */}
      <div className="px-4 py-2 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setShowOptions(!showOptions)}>
              <Image className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${isOverLimit ? 'text-red-400' : 'text-gray-400'}`}>
              {characterCount}/{maxCharacters}
            </span>
            <div className={`w-8 h-8 rounded-full border-2 relative ${
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
      </div>

      {/* Options Panel */}
      {showOptions && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-700 p-4 bg-gray-900/50"
        >
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" className="justify-start">
              <Image className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
            <Button variant="secondary" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
