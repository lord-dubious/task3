import { useState } from 'react';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useSupabaseStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Initialize S3 Client for Cloudflare R2
  const s3Client = new S3Client({
    region: 'auto', // R2 does not use AWS regions, 'auto' is a common placeholder
    endpoint: import.meta.env.VITE_CLOUDFLARE_R2_ENDPOINT,
    credentials: {
      accessKeyId: import.meta.env.VITE_CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true, // Required for R2 compatibility
  });

  const R2_BUCKET_NAME = import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_NAME;

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

      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload file to Cloudflare R2
      const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
        CacheControl: 'public, max-age=31536000', // 1 year cache
      });

      await s3Client.send(command);

      // Construct the public URL for the uploaded file
      const publicUrl = `${import.meta.env.VITE_CLOUDFLARE_R2_ENDPOINT}/${R2_BUCKET_NAME}/${fileName}`;
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

    if (!R2_BUCKET_NAME) {
      setError('R2 bucket name not configured');
      return false;
    }

    try {
      setError(null);

      // Extract the key (path) from the URL
      // URL format: https://<endpoint>/<bucket_name>/<user_id>/<folder>/<filename>
      const urlParts = url.split('/');
      const bucketIndex = urlParts.findIndex(part => part === R2_BUCKET_NAME);
      
      if (bucketIndex === -1 || bucketIndex + 1 >= urlParts.length) {
        throw new Error('Invalid R2 URL format');
      }
      
      const key = urlParts.slice(bucketIndex + 1).join('/');

      const command = new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      });

      await s3Client.send(command);
      return true;
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