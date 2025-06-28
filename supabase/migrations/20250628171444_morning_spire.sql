/*
  # Remove Supabase Storage Configuration

  Since we're migrating to Cloudflare R2 for media storage, this migration removes
  the Supabase storage bucket and related policies that are no longer needed.

  ## Changes Made
  1. Remove storage bucket creation
  2. Remove storage policies for media files
  
  ## Notes
  - Media storage is now handled by Cloudflare R2
  - The media_library table remains for tracking uploaded files
*/

-- This migration removes Supabase storage configuration
-- since we're using Cloudflare R2 for media storage instead

-- Note: If the storage bucket and policies exist, they can be manually removed
-- from the Supabase dashboard if needed, but we won't force removal here
-- to avoid potential data loss

SELECT 1; -- Placeholder to make this a valid migration file