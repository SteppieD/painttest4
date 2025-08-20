-- Fix Supabase Schema for Quotes Table
-- This script ensures the quotes table has all required columns

-- Check if 'customer_address' column exists and rename it to 'address' if it does
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'quotes' 
        AND column_name = 'customer_address'
    ) THEN
        ALTER TABLE quotes RENAME COLUMN customer_address TO address;
    END IF;
END $$;

-- Add 'address' column if it doesn't exist
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS address TEXT;

-- Add other potentially missing columns
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(5,2) DEFAULT 0;

ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS time_estimate TEXT;

ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS timeline TEXT;

ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS special_requests TEXT;

-- Ensure all required columns exist with proper types
ALTER TABLE quotes 
ALTER COLUMN customer_name SET NOT NULL,
ALTER COLUMN company_id SET NOT NULL,
ALTER COLUMN quote_id SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quotes_company_id ON quotes(company_id);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON quotes(quote_id);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

-- Ensure companies table has all required columns
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free';

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS monthly_quote_count INTEGER DEFAULT 0;

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS monthly_quote_limit INTEGER DEFAULT 5;

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS default_hourly_rate DECIMAL(10,2) DEFAULT 45;

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS default_labor_percentage DECIMAL(5,2) DEFAULT 35;

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(5,2) DEFAULT 0;

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;

-- Create quote_usage table if it doesn't exist
CREATE TABLE IF NOT EXISTS quote_usage (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    quote_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, quote_id)
);

-- Add index for quote_usage
CREATE INDEX IF NOT EXISTS idx_quote_usage_company_id ON quote_usage(company_id);
CREATE INDEX IF NOT EXISTS idx_quote_usage_created_at ON quote_usage(created_at);

-- Grant necessary permissions (adjust based on your Supabase setup)
GRANT ALL ON quotes TO authenticated;
GRANT ALL ON companies TO authenticated;
GRANT ALL ON quote_usage TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

COMMENT ON TABLE quotes IS 'Stores all painting quote information';
COMMENT ON COLUMN quotes.address IS 'Customer address for the quote';
COMMENT ON COLUMN quotes.tax_rate IS 'Tax rate at the time of quote creation';
COMMENT ON COLUMN quotes.time_estimate IS 'Estimated time to complete the project';
COMMENT ON COLUMN quotes.timeline IS 'Project timeline details';
COMMENT ON COLUMN quotes.special_requests IS 'Any special requests from the customer';