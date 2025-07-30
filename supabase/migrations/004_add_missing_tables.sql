-- Migration to add missing tables for Supabase compatibility
-- This addresses critical issues found in the Supabase audit

-- =====================================================
-- PAINT PRODUCTS TABLE (Critical - Used by chat flow)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.paint_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  use_case TEXT NOT NULL CHECK (use_case IN ('walls', 'ceilings', 'trim_doors', 'exterior')),
  cost_per_gallon DECIMAL(10,2) NOT NULL,
  coverage_rate DECIMAL(10,2) DEFAULT 350,
  sheen TEXT,
  brand TEXT,
  is_preferred BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_paint_products_user_id ON paint_products(user_id);
CREATE INDEX IF NOT EXISTS idx_paint_products_use_case ON paint_products(use_case);
CREATE INDEX IF NOT EXISTS idx_paint_products_is_active ON paint_products(is_active);

-- Enable RLS
ALTER TABLE public.paint_products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all operations for authenticated users on their products" ON public.paint_products
  FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON paint_products TO authenticated, anon;

-- =====================================================
-- SUBSCRIPTION PLANS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  interval TEXT NOT NULL CHECK (interval IN ('monthly', 'yearly')),
  features JSONB,
  quote_limit INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default subscription plans
INSERT INTO subscription_plans (id, name, price, interval, features, quote_limit) VALUES
  ('plan_free', 'Free Trial', 0, 'monthly', '["5 quotes per month", "Basic features"]', 5),
  ('plan_professional', 'Professional', 79, 'monthly', '["Unlimited quotes", "AI assistance", "Email support"]', NULL),
  ('plan_business', 'Business', 149, 'monthly', '["Everything in Professional", "Priority support", "Custom branding"]', NULL)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- COMPANY SUBSCRIPTIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.company_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES subscription_plans(id),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_company_subscriptions_company_id ON company_subscriptions(company_id);
CREATE INDEX IF NOT EXISTS idx_company_subscriptions_status ON company_subscriptions(status);

-- =====================================================
-- QUOTE USAGE TABLE (For tracking monthly limits)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.quote_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  quote_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_usage_company_id ON quote_usage(company_id);
CREATE INDEX IF NOT EXISTS idx_quote_usage_created_at ON quote_usage(created_at);

-- =====================================================
-- ADDITIONAL TABLES FOR FUTURE FEATURES
-- =====================================================

-- Projects table for organizing quotes
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  property_address TEXT,
  client_email TEXT,
  client_phone TEXT,
  project_notes TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_company_id ON projects(company_id);

-- Company branding for customized quotes
CREATE TABLE IF NOT EXISTS public.company_branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id INTEGER NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3182ce',
  secondary_color TEXT DEFAULT '#2d3748',
  accent_color TEXT DEFAULT '#38a169',
  company_tagline TEXT,
  quote_terms TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get user by company name (replaces raw SQL query)
CREATE OR REPLACE FUNCTION get_user_by_company_name(p_company_name TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.email, u.company_name, u.created_at
  FROM users u
  WHERE u.company_name = p_company_name
  LIMIT 1;
END;
$$;

-- Function to get paint products for a company
CREATE OR REPLACE FUNCTION get_company_paint_products(p_company_id INTEGER)
RETURNS TABLE (
  id UUID,
  product_name TEXT,
  use_case TEXT,
  cost_per_gallon DECIMAL,
  coverage_rate DECIMAL,
  sheen TEXT,
  brand TEXT,
  is_active BOOLEAN
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_company_name TEXT;
  v_user_id UUID;
BEGIN
  -- Get company name
  SELECT company_name INTO v_company_name
  FROM companies
  WHERE id = p_company_id;
  
  -- Get user ID
  SELECT id INTO v_user_id
  FROM users
  WHERE company_name = v_company_name
  LIMIT 1;
  
  -- Return paint products
  RETURN QUERY
  SELECT 
    pp.id,
    pp.product_name,
    pp.use_case,
    pp.cost_per_gallon,
    pp.coverage_rate,
    pp.sheen,
    pp.brand,
    pp.is_active
  FROM paint_products pp
  WHERE pp.user_id = v_user_id
    AND pp.is_active = true
  ORDER BY pp.use_case, pp.product_name;
END;
$$;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION get_user_by_company_name(TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_company_paint_products(INTEGER) TO authenticated, anon;

-- =====================================================
-- ENABLE RLS ON ALL NEW TABLES
-- =====================================================

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_branding ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (allow authenticated users to read)
CREATE POLICY "Allow reads for authenticated users" ON public.subscription_plans
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON public.company_subscriptions
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON public.quote_usage
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON public.projects
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON public.company_branding
  FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

SELECT 
  'Migration Complete!' as message,
  (SELECT COUNT(*) FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('paint_products', 'subscription_plans', 'company_subscriptions', 'quote_usage', 'projects', 'company_branding')
  ) as new_tables_created;