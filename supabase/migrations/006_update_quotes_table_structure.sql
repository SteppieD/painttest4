-- Migration to update quotes table to match TypeScript interface
-- This adds missing columns required by the CreateQuoteData type

-- Add new columns to quotes table if they don't exist
DO $$ 
BEGIN
    -- Add surfaces column (array of surface types)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'surfaces') THEN
        ALTER TABLE quotes ADD COLUMN surfaces JSONB DEFAULT '[]'::jsonb;
    END IF;
    
    -- Add measurements column (object with measurement data)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'measurements') THEN
        ALTER TABLE quotes ADD COLUMN measurements JSONB DEFAULT '{}'::jsonb;
    END IF;
    
    -- Add pricing column (object with pricing details)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'pricing') THEN
        ALTER TABLE quotes ADD COLUMN pricing JSONB DEFAULT '{}'::jsonb;
    END IF;
    
    -- Add labor_cost column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'labor_cost') THEN
        ALTER TABLE quotes ADD COLUMN labor_cost DECIMAL(12,2) DEFAULT 0;
    END IF;
    
    -- Add material_cost column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'material_cost') THEN
        ALTER TABLE quotes ADD COLUMN material_cost DECIMAL(12,2) DEFAULT 0;
    END IF;
    
    -- Add total_cost column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'total_cost') THEN
        ALTER TABLE quotes ADD COLUMN total_cost DECIMAL(12,2) DEFAULT 0;
    END IF;
    
    -- Add status column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'status') THEN
        ALTER TABLE quotes ADD COLUMN status VARCHAR(50) DEFAULT 'draft';
    END IF;
    
    -- Add timestamps
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'created_at') THEN
        ALTER TABLE quotes ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'updated_at') THEN
        ALTER TABLE quotes ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Create an index on status for performance
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_quotes_updated_at') THEN
        CREATE TRIGGER update_quotes_updated_at 
        BEFORE UPDATE ON quotes 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Migrate existing data to new structure
-- This populates the new columns based on existing data
UPDATE quotes
SET 
    surfaces = CASE 
        WHEN walls_sqft > 0 OR ceilings_sqft > 0 OR trim_sqft > 0 OR doors_count > 0 OR windows_count > 0 
        THEN jsonb_build_array(
            CASE WHEN walls_sqft > 0 THEN 'walls' END,
            CASE WHEN ceilings_sqft > 0 THEN 'ceilings' END,
            CASE WHEN trim_sqft > 0 THEN 'trim' END,
            CASE WHEN doors_count > 0 THEN 'doors' END,
            CASE WHEN windows_count > 0 THEN 'windows' END
        ) - NULL
        ELSE '[]'::jsonb
    END,
    measurements = jsonb_build_object(
        'walls_sqft', walls_sqft,
        'ceilings_sqft', ceilings_sqft,
        'trim_sqft', trim_sqft,
        'doors_count', doors_count,
        'windows_count', windows_count,
        'rooms', COALESCE(rooms::jsonb, '[]'::jsonb)
    ),
    pricing = jsonb_build_object(
        'total_revenue', total_revenue,
        'total_materials', total_materials,
        'projected_labor', projected_labor,
        'paint_cost', paint_cost,
        'sundries_cost', sundries_cost,
        'sundries_percentage', sundries_percentage,
        'painting_rate', painting_rate,
        'priming_rate', priming_rate,
        'trim_rate', trim_rate,
        'door_rate', door_rate,
        'window_rate', window_rate,
        'paint_quality', paint_quality,
        'prep_work', prep_work
    ),
    labor_cost = COALESCE(projected_labor, 0),
    material_cost = COALESCE(total_materials, 0),
    total_cost = COALESCE(total_revenue, 0)
WHERE surfaces IS NULL OR measurements IS NULL OR pricing IS NULL;

-- Verification query
SELECT 
    'Quotes table structure updated successfully!' as message,
    COUNT(*) as total_quotes,
    COUNT(*) FILTER (WHERE surfaces IS NOT NULL) as quotes_with_surfaces,
    COUNT(*) FILTER (WHERE measurements IS NOT NULL) as quotes_with_measurements,
    COUNT(*) FILTER (WHERE pricing IS NOT NULL) as quotes_with_pricing
FROM quotes;