import { useState } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useSupabaseStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // We no longer use client-side credentials. We'll presign upload via the API.

  const uploadFile = async (file: File, folder: string = 'general'): Promise<string | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    if (!R2_BUCKET_NAME) {
      setError('R2 bucket name not configured');
      return null;
    }

    try {
      setUploading(true);
      setError(null);

      // Request a presigned URL from the server
      const res = await fetch('/api/storage/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type, folder, filename: file.name }),
      });
      if (!res.ok) throw new Error('Failed to get presigned URL');
      const { url, publicUrl } = await res.json() as { url: string; publicUrl: string };

      // Upload directly to R2 using the presigned URL
      await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });

      return publicUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      toast.error('Upload failed', { description: errorMessage });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleFiles = async (files: File[], folder: string = 'general'): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadFile(file, folder));
    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  };

  const deleteFile = async (url: string): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);

      const res = await fetch('/api/storage/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      return res.ok;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      setError(errorMessage);
      toast.error('Delete failed', { description: errorMessage });
      return false;
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
    error,
  };
}