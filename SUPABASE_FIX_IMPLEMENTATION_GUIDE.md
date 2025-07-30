# Supabase Fix Implementation Guide

## Quick Start - Immediate Actions

### 1. Run the Missing Tables Migration

```bash
# Apply the new migration to your Supabase instance
psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f supabase/migrations/004_add_missing_tables.sql
```

Or run it directly in Supabase SQL Editor.

### 2. Update the Database Adapter

Replace the current adapter usage in `/lib/database/adapter.ts`:

```typescript
// In getDatabaseAdapter() function, replace line 250:
return new SupabaseAdapter();

// With:
import { SupabaseAdapterFixed } from './supabase-adapter-fixed';
return new SupabaseAdapterFixed();
```

### 3. Update Critical Routes

#### Chat Route (`/app/api/chat/route.ts`)

Replace lines 164-176 with the fixed version from `route-fixed.ts` that uses the new paint products method.

#### Paint Products Route (`/app/api/paint-products/route.ts`)

Replace all `db.query()` calls with Supabase-specific methods:

```typescript
// Instead of:
const user = await db.query('SELECT id FROM users WHERE company_name = ?', [companyName]);

// Use:
const user = await db.getUserByCompanyName(companyName);
```

#### Dashboard Products Page (`/app/dashboard/products/page.tsx`)

Replace the `getProducts` function:

```typescript
async function getProducts(companyId: number) {
  // Use the new adapter method
  const products = await (db as any).getPaintProductsByCompanyId(companyId);
  return products || [];
}
```

## Testing Checklist

After implementing the fixes:

1. **Test Chat Flow**:
   - Start a new quote conversation
   - Verify paint products are loaded
   - Complete a full quote

2. **Test Quote Creation**:
   - Create a quote through the chat
   - Verify it saves to database
   - Check quote appears in dashboard

3. **Test Paint Products**:
   - Navigate to /dashboard/products
   - Verify products display
   - Test CRUD operations

4. **Test Company Settings**:
   - Update company rates
   - Verify changes persist

## Rollback Plan

If issues occur:

1. Revert to memory adapter by setting:
   ```bash
   unset NEXT_PUBLIC_SUPABASE_URL
   unset SUPABASE_SERVICE_ROLE_KEY
   ```

2. The application will automatically fall back to the memory adapter.

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Common Errors and Solutions

### Error: "execute_sql function does not exist"
**Solution**: Apply the migration and update to SupabaseAdapterFixed

### Error: "relation paint_products does not exist"
**Solution**: Run migration 004_add_missing_tables.sql

### Error: "Raw SQL queries not supported"
**Solution**: Update the affected route to use Supabase-specific methods

## Next Steps

1. Monitor error logs after deployment
2. Consider adding more RPC functions for complex queries
3. Implement proper error boundaries in the UI
4. Add integration tests for all database operations