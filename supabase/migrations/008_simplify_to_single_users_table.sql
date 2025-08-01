-- Migration to simplify user management to use only auth.users with metadata
-- This eliminates the need for a separate public.users table

-- Step 1: Create a public view of auth.users with company information
CREATE OR REPLACE VIEW public.users_view AS
SELECT 
    au.id,
    au.email,
    au.raw_user_meta_data->>'first_name' as first_name,
    au.raw_user_meta_data->>'last_name' as last_name,
    au.raw_user_meta_data->>'company_id' as company_id,
    au.raw_user_meta_data->>'role' as role,
    c.company_name,
    c.subscription_tier as is_paying,  -- 'free' or 'pro' 
    c.monthly_quote_limit,
    c.monthly_quote_count,
    au.created_at,
    au.updated_at
FROM auth.users au
LEFT JOIN public.companies c ON (au.raw_user_meta_data->>'company_id')::integer = c.id;

-- Step 2: Create a function to register new users with company
CREATE OR REPLACE FUNCTION public.register_user(
    user_email TEXT,
    user_password TEXT,
    company_access_code TEXT,
    first_name TEXT DEFAULT NULL,
    last_name TEXT DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    company_record RECORD;
    new_user_id UUID;
    result json;
BEGIN
    -- Find company by access code
    SELECT * INTO company_record 
    FROM public.companies 
    WHERE access_code = company_access_code;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid company access code';
    END IF;
    
    -- Create user in auth.users with metadata
    INSERT INTO auth.users (
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        user_email,
        crypt(user_password, gen_salt('bf')),
        NOW(),
        jsonb_build_object(
            'company_id', company_record.id,
            'role', 'user',
            'first_name', first_name,
            'last_name', last_name
        ),
        NOW(),
        NOW(),
        encode(gen_random_bytes(32), 'hex'),
        encode(gen_random_bytes(32), 'hex')
    )
    RETURNING id INTO new_user_id;
    
    -- Return success with user info
    SELECT json_build_object(
        'id', new_user_id,
        'email', user_email,
        'company_id', company_record.id,
        'company_name', company_record.company_name,
        'is_paying', company_record.subscription_tier != 'free'
    ) INTO result;
    
    RETURN result;
END;
$$;

-- Step 3: Create a function to check if user can create quotes
CREATE OR REPLACE FUNCTION public.can_user_create_quote(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    company_record RECORD;
BEGIN
    -- Get company info through user metadata
    SELECT c.* INTO company_record
    FROM auth.users u
    JOIN public.companies c ON (u.raw_user_meta_data->>'company_id')::integer = c.id
    WHERE u.id = user_id;
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- Check if free tier has reached limit
    IF company_record.subscription_tier = 'free' AND 
       company_record.monthly_quote_count >= company_record.monthly_quote_limit THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$;

-- Step 4: Update RLS policies for quotes to use auth.users
DROP POLICY IF EXISTS "Users can view their company quotes" ON public.quotes;
CREATE POLICY "Users can view their company quotes" ON public.quotes
    FOR SELECT
    USING (
        company_id = (auth.jwt()->>'company_id')::integer
        OR 
        company_id = (
            SELECT (raw_user_meta_data->>'company_id')::integer 
            FROM auth.users 
            WHERE id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can create quotes for their company" ON public.quotes;
CREATE POLICY "Users can create quotes for their company" ON public.quotes
    FOR INSERT
    WITH CHECK (
        company_id = (auth.jwt()->>'company_id')::integer
        OR 
        company_id = (
            SELECT (raw_user_meta_data->>'company_id')::integer 
            FROM auth.users 
            WHERE id = auth.uid()
        )
    );

-- Step 5: Migrate data from public.users to auth.users metadata (if needed)
-- This updates existing auth.users with data from public.users
DO $$
DECLARE
    public_user RECORD;
BEGIN
    FOR public_user IN 
        SELECT pu.*, c.id as company_id_from_name
        FROM public.users pu
        LEFT JOIN public.companies c ON pu.company_name = c.company_name
    LOOP
        UPDATE auth.users
        SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
            'company_id', COALESCE(public_user.company_id, public_user.company_id_from_name),
            'role', COALESCE(public_user.role, 'user'),
            'first_name', public_user.first_name,
            'last_name', public_user.last_name
        )
        WHERE email = public_user.email;
    END LOOP;
END $$;

-- Step 6: Drop the redundant public.users table (after verifying migration)
-- IMPORTANT: Only uncomment and run this after confirming all data is migrated!
-- DROP TABLE IF EXISTS public.users CASCADE;

-- Verification
SELECT 
    'User setup complete!' as message,
    COUNT(*) as total_auth_users,
    COUNT(*) FILTER (WHERE raw_user_meta_data->>'company_id' IS NOT NULL) as users_with_company
FROM auth.users;

-- Show sample of migrated users
SELECT 
    email,
    raw_user_meta_data->>'company_id' as company_id,
    raw_user_meta_data->>'role' as role,
    raw_user_meta_data->>'first_name' as first_name,
    raw_user_meta_data->>'last_name' as last_name
FROM auth.users
LIMIT 5;