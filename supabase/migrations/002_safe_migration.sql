-- Safe migration script that checks for existing objects

-- First, let's check what tables exist
DO $$ 
BEGIN
    -- Drop old capitalized tables if they exist
    DROP TABLE IF EXISTS public."Quote" CASCADE;
    DROP TABLE IF EXISTS public."Customer" CASCADE;
    DROP TABLE IF EXISTS public."User" CASCADE;
    DROP TABLE IF EXISTS public."Company" CASCADE;
    DROP TABLE IF EXISTS public.company_users CASCADE;
END $$;

-- Create companies table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.companies (
  id SERIAL PRIMARY KEY,
  access_code VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  logo_url VARCHAR(500),
  default_painting_rate DECIMAL(10,2) DEFAULT 2.50,
  default_priming_rate DECIMAL(10,2) DEFAULT 0.40,
  default_trim_rate DECIMAL(10,2) DEFAULT 1.92,
  default_door_rate DECIMAL(10,2) DEFAULT 100.00,
  default_window_rate DECIMAL(10,2) DEFAULT 25.00,
  default_walls_rate DECIMAL(10,2) DEFAULT 2.50,
  default_ceilings_rate DECIMAL(10,2) DEFAULT 2.50,
  default_walls_paint_cost DECIMAL(10,2) DEFAULT 26.00,
  default_ceilings_paint_cost DECIMAL(10,2) DEFAULT 25.00,
  default_trim_paint_cost DECIMAL(10,2) DEFAULT 35.00,
  default_labor_percentage INTEGER DEFAULT 30,
  default_paint_coverage INTEGER DEFAULT 350,
  default_sundries_percentage INTEGER DEFAULT 12,
  tax_rate DECIMAL(10,2) DEFAULT 0,
  tax_on_materials_only BOOLEAN DEFAULT FALSE,
  tax_label VARCHAR(50) DEFAULT 'Tax',
  quote_limit INTEGER DEFAULT NULL,
  is_trial BOOLEAN DEFAULT FALSE,
  address TEXT,
  website TEXT,
  license TEXT,
  overhead_percent DECIMAL(10,2) DEFAULT 15,
  profit_margin DECIMAL(10,2) DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quotes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.quotes (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  quote_id VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  address TEXT,
  project_type VARCHAR(100),
  rooms TEXT,
  paint_quality VARCHAR(100),
  prep_work TEXT,
  timeline VARCHAR(100),
  special_requests TEXT,
  walls_sqft INTEGER DEFAULT 0,
  ceilings_sqft INTEGER DEFAULT 0,
  trim_sqft INTEGER DEFAULT 0,
  doors_count INTEGER DEFAULT 0,
  windows_count INTEGER DEFAULT 0,
  priming_sqft INTEGER DEFAULT 0,
  painting_rate DECIMAL(10,2) DEFAULT 2.50,
  priming_rate DECIMAL(10,2) DEFAULT 0.40,
  trim_rate DECIMAL(10,2) DEFAULT 1.92,
  door_rate DECIMAL(10,2) DEFAULT 100.00,
  window_rate DECIMAL(10,2) DEFAULT 25.00,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  total_materials DECIMAL(12,2) DEFAULT 0,
  paint_cost DECIMAL(12,2) DEFAULT 0,
  sundries_cost DECIMAL(12,2) DEFAULT 0,
  sundries_percentage INTEGER DEFAULT 12,
  projected_labor DECIMAL(12,2) DEFAULT 0,
  labor_percentage INTEGER DEFAULT 30,
  projected_profit DECIMAL(12,2) DEFAULT 0,
  paint_coverage INTEGER DEFAULT 350,
  tax_rate DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  subtotal DECIMAL(12,2) DEFAULT 0,
  base_cost DECIMAL(12,2),
  markup_percentage DECIMAL(10,2),
  final_price DECIMAL(12,2),
  room_data TEXT,
  room_count INTEGER,
  confirmed_rates TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  conversation_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'quotes_company_id_fkey'
    ) THEN
        ALTER TABLE public.quotes 
        ADD CONSTRAINT quotes_company_id_fkey 
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_companies_access_code ON companies(access_code);
CREATE INDEX IF NOT EXISTS idx_quotes_company_id ON quotes(company_id);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON quotes(quote_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

-- Insert demo data (with conflict handling)
INSERT INTO companies (access_code, company_name, phone, email) VALUES
  ('DEMO2024', 'Demo Painting Company', '(555) 123-4567', 'demo@paintingcompany.com'),
  ('PAINTER001', 'Smith Painting LLC', '(555) 987-6543', 'info@smithpainting.com'),
  ('CONTRACTOR123', 'Elite Contractors', '(555) 456-7890', 'quotes@elitecontractors.com')
ON CONFLICT (access_code) DO NOTHING;

-- Enable RLS if not already enabled
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON public.companies;
DROP POLICY IF EXISTS "Companies can view their own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;

-- Create new policies
CREATE POLICY "Companies are viewable by everyone" ON public.companies
  FOR SELECT USING (true);

CREATE POLICY "Companies can view their own quotes" ON public.quotes
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing triggers if they exist and recreate
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- Create triggers
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify the schema
SELECT 
  'Tables created:' as status,
  COUNT(*) as count 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('companies', 'quotes', 'users');