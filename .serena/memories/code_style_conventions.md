# PaintQuote Pro - Code Style & Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled (`"strict": true`)
- **Target**: ES2015
- **Module**: ESNext with bundler resolution
- **No Explicit Any**: Strongly discouraged, TypeScript warnings enforced
- **Path Mapping**: `@/*` maps to project root for absolute imports

## ESLint Rules
- **Base**: Next.js core web vitals + TypeScript recommended
- **Unused Variables**: Warning, prefix with `_` to ignore
- **No Explicit Any**: Warning level (should be avoided)
- **React**: Unescaped entities and comment text warnings
- **Preference**: const over let, no var usage

## Prettier Configuration
- **Semicolons**: Disabled (`"semi": false`)
- **Quotes**: Single quotes (`"singleQuote": true`)
- **Print Width**: 100 characters
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 style
- **Arrow Parens**: Always include
- **Bracket Spacing**: Enabled
- **End of Line**: LF

## File Naming Conventions
- **Components**: PascalCase (e.g., `QuoteForm.tsx`, `EmailService.ts`)
- **Pages**: kebab-case for routes (e.g., `create-quote/page.tsx`)
- **Utilities**: camelCase (e.g., `quote-calculator.ts`)
- **Types**: PascalCase interfaces (e.g., `CompanyAuth`, `QuoteData`)
- **Constants**: UPPER_SNAKE_CASE for configuration

## Code Organization Patterns
- **Interface Definitions**: Always define TypeScript interfaces for data structures
- **Function Declarations**: Prefer `const functionName = ()` over `function functionName()`
- **Export Patterns**: Named exports preferred, default exports for pages/components
- **Error Handling**: Use try-catch blocks, proper error typing
- **Async/Await**: Preferred over .then() chains

## Component Patterns
- **React Components**: Functional components with TypeScript
- **Props Interfaces**: Always define prop types
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Event Handlers**: Type event parameters properly
- **JSX**: Use proper React fragments, escape entities correctly

## API Route Patterns
- **Route Handlers**: Use Next.js 13+ App Router format
- **Request/Response**: Proper typing with NextRequest/NextResponse
- **Error Responses**: Consistent error formatting with status codes
- **Authentication**: JWT validation middleware patterns
- **Database**: Use adapter pattern for database operations

## Import Organization
1. External libraries (React, Next.js, third-party)
2. Internal utilities and helpers
3. Components and UI elements
4. Types and interfaces
5. Relative imports

## Comments & Documentation
- **JSDoc**: Use for public APIs and complex functions
- **Inline Comments**: Explain business logic, not obvious code
- **TODO Comments**: Prefix with TODO: for future improvements
- **Type Comments**: Document complex type definitions

## Git Commit Conventions
- **Format**: `type: description`
- **Types**: feat, fix, docs, chore, test, refactor
- **Description**: Concise present-tense description
- **Pre-commit**: Automatic linting and formatting via Husky