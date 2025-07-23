-- Fix for missing 'confirmed_rates' column in quotes table
-- Run this in your Supabase SQL Editor

-- Add the missing confirmed_rates column
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS confirmed_rates JSONB DEFAULT '{}';

-- Also add any other potentially missing columns
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS room_data JSONB DEFAULT '[]';

ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS conversation_summary TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'quotes' 
AND column_name IN ('confirmed_rates', 'room_data', 'conversation_summary');