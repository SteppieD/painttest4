-- Migration to populate metadata for existing auth.users

-- First, let's see what we have in the companies table
SELECT id, company_name, email, access_code, subscription_tier 
FROM public.companies;

-- Check if we have a public.users table with user data
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') 
        THEN 'public.users table exists'
        ELSE 'public.users table does not exist'
    END as users_table_status;

-- If public.users exists, show what's in it
SELECT * FROM public.users 
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users');

-- Update auth.users metadata based on email matching with companies
-- This assumes users registered with the same email as their company
UPDATE auth.users au
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
    'company_id', c.id,
    'role', 'admin',  -- Assuming existing users are admins
    'first_name', COALESCE(
        au.raw_user_meta_data->>'first_name',
        split_part(au.email, '@', 1)  -- Use email prefix as first name if not set
    ),
    'last_name', COALESCE(
        au.raw_user_meta_data->>'last_name',
        ''
    )
)
FROM public.companies c
WHERE au.email = c.email
AND (au.raw_user_meta_data->>'company_id' IS NULL OR au.raw_user_meta_data->>'company_id' = '');

-- For the specific users you mentioned, let's try to match them
-- This handles cases where user email might be different from company email
DO $$
DECLARE
    gaspari_company_id INTEGER;
BEGIN
    -- Find a company that might belong to Gaspari
    SELECT id INTO gaspari_company_id
    FROM public.companies
    WHERE email LIKE '%gaspari%' 
       OR company_name LIKE '%Gaspari%'
       OR company_name LIKE '%Giuseppe%'
    LIMIT 1;
    
    -- If we found a company, update the users
    IF gaspari_company_id IS NOT NULL THEN
        UPDATE auth.users
        SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
            'company_id', gaspari_company_id,
            'role', 'admin',
            'first_name', 'Giuseppe',
            'last_name', 'Gaspari'
        )
        WHERE email IN ('gaspari.giuseppe@gmail.com', 'gaspari.giuseppe123@gmail.com')
        AND (raw_user_meta_data->>'company_id' IS NULL OR raw_user_meta_data->>'company_id' = '');
    END IF;
END $$;

-- Alternative: If you know the specific company access code or ID, you can manually update:
-- UPDATE auth.users
-- SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
--     'company_id', 1,  -- Replace with actual company ID
--     'role', 'admin',
--     'first_name', 'Giuseppe',
--     'last_name', 'Gaspari'
-- )
-- WHERE email IN ('gaspari.giuseppe@gmail.com', 'gaspari.giuseppe123@gmail.com');

-- Show the results
SELECT 
    'Updated users:' as status,
    email,
    raw_user_meta_data->>'company_id' as company_id,
    raw_user_meta_data->>'role' as role,
    raw_user_meta_data->>'first_name' as first_name,
    raw_user_meta_data->>'last_name' as last_name
FROM auth.users
WHERE email IN ('gaspari.giuseppe@gmail.com', 'gaspari.giuseppe123@gmail.com')
UNION ALL
SELECT 
    'All users with metadata:' as status,
    email,
    raw_user_meta_data->>'company_id' as company_id,
    raw_user_meta_data->>'role' as role,
    raw_user_meta_data->>'first_name' as first_name,
    raw_user_meta_data->>'last_name' as last_name
FROM auth.users
WHERE raw_user_meta_data->>'company_id' IS NOT NULL;