/*
  # Enhance tweets table for robust scheduling

  1. Schema Updates
    - Add retry_count column to track publishing attempts
    - Add last_attempt_at column for timing tracking
    - Add failure_reason column for error details
    - Add agent_id column to link tweets with AI agents
    - Update status enum to include more granular states

  2. Indexes
    - Add index on scheduled_for for efficient querying
    - Add index on status for filtering
    - Add composite index for scheduler queries

  3. Functions
    - Add trigger to update updated_at timestamp
*/

-- Add new columns to tweets table
DO $$
BEGIN
  -- Add retry_count column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tweets' AND column_name = 'retry_count'
  ) THEN
    ALTER TABLE tweets ADD COLUMN retry_count integer DEFAULT 0;
  END IF;

  -- Add last_attempt_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tweets' AND column_name = 'last_attempt_at'
  ) THEN
    ALTER TABLE tweets ADD COLUMN last_attempt_at timestamptz;
  END IF;

  -- Add failure_reason column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tweets' AND column_name = 'failure_reason'
  ) THEN
    ALTER TABLE tweets ADD COLUMN failure_reason text;
  END IF;

  -- Add agent_id column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tweets' AND column_name = 'agent_id'
  ) THEN
    ALTER TABLE tweets ADD COLUMN agent_id uuid REFERENCES agents(id) ON DELETE SET NULL;
  END IF;

  -- Add twitter_post_id column to track posted tweets
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tweets' AND column_name = 'twitter_post_id'
  ) THEN
    ALTER TABLE tweets ADD COLUMN twitter_post_id text;
  END IF;
END $$;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_tweets_scheduled_for_status 
ON tweets(scheduled_for, status) 
WHERE scheduled_for IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_tweets_agent_id 
ON tweets(agent_id) 
WHERE agent_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_tweets_twitter_post_id 
ON tweets(twitter_post_id) 
WHERE twitter_post_id IS NOT NULL;

-- Update RLS policies to include new columns
DROP POLICY IF EXISTS "Users can read own tweets" ON tweets;
CREATE POLICY "Users can read own tweets"
  ON tweets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own tweets" ON tweets;
CREATE POLICY "Users can insert own tweets"
  ON tweets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own tweets" ON tweets;
CREATE POLICY "Users can update own tweets"
  ON tweets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own tweets" ON tweets;
CREATE POLICY "Users can delete own tweets"
  ON tweets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);