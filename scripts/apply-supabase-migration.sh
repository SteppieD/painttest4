#!/bin/bash

# Apply Supabase Schema Migration Script
# This script applies the necessary schema changes to fix the customer_address issue

echo "======================================"
echo "Supabase Schema Migration Script"
echo "======================================"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    echo "To install Supabase CLI:"
    echo "  - macOS: brew install supabase/tap/supabase"
    echo "  - npm: npm install -g supabase"
    echo "  - Or visit: https://supabase.com/docs/guides/cli"
    echo ""
    exit 1
fi

# Check for environment variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "❌ NEXT_PUBLIC_SUPABASE_URL is not set"
    echo "Please set your Supabase URL in .env.local"
    exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "⚠️  SUPABASE_SERVICE_ROLE_KEY is not set"
    echo "You'll need this for direct database access"
    echo "Find it in your Supabase dashboard under Settings > API"
    echo ""
    echo "Alternatively, you can run the SQL directly in Supabase SQL Editor:"
    echo "1. Go to your Supabase dashboard"
    echo "2. Navigate to SQL Editor"
    echo "3. Copy and paste the contents of scripts/fix-supabase-schema.sql"
    echo "4. Click 'Run'"
    echo ""
    exit 1
fi

# Extract project ID from Supabase URL
PROJECT_ID=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed -n 's/https:\/\/\([^.]*\).*/\1/p')

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Could not extract project ID from Supabase URL"
    exit 1
fi

echo "📊 Project ID: $PROJECT_ID"
echo "🔗 Supabase URL: $NEXT_PUBLIC_SUPABASE_URL"
echo ""

# Option 1: Using Supabase CLI (requires being linked to project)
echo "Option 1: Using Supabase CLI"
echo "----------------------------"
echo "First, link to your Supabase project:"
echo "  supabase link --project-ref $PROJECT_ID"
echo ""
echo "Then run the migration:"
echo "  supabase db push < scripts/fix-supabase-schema.sql"
echo ""

# Option 2: Using direct connection
echo "Option 2: Using Direct Connection"
echo "---------------------------------"
echo "You can also apply the migration directly using psql:"
echo ""
echo "1. Get your database connection string from Supabase dashboard"
echo "   (Settings > Database > Connection string)"
echo ""
echo "2. Run:"
echo "   psql 'your-connection-string' < scripts/fix-supabase-schema.sql"
echo ""

# Option 3: Manual application
echo "Option 3: Manual Application (Recommended)"
echo "------------------------------------------"
echo "1. Go to your Supabase dashboard: https://app.supabase.com/project/$PROJECT_ID"
echo "2. Navigate to SQL Editor"
echo "3. Create a new query"
echo "4. Copy and paste the contents of scripts/fix-supabase-schema.sql"
echo "5. Click 'Run'"
echo ""
echo "This is the safest method and provides immediate feedback."
echo ""

# Provide the SQL file location
echo "📄 SQL Migration file: $(pwd)/scripts/fix-supabase-schema.sql"
echo ""
echo "======================================"
echo "After applying the migration:"
echo "======================================"
echo "1. Test creating a quote locally"
echo "2. Deploy the fixed code to Vercel"
echo "3. Test in production"
echo ""