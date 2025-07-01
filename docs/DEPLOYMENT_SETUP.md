# Deployment Setup Guide

This guide walks you through setting up the complete scheduled tweet posting system.

## Prerequisites

- Supabase project with database access
- Supabase CLI installed locally
- Twitter Developer Account with API access

## Step 1: Enable Database Extensions

1. Go to your Supabase project dashboard
2. Navigate to **Database** → **Extensions**
3. Search for and enable these extensions:
   - `pg_cron` - For scheduling database tasks
   - `pg_net` - For making HTTP requests from the database

## Step 2: Deploy Edge Function

1. Make sure you have the Supabase CLI installed and authenticated:
   ```bash
   supabase login
   ```

2. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

3. Deploy the Edge Function:
   ```bash
   supabase functions deploy post-tweets
   ```

4. Note the Edge Function URL from the output (format: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/post-tweets`)

## Step 3: Configure Cron Job

1. Open the migration file: `supabase/migrations/20250629150000_setup_cron_job.sql`

2. Replace the placeholder values:
   - Replace `https://your-project-ref.supabase.co/functions/v1/post-tweets` with your actual Edge Function URL
   - Replace `your-supabase-anon-key` with your project's anon key (found in Project Settings → API)

3. Apply the migration:
   ```bash
   supabase db push
   ```

## Step 4: Configure Twitter Credentials

Users need to configure their Twitter API credentials in the app:

1. Go to **Settings** → **Twitter Integration**
2. Connect Twitter account (this stores credentials in `user_settings` table)
3. Ensure the credentials include:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret

## Step 5: Test the System

1. **Create a Test Tweet**:
   - Go to **Compose** tab
   - Write a test tweet
   - Schedule it for 1-2 minutes in the future

2. **Monitor Processing**:
   - Go to **Schedule** tab
   - Check the "Cron Job Status" section
   - Use "Trigger Manual Processing" to test immediately

3. **Verify Results**:
   - Check if the tweet appears on Twitter
   - Verify the tweet status updates to "posted" in the database

## Step 6: Production Configuration

### Cron Schedule Options

Edit the cron schedule in the migration file based on your needs:

- `'*/5 * * * *'` - Every 5 minutes (default)
- `'*/1 * * * *'` - Every minute (more responsive)
- `'0 */1 * * *'` - Every hour
- `'0 9,12,15,18 * * *'` - At 9 AM, 12 PM, 3 PM, and 6 PM daily

### Error Handling

The system includes comprehensive error handling:

- **Authentication Errors**: When Twitter credentials are missing or invalid
- **API Rate Limits**: Automatic retry with exponential backoff
- **Network Issues**: Retry mechanism with failure tracking
- **Content Violations**: Detailed error messages for debugging

### Monitoring and Logging

- **Edge Function Logs**: Available in Supabase dashboard under Functions
- **Database Logs**: Check `tweets` table for `failure_reason` and `retry_count`
- **Cron Job Status**: Monitor via the UI or database queries

## Troubleshooting

### Common Issues

1. **Cron Job Not Running**:
   - Verify `pg_cron` extension is enabled
   - Check the cron job exists: `SELECT * FROM cron.job;`
   - Ensure the Edge Function URL is correct

2. **Twitter API Errors**:
   - Verify Twitter credentials are valid
   - Check API rate limits
   - Ensure tweet content meets Twitter's requirements

3. **Edge Function Errors**:
   - Check function logs in Supabase dashboard
   - Verify environment variables are set
   - Test function manually via HTTP request

### Manual Testing

Test the Edge Function directly:

```bash
curl -X POST \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/post-tweets \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Database Queries for Debugging

Check cron job status:
```sql
SELECT * FROM cron.job WHERE jobname = 'post-scheduled-tweets';
```

View recent tweet processing:
```sql
SELECT id, content, status, failure_reason, retry_count, last_attempt_at 
FROM tweets 
WHERE status IN ('failed', 'posted') 
ORDER BY last_attempt_at DESC 
LIMIT 10;
```

## Security Considerations

- **API Keys**: Twitter credentials are encrypted in the database
- **Function Security**: Edge Function uses service role key for database access
- **Rate Limiting**: Built-in protection against API abuse
- **Error Logging**: Sensitive information is not logged in plain text

## Performance Optimization

- **Batch Processing**: Function processes multiple tweets in a single execution
- **Efficient Queries**: Optimized database queries with proper indexing
- **Retry Logic**: Smart retry mechanism prevents infinite loops
- **Resource Management**: Function automatically handles memory and timeout limits

This completes the setup for automated scheduled tweet posting. The system will now automatically process and post your scheduled tweets every 5 minutes.