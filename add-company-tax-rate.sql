-- Add tax rate column to companies table
-- This allows each company to set their local tax rate

ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(5,2) DEFAULT 0;

-- Add comment for clarity
COMMENT ON COLUMN companies.tax_rate IS 'Sales tax rate percentage for the company location (e.g., 8.25 for 8.25%)';