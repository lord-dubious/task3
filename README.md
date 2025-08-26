# TweetScheduler Pro

A powerful AI-driven Twitter scheduling and management platform built with React, TypeScript, Express, and PostgreSQL.

## 🚀 Features

- 🤖 **AI-Powered Content Generation**: Create engaging tweets with advanced AI assistance
- 📅 **Smart Scheduling**: Schedule posts at optimal times with pg-boss job queue
- 🎯 **Multi-Account Management**: Manage multiple Twitter accounts from one dashboard
- 📊 **Analytics & Insights**: Track performance and optimize your content strategy
- 🎨 **Media Management**: Upload and organize images, videos, and GIFs
- 🔄 **Automated Posting**: Set up recurring posts and content series
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔐 **OAuth Authentication**: Secure login with Google and Twitter
- 🐦 **Real Twitter Integration**: Post directly to Twitter using twitter-api-v2

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Prisma ORM, PostgreSQL
- **Authentication**: Passport.js (Google OAuth, Twitter OAuth)
- **Job Queue**: pg-boss for reliable tweet scheduling
- **Twitter API**: twitter-api-v2 for posting tweets
- **Storage**: Cloudflare R2 for media files
- **Deployment**: Render (Multi-service: Web, API, Worker)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Cloudflare R2 account (for media storage)
- Google OAuth credentials
- Twitter API credentials
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tweetscheduler-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables (see .env.example for all options):
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   TWITTER_CLIENT_ID=your_twitter_client_id
   TWITTER_CLIENT_SECRET=your_twitter_client_secret
   ENCRYPTION_KEY=your_32_char_encryption_key
   CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
   CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
   CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
   CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name
   CLOUDFLARE_R2_ENDPOINT=your_r2_endpoint
   ```

4. **Set up the database**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: API Server
   npm run server
   
   # Terminal 3: Background Worker
   npm run worker
   ```

## 📁 Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── generated/         # Generated Prisma client
│   └── types/             # TypeScript definitions
├── server/                # Backend Express application
│   ├── auth/              # Authentication (Passport.js)
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic services
│   └── workers.ts         # pg-boss job workers
├── prisma/                # Database schema and migrations
└── scripts/               # Utility scripts
```

## 🔧 Key Features

### Real Authentication
- **Google OAuth**: Sign in with Google account
- **Twitter OAuth**: Connect Twitter account for posting
- **Session Management**: Secure session handling with PostgreSQL
- **Protected Routes**: API endpoints protected by authentication

### Twitter Integration
- **Real API Calls**: Uses twitter-api-v2 for actual Twitter posting
- **Media Upload**: Supports images, videos, and GIFs
- **Error Handling**: Comprehensive error handling and retry logic
- **Credential Management**: Secure storage of Twitter API keys

### Job Queue System
- **pg-boss**: Reliable PostgreSQL-based job queue
- **Scheduled Jobs**: Automatic tweet posting at scheduled times
- **Retry Logic**: Failed jobs are retried with exponential backoff
- **Status Tracking**: Monitor job execution and failures

### Media Management
- **Server-side Upload**: Secure presigned URL generation
- **Cloudflare R2**: Cost-effective storage with zero egress fees
- **Media Library**: Organize and manage uploaded files
- **User Isolation**: Each user's media is properly isolated

## 🔐 Authentication Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3001/auth/google/callback`

### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app
3. Get API Key and API Secret Key
4. Set callback URL: `http://localhost:3001/auth/twitter/callback`

## 🚀 Deployment

### Render Configuration

The app is configured for multi-service deployment on Render:

1. **Web Service**: Serves the React frontend
2. **API Service**: Runs the Express backend
3. **Worker Service**: Runs the pg-boss background worker

Update `render.yaml` with your environment variables and deploy.

## 📝 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run worker` - Start background job worker
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

## 🔄 Migration from Supabase

This project has been migrated from Supabase to a custom Express + PostgreSQL stack:

- ✅ **Removed**: All Supabase dependencies
- ✅ **Added**: Express API with Prisma ORM
- ✅ **Added**: Real authentication with Passport.js
- ✅ **Added**: pg-boss for job scheduling
- ✅ **Added**: twitter-api-v2 for real Twitter integration
- ✅ **Added**: Server-side security for API keys

See `MIGRATION_SUMMARY.md` for detailed migration information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
