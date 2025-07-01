/*
  # Storage bucket setup for media files

  1. Storage Configuration
    - Create 'tweet-media' bucket for storing user media files
    - Enable public access for media serving
  
  2. Security Policies
    - Users can only upload to their own folder
    - Users can only view their own media files
    - Users can update/delete their own media files
    - Folder structure: bucket/user_id/filename
*/

-- Create storage bucket for media files (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('tweet-media', 'tweet-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for user media access
CREATE POLICY "Users can upload their own media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'tweet-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own media"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'tweet-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'tweet-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'tweet-media' AND auth.uid()::text = (storage.foldername(name))[1]);