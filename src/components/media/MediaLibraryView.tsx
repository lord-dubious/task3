import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Trash2, 
  Tag, 
  Download,
  Image as ImageIcon,
  Video,
  FolderOpen,
  BarChart3,
  Plus,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { MediaLibraryGrid } from './MediaLibraryGrid';
import { MediaUploadModal } from './MediaUploadModal';
import { MediaStatsCard } from './MediaStatsCard';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';
import { MediaOptimizer } from '../../utils/mediaOptimization';

export function MediaLibraryView() {
  const {
    mediaItems,
    loading,
    uploading,
    error,
    addMultipleMediaItems,
    deleteMediaItem,
    updateMediaTags,
    searchMedia,
    getMediaByFolder,
    getTotalStorageUsed,
    getCompressionStats
  } = useMediaLibrary();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = React.useMemo(() => {
    let items = mediaItems;

    if (searchQuery) {
      items = searchMedia(searchQuery);
    }

    if (selectedFolder !== 'all') {
      items = getMediaByFolder(selectedFolder);
    }

    return items;
  }, [mediaItems, searchQuery, selectedFolder, searchMedia, getMediaByFolder]);

  const folders = React.useMemo(() => {
    const folderSet = new Set(mediaItems.map(item => item.folder));
    return Array.from(folderSet);
  }, [mediaItems]);

  const stats = getCompressionStats();

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    if (confirm(`Delete ${selectedItems.length} selected items?`)) {
      for (const id of selectedItems) {
        await deleteMediaItem(id);
      }
      setSelectedItems([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Media Library</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Manage your uploaded media files with automatic optimization
          </p>
        </div>
        <Button
          onClick={() => setShowUploadModal(true)}
          leftIcon={<Upload className="w-3 h-3 sm:w-4 sm:h-4" />}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Upload Media
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <MediaStatsCard
          title="Total Files"
          value={mediaItems.length}
          icon={ImageIcon}
          gradient="from-blue-500 to-blue-700"
        />
        <MediaStatsCard
          title="Storage Used"
          value={MediaOptimizer.formatFileSize(getTotalStorageUsed())}
          icon={BarChart3}
          gradient="from-green-500 to-green-700"
        />
        <MediaStatsCard
          title="Space Saved"
          value={MediaOptimizer.formatFileSize(stats.totalSaved)}
          icon={Download}
          gradient="from-purple-500 to-purple-700"
        />
        <MediaStatsCard
          title="Avg Compression"
          value={`${stats.averageCompression.toFixed(1)}%`}
          icon={BarChart3}
          gradient="from-orange-500 to-orange-700"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3 h-3 sm:w-4 sm:h-4" />}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Folders</option>
              {folders.map(folder => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </select>

            <div className="flex items-center border border-gray-600 rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none border-r border-gray-600"
              >
                <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg space-y-2 sm:space-y-0">
            <span className="text-purple-300 text-sm">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs sm:text-sm"
              >
                {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleBulkDelete}
                leftIcon={<Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                className="text-xs sm:text-sm"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="aspect-square bg-gray-800"></Card>
            </div>
          ))}
        </div>
      ) : (
        <MediaLibraryGrid
          items={filteredItems}
          viewMode={viewMode}
          selectedItems={selectedItems}
          onSelectItem={(id) => {
            setSelectedItems(prev => 
              prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
            );
          }}
          onDeleteItem={deleteMediaItem}
          onUpdateTags={updateMediaTags}
        />
      )}

      {/* Upload Modal */}
      <MediaUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={addMultipleMediaItems}
        isUploading={uploading}
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
        >
          <p className="text-red-300 text-sm">{error}</p>
        </motion.div>
      )}
    </div>
  );
}