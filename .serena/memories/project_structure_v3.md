# PaintQuote Pro Project Structure

## Root Directory Layout
```
paintquotepro/
├── app/                    # Next.js App Router
├── components/            # React components
├── lib/                   # Core business logic
├── public/               # Static assets
├── types/                # TypeScript types
├── hooks/                # Custom React hooks
├── styles/               # Global styles
├── scripts/              # Utility scripts
├── tests/                # Test files
├── patches/              # NPM patches
└── resources/            # Additional resources
```

## Key Directories

### /app - Application Routes
- **(seo-pages)**: Public marketing pages
- **dashboard**: Protected application area
- **api**: Backend API endpoints
- **auth**: Authentication pages
- **[feature]**: Feature-specific pages

### /components - UI Components
- **ui**: Base components (Button, Card, etc.)
- **quote-form**: Quote creation workflow
- **chat**: AI assistant interface
- **seo**: SEO components (breadcrumbs)
- **billing**: Payment components
- **calculators**: Pricing calculators

### /lib - Core Logic
- **database**: DB adapters and schemas
- **auth**: Authentication utilities
- **ai**: AI service integrations
- **email**: Email service
- **stripe**: Payment processing
- **services**: Business logic
- **validations**: Zod schemas
- **config**: App configuration

### Configuration Files
- **next.config.js**: Next.js config
- **tsconfig.json**: TypeScript config
- **.eslintrc.json**: Linting rules
- **tailwind.config.ts**: Styling config
- **docker-compose.yml**: Container setup
- **vercel.json**: Deployment config

### Environment Setup
- **.env.example**: Template for env vars
- **.env.local**: Local development
- **.env.production**: Production vars
- **.env.docker**: Docker environment

### Documentation
- **README.md**: Getting started
- **PROJECT_OVERVIEW.md**: High-level view
- **DEVELOPMENT_GUIDE.md**: Dev instructions
- **ARCHITECTURE.md**: Technical details
- Multiple feature-specific docs

## Import Aliases
- `@/*`: Maps to project root
- Clean imports like `@/components/ui/button`

## File Naming Conventions
- Components: PascalCase.tsx
- Utilities: camelCase.ts
- API Routes: route.ts
- Types: types.ts or [feature].types.ts

## Build Artifacts
- **.next**: Build output (gitignored)
- **node_modules**: Dependencies (gitignored)
- **painting_quotes_app.db**: SQLite DB (gitignored)