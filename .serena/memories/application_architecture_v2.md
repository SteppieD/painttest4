# PaintQuote Pro Application Architecture

## Directory Structure

### `/app` - Next.js App Router
- **Layout**: Root layout with metadata and font configuration
- **Page Routes**: 
  - SEO pages (painting-contractors, calculators, etc.)
  - Dashboard (protected area)
  - Authentication (login, signup, access-code)
  - Trial and onboarding flows
  - API routes under `/api`

### `/components` - React Components
- **`/ui`**: Base UI components (Radix UI based)
- **`/quote-form`**: Multi-step quote creation form
- **`/chat`**: AI chat assistant components
- **`/seo`**: SEO-specific components (breadcrumbs, schema)
- **`/billing`**: Subscription and payment components
- **`/calculators`**: Interactive pricing calculators
- **`/achievements`**: Gamification components

### `/lib` - Core Business Logic
- **`/database`**: Database adapters (SQLite/Supabase)
- **`/auth`**: Authentication utilities
- **`/ai`**: AI service integrations
- **`/email`**: Email service integration
- **`/stripe`**: Payment processing
- **`/services`**: Business logic services
- **`/validations`**: Zod schemas

### `/public` - Static Assets
- Images, fonts, and other static files

### `/types` - TypeScript Type Definitions
- Shared types and interfaces

## Key Architectural Patterns

### 1. Multi-Tenant Architecture
- Companies table with access codes
- User sessions linked to companies
- Quote and customer data scoped by company

### 2. Database Abstraction
- Adapter pattern for SQLite (dev) and Supabase (prod)
- Unified API across both databases
- Memory adapter for testing

### 3. Authentication Flow
- JWT-based authentication
- Access code system for multi-tenant access
- Protected routes via middleware
- Client-side auth wrapper component

### 4. AI Integration
- Multiple AI providers (OpenAI, Anthropic, Google)
- Unified chat interface
- Quote generation assistance

### 5. SEO-First Design
- Static generation for marketing pages
- Dynamic sitemap generation
- Structured data with JSON-LD
- Core Web Vitals monitoring

## Application Flow

1. **Public Pages**: SEO-optimized landing pages
2. **Authentication**: Access code or email/password
3. **Dashboard**: Main app interface
4. **Quote Creation**: Multi-step form or AI assistant
5. **Quote Management**: View, edit, send quotes
6. **Customer Portal**: Client quote viewing

## API Structure
- RESTful endpoints under `/api`
- Authentication middleware
- Rate limiting support
- Health checks and monitoring