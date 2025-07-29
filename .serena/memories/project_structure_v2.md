# PaintTest4 Project Structure

## Root Directory Layout
- **app/**: Next.js 14 app directory containing pages, API routes, and layouts
- **components/**: Reusable React components organized by category
- **lib/**: Core business logic, utilities, and services
- **types/**: TypeScript type definitions
- **public/**: Static assets
- **styles/**: Global CSS and styling files
- **hooks/**: Custom React hooks
- **scripts/**: Build and deployment scripts
- **supabase/**: Database migrations and setup
- **patches/**: Code patches
- **tests/**: Test files
- **.claude/**: Claude-specific configuration

## Key Application Directories

### /app Structure
- **api/**: REST API endpoints organized by resource
- **dashboard/**: Protected admin/customer dashboard pages
- **auth/**: Authentication pages (signin, signup, verify)
- **guides/**: Content marketing pages for SEO
- **locations/**: Location-specific landing pages
- Multiple feature-specific pages for paint calculation tools

### /lib Structure
- **ai/**: AI integrations (OpenRouter, quote parsing)
- **auth/**: Authentication logic (magic links, sessions, access codes)
- **calculators/**: Quote calculation business logic
- **chat/**: Conversation management for quote assistant
- **database/**: Database adapters (SQLite, Supabase, Memory)
- **email/**: Email sending functionality (Resend integration)
- **services/**: Business services (subscriptions)
- **stripe/**: Payment processing integration
- **validations/**: Zod schemas for data validation

### /components Structure
- **ui/**: Radix UI-based components (button, dialog, card, etc.)
- **chat/**: Chat interface components
- **quote-form/**: Quote creation form components
- **billing/**: Billing and subscription components
- **calculators/**: Calculator UI components
- **achievements/**: Gamification components
- **stripe/**: Stripe payment components

## Configuration Files
- **package.json**: Node.js dependencies and scripts
- **tsconfig.json**: TypeScript configuration
- **tailwind.config.ts**: Tailwind CSS configuration
- **.env files**: Environment configuration
- **docker-compose.yml**: Docker configuration
- **vercel.json**: Vercel deployment settings