#!/bin/bash

echo "🧪 PaintQuote Pro - Production Signup Test"
echo "=========================================="
echo ""
echo "This script will test the trial signup flow in a production-like environment"
echo ""

# Function to test signup endpoint
test_signup() {
    echo "📝 Testing signup with company: $1"
    
    RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/simple-signup \
        -H "Content-Type: application/json" \
        -d "{\"companyName\": \"$1\", \"email\": \"$2\"}")
    
    echo "Response: $RESPONSE"
    echo ""
    
    # Check if response contains success
    if echo "$RESPONSE" | grep -q "success.*true"; then
        echo "✅ Signup successful!"
        # Extract access code
        ACCESS_CODE=$(echo "$RESPONSE" | grep -o '"accessCode":"[^"]*"' | cut -d'"' -f4)
        echo "Access code: $ACCESS_CODE"
    else
        echo "❌ Signup failed!"
        echo "Full response: $RESPONSE"
    fi
    echo "---"
}

# Menu
echo "Choose test method:"
echo "1) Local production build (npm run build && npm start)"
echo "2) Docker production build"
echo "3) Just test the API endpoint (if server is already running)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "Starting local production build..."
        ./test-production.sh &
        SERVER_PID=$!
        echo "Waiting for server to start..."
        sleep 10
        ;;
    2)
        echo "Starting Docker production build..."
        docker-compose -f docker-compose.test.yml up -d --build
        echo "Waiting for container to be ready..."
        sleep 15
        ;;
    3)
        echo "Testing against existing server..."
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

# Test signup
echo ""
echo "🧪 Running signup tests..."
echo ""

# Test 1: Valid signup
test_signup "Test Company $(date +%s)" "test$(date +%s)@example.com"

# Test 2: Duplicate email (should fail)
test_signup "Another Company" "test@example.com"

# Test 3: Missing email
echo "📝 Testing signup without email..."
RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/simple-signup \
    -H "Content-Type: application/json" \
    -d '{"companyName": "No Email Company"}')
echo "Response: $RESPONSE"
echo "---"

# Cleanup
if [ "$choice" = "1" ] && [ ! -z "$SERVER_PID" ]; then
    echo ""
    echo "Stopping local server..."
    kill $SERVER_PID
elif [ "$choice" = "2" ]; then
    echo ""
    echo "Stopping Docker container..."
    docker-compose -f docker-compose.test.yml down
fi

echo ""
echo "✅ Test complete!"