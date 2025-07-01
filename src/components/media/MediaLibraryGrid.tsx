import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Video, 
  Trash2, 
  Tag, 
  Download, 
  Eye,
  Calendar,
  HardDrive,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { MediaLibraryItem } from '../../hooks/useMediaLibrary';
import { MediaOptimizer } from '../../utils/mediaOptimization';
import { format } from 'date-fns';

interface MediaLibraryGridProps {
  items: MediaLibraryItem[];
  viewMode: 'grid' | 'list';
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
}

export function MediaLibraryGrid({
  items,
  viewMode,
  selectedItems,
  onSelectItem,
  onDeleteItem,
  onUpdateTags
}: MediaLibraryGridProps) {
  const [editingTags, setEditingTags] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  const handleTagEdit = (item: MediaLibraryItem) => {
    setEditingTags(item.id);
    setTagInput(item.tags.join(', '));
  };

  const handleTagSave = async (id: string) => {
    const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    await onUpdateTags(id, tags);
    setEditingTags(null);
    setTagInput('');
  };

  const handleTagCancel = () => {
    setEditingTags(null);
    setTagInput('');
  };

  const handleDownload = (item: MediaLibraryItem) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.original_filename;
    link.click();
  };

  if (items.length === 0) {
    return (
      <Card className="p-8 sm:p-12 text-center">
        <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Media Files</h3>
        <p className="text-sm sm:text-base text-gray-400">
          Upload your first media file to get started with the library.
        </p>
      </Card>
    );
  }

  if (viewMode === 'list') {
    return (
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length}
                    onChange={() => {
                      if (selectedItems.length === items.length) {
                        items.forEach(item => onSelectItem(item.id));
                      } else {
                        items.forEach(item => {
                          if (!selectedItems.includes(item.id)) {
                            onSelectItem(item.id);
                          }
                        });
                      }
                    }}
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Preview</th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Name</th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Size</th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Compression</th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Tags</th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Date</th>
                <th className="text-left p-2 sm:p-3 text-xs sm:text-sm text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-800 hover:bg-gray-800/50 ${
                    selectedItems.includes(item.id) ? 'bg-purple-500/10' : ''
                  }`}
                >
                  <td className="p-2 sm:p-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => onSelectItem(item.id)}
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                  </td>
                  <td className="p-2 sm:p-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                      {item.file_type.startsWith('image/') ? (
                        <img
                          src={item.url}
                          alt={item.original_filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Video className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    <div>
                      <p className="text-white font-medium truncate max-w-xs text-xs sm:text-sm">
                        {item.original_filename}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.dimensions.width}×{item.dimensions.height}
                      </p>
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    <div>
                      <p className="text-white text-xs sm:text-sm">
                        {MediaOptimizer.formatFileSize(item.optimized_size)}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Original: {MediaOptimizer.formatFileSize(item.file_size)}
                      </p>
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      <span className="text-green-400 font-medium text-xs sm:text-sm">
                        {item.compression_ratio.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    {editingTags === item.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs"
                          placeholder="tag1, tag2, tag3"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleTagSave(item.id)}
                          className="text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleTagCancel}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTagEdit(item)}
                        >
                          <Tag className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </td>
                  <td className="p-2 sm:p-3">
                    <p className="text-gray-400 text-xs">
                      {format(new Date(item.created_at), 'MMM d, yyyy')}
                    </p>
                  </td>
                  <td className="p-2 sm:p-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteItem(item.id)}
                        className="text-red-400"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            className={`relative group cursor-pointer transition-all duration-200 ${
              selectedItems.includes(item.id)
                ? 'border-purple-500 bg-purple-500/10'
                : 'hover:border-purple-500/50'
            }`}
            onClick={() => onSelectItem(item.id)}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => onSelectItem(item.id)}
                className="w-3 h-3 sm:w-4 sm:h-4"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Media Preview */}
            <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-800">
              {item.file_type.startsWith('image/') ? (
                <img
                  src={item.url}
                  alt={item.original_filename}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                </div>
              )}

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.url, '_blank');
                  }}
                  className="bg-black/50"
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(item);
                  }}
                  className="bg-black/50"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.id);
                  }}
                  className="bg-black/50 text-red-400"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              {/* Compression Badge */}
              {item.compression_ratio > 0 && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{item.compression_ratio.toFixed(0)}%</span>
                </div>
              )}
            </div>

            {/* Media Info */}
            <div className="p-3 sm:p-4">
              <h3 className="text-white font-medium truncate mb-1 text-sm">
                {item.original_filename}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>{MediaOptimizer.formatFileSize(item.optimized_size)}</span>
                <span>{item.dimensions.width}×{item.dimensions.height}</span>
              </div>

              {/* Tags */}
              {editingTags === item.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs"
                    placeholder="tag1, tag2, tag3"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagSave(item.id);
                      }}
                      className="text-xs"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagCancel();
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                      +{item.tags.length - 2}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagEdit(item);
                    }}
                    className="p-1"
                  >
                    <Tag className="w-3 h-3" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{format(new Date(item.created_at), 'MMM d')}</span>
                <span>{item.folder}</span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}