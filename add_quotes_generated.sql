-- Add quotesGenerated field to Company table for atomic quote numbering
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "quotesGenerated" INTEGER DEFAULT 0;

-- Add composite index for better query performance
CREATE INDEX IF NOT EXISTS "Company_plan_quotesUsed_idx" ON "Company"("plan", "quotesUsed");

-- Add index for quote timestamp queries
CREATE INDEX IF NOT EXISTS "Quote_companyId_createdAt_idx" ON "Quote"("companyId", "createdAt" DESC);

-- Add index for customer queries
CREATE INDEX IF NOT EXISTS "Customer_companyId_name_idx" ON "Customer"("companyId", "name");

-- Ensure quote number uniqueness
ALTER TABLE "Quote" DROP CONSTRAINT IF EXISTS "Quote_quoteNumber_key";
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_quoteNumber_key" UNIQUE ("quoteNumber");