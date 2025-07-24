#!/bin/bash

echo "🧪 Testing production environment locally..."
echo "This will simulate the Vercel production environment using memory adapter"
echo ""

# Load test environment variables
export $(cat .env.test | grep -v '^#' | xargs)

# Build the app
echo "📦 Building the app in production mode..."
npm run build

# Start the production server
echo "🚀 Starting production server on http://localhost:3000"
echo "Try the trial signup at: http://localhost:3000/trial-signup"
echo ""
npm run start