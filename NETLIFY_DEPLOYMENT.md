# 🚀 Netlify Deployment Guide for TweetScheduler Pro

This guide will help you deploy TweetScheduler Pro to Netlify using the included `netlify.toml` configuration.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: Prepare your environment variables (see below)

## 🔧 Environment Variables Setup

You'll need to configure these environment variables in your Netlify dashboard:

### Required Variables:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Cloudflare R2 Configuration
VITE_CLOUDFLARE_R2_ACCOUNT_ID=your_account_id_here
VITE_CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id_here
VITE_CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key_here
VITE_CLOUDFLARE_R2_BUCKET_NAME=tasker
VITE_CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
```

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository**:
   - Go to your Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository
   - Netlify will automatically detect the `netlify.toml` file

2. **Configure Build Settings** (Auto-detected from netlify.toml):
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18

3. **Add Environment Variables**:
   - In Netlify dashboard, go to Site Settings → Environment Variables
   - Add all the required environment variables listed above

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your application

### Option 2: Manual Configuration

1. **Create New Site**:
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
   - **Branch**: `main` (or your preferred branch)

3. **Add Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add all required environment variables

4. **Deploy**:
   - Click "Deploy site"

## 🔧 Configuration Details

### Build Configuration
- **Runtime**: Node.js 18
- **Build Command**: `npm ci && npm run build`
- **Static Files**: Served from `./dist`
- **SPA Routing**: All routes redirect to `/index.html`

### Performance Optimizations
- **Asset Caching**: Static assets cached for 1 year
- **HTML Caching**: HTML files with revalidation
- **Gzip Compression**: Automatic compression
- **CDN**: Global content delivery network

### Security Headers
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: XSS protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

## 🔍 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all environment variables are set
   - Ensure Node.js version is 18
   - Review build logs in Netlify dashboard

2. **Runtime Errors**:
   - Verify Supabase URL and keys are correct
   - Check Cloudflare R2 configuration
   - Ensure all VITE_ prefixed variables are set

3. **Routing Issues**:
   - Verify the redirect rule is working: `/*` → `/index.html`
   - Check that the app is built as a Single Page Application

4. **Environment Variables Not Working**:
   - Ensure variables start with `VITE_` prefix
   - Check variable names match exactly
   - Redeploy after adding new variables

## 📊 Monitoring

After deployment:
- Monitor build logs in Netlify dashboard
- Use Netlify Analytics for traffic insights
- Set up form notifications for build failures
- Check function logs if using Netlify Functions

## 🔄 Continuous Deployment

The configuration enables:
- **Automatic deploys** on push to main branch
- **Deploy previews** for pull requests
- **Branch deploys** for staging environments
- **Split testing** for A/B testing

## 💡 Advanced Features

### Custom Domains
1. Go to Site Settings → Domain Management
2. Add your custom domain
3. Configure DNS settings
4. SSL certificate is automatically provisioned

### Deploy Previews
- Automatically generated for pull requests
- Test changes before merging
- Share preview links with team members

### Form Handling
- Built-in form processing (if needed)
- Spam protection with Akismet
- Email notifications

### Functions (Optional)
- Serverless functions for API endpoints
- Edge functions for advanced routing
- Background functions for scheduled tasks

## 🆘 Support

If you encounter issues:
1. Check Netlify's [documentation](https://docs.netlify.com)
2. Review build and function logs
3. Verify all environment variables are correctly set
4. Ensure your Supabase and Cloudflare R2 services are properly configured

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format when possible
2. **Code Splitting**: Implement dynamic imports for large components
3. **Bundle Analysis**: Use `npm run build -- --analyze` to check bundle size
4. **Preloading**: Add resource hints for critical assets

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Always use HTTPS (automatic with Netlify)
3. **Headers**: Security headers are configured in netlify.toml
4. **Dependencies**: Keep dependencies updated

---

**Happy Deploying! 🎉**

Your TweetScheduler Pro is now ready for production on Netlify!

