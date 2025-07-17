#!/bin/bash

# Fix Dashboard Error - Run these commands

echo "🔧 Fixing Dashboard Error..."
echo "================================"

# Step 1: Copy the fixed dashboard file directly to the running container
echo "Step 1: Copying fixed dashboard file to container..."
docker cp /Users/sepg/Desktop/painttest3-github/app/dashboard/page.tsx paintquotepro-web:/app/app/dashboard/page.tsx

# Step 2: Restart the container to pick up changes
echo "Step 2: Restarting web container..."
docker restart paintquotepro-web

# Step 3: Wait for container to be ready
echo "Step 3: Waiting for container to start..."
sleep 10

# Step 4: Test the dashboard
echo "Step 4: Testing dashboard access..."
curl -s -o /dev/null -w "Dashboard HTTP Status: %{http_code}\n" http://localhost:3001/dashboard

echo ""
echo "✅ Dashboard fix applied!"
echo ""
echo "You can now:"
echo "1. Go to http://localhost:3001/auth/signin"
echo "2. Login with test@test.com / test123"
echo "3. Access the dashboard successfully!"
echo ""
echo "If you still see errors, run these commands manually:"
echo "cd /Users/sepg/Desktop"
echo "docker compose down"
echo "docker compose build --no-cache"
echo "docker compose up -d"