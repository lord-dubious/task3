# 🚀 TweetScheduler Pro - Deployment Overview

This repository includes configuration files for deploying to **both Netlify and Render.com**. Choose the platform that best fits your needs!

## 📁 Deployment Files

### Netlify Configuration
- **`netlify.toml`** - Main Netlify configuration
- **`NETLIFY_DEPLOYMENT.md`** - Complete Netlify deployment guide

### Render Configuration  
- **`render.yaml`** - Main Render configuration
- **`DEPLOYMENT.md`** - Complete Render deployment guide

## 🎯 Platform Comparison

| Feature | Netlify | Render.com |
|---------|---------|------------|
| **Configuration File** | `netlify.toml` | `render.yaml` |
| **Free Tier Bandwidth** | 100GB/month | 100GB/month |
| **Build Minutes** | 300/month | 500/month |
| **Custom Domains** | ✅ Free | ✅ Free |
| **Automatic HTTPS** | ✅ | ✅ |
| **Deploy Previews** | ✅ Pull Requests | ✅ Pull Requests |
| **Environment Variables** | Dashboard UI | Dashboard UI |
| **CDN** | Global CDN | Global CDN |
| **SPA Routing** | ✅ Configured | ✅ Configured |
| **Security Headers** | ✅ Pre-configured | ✅ Pre-configured |
| **Node.js Version** | 18 (configured) | 18 (configured) |

## 🚀 Quick Start

### For Netlify:
```bash
# Files used: netlify.toml
# Guide: NETLIFY_DEPLOYMENT.md
# Platform: https://netlify.com
```

### For Render:
```bash
# Files used: render.yaml  
# Guide: DEPLOYMENT.md
# Platform: https://render.com
```

## 🔧 Environment Variables (Both Platforms)

Both platforms require the same environment variables:

```bash
# Cloudflare R2 Configuration
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=tasker
CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
```

## 📋 Build Configuration (Both Platforms)

Both platforms use identical build settings:
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Node.js Version**: 18
- **SPA Routing**: All routes → `/index.html`

## 🎯 Recommendations

### Choose **Netlify** if you want:
- ✅ **Superior edge functions** and serverless capabilities
- ✅ **Built-in form handling** for contact forms
- ✅ **Advanced analytics** and A/B testing
- ✅ **Larger ecosystem** of plugins and integrations
- ✅ **Better documentation** and community support

### Choose **Render** if you want:
- ✅ **More build minutes** on free tier (500 vs 300)
- ✅ **Simpler pricing** structure
- ✅ **Database hosting** on the same platform
- ✅ **Background services** and cron jobs
- ✅ **Docker support** for complex deployments

## 🔄 Switching Between Platforms

You can easily switch between platforms since both use the same:
- Environment variables
- Build commands
- Static file structure
- SPA routing requirements

Simply use the appropriate configuration file for your chosen platform!

## 📚 Detailed Guides

- **[Netlify Complete Guide](./NETLIFY_DEPLOYMENT.md)** - Step-by-step Netlify deployment
- **[Render Complete Guide](./DEPLOYMENT.md)** - Step-by-step Render deployment

## 🆘 Support

Both platforms offer excellent support:
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Render**: [render.com/docs](https://render.com/docs)

---

**Happy Deploying! 🎉**

Choose your platform and follow the corresponding guide for detailed instructions!

