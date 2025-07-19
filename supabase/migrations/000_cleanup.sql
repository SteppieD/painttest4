-- Cleanup script to remove all existing objects before migration

-- Drop all triggers
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies CASCADE;
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes CASCADE;
DROP TRIGGER IF EXISTS update_users_updated_at ON users CASCADE;

-- Drop all policies
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON public.companies;
DROP POLICY IF EXISTS "Companies can view their own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;

-- Drop all tables
DROP TABLE IF EXISTS public.quotes CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public."Quote" CASCADE;
DROP TABLE IF EXISTS public."Customer" CASCADE;
DROP TABLE IF EXISTS public."User" CASCADE;
DROP TABLE IF EXISTS public."Company" CASCADE;
DROP TABLE IF EXISTS public.company_users CASCADE;

-- Drop the function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Now you can run the main migration script