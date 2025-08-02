# TypeScript Build Error Patterns Documentation

This document outlines all the error patterns we encountered during the Vercel build process and how they were fixed. This serves as a reference to prevent similar issues in the future.

## 1. **useSearchParams() Suspense Boundary Error**

**Error:**
```
Error: useSearchParams() should be wrapped in a Suspense boundary at page
```

**Pattern:** Using Next.js 14's `useSearchParams()` hook without a Suspense boundary.

**Fix:**
```typescript
// Before:
export default function GTMProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  // ...
}

// After:
// Split into client component wrapped in Suspense
export default function GTMProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <GTMProviderClient />
      </Suspense>
      {children}
    </>
  );
}
```

## 2. **Type Definition Mismatches**

### 2.1 CreateCompanyData Type Error

**Error:**
```
Type 'CreateCompanyData' is not assignable to parameter of type
Object literal may only specify known properties, and 'id' does not exist
```

**Pattern:** Including auto-generated fields (id, created_at, updated_at) in create types.

**Fix:**
```typescript
// Before:
export type CreateCompanyData = Company;

// After:
export type CreateCompanyData = Omit<Company, 'id' | 'created_at' | 'updated_at'> & {
  created_at?: string;
  updated_at?: string;
};
```

### 2.2 Property Name Mismatches

**Error:**
```
Property 'accessCode' does not exist on type
Property 'access_code' does not exist on type
```

**Pattern:** Inconsistent property naming between TypeScript interfaces and database schema (camelCase vs snake_case).

**Fix:** Ensure consistent naming across all files:
- Database schema uses snake_case: `access_code`
- TypeScript interfaces use camelCase: `accessCode`
- Map properly when interfacing with database

## 3. **Interface Property Mismatches**

### 3.1 Company Interface

**Errors:**
```
Property 'is_trial' does not exist
Property 'quote_limit' does not exist
```

**Fix:** Updated to use correct properties:
- `is_trial` → `subscription_tier`
- `quote_limit` → `monthly_quote_limit`

### 3.2 Quote Interface

**Errors:**
```
Property 'rooms' does not exist
Property 'conversation_summary' does not exist
Property 'final_price' does not exist
```

**Fix:** Use correct properties:
- `rooms` → `surfaces`
- `conversation_summary` → removed
- `final_price` → `pricing`

## 4. **Database Query Type Assertions**

**Error:**
```
Type 'unknown' is not assignable to type
Cannot read property 'length' of unknown
```

**Pattern:** db.query() returns unknown type, needs type assertion.

**Fix:**
```typescript
// Before:
const result = await db.query(sql);
if (result.length > 0) { }

// After:
const result = await db.query(sql) as Array<{id: number}>;
if (result.length > 0) { }
```

## 5. **Error Handling in Catch Blocks**

**Error:**
```
'error' is of type 'unknown'
```

**Pattern:** TypeScript catch blocks have unknown type errors.

**Fix:**
```typescript
// Before:
catch (error) {
  console.error('Error:', error.message);
}

// After:
catch (error) {
  console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
}
```

## 6. **JSX Entity Escaping**

**Error:**
```
Syntax error: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
```

**Pattern:** Unescaped quotes and apostrophes in JSX.

**Fix:**
```typescript
// Before:
<p>"The AI feature is incredible. I describe the job and it creates a perfect quote."</p>

// After:
<p>&quot;The AI feature is incredible. I describe the job and it creates a perfect quote.&quot;</p>
```

## 7. **Missing UI Component Imports**

**Error:**
```
Cannot find name 'Button'
Cannot find name 'Card'
Cannot find name 'Badge'
```

**Pattern:** UI component imports were commented out with // TODO comments.

**Fix:** Uncommented all UI component imports:
```typescript
// Before:
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed

// After:
import { Button } from '@/components/ui/button'
```

## 8. **Destructuring Syntax Errors**

**Error:**
```
Syntax error: Unexpected token, expected ","
```

**Pattern:** Incorrect destructuring syntax introduced by automated tools.

**Fix:**
```typescript
// Before:
export default async function Page(_{ params }: { params: Promise<{ id: string }> }) {

// After:
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
```

## Prevention Strategies

1. **Use TypeScript Strict Mode**: Enable strict type checking to catch type mismatches early.

2. **Consistent Naming Convention**: 
   - Database: snake_case
   - TypeScript: camelCase
   - Use mapping functions when interfacing between them

3. **Type Assertions for Database Queries**: Always assert types for db.query() results.

4. **Suspense Boundaries**: Wrap any component using useSearchParams() in Suspense.

5. **ESLint Configuration**: Configure ESLint to catch:
   - Unescaped entities in JSX
   - Unused imports
   - Type safety issues

6. **Pre-commit Hooks**: Run TypeScript compilation and ESLint before commits.

7. **Test Builds Locally**: Always run `npm run build` before pushing to catch compilation errors.

8. **Documentation**: Keep this document updated with new error patterns as they're discovered.