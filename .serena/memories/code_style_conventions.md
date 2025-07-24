# Code Style Conventions

## TypeScript
- **Strict mode enabled** in tsconfig.json
- Target: ES2015
- Module resolution: bundler
- Path alias: `@/*` maps to root directory

## ESLint Rules
- Extends: `next/core-web-vitals` and `@typescript-eslint/recommended`
- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-explicit-any`: warn
- `@typescript-eslint/no-non-null-assertion`: off
- `react/no-unescaped-entities`: warn

## React Patterns
- **Functional components** with hooks (no class components)
- **Named exports** for components
- **React.forwardRef** for components that need ref forwarding
- **TypeScript interfaces** for props (not type aliases)

## Styling
- **Tailwind CSS utilities** for styling
- **cn() utility** from `@/lib/utils` for conditional classes
- **Component variants** using class-variance-authority (cva)
- **No inline styles** unless absolutely necessary

## File Naming
- **Components**: PascalCase (e.g., `QuoteForm.tsx`)
- **Utilities**: camelCase (e.g., `seoUtils.ts`)
- **Pages**: lowercase with hyphens (e.g., `painting-contractors`)

## Git Conventions
- **Conventional commits**: feat, fix, docs, chore, style, refactor, test, perf
- **Branch naming**: feature/, fix/, chore/, docs/
- **No direct pushes to main**