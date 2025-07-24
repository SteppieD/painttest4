# Database Setup Guide for PaintQuote Pro

## Current Situation

The app has three database adapters:
1. **SQLiteAdapter** - For local development (requires better-sqlite3)
2. **SupabaseAdapter** - For production with Supabase
3. **MemoryAdapter** - Fallback for serverless environments without database

Currently, the app is falling back to MemoryAdapter which stores data in memory and loses it on restart.

## To Get Database Working Properly

### Option 1: Use Supabase (Recommended for Production)

1. **Create a Supabase Project**
   - Go to https://supabase.com and create a free account
   - Create a new project
   - Note your project URL and API keys

2. **Create `.env.local` file**
   ```bash
   cp .env.example .env.local
   ```

3. **Add Supabase credentials to `.env.local`**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Run migrations in Supabase**
   - Go to Supabase Dashboard > SQL Editor
   - Run each migration file in order:
     - `/supabase/migrations/001_create_tables.sql`
     - `/supabase/migrations/002_safe_migration.sql`
     - `/supabase/migrations/003_step_by_step.sql`

5. **Add missing columns for companies table**
   ```sql
   -- Add onboarding columns
   ALTER TABLE public.companies 
   ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
   ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0,
   ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free',
   ADD COLUMN IF NOT EXISTS monthly_quote_count INTEGER DEFAULT 0,
   ADD COLUMN IF NOT EXISTS monthly_quote_limit INTEGER DEFAULT 5,
   ADD COLUMN IF NOT EXISTS setup_completed_at TIMESTAMPTZ,
   ADD COLUMN IF NOT EXISTS default_hourly_rate DECIMAL(10,2) DEFAULT 45;
   ```

### Option 2: Use SQLite for Local Development

1. **Install SQLite dependencies**
   ```bash
   npm install better-sqlite3
   npm install --save-dev @types/better-sqlite3
   ```

2. **Create `.env.local` file**
   ```bash
   cp .env.example .env.local
   ```

3. **Leave Supabase variables empty in `.env.local`**
   ```env
   # Don't set these, so SQLite will be used
   # NEXT_PUBLIC_SUPABASE_URL=
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=
   # SUPABASE_SERVICE_ROLE_KEY=
   ```

4. **The SQLite database will auto-initialize on first run**

### Option 3: Continue with Memory Adapter (Not Recommended)

The app will continue to work but will lose all data on restart. This is only suitable for demos or testing.

## Testing Database Connection

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Check console output**
   You should see one of:
   - "Using Supabase database adapter" (if Supabase is configured)
   - "Using SQLite database adapter" (if running locally without Supabase)
   - "Using Memory database adapter" (fallback)

3. **Test by creating a company**
   - Go to `/trial-signup`
   - Create a test account
   - Complete onboarding
   - Refresh the page - data should persist if database is working

## Common Issues

### Issue: "Database update failed but you can continue using the app"
This means the database connection failed but the app is storing data locally. Fix by:
- Checking Supabase credentials are correct
- Ensuring all required columns exist in the database
- Checking network connectivity to Supabase

### Issue: SQLite not working
- Make sure `better-sqlite3` is installed
- Check that you have write permissions in the project directory
- Try deleting `painting_quotes_app.db` and letting it recreate

### Issue: Supabase connection errors
- Verify your Supabase project is active (not paused)
- Check that the API keys are correct
- Ensure the tables and columns exist in Supabase

## Recommended Approach

For production deployment:
1. Use Supabase as it's already configured in the codebase
2. Run all migrations to create the proper schema
3. Add the missing columns listed above
4. Configure environment variables in your deployment platform

For local development:
1. Either use SQLite (easier) or connect to a Supabase project
2. SQLite is simpler but Supabase matches production better