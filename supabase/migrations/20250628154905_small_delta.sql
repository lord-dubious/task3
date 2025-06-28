/*
  # Create Storage Bucket for Tweet Media

  1. Storage Setup
    - Create `tweet-media` bucket for storing images and videos
    - Set up RLS policies for secure access

  2. Security
    - Users can only upload to their own folder
    - Users can read their own uploaded files
    - Public read access for posted media
*/

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('tweet-media', 'tweet-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload their own media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'tweet-media' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can read their own media"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'tweet-media' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Public can read posted media"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'tweet-media');

CREATE POLICY "Users can update their own media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'tweet-media' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'tweet-media' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );