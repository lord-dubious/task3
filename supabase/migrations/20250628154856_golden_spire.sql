/*
  # Create AI Agents Table

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `name` (text, required)
      - `username` (text, optional)
      - `system_prompt` (text, optional)
      - `bio` (text array, optional)
      - `lore` (text array, optional)
      - `message_examples` (jsonb, optional)
      - `post_examples` (text array, optional)
      - `adjectives` (text array, optional)
      - `topics` (text array, optional)
      - `style_config` (jsonb, optional)
      - `enabled` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for authenticated users to manage their own agents

  3. Indexes
    - Add index on user_id for efficient queries
    - Add index on enabled status
*/

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  username text,
  system_prompt text,
  bio text[],
  lore text[],
  message_examples jsonb,
  post_examples text[],
  adjectives text[],
  topics text[],
  style_config jsonb,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own agents"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own agents"
  ON agents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_enabled ON agents(enabled);
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();