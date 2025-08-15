-- Fix paint_products table to properly link products to companies
-- This migration adds the missing company_id column and updates the structure

-- Step 1: Add company_id column if it doesn't exist
ALTER TABLE paint_products 
ADD COLUMN IF NOT EXISTS company_id INTEGER;

-- Step 2: Add foreign key constraint to link to companies table
ALTER TABLE paint_products 
ADD CONSTRAINT fk_paint_products_company 
FOREIGN KEY (company_id) 
REFERENCES companies(id) 
ON DELETE CASCADE;

-- Step 3: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_paint_products_company_id 
ON paint_products(company_id);

-- Step 4: Update existing paint products to link to companies
-- First, let's link products to companies based on user_id
UPDATE paint_products pp
SET company_id = (
    SELECT c.id 
    FROM companies c
    JOIN users u ON u.company_id = c.id
    WHERE u.id = pp.user_id
    LIMIT 1
)
WHERE pp.company_id IS NULL 
AND pp.user_id IS NOT NULL;

-- Step 5: For any remaining unlinked products, assign to demo company
UPDATE paint_products 
SET company_id = (
    SELECT id FROM companies 
    WHERE access_code = 'DEMO2024' 
    LIMIT 1
)
WHERE company_id IS NULL;

-- Step 6: Make company_id NOT NULL after populating
ALTER TABLE paint_products 
ALTER COLUMN company_id SET NOT NULL;

-- Step 7: Create or replace the function to get company paint products
CREATE OR REPLACE FUNCTION get_company_paint_products(p_company_id INTEGER)
RETURNS TABLE (
    id UUID,
    company_id INTEGER,
    user_id UUID,
    name VARCHAR,
    brand VARCHAR,
    type VARCHAR,
    finish VARCHAR,
    color VARCHAR,
    size VARCHAR,
    unit VARCHAR,
    price_per_unit DECIMAL,
    coverage_per_unit INTEGER,
    coverage_unit VARCHAR,
    in_stock BOOLEAN,
    stock_quantity INTEGER,
    notes TEXT,
    is_favorite BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pp.id,
        pp.company_id,
        pp.user_id,
        pp.name,
        pp.brand,
        pp.type,
        pp.finish,
        pp.color,
        pp.size,
        pp.unit,
        pp.price_per_unit,
        pp.coverage_per_unit,
        pp.coverage_unit,
        pp.in_stock,
        pp.stock_quantity,
        pp.notes,
        pp.is_favorite,
        pp.created_at,
        pp.updated_at
    FROM paint_products pp
    WHERE pp.company_id = p_company_id
    ORDER BY pp.is_favorite DESC, pp.name ASC;
END;
$$;

-- Step 8: Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_company_paint_products(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_company_paint_products(INTEGER) TO anon;

-- Step 9: Add some default paint products for the demo company if none exist
INSERT INTO paint_products (
    company_id,
    name,
    brand,
    type,
    finish,
    price_per_unit,
    coverage_per_unit,
    coverage_unit,
    in_stock,
    is_favorite
)
SELECT 
    c.id,
    product.name,
    product.brand,
    product.type,
    product.finish,
    product.price,
    product.coverage,
    'sqft',
    true,
    product.favorite
FROM companies c
CROSS JOIN (
    VALUES 
        ('Premium Interior Paint', 'Benjamin Moore', 'Interior', 'Eggshell', 75.00, 400, true),
        ('Regal Select Interior', 'Benjamin Moore', 'Interior', 'Matte', 55.00, 350, true),
        ('Advance Interior Paint', 'Benjamin Moore', 'Interior', 'Satin', 80.00, 400, false),
        ('ProClassic Interior', 'Sherwin-Williams', 'Interior', 'Semi-Gloss', 70.00, 350, true),
        ('Duration Home Interior', 'Sherwin-Williams', 'Interior', 'Matte', 65.00, 400, false),
        ('Emerald Interior', 'Sherwin-Williams', 'Interior', 'Satin', 85.00, 450, false),
        ('Premium Plus Ultra', 'Behr', 'Interior', 'Eggshell', 45.00, 350, false),
        ('Marquee Interior', 'Behr', 'Interior', 'Semi-Gloss', 50.00, 400, false),
        ('Dynasty Interior', 'Behr', 'Interior', 'Matte', 48.00, 375, false),
        ('Premium Primer', 'Kilz', 'Primer', 'Flat', 25.00, 300, true),
        ('High-Build Primer', 'Benjamin Moore', 'Primer', 'Flat', 35.00, 250, false),
        ('Premium Ceiling Paint', 'Benjamin Moore', 'Ceiling', 'Flat', 40.00, 400, true)
) AS product(name, brand, type, finish, price, coverage, favorite)
WHERE c.access_code = 'DEMO2024'
AND NOT EXISTS (
    SELECT 1 FROM paint_products pp 
    WHERE pp.company_id = c.id
);

-- Step 10: Add comment for documentation
COMMENT ON COLUMN paint_products.company_id IS 'Reference to the company that owns this paint product';

-- Verification query to check the results
SELECT 
    'Paint products linked to companies' as status,
    COUNT(*) as total_products,
    COUNT(DISTINCT company_id) as companies_with_products
FROM paint_products;