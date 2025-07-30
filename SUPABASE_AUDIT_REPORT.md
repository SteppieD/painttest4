# Supabase Integration Audit Report

## Executive Summary

This audit reveals critical compatibility issues between the application and Supabase that are causing failures in the chat flow and other database operations. The primary issue is the use of raw SQL queries through non-existent RPC functions and missing database tables.

## Critical Issues Found

### 1. ❌ **Non-existent `execute_sql` RPC Function**

**Location**: `/lib/database/adapter.ts` (lines 226-230)

The `SupabaseAdapter` attempts to use an RPC function called `execute_sql` that doesn't exist in Supabase:

```typescript
async query(sql: string, params: any[] = []): Promise<any> {
  const { data, error } = await this.client.rpc('execute_sql', {
    query: sql,
    params: params
  });
  if (error) throw error;
  return data;
}
```

**Impact**: Any code that calls `db.query()` or `db.getAll()` will fail with a Supabase error.

**Affected Routes**:
- `/app/api/chat/route.ts` - Fetches paint products using raw SQL
- `/app/api/paint-products/route.ts` - All CRUD operations use raw SQL
- `/app/api/companies/route.ts` - Company queries use raw SQL
- `/app/api/test-db/route.ts` - Database testing fails
- `/app/dashboard/products/page.tsx` - Product listing fails

### 2. ❌ **Missing `paint_products` Table**

The Supabase migrations don't include the `paint_products` table, but it's heavily used throughout the application:

**Affected Files**:
- `/app/api/chat/route.ts` (line 166) - Queries paint products for AI context
- `/app/api/paint-products/route.ts` - Entire route depends on this table
- `/app/dashboard/products/page.tsx` - Product management page

### 3. ❌ **Missing Other Tables**

Several tables defined in `/lib/database/unified-schema.sql` are not created in Supabase migrations:
- `access_codes`
- `access_code_sessions`
- `profiles`
- `cost_settings`
- `projects`
- `chat_messages`
- `quote_versions`
- `company_branding`
- `subscription_plans`
- `company_subscriptions`
- `quote_usage`

### 4. ⚠️ **SQLite-specific SQL Syntax**

Some queries use SQLite-specific syntax that may not work with PostgreSQL:
- `AUTOINCREMENT` vs `SERIAL`
- `DATETIME` vs `TIMESTAMPTZ`
- `randomblob()` vs `gen_random_uuid()`

### 5. ⚠️ **Database Type Differences**

- SQLite uses `TEXT` for UUIDs, while Supabase uses proper `UUID` type
- SQLite stores JSON as `TEXT`, while PostgreSQL has native `JSON/JSONB` types
- Decimal handling differences between SQLite and PostgreSQL

## Specific Route Analysis

### `/app/api/chat/route.ts`
- **Line 166-176**: Uses `db.getAll()` with raw SQL to fetch paint products
- **Impact**: Chat flow fails when trying to get company context

### `/app/api/paint-products/route.ts`
- **Lines 41-44, 104-107**: Uses `db.query()` for all database operations
- **Impact**: Paint product management completely non-functional

### `/app/api/companies/route.ts`
- **Lines 22-39, 53-60, 67**: Uses `db.query()` for fetching companies
- **Impact**: Company data retrieval fails

### `/app/dashboard/products/page.tsx`
- **Lines 20-26**: Uses `db.getAll()` to fetch products
- **Impact**: Dashboard product page shows no data

## Recommended Fixes

### Fix 1: Remove `execute_sql` Dependency

Create a new file `/lib/database/supabase-adapter-fixed.ts`:

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseAdapter } from './adapter';

export class SupabaseAdapterFixed implements DatabaseAdapter {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  // Implement all methods using Supabase's native query builder
  // Remove query() and getAll() methods or implement them differently
  
  // For paint products, create specific methods:
  async getPaintProductsByUserId(userId: string): Promise<any[]> {
    const { data, error } = await this.client
      .from('paint_products')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUserByCompanyName(companyName: string): Promise<any> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('company_name', companyName)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Remove the generic query method
  async query(sql: string, params?: any[]): Promise<any> {
    throw new Error('Raw SQL queries not supported with Supabase. Use specific methods instead.');
  }

  async getAll(query: string, params?: any[]): Promise<any[]> {
    throw new Error('Raw SQL queries not supported with Supabase. Use specific methods instead.');
  }
}
```

### Fix 2: Create Missing Tables Migration

Create `/supabase/migrations/004_add_missing_tables.sql`:

```sql
-- Create paint_products table
CREATE TABLE IF NOT EXISTS public.paint_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  use_case TEXT NOT NULL,
  cost_per_gallon DECIMAL NOT NULL,
  coverage_rate DECIMAL DEFAULT 350,
  sheen TEXT,
  is_preferred BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  brand TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_paint_products_user_id ON paint_products(user_id);
CREATE INDEX IF NOT EXISTS idx_paint_products_use_case ON paint_products(use_case);

-- Enable RLS
ALTER TABLE public.paint_products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own paint products" ON public.paint_products
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own paint products" ON public.paint_products
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own paint products" ON public.paint_products
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own paint products" ON public.paint_products
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Grant permissions
GRANT ALL ON paint_products TO authenticated;
```

### Fix 3: Update API Routes

For `/app/api/chat/route.ts`, replace the paint products query (lines 164-176):

```typescript
// Replace raw SQL query with Supabase-specific approach
let paintProducts = [];
try {
  // First get the user
  const userData = await db.getUserByEmail(company.email);
  if (userData) {
    // Then get their paint products
    const { data: products } = await supabase
      .from('paint_products')
      .select('*')
      .eq('user_id', userData.id)
      .eq('is_active', true)
      .limit(3);
    
    paintProducts = products || [];
  }
} catch (err) {
  console.log('[CHAT] Paint products query failed:', err);
  // Continue without paint products
}
```

### Fix 4: Update Dashboard Page

For `/app/dashboard/products/page.tsx`, replace the getProducts function:

```typescript
async function getProducts(companyId: number) {
  // Get company to find associated user
  const company = await db.getCompany(companyId);
  if (!company) return [];
  
  // Get user by company name
  const user = await db.getUserByEmail(company.email);
  if (!user) return [];
  
  // Use Supabase client directly for complex queries
  const { data: products } = await supabase
    .from('paint_products')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  return products || [];
}
```

## Migration Strategy

1. **Immediate Actions**:
   - Run the missing tables migration in Supabase
   - Deploy the fixed adapter implementation
   - Update all routes to use Supabase-compatible queries

2. **Short-term**:
   - Create helper methods in the adapter for common query patterns
   - Add proper error handling for Supabase-specific errors
   - Implement proper RLS policies for all tables

3. **Long-term**:
   - Consider using Supabase's Edge Functions for complex queries
   - Implement proper database abstraction layer
   - Add integration tests for all database operations

## Testing Checklist

After implementing fixes, test:
- [ ] Chat flow can fetch paint products
- [ ] Quote creation works end-to-end
- [ ] Dashboard displays company data
- [ ] Paint products CRUD operations
- [ ] Company settings updates
- [ ] User authentication flow

## Conclusion

The application currently has significant Supabase compatibility issues that prevent core functionality from working. The primary issue is attempting to use raw SQL queries through a non-existent RPC function. All database operations need to be refactored to use Supabase's native query builder or properly implemented RPC functions.