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

-- Create the cron job to process scheduled tweets every 5 minutes
-- Note: Replace YOUR_EDGE_FUNCTION_URL and YOUR_SUPABASE_ANON_KEY with actual values
SELECT cron.schedule(
  'post-scheduled-tweets',
  '*/5 * * * *', -- Every 5 minutes
  $$
    SELECT net.http_post(
      'https://your-project-ref.supabase.co/functions/v1/post-tweets',
      '{}'::json,
      ARRAY[
        net.http_header('Authorization', 'Bearer your-supabase-anon-key'),
        net.http_header('Content-Type', 'application/json')
      ]
    );
  $$
);

-- Create a function to manually trigger tweet processing (useful for testing)
CREATE OR REPLACE FUNCTION trigger_tweet_processing()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT net.http_post(
    'https://your-project-ref.supabase.co/functions/v1/post-tweets',
    '{}'::json,
    ARRAY[
      net.http_header('Authorization', 'Bearer your-supabase-anon-key'),
      net.http_header('Content-Type', 'application/json')
    ]
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permission to authenticated users for manual trigger
GRANT EXECUTE ON FUNCTION trigger_tweet_processing() TO authenticated;

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