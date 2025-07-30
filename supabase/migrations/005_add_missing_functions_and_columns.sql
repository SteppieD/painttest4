-- Add missing columns to companies table if they don't exist
DO $$ 
BEGIN
    -- Add subscription-related columns if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'companies' AND column_name = 'subscription_tier') THEN
        ALTER TABLE companies ADD COLUMN subscription_tier VARCHAR(50) DEFAULT 'free';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'companies' AND column_name = 'monthly_quote_count') THEN
        ALTER TABLE companies ADD COLUMN monthly_quote_count INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'companies' AND column_name = 'monthly_quote_limit') THEN
        ALTER TABLE companies ADD COLUMN monthly_quote_limit INTEGER DEFAULT 5;
    END IF;
    
    -- Add default_hourly_rate if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'companies' AND column_name = 'default_hourly_rate') THEN
        ALTER TABLE companies ADD COLUMN default_hourly_rate DECIMAL(10,2) DEFAULT 45.00;
    END IF;
END $$;

-- Create or replace the helper function for getting paint products by company
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
  
  IF v_company_name IS NULL THEN
    -- Return empty if company not found
    RETURN;
  END IF;
  
  -- Get user ID
  SELECT id INTO v_user_id
  FROM users
  WHERE company_name = v_company_name
  LIMIT 1;
  
  IF v_user_id IS NULL THEN
    -- Return empty if user not found
    RETURN;
  END IF;
  
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

-- Create function to get user by company name
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

-- Grant permissions on functions
GRANT EXECUTE ON FUNCTION get_company_paint_products(INTEGER) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_user_by_company_name(TEXT) TO authenticated, anon;

-- Create adapter methods for paint products (if not exists)
-- These are for the SupabaseAdapterFixed to use

-- Function to create a paint product
CREATE OR REPLACE FUNCTION create_paint_product(
  p_user_id UUID,
  p_product_name TEXT,
  p_use_case TEXT,
  p_cost_per_gallon DECIMAL,
  p_coverage_rate DECIMAL DEFAULT 350,
  p_sheen TEXT DEFAULT NULL,
  p_brand TEXT DEFAULT NULL,
  p_is_preferred BOOLEAN DEFAULT FALSE,
  p_is_active BOOLEAN DEFAULT TRUE
)
RETURNS paint_products
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_product paint_products;
BEGIN
  INSERT INTO paint_products (
    user_id, product_name, use_case, cost_per_gallon, 
    coverage_rate, sheen, brand, is_preferred, is_active
  ) VALUES (
    p_user_id, p_product_name, p_use_case, p_cost_per_gallon,
    p_coverage_rate, p_sheen, p_brand, p_is_preferred, p_is_active
  ) RETURNING * INTO v_product;
  
  RETURN v_product;
END;
$$;

GRANT EXECUTE ON FUNCTION create_paint_product(UUID, TEXT, TEXT, DECIMAL, DECIMAL, TEXT, TEXT, BOOLEAN, BOOLEAN) TO authenticated, anon;

-- Verification query
SELECT 
  'Functions created successfully!' as message,
  EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_company_paint_products') as func1_exists,
  EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_user_by_company_name') as func2_exists,
  EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'companies' AND column_name = 'subscription_tier') as subscription_columns_exist;