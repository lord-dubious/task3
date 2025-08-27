# Environment Variables Setup Guide

## Required Environment Variables

Copy these exact environment variables to your `.env` file:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/database_name

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Twitter OAuth Configuration  
TWITTER_CLIENT_ID=your_twitter_client_id_here
TWITTER_CLIENT_SECRET=your_twitter_client_secret_here

# Encryption Key (32+ characters required)
ENCRYPTION_KEY=your_secure_32_plus_character_encryption_key_here

# Cloudflare R2 Storage Configuration
CLOUDFLARE_R2_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name
CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com

# Optional: OpenAI API Key (for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Session Configuration
SESSION_SECRET=your_session_secret_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Setup Instructions

### 1. Database (PostgreSQL)
- Use Neon, Supabase, or any PostgreSQL provider
- Create a new database
- Copy the connection string to `DATABASE_URL`

### 2. Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3001/auth/google/callback`
6. Copy Client ID and Client Secret

### 3. Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app
3. Get API Key and API Secret Key
4. Set callback URL: `http://localhost:3001/auth/twitter/callback`
5. Copy API Key and Secret

### 4. Encryption Key
- Generate a secure 32+ character string
- Example: `openssl rand -base64 32`

### 5. Cloudflare R2
1. Log into Cloudflare dashboard
2. Navigate to R2 Object Storage
3. Create a bucket
4. Generate R2 API tokens
5. Configure CORS settings for your bucket

### 6. Session Secret
- Generate a secure random string for session encryption
- Example: `openssl rand -base64 64`

## Development vs Production

### Development (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://localhost:5432/tweetscheduler_dev
```

### Production (Render/Deployment)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://production_host:5432/tweetscheduler_prod
```

## Security Notes

- Never commit `.env` files to version control
- Use different credentials for development and production
- Rotate encryption keys and API secrets regularly
- Use environment-specific database URLs
- Enable 2FA on all service accounts

## Verification

After setting up environment variables, verify the setup:

```bash
# Check database connection
npm run prisma:generate

# Start all services
npm run dev     # Terminal 1
npm run server  # Terminal 2  
npm run worker  # Terminal 3

# Run tests
npm run test

# Check linting
npm run lint
```
