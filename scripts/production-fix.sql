-- Production database fix for PaintQuote Pro
-- Run this on your production database to fix the dashboard error

-- 1. Add the quotesGenerated field if it doesn't exist
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "quotesGenerated" INTEGER DEFAULT 0;

-- 2. Ensure all companies have proper quote limits
UPDATE "Company" 
SET "quotesLimit" = 5 
WHERE "plan" = 'free' AND ("quotesLimit" IS NULL OR "quotesLimit" = 1);

-- 3. Reset quote counters for companies that need it
UPDATE "Company" 
SET "quotesUsed" = 0,
    "quotesResetAt" = NOW() + INTERVAL '30 days'
WHERE "plan" = 'free' AND "quotesResetAt" < NOW();

-- 4. Verify the fix
SELECT id, name, plan, "quotesUsed", "quotesLimit", "quotesGenerated" 
FROM "Company" 
LIMIT 10;