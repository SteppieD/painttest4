-- Migration to update users table to match TypeScript interface
-- This adds missing columns required by the User type

-- Add new columns to users table if they don't exist
DO $$ 
BEGIN
    -- Add password_hash column (for authentication)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'password_hash') THEN
        ALTER TABLE users ADD COLUMN password_hash VARCHAR(255);
    END IF;
    
    -- Add company_id column (foreign key to companies)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'company_id') THEN
        ALTER TABLE users ADD COLUMN company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
    END IF;
    
    -- Add role column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
    END IF;
    
    -- Add first_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'first_name') THEN
        ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
    END IF;
    
    -- Add last_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'last_name') THEN
        ALTER TABLE users ADD COLUMN last_name VARCHAR(100);
    END IF;
END $$;

-- Create an index on company_id for performance
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);

-- Create an index on role for filtering
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_users_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
        CREATE TRIGGER update_users_updated_at 
        BEFORE UPDATE ON users 
        FOR EACH ROW EXECUTE FUNCTION update_users_updated_at_column();
    END IF;
END $$;

-- Note: You'll need to manually update existing users with their company_id 
-- based on the company_name field if needed
-- Example:
-- UPDATE users u 
-- SET company_id = c.id 
-- FROM companies c 
-- WHERE u.company_name = c.company_name;

-- Verification query
SELECT 
    'Users table structure updated successfully!' as message,
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE company_id IS NOT NULL) as users_with_company_id,
    COUNT(*) FILTER (WHERE role IS NOT NULL) as users_with_role,
    COUNT(*) FILTER (WHERE first_name IS NOT NULL OR last_name IS NOT NULL) as users_with_names
FROM users;