-- Add onboarding fields to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS setup_completed_at TIMESTAMPTZ;