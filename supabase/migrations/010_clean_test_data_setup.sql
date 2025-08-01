-- Clean setup for test data
-- Since all existing accounts are test accounts, we can start fresh

-- Step 1: Clean out existing test data (be careful - this deletes data!)
-- Delete existing quotes first (due to foreign key constraints)
DELETE FROM public.quotes WHERE company_id IN (SELECT id FROM public.companies);

-- Delete existing companies
DELETE FROM public.companies;

-- Step 2: Create fresh test companies with different subscription tiers
INSERT INTO public.companies (
    access_code, 
    company_name, 
    email, 
    phone,
    subscription_tier,
    monthly_quote_limit,
    monthly_quote_count,
    tax_rate,
    default_labor_percentage,
    onboarding_completed
) VALUES 
    -- Free tier test company
    ('TEST-FREE-2024', 'Test Painting Co (Free)', 'free@testpaint.com', '555-0001', 'free', 5, 0, 8.25, 30, true),
    
    -- Pro tier test company  
    ('TEST-PRO-2024', 'Pro Painters LLC', 'pro@testpaint.com', '555-0002', 'pro', 999999, 0, 8.5, 35, true),
    
    -- Free tier at limit
    ('TEST-LIMIT-2024', 'Limited Painters Inc', 'limited@testpaint.com', '555-0003', 'free', 5, 5, 8.0, 25, true);

-- Step 3: Create a helper function to easily create test users
CREATE OR REPLACE FUNCTION create_test_user(
    user_email TEXT,
    user_password TEXT,
    company_access_code TEXT,
    first_name TEXT,
    last_name TEXT,
    user_role TEXT DEFAULT 'user'
)
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    company_name TEXT,
    is_paying BOOLEAN,
    can_create_quotes BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE
    company_record RECORD;
    new_user RECORD;
BEGIN
    -- Get company
    SELECT * INTO company_record 
    FROM public.companies 
    WHERE access_code = company_access_code;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Company not found with access code: %', company_access_code;
    END IF;
    
    -- Create auth user with Supabase auth
    -- Note: In production, use Supabase client SDK. This is for testing.
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
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
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        user_email,
        crypt(user_password, gen_salt('bf')),
        NOW(),
        jsonb_build_object(
            'company_id', company_record.id,
            'role', user_role,
            'first_name', first_name,
            'last_name', last_name
        ),
        NOW(),
        NOW(),
        encode(gen_random_bytes(32), 'hex'),
        encode(gen_random_bytes(32), 'hex')
    )
    RETURNING * INTO new_user;
    
    -- Return user info
    RETURN QUERY
    SELECT 
        new_user.id,
        new_user.email::TEXT,
        company_record.company_name::TEXT,
        (company_record.subscription_tier != 'free')::BOOLEAN as is_paying,
        (company_record.subscription_tier != 'free' OR 
         company_record.monthly_quote_count < company_record.monthly_quote_limit)::BOOLEAN as can_create_quotes;
END;
$$;

-- Step 4: Create test users
-- Password for all test users: TestPass123!

-- Free tier users
SELECT * FROM create_test_user('john@freetestpaint.com', 'TestPass123!', 'TEST-FREE-2024', 'John', 'Doe', 'admin');
SELECT * FROM create_test_user('jane@freetestpaint.com', 'TestPass123!', 'TEST-FREE-2024', 'Jane', 'Smith', 'user');

-- Pro tier users
SELECT * FROM create_test_user('mike@propaint.com', 'TestPass123!', 'TEST-PRO-2024', 'Mike', 'Johnson', 'admin');
SELECT * FROM create_test_user('sarah@propaint.com', 'TestPass123!', 'TEST-PRO-2024', 'Sarah', 'Williams', 'user');

-- User at quota limit
SELECT * FROM create_test_user('limited@testpaint.com', 'TestPass123!', 'TEST-LIMIT-2024', 'Bob', 'Limited', 'admin');

-- Step 5: Show the test setup
SELECT 
    'Test Companies:' as section,
    company_name,
    access_code,
    subscription_tier,
    monthly_quote_count || '/' || monthly_quote_limit as quota_usage,
    email
FROM public.companies
ORDER BY subscription_tier DESC;

-- Show test users
SELECT 
    'Test Users:' as section,
    au.email,
    au.raw_user_meta_data->>'first_name' || ' ' || au.raw_user_meta_data->>'last_name' as full_name,
    c.company_name,
    c.subscription_tier,
    au.raw_user_meta_data->>'role' as user_role,
    CASE 
        WHEN c.subscription_tier != 'free' THEN 'Unlimited'
        ELSE (c.monthly_quote_limit - c.monthly_quote_count)::TEXT || ' quotes left'
    END as available_quotes
FROM auth.users au
JOIN public.companies c ON (au.raw_user_meta_data->>'company_id')::INTEGER = c.id
WHERE au.email LIKE '%test%'
ORDER BY c.subscription_tier DESC, au.email;

-- Cleanup note
SELECT 
    E'\n=== TEST DATA SETUP COMPLETE ===\n' ||
    E'All test users password: TestPass123!\n\n' ||
    E'Free Tier Company:\n' ||
    E'  Access Code: TEST-FREE-2024\n' ||
    E'  Users: john@freetestpaint.com (admin), jane@freetestpaint.com (user)\n' ||
    E'  Quotes: 5 per month\n\n' ||
    E'Pro Tier Company:\n' ||
    E'  Access Code: TEST-PRO-2024\n' ||
    E'  Users: mike@propaint.com (admin), sarah@propaint.com (user)\n' ||
    E'  Quotes: Unlimited\n\n' ||
    E'Company at Limit:\n' ||
    E'  Access Code: TEST-LIMIT-2024\n' ||
    E'  User: limited@testpaint.com\n' ||
    E'  Status: Already used 5/5 quotes (cannot create more)\n'
    as setup_summary;