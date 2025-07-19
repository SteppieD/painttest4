-- Step 1: Clean up old tables with capitalized names
DROP TABLE IF EXISTS public."Quote" CASCADE;
DROP TABLE IF EXISTS public."Customer" CASCADE;
DROP TABLE IF EXISTS public."User" CASCADE;
DROP TABLE IF EXISTS public."Company" CASCADE;
DROP TABLE IF EXISTS public.company_users CASCADE;

-- Step 2: Create companies table if it doesn't exist
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

-- Step 3: Create quotes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.quotes (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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

-- Step 4: Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 5: Create indexes
CREATE INDEX IF NOT EXISTS idx_companies_access_code ON companies(access_code);
CREATE INDEX IF NOT EXISTS idx_quotes_company_id ON quotes(company_id);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON quotes(quote_id);

-- Step 6: Insert demo data
INSERT INTO companies (access_code, company_name, phone, email) VALUES
  ('DEMO2024', 'Demo Painting Company', '(555) 123-4567', 'demo@paintingcompany.com'),
  ('PAINTER001', 'Smith Painting LLC', '(555) 987-6543', 'info@smithpainting.com'),
  ('CONTRACTOR123', 'Elite Contractors', '(555) 456-7890', 'quotes@elitecontractors.com')
ON CONFLICT (access_code) DO NOTHING;

-- Step 7: Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 8: Create basic RLS policies
CREATE POLICY "Allow all reads on companies" ON public.companies
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads on quotes" ON public.quotes
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads on users" ON public.users
  FOR SELECT USING (true);

-- Step 9: Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Step 10: Show what we created
SELECT 'Setup Complete!' as message,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN ('companies', 'quotes', 'users')) as tables_created,
  (SELECT COUNT(*) FROM companies) as demo_companies;