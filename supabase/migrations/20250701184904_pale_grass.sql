/*
  # Setup Scheduled Tweet Processing with pg_cron

  1. Extensions
    - Enables pg_cron for scheduling tasks
    - Enables pg_net for making HTTP requests

  2. Cron Job
    - Creates a job that runs every 5 minutes
    - Calls the post-tweets Edge Function
    - Processes scheduled tweets automatically

  3. Security
    - Uses service role key for authentication
    - Ensures proper error handling
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create configuration table for Edge Function settings
CREATE TABLE IF NOT EXISTS edge_function_config (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default configuration values (to be updated after deployment)
INSERT INTO edge_function_config (key, value, description) VALUES
  ('edge_function_url', 'https://your-project-ref.supabase.co/functions/v1/post-tweets', 'URL for the post-tweets Edge Function'),
  ('supabase_anon_key', 'your-supabase-anon-key', 'Supabase anonymous key for authentication')
ON CONFLICT (key) DO NOTHING;

-- Grant permissions on config table
GRANT SELECT ON edge_function_config TO authenticated;
GRANT ALL ON edge_function_config TO service_role;

-- Create helper function to get config values
CREATE OR REPLACE FUNCTION get_edge_function_config(config_key TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, pg_temp
AS $$
DECLARE
  config_value TEXT;
BEGIN
  SELECT value INTO config_value
  FROM edge_function_config
  WHERE key = config_key;

  IF config_value IS NULL THEN
    RAISE EXCEPTION 'Configuration key % not found', config_key;
  END IF;

  RETURN config_value;
END;
$$;

-- Create the cron job to process scheduled tweets every 5 minutes
-- Uses configuration table for dynamic values
-- Check if job doesn't exist before creating to prevent duplicate job errors
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'post-scheduled-tweets'
  ) THEN
    PERFORM cron.schedule(
      'post-scheduled-tweets',
      '*/5 * * * *', -- Every 5 minutes
      $$
        SELECT net.http_post(
          (SELECT get_edge_function_config('edge_function_url')),
          '{}'::json,
          ARRAY[
            net.http_header('Authorization', 'Bearer ' || (SELECT get_edge_function_config('supabase_anon_key'))),
            net.http_header('Content-Type', 'application/json')
          ]
        );
      $$
    );
  END IF;
END $$;

-- Create a function to manually trigger tweet processing (useful for testing)
CREATE OR REPLACE FUNCTION trigger_tweet_processing()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, pg_temp
AS $$
DECLARE
  result json;
  http_status integer;
  response_body json;
BEGIN
  SELECT net.http_post(
    (SELECT get_edge_function_config('edge_function_url')),
    '{}'::json,
    ARRAY[
      net.http_header('Authorization', 'Bearer ' || (SELECT get_edge_function_config('supabase_anon_key'))),
      net.http_header('Content-Type', 'application/json')
    ]
  ) INTO result;

  -- Extract status and response body from the full result
  http_status := (result->>'status')::integer;
  response_body := result->'body';

  -- Check if HTTP status indicates an error (400 or higher)
  IF http_status >= 400 THEN
    RAISE EXCEPTION 'HTTP request failed with status %: %', http_status, result;
  END IF;

  -- Return only the response body for successful requests
  RETURN response_body;
END;
$$;

-- Grant execute permission to authenticated users for manual trigger
GRANT EXECUTE ON FUNCTION trigger_tweet_processing() TO authenticated;

-- Create function to update Edge Function configuration (admin only)
CREATE OR REPLACE FUNCTION update_edge_function_config(config_key TEXT, config_value TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE edge_function_config
  SET value = config_value, updated_at = NOW()
  WHERE key = config_key;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Configuration key % not found', config_key;
  END IF;
END;
$$;

-- Grant execute permission to service_role only (admin function)
GRANT EXECUTE ON FUNCTION update_edge_function_config(TEXT, TEXT) TO service_role;

-- Create a view to monitor cron job status
CREATE OR REPLACE VIEW cron_job_status AS
SELECT
  jobname,
  schedule,
  active,
  jobid
FROM cron.job
WHERE jobname = 'post-scheduled-tweets';

-- Grant select permission on the view
GRANT SELECT ON cron_job_status TO authenticated;

-- Add helpful comments for post-deployment setup
COMMENT ON TABLE edge_function_config IS 'Configuration table for Edge Function settings. Update values after deployment using update_edge_function_config() function.';
COMMENT ON FUNCTION update_edge_function_config(TEXT, TEXT) IS 'Updates Edge Function configuration. Usage: SELECT update_edge_function_config(''edge_function_url'', ''https://your-actual-project.supabase.co/functions/v1/post-tweets'');';
COMMENT ON FUNCTION get_edge_function_config(TEXT) IS 'Retrieves Edge Function configuration values. Used internally by cron jobs and trigger functions.';
COMMENT ON FUNCTION trigger_tweet_processing() IS 'Manually triggers tweet processing. Useful for testing the Edge Function integration.';
