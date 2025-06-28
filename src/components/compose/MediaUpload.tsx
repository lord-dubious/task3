import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, X, Upload, AlertCircle, Zap, FolderOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { MediaFile } from '../../types';
import { MediaOptimizer, OptimizedMedia } from '../../utils/mediaOptimization';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';

interface MediaUploadProps {
  mediaFiles: MediaFile[];
  onMediaAdd: (files: File[]) => void;
  onMediaRemove: (id: string) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
}

export function MediaUpload({
  mediaFiles,
  onMediaAdd,
  onMediaRemove,
  maxFiles = 4,
  maxSizePerFile = 10
}: MediaUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mediaItems } = useMediaLibrary();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const fileArray = Array.from(files);
    
    // Validate file count
    if (mediaFiles.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file types and sizes
    setIsOptimizing(true);
    const validFiles: File[] = [];
    const optimizedFiles: File[] = [];
    
    for (const file of fileArray) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setError('Only image and video files are allowed');
        continue;
      }
      
      if (file.size > maxSizePerFile * 1024 * 1024) {
        setError(`File size must be less than ${maxSizePerFile}MB`);
        continue;
      }
      
      try {
        // Optimize the file
        const optimized = await MediaOptimizer.optimizeFile(file, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.85,
          maxSizeKB: file.type.startsWith('image/') ? 2048 : 10240
        });
        
        validFiles.push(file);
        optimizedFiles.push(optimized.file);
      } catch (optimizationError) {
        console.error('Failed to optimize file:', optimizationError);
        // Use original file if optimization fails
        validFiles.push(file);
        optimizedFiles.push(file);
      }
    }

    setIsOptimizing(false);
    
    if (optimizedFiles.length > 0) {
      onMediaAdd(optimizedFiles);
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

  const handleLibrarySelect = (item: any) => {
    // Convert library item to MediaFile format
    fetch(item.url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], item.original_filename, { type: item.file_type });
        onMediaAdd([file]);
        setShowLibrary(false);
      })
      .catch(error => {
        console.error('Failed to load media from library:', error);
        setError('Failed to load media from library');
      });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Library Browser */}
      {showLibrary && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-gray-600 rounded-lg p-4 bg-gray-800/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Media Library</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLibrary(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {mediaItems.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                onClick={() => handleLibrarySelect(item)}
              >
                {item.file_type.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.original_filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${dragOver 
            ? 'border-purple-500 bg-purple-500/10' 
            : 'border-gray-600 hover:border-purple-500/50'
          }
          ${mediaFiles.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => mediaFiles.length < maxFiles && fileInputRef.current?.click()}
      >
        {isOptimizing ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-purple-400 text-sm">Optimizing files...</p>
          </div>
        ) : (
          <>
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-400 text-sm">
          {mediaFiles.length >= maxFiles 
            ? `Maximum ${maxFiles} files reached`
            : 'Drop files here or click to upload'
          }
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Images and videos up to {maxSizePerFile}MB each
        </p>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLibrary(!showLibrary)}
          leftIcon={<FolderOpen className="w-4 h-4" />}
        >
          Browse Library
        </Button>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Zap className="w-3 h-3 text-green-400" />
          <span>Auto-optimization enabled</span>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4 text-red-400" />
          <p className="text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Media Preview */}
      <AnimatePresence>
        {mediaFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {mediaFiles.map((mediaFile) => (
              <motion.div
                key={mediaFile.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="aspect-video relative">
                  {mediaFile.type === 'image' ? (
                    <img
                      src={mediaFile.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Upload Status Overlay */}
                  {mediaFile.uploaded === false && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {mediaFile.type === 'image' ? (
                        <Image className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Video className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-white text-sm font-medium truncate">
                        {mediaFile.file.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMediaRemove(mediaFile.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    {formatFileSize(mediaFile.size)}
                    {mediaFile.file.size !== mediaFile.size && (
                      <span className="text-green-400 ml-2">
                        <Zap className="w-3 h-3 inline mr-1" />
                        Optimized
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}