-- Fix for missing columns in quotes table
-- Run this in your Supabase SQL Editor

-- Add all missing columns based on the expected schema
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS confirmed_rates JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS room_data JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS conversation_summary TEXT,
ADD COLUMN IF NOT EXISTS door_rate DECIMAL(10,2) DEFAULT 100.00,
ADD COLUMN IF NOT EXISTS window_rate DECIMAL(10,2) DEFAULT 25.00,
ADD COLUMN IF NOT EXISTS walls_rate DECIMAL(10,2) DEFAULT 2.50,
ADD COLUMN IF NOT EXISTS ceilings_rate DECIMAL(10,2) DEFAULT 2.50,
ADD COLUMN IF NOT EXISTS room_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS labor_percentage DECIMAL(5,2) DEFAULT 0;

-- Verify all columns exist
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'quotes' 
ORDER BY ordinal_position;