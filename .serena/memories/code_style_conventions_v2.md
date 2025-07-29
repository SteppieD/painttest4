# PaintTest4 Code Style Conventions

## TypeScript Conventions
- **Strict Mode**: Enabled in tsconfig.json
- **Type Imports**: Use `import type` for type-only imports
- **Interfaces over Types**: Prefer interfaces for object shapes
- **Explicit Return Types**: For public functions and methods

## File Organization
- **Naming**: kebab-case for files (e.g., quote-calculator.ts)
- **Components**: PascalCase for React components
- **Exports**: Named exports preferred, default for pages
- **Barrel Exports**: Index files for clean imports

## React Patterns
- **Functional Components**: No class components
- **'use client'**: Explicit client component declaration
- **Server Components**: Default for pages
- **Custom Hooks**: Prefix with 'use' (e.g., useAuth)

## API Routes
- **File Name**: Always `route.ts` in Next.js 14
- **HTTP Methods**: Export named functions (GET, POST, etc.)
- **Response Format**: Consistent JSON structure
- **Error Handling**: Try-catch with proper status codes

## Styling
- **Tailwind Classes**: Utility-first approach
- **Component Variants**: Using class-variance-authority (cva)
- **Dark Mode**: CSS variables with Tailwind
- **Responsive**: Mobile-first design

## State Management
- **Form State**: React Hook Form with Zod
- **Server State**: Direct API calls, no global state
- **Local State**: useState for component state
- **URL State**: useSearchParams for filters

## Database Queries
- **Adapter Pattern**: Use getDatabaseAdapter()
- **Prepared Statements**: For SQL queries
- **Error Handling**: Graceful degradation
- **Type Safety**: Define interfaces for results

## Common Patterns
```typescript
// API Route Pattern
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validation with Zod
    const validated = schema.parse(body)
    // Business logic
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 400 })
  }
}

// Component Pattern
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  const [state, setState] = useState(false)
  return <Button onClick={() => setState(!state)}>Click</Button>
}
```

## Import Order
1. External packages
2. Next.js imports
3. Internal aliases (@/*)
4. Relative imports
5. Types/interfaces

## Environment Variables
- **Naming**: UPPERCASE_SNAKE_CASE
- **Prefixes**: NEXT_PUBLIC_ for client-side
- **Validation**: Check existence on startup