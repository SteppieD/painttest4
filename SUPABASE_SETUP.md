# Supabase Setup Guide for PaintQuote Pro

## Prerequisites
- A Supabase account (free tier is fine)
- Access to your Supabase project dashboard

## Step 1: Create a New Supabase Project
1. Go to https://app.supabase.com
2. Create a new project
3. Save your project URL and anon key

## Step 2: Run the Migration Script
1. In your Supabase dashboard, go to the SQL Editor
2. Copy the entire contents of `supabase/migrations/001_create_tables.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the script

This will:
- Drop any existing conflicting tables
- Create the proper schema with lowercase table names
- Enable Row Level Security (RLS)
- Add basic RLS policies
- Insert demo company data

## Step 3: Get Your Environment Variables
From your Supabase project settings, you'll need:

```env
# In Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Configure Vercel Environment Variables
In your Vercel project settings, add these environment variables:

1. `USE_SUPABASE` = `true`
2. `NEXT_PUBLIC_SUPABASE_URL` = (your Supabase URL)
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your Supabase anon key)
4. `SUPABASE_URL` = (same as NEXT_PUBLIC_SUPABASE_URL)
5. `SUPABASE_ANON_KEY` = (same as NEXT_PUBLIC_SUPABASE_ANON_KEY)
6. `OPENROUTER_API_KEY` = (your OpenRouter API key)
7. `NEXTAUTH_SECRET` = (generate with: `openssl rand -base64 32`)
8. `NEXTAUTH_URL` = `https://your-app.vercel.app`

## Step 5: Test Access Codes
After running the migration, you can test with these demo access codes:
- `DEMO2024`
- `PAINTER001`
- `CONTRACTOR123`

## Troubleshooting

### Error: "Table already exists"
If you get errors about tables already existing, you may need to manually drop the old tables first:
```sql
DROP TABLE IF EXISTS public."Quote" CASCADE;
DROP TABLE IF EXISTS public."Customer" CASCADE;
DROP TABLE IF EXISTS public."User" CASCADE;
DROP TABLE IF EXISTS public."Company" CASCADE;
DROP TABLE IF EXISTS public.company_users CASCADE;
```

### RLS Policies
The current RLS policies are very permissive for demo purposes. For production, you should:
1. Implement proper authentication
2. Update policies to restrict access based on user/company ID
3. Add policies for INSERT, UPDATE, and DELETE operations

### Performance
The slow queries shown in your Supabase dashboard are related to schema introspection and shouldn't affect normal operation. However, ensure you have proper indexes on frequently queried columns.

## Next Steps
1. Deploy to Vercel with the environment variables set
2. Test the application with one of the demo access codes
3. Customize RLS policies for production use
4. Add more companies through the API or Supabase dashboard