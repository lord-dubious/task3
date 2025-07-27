#!/bin/bash

# Render.com build script for TweetScheduler Pro
echo "🚀 Starting Render build process..."

# Set Node.js version
echo "📦 Using Node.js version:"
node --version
npm --version

# Install dependencies
echo "📥 Installing dependencies..."
npm ci --production=false

# Run linting (optional, can be disabled if it fails)
echo "🔍 Running linter..."
npm run lint || echo "⚠️ Linting failed, continuing build..."

# Build the application
echo "🏗️ Building application..."
npm run build

# Verify build output
echo "✅ Build completed. Checking output..."
ls -la dist/

echo "🎉 Render build process completed successfully!"

