# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled
- **Target**: ES5 with modern lib support
- **Module Resolution**: Bundler
- **Path Aliases**: `@/*` maps to root directory

## ESLint Rules
- TypeScript recommended rules enabled
- Warnings for:
  - Unused variables
  - Explicit any types
  - Ban types
  - Unescaped entities
  - var usage
- Disabled/Off:
  - Explicit module boundary types
  - Non-null assertions

## Code Organization
- **App Router Pattern**: All routes in `/app` directory
- **Component Structure**: 
  - Reusable UI components in `/components/ui`
  - Feature-specific components in feature folders
  - Form components in `/components/quote-form`
- **API Routes**: In `/app/api`
- **Utilities**: In `/lib` directory

## Naming Conventions
- **Files**: kebab-case (e.g., `quote-form.tsx`)
- **Components**: PascalCase (e.g., `QuoteForm`)
- **Functions**: camelCase (e.g., `calculateQuote`)
- **Types/Interfaces**: PascalCase with descriptive names

## Component Patterns
- Functional components with TypeScript interfaces for props
- React Hook Form for form handling
- Zod schemas for validation
- Radix UI for accessible components

## Git Workflow
- Feature branches: `feature/`, `fix/`, `chore/`, `docs/`
- Conventional commits format
- Never push directly to main
- Local development first policy