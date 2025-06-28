/*
  # Update user_settings table structure

  1. Changes
    - Ensure google_ai_api_key column exists and is properly configured
    - Add updated_at trigger if not exists
    - Update RLS policies for proper access control

  2. Security
    - Maintain RLS policies for user data isolation
    - Ensure users can only access their own settings
*/

-- Ensure the user_settings table has the correct structure
DO $$
BEGIN
  -- Check if google_ai_api_key column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings' AND column_name = 'google_ai_api_key'
  ) THEN
    ALTER TABLE user_settings ADD COLUMN google_ai_api_key text;
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Update RLS policies to ensure proper access control
DROP POLICY IF EXISTS "Users can read own settings" ON user_settings;
CREATE POLICY "Users can read own settings"
  ON user_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;
CREATE POLICY "Users can insert own settings"
  ON user_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
CREATE POLICY "Users can update own settings"
  ON user_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Ensure updated_at trigger exists
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS user_settings_updated_at ON user_settings;
CREATE TRIGGER user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();