#!/bin/bash

echo "🧪 Testing Trial Signup Page"
echo "==========================="
echo ""

# Function to test if page loads
test_page_load() {
    echo "📄 Testing if trial signup page loads..."
    
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/trial-signup)
    
    if [ "$RESPONSE" = "200" ]; then
        echo "✅ Page loads successfully (HTTP 200)"
    else
        echo "❌ Page failed to load (HTTP $RESPONSE)"
        exit 1
    fi
}

# Function to check page content
check_page_content() {
    echo ""
    echo "📋 Checking page content..."
    
    CONTENT=$(curl -s http://localhost:3000/trial-signup)
    
    # Check for key elements
    if echo "$CONTENT" | grep -q "Start Your Free Trial"; then
        echo "✅ Found 'Start Your Free Trial' heading"
    else
        echo "❌ Missing 'Start Your Free Trial' heading"
    fi
    
    if echo "$CONTENT" | grep -q "Company Name"; then
        echo "✅ Found Company Name field"
    else
        echo "❌ Missing Company Name field"
    fi
    
    if echo "$CONTENT" | grep -q "Email Address"; then
        echo "✅ Found Email Address field"
    else
        echo "❌ Missing Email Address field"
    fi
    
    if echo "$CONTENT" | grep -q "No credit card required"; then
        echo "✅ Found 'No credit card required' text"
    else
        echo "❌ Missing 'No credit card required' text"
    fi
}

# Function to test form submission
test_form_submission() {
    echo ""
    echo "🚀 Testing form submission..."
    
    # Generate unique test data
    TIMESTAMP=$(date +%s)
    COMPANY="Test Company $TIMESTAMP"
    EMAIL="test$TIMESTAMP@example.com"
    
    echo "  Company: $COMPANY"
    echo "  Email: $EMAIL"
    echo ""
    
    # Submit the form
    RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/simple-signup \
        -H "Content-Type: application/json" \
        -d "{\"companyName\": \"$COMPANY\", \"email\": \"$EMAIL\"}")
    
    echo "API Response:"
    echo "$RESPONSE" | jq . || echo "$RESPONSE"
    
    # Check for success
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo ""
        echo "✅ Form submission successful!"
        
        # Extract access code
        ACCESS_CODE=$(echo "$RESPONSE" | grep -o '"accessCode":"[^"]*"' | cut -d'"' -f4)
        if [ ! -z "$ACCESS_CODE" ]; then
            echo "✅ Access code generated: $ACCESS_CODE"
        fi
    else
        echo ""
        echo "❌ Form submission failed!"
    fi
}

# Function to test error handling
test_error_handling() {
    echo ""
    echo "🛡️ Testing error handling..."
    
    # Test missing company name
    echo "  Testing missing company name..."
    RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/simple-signup \
        -H "Content-Type: application/json" \
        -d '{"email": "test@example.com"}')
    
    if echo "$RESPONSE" | grep -q "Company name is required"; then
        echo "  ✅ Correctly handles missing company name"
    else
        echo "  ❌ Missing company name validation failed"
    fi
    
    # Test invalid email
    echo "  Testing invalid email..."
    RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/simple-signup \
        -H "Content-Type: application/json" \
        -d '{"companyName": "Test", "email": "invalid-email"}')
    
    if echo "$RESPONSE" | grep -q "valid email"; then
        echo "  ✅ Correctly validates email format"
    else
        echo "  ❌ Email validation failed"
    fi
}

# Main execution
echo "🌐 Testing against: http://localhost:3000/trial-signup"
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Server is not running on http://localhost:3000"
    echo "   Please start the server with: npm run start"
    exit 1
fi

# Run tests
test_page_load
check_page_content
test_form_submission
test_error_handling

echo ""
echo "✅ All tests complete!"
echo ""
echo "📱 To test in browser:"
echo "   1. Open http://localhost:3000/trial-signup"
echo "   2. Fill in company name and email"
echo "   3. Click 'Start Free Trial'"
echo "   4. You should see success message with access code"