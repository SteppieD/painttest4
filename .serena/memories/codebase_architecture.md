# PaintQuote Pro - Codebase Architecture

## Directory Structure Overview

```
/app                     # Next.js App Router (pages and API routes)
  /api                   # Backend API endpoints
    /auth                # Authentication endpoints
    /quotes              # Quote management APIs
    /email               # Email automation APIs
    /analytics           # Analytics and reporting APIs
    /stripe              # Payment processing APIs
    /ai                  # AI integration endpoints
  /dashboard            # Protected dashboard pages
  /create-quote         # Quote creation flow
  /(marketing)          # Public SEO pages
  /guides               # Educational content pages
  /locations            # Location-specific landing pages

/components             # React components
  /ui                   # shadcn/ui base components
  /quote-form           # Quote creation components
  /analytics            # Dashboard analytics components
  /settings             # Settings and configuration UI

/lib                    # Business logic and utilities
  /ai                   # AI integration services
  /auth                 # Authentication utilities
  /calculators          # Quote pricing algorithms
  /database             # Database adapters and utilities
  /email                # Email services and templates
  /stripe               # Payment processing logic
  /utils                # Shared utility functions

/scripts                # Build and deployment scripts
/docs                   # Project documentation
/tests                  # Test files and configurations
```

## Key Architectural Patterns

### Database Architecture
- **Adapter Pattern**: Abstracted database operations through `lib/database/adapter.ts`
- **Multi-Database Support**: SQLite for development, PostgreSQL (Supabase) for production
- **Prisma Integration**: ORM for type-safe database operations
- **Migration Strategy**: Automated schema management

### Authentication System
- **JWT-based Authentication**: HTTP-only cookies for security
- **Company-based Multi-tenancy**: Each user belongs to a company
- **Access Code System**: Simplified onboarding process
- **Route Protection**: Middleware-based authentication for protected routes

### API Architecture
- **RESTful Design**: Standard HTTP methods and status codes
- **Type-safe APIs**: Zod validation for request/response schemas
- **Error Handling**: Consistent error response format
- **Authentication Middleware**: JWT validation on protected endpoints

### Frontend Architecture
- **Component-based Design**: Reusable React components
- **Form Management**: React Hook Form with Zod validation
- **State Management**: React hooks and context for local state
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Core Business Logic Components

### Quote Generation System
- **Enhanced Quote Calculator** (`lib/calculators/enhanced-quote-calculator.ts`)
- **AI Quote Assistant** (`lib/ai/quote-assistant.ts`)
- **Quote Validation** (`lib/validations/quote.ts`)
- **Pricing Configuration** (`lib/config/pricing-config.ts`)

### Email Automation System
- **Email Service** (`lib/email/EmailService.ts`)
- **Automation Service** (`lib/email/EmailAutomationService.ts`)
- **Template System** (`lib/email/templates/`)
- **Resend Integration** (`lib/email/resend-client.ts`)

### Payment Processing
- **Stripe Client** (`lib/stripe/stripe-client.ts`)
- **Subscription Service** (`lib/stripe/subscription-service.ts`)
- **Enhanced Subscription Service** (`lib/stripe/enhanced-subscription-service.ts`)
- **Webhook Handlers** (`app/api/webhooks/stripe/`)

### Analytics & Reporting
- **Analytics Service** (`lib/analytics/`)
- **GTM Integration** (`lib/analytics/gtm.ts`)
- **Event Tracking** (`lib/analytics/track-events.ts`)
- **Performance Monitoring** (`components/WebVitalsMonitor.tsx`)

## Data Flow Architecture

### Quote Creation Flow
1. **User Input** → Quote Form Components
2. **Validation** → Zod schemas and React Hook Form
3. **AI Processing** → OpenRouter/Anthropic APIs
4. **Price Calculation** → Enhanced Quote Calculator
5. **Database Storage** → Supabase via adapter pattern
6. **Email Automation** → Trigger follow-up sequences

### Authentication Flow
1. **Access Code Entry** → Simple authentication system
2. **JWT Generation** → Server-side token creation
3. **Cookie Storage** → HTTP-only secure cookies
4. **Route Protection** → Middleware validation
5. **Company Context** → Multi-tenant data isolation

### Payment Flow
1. **Subscription Selection** → Stripe pricing integration
2. **Payment Processing** → Stripe Checkout/Elements
3. **Webhook Handling** → Subscription status updates
4. **Database Sync** → Company subscription tracking
5. **Feature Access** → Tier-based functionality

## Integration Points

### External Services
- **Supabase**: Primary database and real-time features
- **Vercel**: Hosting and deployment platform
- **Stripe**: Payment processing and subscription management
- **OpenRouter**: AI model routing and management
- **Anthropic**: Claude AI integration
- **Resend**: Email delivery service

### Internal Services
- **Custom CLI**: Project management and automation (`scripts/cli.js`)
- **Database Adapters**: Multi-database abstraction layer
- **Email Templates**: React Email component system
- **Analytics Tracking**: Custom event tracking system

## Security Architecture

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **HTTP-only Cookies**: XSS protection
- **Access Code System**: Simplified but secure onboarding
- **Route-level Protection**: Middleware-based access control

### Data Security
- **Input Validation**: Zod schemas for all user input
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **Environment Variables**: Secure configuration management
- **HTTPS Enforcement**: SSL/TLS in production

### API Security
- **Rate Limiting**: Protection against abuse
- **CORS Configuration**: Cross-origin request management
- **Error Handling**: Secure error messages
- **Authentication Headers**: Proper token validation

## Performance Considerations

### Frontend Performance
- **Next.js App Router**: Optimized routing and rendering
- **Component Lazy Loading**: Dynamic imports for large components
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer integration

### Backend Performance
- **Database Connection Pooling**: Efficient database connections
- **Caching Strategy**: Strategic caching of expensive operations
- **API Response Times**: Target <200ms response times
- **Background Processing**: Async email and notification handling

### Build Performance
- **TypeScript Compilation**: Incremental compilation
- **ESLint Caching**: Faster linting with cache
- **Prettier Integration**: Efficient code formatting
- **Docker Optimization**: Multi-stage builds for production