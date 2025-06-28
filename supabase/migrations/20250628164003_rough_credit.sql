/*
  # Media Library Schema

  1. New Tables
    - `media_library`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `filename` (text, optimized filename)
      - `original_filename` (text, original filename)
      - `file_type` (text, MIME type)
      - `file_size` (bigint, original file size in bytes)
      - `optimized_size` (bigint, optimized file size in bytes)
      - `compression_ratio` (numeric, compression percentage)
      - `dimensions` (jsonb, width and height)
      - `url` (text, storage URL)
      - `folder` (text, organization folder)
      - `tags` (text[], searchable tags)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `media_library` table
    - Add policies for authenticated users to manage their own media

  3. Indexes
    - Index on user_id for fast user queries
    - Index on folder for folder-based filtering
    - Index on tags for tag-based searches
    - Index on created_at for chronological sorting
*/

-- Create media_library table
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  filename text NOT NULL,
  original_filename text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  optimized_size bigint NOT NULL DEFAULT 0,
  compression_ratio numeric(5,2) NOT NULL DEFAULT 0,
  dimensions jsonb DEFAULT '{"width": 0, "height": 0}',
  url text NOT NULL,
  folder text NOT NULL DEFAULT 'general',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own media"
  ON media_library
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own media"
  ON media_library
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own media"
  ON media_library
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own media"
  ON media_library
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_media_library_user_id 
  ON media_library(user_id);

CREATE INDEX IF NOT EXISTS idx_media_library_folder 
  ON media_library(folder);

CREATE INDEX IF NOT EXISTS idx_media_library_tags 
  ON media_library USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_media_library_created_at 
  ON media_library(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_media_library_file_type 
  ON media_library(file_type);

-- Create updated_at trigger
CREATE TRIGGER media_library_updated_at
  BEFORE UPDATE ON media_library
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create storage bucket for media files (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('tweet-media', 'tweet-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
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