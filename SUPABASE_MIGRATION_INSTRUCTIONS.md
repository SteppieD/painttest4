# 🚨 URGENT: Supabase Database Migration Required

## Problem Fixed
The error `"Could not find the 'customer_address' column of 'quotes' in the schema cache"` has been resolved in the code, but you need to update your Supabase database schema.

## Quick Fix (2 minutes)

### Step 1: Open Supabase SQL Editor
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on **SQL Editor** in the left sidebar

### Step 2: Run the Migration
1. Click **New query**
2. Copy and paste the entire contents of: `scripts/fix-supabase-schema.sql`
3. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 3: Verify Success
You should see a success message. The migration will:
- ✅ Rename `customer_address` to `address` if it exists
- ✅ Add `address` column if missing
- ✅ Add all other required columns
- ✅ Create proper indexes for performance
- ✅ Set up the `quote_usage` table
- ✅ Refresh the schema cache

## What This Migration Does

### Fixes Applied:
1. **Column Naming**: Ensures the quotes table uses `address` (not `customer_address`)
2. **Missing Columns**: Adds any missing columns like `tax_rate`, `timeline`, `special_requests`
3. **Performance**: Adds indexes on frequently queried columns
4. **Subscription Features**: Ensures `companies` table has tier and quota columns
5. **Usage Tracking**: Creates `quote_usage` table for monitoring

### Tables Updated:
- `quotes` - Main quotes table
- `companies` - Company settings and subscription info
- `quote_usage` - Quote creation tracking

## Alternative Methods

### Using Supabase CLI
```bash
# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Apply migration
supabase db push < scripts/fix-supabase-schema.sql
```

### Using Direct Database Connection
```bash
# Get connection string from Supabase Dashboard > Settings > Database
psql 'YOUR_CONNECTION_STRING' < scripts/fix-supabase-schema.sql
```

## After Migration

1. **Test Locally**: Create a test quote to ensure it works
2. **Check Production**: The deployed code on Vercel should now work
3. **Monitor**: Watch for any new errors in Vercel logs

## Troubleshooting

### If Migration Fails:
- Check if you have admin permissions on the database
- Try running the SQL in smaller chunks
- Contact Supabase support with the error message

### If Errors Persist After Migration:
- Clear Vercel cache: Redeploy from Vercel dashboard
- Check environment variables are set correctly
- Verify Supabase connection is active

## Files Changed in This Fix

- `app/api/create-sample-data/route.ts` - Fixed to use `address`
- `scripts/fix-supabase-schema.sql` - Migration script
- `scripts/apply-supabase-migration.sh` - Helper script
- All quote creation code now uses `address` field consistently

## Need Help?

The migration is safe and idempotent (can be run multiple times). It won't delete any data, only add/rename columns and create indexes.

---

**Status**: Code fix deployed ✅ | Database migration pending ⏳

Apply the migration now to complete the fix!