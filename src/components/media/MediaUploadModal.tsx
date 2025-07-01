import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FolderOpen, Tag, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { MediaLibraryItem } from '../../hooks/useMediaLibrary';
import { MediaOptimizer, OptimizedMedia } from '../../utils/mediaOptimization';
import { useNotifications } from '../../hooks/useNotifications';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], folder: string, tags: string[]) => Promise<MediaLibraryItem[]>;
  isUploading: boolean;
}

export function MediaUploadModal({
  isOpen,
  onClose,
  onUpload,
  isUploading
}: MediaUploadModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [folder, setFolder] = useState('general');
  const [tags, setTags] = useState('');
  const [optimizationPreviews, setOptimizationPreviews] = useState<OptimizedMedia[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useNotifications();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    
    // Show optimization preview
    setIsOptimizing(true);
    try {
      const previews: OptimizedMedia[] = [];
      for (const file of fileArray) {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          const optimized = await MediaOptimizer.optimizeFile(file, {
            maxWidth: 1920,
            maxHeight: 1080,
            quality: 0.85,
            maxSizeKB: file.type.startsWith('image/') ? 2048 : 10240
          });
          previews.push(optimized);
        }
      }
      setOptimizationPreviews(previews);
    } catch (error) {
      showError('Optimization failed', 'Some files could not be optimized');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    try {
      await onUpload(selectedFiles, folder, tagArray);
      
      showSuccess('Upload complete', `${selectedFiles.length} file(s) uploaded successfully`);
      
      // Reset form
      setSelectedFiles([]);
      setOptimizationPreviews([]);
      setTags('');
      setFolder('general');
      onClose();
    } catch (error) {
      showError('Upload failed', 'Some files could not be uploaded');
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setOptimizationPreviews(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Upload Media</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer mb-6
              ${dragOver 
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-gray-600 hover:border-purple-500/50'
              }
            `}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-gray-500 text-sm">
              Images and videos will be automatically optimized
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          {/* Upload Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Folder
              </label>
              <Select
                value={folder}
                onValueChange={setFolder}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="tweets">Tweets</SelectItem>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="banners">Banners</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              label="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="social, marketing, brand"
              leftIcon={<Tag className="w-4 h-4" />}
            />
          </div>

          {/* File Previews */}
          {selectedFiles.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Zap className="w-5 h-5 text-green-400 mr-2" />
                Optimization Preview
              </h3>
              
              {isOptimizing ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Optimizing files...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedFiles.map((file, index) => {
                    const preview = optimizationPreviews[index];
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                            {file.type.startsWith('image/') ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs">VIDEO</div>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium truncate max-w-xs">
                              {file.name}
                            </p>
                            {preview && (
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>
                                  {MediaOptimizer.formatFileSize(preview.originalSize)} → {MediaOptimizer.formatFileSize(preview.optimizedSize)}
                                </span>
                                <span className="text-green-400">
                                  -{preview.compressionRatio.toFixed(1)}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              {optimizationPreviews.length > 0 && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium">Optimization Summary</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Original Size: </span>
                      <span className="text-white">
                        {MediaOptimizer.formatFileSize(
                          optimizationPreviews.reduce((sum, p) => sum + p.originalSize, 0)
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Optimized Size: </span>
                      <span className="text-white">
                        {MediaOptimizer.formatFileSize(
                          optimizationPreviews.reduce((sum, p) => sum + p.optimizedSize, 0)
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Space Saved: </span>
                      <span className="text-green-400">
                        {MediaOptimizer.formatFileSize(
                          optimizationPreviews.reduce((sum, p) => sum + (p.originalSize - p.optimizedSize), 0)
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Compression: </span>
                      <span className="text-green-400">
                        {(optimizationPreviews.reduce((sum, p) => sum + p.compressionRatio, 0) / optimizationPreviews.length).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading || isOptimizing}
              isLoading={isUploading}
              leftIcon={<Upload className="w-4 h-4" />}
            >
              Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}