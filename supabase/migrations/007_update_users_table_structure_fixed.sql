-- Migration to update users table to match TypeScript interface
-- This adds missing columns required by the User type

-- First, let's check what columns already exist
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
    
    -- Add role column only if it doesn't exist
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

-- Create indexes only if they don't exist
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add a trigger to update the updated_at timestamp only if column exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'users' AND column_name = 'updated_at') THEN
        
        -- Create or replace the trigger function
        CREATE OR REPLACE FUNCTION update_users_updated_at_column()
        RETURNS TRIGGER AS $func$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $func$ language 'plpgsql';

        -- Create trigger if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
            CREATE TRIGGER update_users_updated_at 
            BEFORE UPDATE ON users 
            FOR EACH ROW EXECUTE FUNCTION update_users_updated_at_column();
        END IF;
    END IF;
END $$;

-- Let's see the current structure of the users table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Verification query
SELECT 
    'Users table structure check:' as message,
    COUNT(*) as total_columns,
    EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'password_hash') as has_password_hash,
    EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'company_id') as has_company_id,
    EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') as has_role,
    EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'first_name') as has_first_name,
    EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_name') as has_last_name
FROM information_schema.columns
WHERE table_name = 'users';