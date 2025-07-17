# Vercel Deployment Guide - Fix Production Errors

## The Problem
You're seeing a 404/500 error on the dashboard after login. This is because:
1. The production database is missing the new `quotesGenerated` column
2. The environment variables might not be set correctly

## Immediate Fix

### Step 1: Update Your Production Database
Run this SQL on your production database (you can find the connection details in Vercel):

```sql
-- Add the missing column
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "quotesGenerated" INTEGER DEFAULT 0;

-- Fix quote limits for free users
UPDATE "Company" 
SET "quotesLimit" = 5 
WHERE "plan" = 'free' AND ("quotesLimit" IS NULL OR "quotesLimit" = 1);

-- Reset expired quote counters
UPDATE "Company" 
SET "quotesUsed" = 0,
    "quotesResetAt" = NOW() + INTERVAL '30 days'
WHERE "plan" = 'free' AND "quotesResetAt" < NOW();
```

### Step 2: Verify Environment Variables in Vercel
Go to your Vercel project settings and ensure these are set:

1. **DATABASE_URL** 
   - Format: `postgresql://username:password@host:5432/database?schema=public`
   - Must match your production database

2. **JWT_SECRET**
   - Must be a secure random string (at least 32 characters)
   - Example: Generate one with: `openssl rand -base64 32`

3. **NEXTAUTH_URL**
   - Your production URL (e.g., `https://paintquotepro.vercel.app`)

4. **NEXTAUTH_SECRET**
   - Another secure random string
   - Different from JWT_SECRET

### Step 3: Redeploy
After setting the environment variables and updating the database:
1. Go to Vercel dashboard
2. Click "Redeploy" 
3. Choose "Redeploy with existing Build Cache" (faster)

## Troubleshooting

### Check Vercel Function Logs
1. Go to your Vercel dashboard
2. Click on "Functions" tab
3. Look for errors in `/api/auth/signin` or `/dashboard`

### Common Issues and Fixes

**Issue: "Invalid `prisma.company.update()` invocation"**
- Fix: Run the SQL migration above

**Issue: "JWT malformed"**
- Fix: Ensure JWT_SECRET is the same in production as in development

**Issue: "Cannot read properties of null"**
- Fix: Check that all environment variables are set

**Issue: "ECONNREFUSED" or database connection errors**
- Fix: Verify DATABASE_URL is correct and database is accessible

### Test Login
After fixes, test with:
- Email: test@test.com
- Password: test123

Or create a new account through signup.

## Long-term Solution

Add this to your deployment process:
1. Always run migrations before deploying
2. Use Prisma Migrate for production: `prisma migrate deploy`
3. Set up monitoring for production errors

## Contact Database Provider

If you're using:
- **Supabase**: Check connection pooling settings
- **PlanetScale**: Ensure branch is promoted
- **Railway**: Check if database is awake
- **Neon**: Verify connection string includes `?sslmode=require`

The app is working perfectly locally, so this is purely a production configuration issue that will be resolved once the database is updated.