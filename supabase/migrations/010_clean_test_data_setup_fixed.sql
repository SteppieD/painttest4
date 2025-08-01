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

-- Step 3: Create test users using Supabase auth
-- Note: We'll update existing users' metadata instead of creating new ones

-- First, let's update the existing users to use our test companies
DO $$
DECLARE
    test_free_company_id INTEGER;
    test_pro_company_id INTEGER;
BEGIN
    -- Get the test company IDs
    SELECT id INTO test_free_company_id FROM public.companies WHERE access_code = 'TEST-FREE-2024';
    SELECT id INTO test_pro_company_id FROM public.companies WHERE access_code = 'TEST-PRO-2024';
    
    -- Update Giuseppe's accounts to use test companies
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object(
        'company_id', test_free_company_id,
        'role', 'admin',
        'first_name', 'Giuseppe',
        'last_name', 'Gaspari'
    )
    WHERE email = 'gaspari.giuseppe@gmail.com';
    
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object(
        'company_id', test_pro_company_id,
        'role', 'admin',
        'first_name', 'Giuseppe',
        'last_name', 'Test Pro'
    )
    WHERE email = 'gaspari.giuseppe123@gmail.com';
END $$;

-- Step 4: Show the test setup
SELECT 
    'Test Companies:' as section,
    company_name,
    access_code,
    subscription_tier,
    monthly_quote_count || '/' || monthly_quote_limit as quota_usage,
    email
FROM public.companies
ORDER BY subscription_tier DESC;

-- Show updated users (with proper type casting)
SELECT 
    'Updated Users:' as section,
    au.email,
    COALESCE(
        (au.raw_user_meta_data::jsonb->>'first_name')::text || ' ' || 
        (au.raw_user_meta_data::jsonb->>'last_name')::text,
        au.email
    ) as full_name,
    c.company_name,
    c.subscription_tier,
    (au.raw_user_meta_data::jsonb->>'role')::text as user_role,
    CASE 
        WHEN c.subscription_tier != 'free' THEN 'Unlimited'
        ELSE (c.monthly_quote_limit - c.monthly_quote_count)::TEXT || ' quotes left'
    END as available_quotes
FROM auth.users au
LEFT JOIN public.companies c ON (au.raw_user_meta_data::jsonb->>'company_id')::INTEGER = c.id
ORDER BY c.subscription_tier DESC NULLS LAST, au.email;

-- Setup summary
SELECT 
    E'\n=== TEST DATA SETUP COMPLETE ===\n' ||
    E'\nYour existing accounts have been updated:\n' ||
    E'  gaspari.giuseppe@gmail.com -> Free tier (5 quotes/month)\n' ||
    E'  gaspari.giuseppe123@gmail.com -> Pro tier (unlimited)\n' ||
    E'\nCompany Access Codes:\n' ||
    E'  TEST-FREE-2024 - Free tier company\n' ||
    E'  TEST-PRO-2024 - Pro tier company\n' ||
    E'  TEST-LIMIT-2024 - Free tier at limit (no quotes left)\n' ||
    E'\nYou can create new users with these access codes!'
    as setup_summary;