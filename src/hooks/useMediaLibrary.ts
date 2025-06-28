import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useSupabaseStorage } from './useSupabaseStorage';
import { MediaOptimizer, OptimizedMedia } from '../utils/mediaOptimization';

export interface MediaLibraryItem {
  id: string;
  user_id: string;
  filename: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  optimized_size: number;
  compression_ratio: number;
  dimensions: { width: number; height: number };
  url: string;
  folder: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export function useMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { uploadFile, deleteFile } = useSupabaseStorage();

  const fetchMediaItems = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('media_library')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setMediaItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMediaItems();
  }, [fetchMediaItems]);

  const addMediaItem = async (
    file: File,
    folder: string = 'general',
    tags: string[] = []
  ): Promise<MediaLibraryItem | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      setUploading(true);
      setError(null);

      // Optimize the file first
      const optimized: OptimizedMedia = await MediaOptimizer.optimizeFile(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        maxSizeKB: file.type.startsWith('image/') ? 2048 : 10240
      });

      // Upload optimized file to storage
      const url = await uploadFile(optimized.file, folder);
      if (!url) throw new Error('Failed to upload file');

      // Save metadata to database
      const mediaData = {
        user_id: user.id,
        filename: optimized.file.name,
        original_filename: file.name,
        file_type: optimized.file.type,
        file_size: optimized.originalSize,
        optimized_size: optimized.optimizedSize,
        compression_ratio: optimized.compressionRatio,
        dimensions: optimized.dimensions,
        url,
        folder,
        tags
      };

      const { data, error: insertError } = await supabase
        .from('media_library')
        .insert(mediaData)
        .select()
        .single();

      if (insertError) throw insertError;

      setMediaItems(prev => [data, ...prev]);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add media';
      setError(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addMultipleMediaItems = async (
    files: File[],
    folder: string = 'general',
    tags: string[] = []
  ): Promise<MediaLibraryItem[]> => {
    const results: MediaLibraryItem[] = [];
    
    for (const file of files) {
      const result = await addMediaItem(file, folder, tags);
      if (result) {
        results.push(result);
      }
    }
    
    return results;
  };

  const deleteMediaItem = async (id: string): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);

      // Get the media item to delete the file from storage
      const mediaItem = mediaItems.find(item => item.id === id);
      if (!mediaItem) throw new Error('Media item not found');

      // Delete from storage
      await deleteFile(mediaItem.url);

      // Delete from database
      const { error: deleteError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setMediaItems(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete media';
      setError(errorMessage);
      return false;
    }
  };

  const updateMediaTags = async (id: string, tags: string[]): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('media_library')
        .update({ tags, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setMediaItems(prev => prev.map(item => item.id === id ? data : item));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update tags';
      setError(errorMessage);
      return false;
    }
  };

  const getMediaByFolder = (folder: string): MediaLibraryItem[] => {
    return mediaItems.filter(item => item.folder === folder);
  };

  const getMediaByTags = (tags: string[]): MediaLibraryItem[] => {
    return mediaItems.filter(item => 
      tags.some(tag => item.tags.includes(tag))
    );
  };

  const searchMedia = (query: string): MediaLibraryItem[] => {
    const lowercaseQuery = query.toLowerCase();
    return mediaItems.filter(item =>
      item.original_filename.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getTotalStorageUsed = (): number => {
    return mediaItems.reduce((total, item) => total + item.optimized_size, 0);
  };

  const getCompressionStats = () => {
    const totalOriginal = mediaItems.reduce((total, item) => total + item.file_size, 0);
    const totalOptimized = mediaItems.reduce((total, item) => total + item.optimized_size, 0);
    const totalSaved = totalOriginal - totalOptimized;
    const averageCompression = mediaItems.length > 0 
      ? mediaItems.reduce((total, item) => total + item.compression_ratio, 0) / mediaItems.length
      : 0;

    return {
      totalOriginal,
      totalOptimized,
      totalSaved,
      averageCompression
    };
  };

  return {
    mediaItems,
    loading,
    uploading,
    error,
    addMediaItem,
    addMultipleMediaItems,
    deleteMediaItem,
    updateMediaTags,
    getMediaByFolder,
    getMediaByTags,
    searchMedia,
    getTotalStorageUsed,
    getCompressionStats,
    refetch: fetchMediaItems,
  };
}