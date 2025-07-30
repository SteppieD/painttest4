# PaintQuote Pro Code Style Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled
- **Target**: ES2015
- **Module**: ESNext with bundler resolution
- **JSX**: Preserve for Next.js
- **Path Aliases**: `@/*` maps to root

## ESLint Rules
- Extends Next.js core-web-vitals
- TypeScript ESLint recommended rules
- Warnings (not errors) for:
  - Unused variables
  - Any types
  - Unescaped entities
  - Prefer const over let/var

## Code Organization Patterns

### 1. Component Structure
- **Functional Components** with TypeScript
- **Props interfaces** defined with TypeScript
- **Variant system** using class-variance-authority
- **ForwardRef** for UI components
- **cn() utility** for className merging

### 2. API Route Patterns
```typescript
export async function GET() {
  try {
    // Business logic
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
```

### 3. Database Access
- Always use database adapters
- Async/await pattern
- Error handling with try/catch
- Type-safe returns

### 4. File Naming
- **Components**: PascalCase (Button.tsx)
- **Utilities**: camelCase (seoUtils.ts)
- **API Routes**: route.ts
- **Types**: types.ts or inline interfaces

### 5. Import Organization
1. React/Next imports
2. Third-party libraries
3. Internal components
4. Utilities and helpers
5. Types and interfaces

### 6. State Management
- React hooks (useState, useEffect)
- Custom hooks in /hooks directory
- Context API for global state
- No external state libraries

### 7. Styling Approach
- Tailwind CSS utilities
- Component variants with CVA
- No CSS modules
- Responsive design with Tailwind breakpoints

### 8. Error Handling
- Try/catch blocks in async functions
- Consistent error response format
- Console.error for debugging
- User-friendly error messages

### 9. Authentication Pattern
- JWT tokens in cookies
- Server-side validation
- Client-side auth wrapper
- Protected route middleware

### 10. Type Safety
- Explicit return types encouraged
- Interface over type aliases
- Avoid any types
- Zod for runtime validation

## Best Practices
1. Keep components small and focused
2. Extract reusable logic to hooks
3. Use semantic HTML elements
4. Implement proper ARIA labels
5. Optimize for Core Web Vitals
6. Write descriptive variable names
7. Comment complex business logic
8. Test edge cases
9. Handle loading and error states
10. Implement proper SEO metadata