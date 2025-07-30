-- Check what tables already exist in your Supabase database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('companies', 'quotes', 'users', 'paint_products')
ORDER BY table_name;

-- If the above query shows that 'companies' table is missing, 
-- run the following CREATE TABLE statement:

/*
-- Uncomment and run this if 'companies' table doesn't exist:

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
  default_hourly_rate DECIMAL(10,2) DEFAULT 45.00,
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
  subscription_tier VARCHAR(50) DEFAULT 'free',
  monthly_quote_count INTEGER DEFAULT 0,
  monthly_quote_limit INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_companies_access_code ON companies(access_code);

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Companies are viewable by everyone" ON public.companies
  FOR SELECT USING (true);

-- Grant permissions
GRANT ALL ON companies TO anon, authenticated;
GRANT ALL ON SEQUENCE companies_id_seq TO anon, authenticated;

-- Insert demo companies
INSERT INTO companies (access_code, company_name, phone, email) VALUES
  ('DEMO2024', 'Demo Painting Company', '(555) 123-4567', 'demo@paintingcompany.com'),
  ('GASPAR050', 'Gaspar Painting', '(555) 555-5555', 'info@gasparpainting.com')
ON CONFLICT (access_code) DO NOTHING;

*/