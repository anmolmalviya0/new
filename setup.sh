#!/bin/bash

# SrijanSpeaks.com Quick Setup Script
# Run once to set up and start the development server

set -e  # Exit on error

echo "🚀 SrijanSpeaks.com Setup Script"
echo "=================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    echo "   Download from: https://nodejs.org"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

echo "📝 Step 2: Creating .env.local from template..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ .env.local created"
    echo "⚠️  Update .env.local with your Sanity credentials and SMTP settings"
else
    echo "ℹ️  .env.local already exists (skipped)"
fi
echo ""

echo "🔨 Step 3: Building project..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Check for TypeScript errors:"
    npm run lint
    exit 1
fi
echo ""

echo "🚀 Step 4: Starting development server..."
echo "📍 Open http://localhost:3000"
echo ""
echo "Tip: Press Ctrl+C to stop the server"
echo ""

npm run dev
