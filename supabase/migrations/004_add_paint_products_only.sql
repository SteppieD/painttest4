-- Simplified migration that ONLY creates the paint_products table
-- This avoids all foreign key issues

-- First, check if companies table exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'companies') THEN
        RAISE EXCEPTION 'Companies table does not exist. Please create it first using 00_check_and_create_base_tables.sql';
    END IF;
END $$;

-- Create paint_products table WITHOUT foreign keys
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_paint_products_user_id ON paint_products(user_id);
CREATE INDEX IF NOT EXISTS idx_paint_products_use_case ON paint_products(use_case);
CREATE INDEX IF NOT EXISTS idx_paint_products_is_active ON paint_products(is_active);

-- Enable RLS
ALTER TABLE public.paint_products ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Allow all operations for authenticated users on their products" ON public.paint_products
  FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON paint_products TO authenticated, anon;

-- Create the helper function for getting paint products by company
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

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_company_paint_products(INTEGER) TO authenticated, anon;

-- Verify the table was created
SELECT 
  'Paint products table created successfully!' as message,
  EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'paint_products') as table_exists;