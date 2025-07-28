# 🚀 Deployment Guide for TweetScheduler Pro on Render

This guide will help you deploy TweetScheduler Pro to Render.com using the included `render.yaml` configuration.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: Prepare your environment variables (see below)

## 🔧 Environment Variables Setup

You'll need to configure these environment variables in your Render dashboard:

### Required Variables:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Cloudflare R2 Configuration
VITE_CLOUDFLARE_R2_ACCOUNT_ID=your_account_id_here
VITE_CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id_here
VITE_CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key_here
VITE_CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
```

### Optional Variables:
```bash
# Pre-configured bucket name (already set in render.yaml)
VITE_CLOUDFLARE_R2_BUCKET_NAME=tasker
```

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository**:
   - Go to your Render dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

2. **Configure Environment Variables**:
   - In the Render dashboard, go to your service settings
   - Add all the required environment variables listed above

3. **Deploy**:
   - Render will automatically build and deploy your application
   - The build process uses: `npm ci && npm run build`
   - Static files are served from the `./dist` directory

### Option 2: Manual Service Creation

1. **Create Web Service**:
   - Go to Render dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure the following:
     - **Build Command**: `npm ci && npm run build`
     - **Publish Directory**: `dist`
     - **Branch**: `main` (or your preferred branch)

2. **Add Environment Variables**:
   - In service settings, add all required environment variables

3. **Configure Redirects**:
   - Add a redirect rule: `/*` → `/index.html` (for SPA routing)

## 🔧 Configuration Details

### Build Configuration
- **Runtime**: Node.js 18
- **Build Command**: `npm ci && npm run build`
- **Static Files**: Served from `./dist`
- **SPA Routing**: All routes redirect to `/index.html`

### Performance Optimizations
- **Pull Request Previews**: Enabled for testing
- **Static Asset Caching**: Automatic via Render
- **Gzip Compression**: Enabled by default

### Security Headers
- **X-Robots-Tag**: `noindex` (prevents search engine indexing)
- **HTTPS**: Automatic SSL certificate

## 🔍 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all environment variables are set
   - Ensure Node.js version compatibility (using Node 18)
   - Review build logs in Render dashboard

2. **Runtime Errors**:
   - Verify Supabase URL and keys are correct
   - Check Cloudflare R2 configuration
   - Ensure all VITE_ prefixed variables are set

3. **Routing Issues**:
   - Verify the rewrite rule is configured: `/*` → `/index.html`
   - Check that the app is built as a Single Page Application

### Build Script
A custom build script is available at `scripts/render-build.sh` for advanced build customization.

## 📊 Monitoring

After deployment:
- Monitor build logs in Render dashboard
- Check application logs for runtime errors
- Use Render's built-in metrics for performance monitoring

## 🔄 Continuous Deployment

The configuration enables:
- **Automatic deploys** on push to main branch
- **Pull request previews** for testing changes
- **Branch-based deployments** for staging environments

## 💡 Tips

1. **Environment Variables**: Use Render's environment variable groups for easier management
2. **Custom Domains**: Configure custom domains in Render dashboard
3. **Scaling**: Upgrade to higher plans for better performance and custom domains
4. **Monitoring**: Set up Render's notification webhooks for deployment status

## 🆘 Support

If you encounter issues:
1. Check Render's [documentation](https://render.com/docs)
2. Review build and application logs
3. Verify all environment variables are correctly set
4. Ensure your Supabase and Cloudflare R2 services are properly configured

---

**Happy Deploying! 🎉**

