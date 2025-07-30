-- Add missing fields to companies table for subscription management
ALTER TABLE public.companies 
ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS monthly_quote_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS monthly_quote_limit INTEGER DEFAULT 5;

-- Update the demo company with default values
UPDATE public.companies 
SET 
  tax_rate = 0,
  onboarding_completed = false,
  onboarding_step = 0,
  subscription_tier = 'free',
  monthly_quote_count = 0,
  monthly_quote_limit = 5
WHERE access_code = 'DEMO2024';

-- Verify the changes
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'companies'
ORDER BY ordinal_position;