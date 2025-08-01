-- Migration to update public.users table (not auth.users)
-- This specifically targets the public schema to avoid conflicts with auth.users

-- First, let's see what's in public.users
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

-- Add new columns to public.users table if they don't exist
DO $$ 
BEGIN
    -- Add password_hash column (for authentication)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'password_hash') THEN
        ALTER TABLE public.users ADD COLUMN password_hash VARCHAR(255);
    END IF;
    
    -- Add company_id column (foreign key to companies)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'company_id') THEN
        ALTER TABLE public.users ADD COLUMN company_id INTEGER REFERENCES public.companies(id) ON DELETE CASCADE;
    END IF;
    
    -- Add role column only if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE public.users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
    END IF;
    
    -- Add first_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'first_name') THEN
        ALTER TABLE public.users ADD COLUMN first_name VARCHAR(100);
    END IF;
    
    -- Add last_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'last_name') THEN
        ALTER TABLE public.users ADD COLUMN last_name VARCHAR(100);
    END IF;
END $$;

-- Create indexes only if they don't exist (specify public schema)
CREATE INDEX IF NOT EXISTS idx_public_users_company_id ON public.users(company_id);
CREATE INDEX IF NOT EXISTS idx_public_users_role ON public.users(role);

-- Add trigger for updated_at only if column exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'updated_at') THEN
        
        -- Create or replace the trigger function
        CREATE OR REPLACE FUNCTION update_public_users_updated_at_column()
        RETURNS TRIGGER AS $func$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $func$ language 'plpgsql';

        -- Drop existing trigger if it exists
        DROP TRIGGER IF EXISTS update_public_users_updated_at ON public.users;
        
        -- Create new trigger
        CREATE TRIGGER update_public_users_updated_at 
        BEFORE UPDATE ON public.users 
        FOR EACH ROW EXECUTE FUNCTION update_public_users_updated_at_column();
    END IF;
END $$;

-- Final check - what's in public.users now?
SELECT 
    'Public users table structure after migration:' as message,
    column_name, 
    data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;