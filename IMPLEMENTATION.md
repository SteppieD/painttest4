# PaintQuote Pro - Implementation Guide

## 📋 Overview

This document provides a comprehensive map of how all components in PaintQuote Pro are interconnected. It serves as the central reference for understanding system dependencies, integration points, and implementation status.

**Last Updated**: 2025-08-20  
**Version**: 1.0.0  
**Status**: Active Development

## 🏗️ System Architecture Map

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
├─────────────────────────────────────────────────────────┤
│  Next.js 14 App Router → React 18 → TypeScript 5        │
│  ↓                                                       │
│  Pages ────→ Components ────→ Hooks ────→ Utils         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                     API Layer                            │
├─────────────────────────────────────────────────────────┤
│  /api Routes → Middleware → Auth → Business Logic        │
│  ↓                                                       │
│  Validation (Zod) → Processing → Response               │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
├─────────────────────────────────────────────────────────┤
│  Prisma ORM → PostgreSQL/SQLite → Migrations            │
│  ↓                                                       │
│  Models → Relations → Indexes → Queries                 │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                 External Services                        │
├─────────────────────────────────────────────────────────┤
│  AI: Anthropic/OpenRouter │ Payments: Stripe            │
│  Email: Resend           │ Storage: Supabase            │
└─────────────────────────────────────────────────────────┘
```

## 🔗 Component Interconnections

### 1. Authentication Flow

**Files Involved**:
- `/lib/auth/client.ts` - JWT generation and validation
- `/lib/auth/middleware.ts` - Route protection
- `/app/api/auth/signin/route.ts` - Login endpoint
- `/app/api/auth/signup/route.ts` - Registration endpoint
- `/middleware.ts` - Global auth middleware

**Flow**:
```
User Login → API Route → Validate Credentials → Generate JWT 
→ Set HTTP-only Cookie → Redirect to Dashboard
```

**Dependencies**:
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT operations
- Database for user storage

**Status**: ✅ Implemented and functional

### 2. Quote Generation System

**Files Involved**:
- `/lib/calculators/quote-calculator-v2.ts` - Core calculation engine
- `/lib/ai/quote-assistant.ts` - AI-powered extraction
- `/app/api/quotes/route.ts` - Quote CRUD operations
- `/app/dashboard/quotes/new/page.tsx` - Quote creation UI
- `/components/quote-form/*` - Multi-step form components

**Flow**:
```
User Input → AI Chat/Form → Data Extraction → Calculator V2 
→ Database Save → PDF Generation (TODO) → Email Send (TODO)
```

**Dependencies**:
- AI services (Anthropic/OpenRouter)
- Prisma for database operations
- React Hook Form for form management

**Status**: ⚠️ Partially implemented (missing PDF and email)

### 3. AI Chat Integration

**Files Involved**:
- `/lib/ai/quote-assistant.ts` - Main AI logic
- `/lib/ai/openrouter-client.ts` - API client
- `/app/api/chat/quote/route.ts` - Chat endpoint
- `/app/dashboard/chat/page.tsx` - Chat UI
- `/components/chat/chat-interface.tsx` - Chat components

**Flow**:
```
User Message → Stream to API → AI Processing → Extract Quote Data 
→ Validate → Return Structured Response → Update UI
```

**Dependencies**:
- Anthropic SDK
- OpenRouter API
- Streaming response handling

**Status**: ✅ Implemented with Claude Sonnet

### 4. Database Schema & Relations

**Core Models**:

```prisma
Company (1) ←→ (N) Users
    ↓            ↓
    ↓            ↓
Customers (N) ←→ (N) Quotes
    ↓                  ↓
Settings          Quote Items
```

**File**: `/prisma/schema.prisma` (conceptual - using adapters)

**Key Relations**:
- Multi-tenant: Company → Users, Customers, Quotes
- Quote lifecycle: Quote → Customer, Items, Status
- Settings: Company/User → JSON settings field

**Status**: ✅ Schema defined, using adapter pattern

### 5. Payment Integration (Stripe)

**Files Involved**:
- `/lib/stripe/stripe-client.ts` - Stripe initialization
- `/lib/stripe/subscription-service.ts` - Subscription management
- `/app/api/stripe/create-checkout-session/route.ts` - Checkout
- `/app/api/stripe/webhooks/route.ts` - Webhook handler
- `/lib/config/stripe-links.ts` - Payment link configuration

**Flow**:
```
User Upgrade → Create Session → Redirect to Stripe 
→ Payment → Webhook → Update User Plan → Grant Access
```

**Dependencies**:
- Stripe SDK
- Webhook signature verification
- Environment variables for keys

**Status**: ⚠️ Basic implementation, needs testing

### 6. SEO & Performance System

**Files Involved**:
- `/app/sitemap.ts` - Dynamic sitemap generation
- `/lib/seo-utils.ts` - SEO utilities
- `/components/Breadcrumbs.tsx` - Schema.org breadcrumbs
- `/components/WebVitalsMonitor.tsx` - Performance tracking
- `/app/api/web-vitals/route.ts` - Metrics collection

**Flow**:
```
Page Load → Render SSR Content → Add Schema Markup 
→ Monitor Web Vitals → Report to API → Analyze Performance
```

**Status**: ✅ Implemented and monitoring

### 7. Settings Management

**Files Involved**:
- `/lib/config/pricing-config.ts` - Pricing configuration
- `/lib/helpers/settings-helpers.ts` - Settings utilities
- `/app/api/companies/settings/route.ts` - Settings API
- `/app/dashboard/settings/page.tsx` - Settings UI
- `/components/settings/pricing-config-form.tsx` - Config form

**Flow**:
```
User Settings Page → Load Current Config → Edit Form 
→ Validate → Save to Company.settings (JSON) → Apply Changes
```

**Status**: ✅ Implemented with JSON storage

## 📊 Implementation Status Matrix

| Component | Status | Priority | Dependencies | Notes |
|-----------|--------|----------|--------------|-------|
| **Core Application** |
| Authentication | ✅ Complete | High | JWT, bcrypt | Working |
| Dashboard | ✅ Complete | High | Auth, DB | Basic version |
| Quote Creation | ✅ Complete | High | AI, Calculator | Core feature |
| Quote Management | ✅ Complete | High | DB, Auth | CRUD operations |
| **AI Features** |
| Chat Assistant | ✅ Complete | High | Anthropic/OpenRouter | Claude Sonnet |
| Quote Extraction | ✅ Complete | High | AI, Validation | Working |
| Multi-LLM Parser | 📝 Planned | Medium | OpenAI, Anthropic | Architecture designed |
| **Business Features** |
| Customer Management | ✅ Complete | Medium | DB | Basic CRUD |
| Settings/Config | ✅ Complete | Medium | DB, JSON | Company settings |
| Analytics Dashboard | ⚠️ Partial | Medium | DB queries | Basic metrics only |
| Team Management | ❌ Not Started | Low | Auth, Roles | Future feature |
| **Payments** |
| Stripe Checkout | ⚠️ Partial | High | Stripe SDK | Needs testing |
| Subscription Management | ⚠️ Partial | High | Webhooks | Basic implementation |
| Payment Links | ✅ Complete | Medium | Stripe | Pre-configured |
| **Communication** |
| Email Sending | ❌ Not Started | High | Resend/SMTP | Critical gap |
| PDF Generation | ❌ Not Started | High | PDF library | Customer requirement |
| SMS Notifications | ❌ Not Started | Low | Twilio | Future feature |
| **SEO & Marketing** |
| SEO Pages | ⚠️ Partial | High | Next.js SSR | 9/50 pages done |
| Sitemap | ✅ Complete | High | Next.js | Dynamic generation |
| Schema Markup | ✅ Complete | High | JSON-LD | Multiple types |
| Web Vitals | ✅ Complete | Medium | Monitoring API | Real-time tracking |
| **Infrastructure** |
| Docker Deployment | ✅ Complete | High | Docker Compose | Ready |
| Database Migrations | ✅ Complete | High | Prisma/Adapters | Working |
| Error Handling | ⚠️ Partial | Medium | Try-catch blocks | Needs Sentry |
| Logging | ⚠️ Partial | Medium | Console only | Needs structure |
| Testing | ❌ Not Started | Medium | Jest, Playwright | TODO |

## 🔄 Data Flow Patterns

### 1. Request/Response Pattern
```
Client Request → Middleware Auth Check → API Route Handler 
→ Business Logic → Database Operation → Response
```

### 2. Streaming Pattern (AI Chat)
```
Client Message → Stream Start → AI Chunks → Parse & Buffer 
→ Complete Response → Final Validation
```

### 3. Webhook Pattern (Stripe)
```
External Event → Webhook Endpoint → Signature Verify 
→ Process Event → Update Database → Acknowledge
```

### 4. Form Submission Pattern
```
Form Input → Client Validation → API Submission 
→ Server Validation → Process → Database → Response
```

## 🔌 Integration Points

### Internal Integrations

| From | To | Method | Purpose |
|------|-----|---------|----------|
| Frontend | API Routes | REST | Data operations |
| API Routes | Database | Prisma | Data persistence |
| API Routes | AI Services | HTTP | Quote generation |
| Middleware | Auth Library | Function calls | Route protection |
| Components | Hooks | React | State management |
| Settings | Calculator | JSON config | Pricing rules |

### External Integrations

| Service | Integration Type | Status | Used For |
|---------|-----------------|---------|----------|
| Anthropic | API (Direct) | ✅ Active | AI chat |
| OpenRouter | API (SDK) | ✅ Active | AI fallback |
| Stripe | SDK + Webhooks | ⚠️ Partial | Payments |
| Supabase | Client SDK | ⚠️ Optional | Database/Auth |
| Resend | API | ❌ Planned | Email |
| Vercel | Platform | ✅ Ready | Deployment |
| PostgreSQL | Connection | ✅ Active | Database |

## 🚧 Implementation Gaps

### Critical Gaps (Must Fix)

1. **Email Functionality**
   - No quote sending via email
   - No welcome emails
   - No payment confirmations
   - **Impact**: Poor customer experience
   - **Solution**: Implement Resend or SMTP

2. **PDF Generation**
   - Quotes can't be downloaded
   - No printable format
   - **Impact**: Professional appearance lacking
   - **Solution**: Add PDF library (react-pdf or puppeteer)

3. **Error Recovery**
   - No proper error boundaries
   - Limited error messages
   - **Impact**: Poor UX on failures
   - **Solution**: Add error boundaries and logging

### Important Gaps (Should Fix)

1. **Testing Suite**
   - No unit tests
   - No integration tests
   - No E2E tests
   - **Impact**: Quality assurance risk
   - **Solution**: Implement Jest + Playwright

2. **Advanced Analytics**
   - Limited business metrics
   - No conversion tracking
   - **Impact**: Can't optimize business
   - **Solution**: Enhance dashboard queries

3. **Team Features**
   - Single user only
   - No role management
   - **Impact**: Limited to solopreneurs
   - **Solution**: Add RBAC system

## 🛠️ Development Workflow

### Adding New Features

1. **Plan**: Update this IMPLEMENTATION.md with design
2. **Schema**: Update database models if needed
3. **API**: Create/modify API routes
4. **UI**: Build React components
5. **Connect**: Wire up data flow
6. **Test**: Manual testing (automated TODO)
7. **Document**: Update relevant .md files

### Modifying Existing Features

1. **Locate**: Use this guide to find all touchpoints
2. **Assess**: Check dependencies and impacts
3. **Update**: Modify all related files
4. **Validate**: Ensure type safety with TypeScript
5. **Test**: Check all integration points
6. **Document**: Update this implementation guide

## 📁 Key File Locations

### Configuration Files
- `/lib/config/` - All configuration modules
- `/.env` - Environment variables
- `/prisma/schema.prisma` - Database schema (conceptual)
- `/next.config.js` - Next.js configuration

### Core Business Logic
- `/lib/calculators/` - Quote calculation engines
- `/lib/ai/` - AI integration modules
- `/lib/auth/` - Authentication logic
- `/lib/database/` - Database adapters

### API Endpoints
- `/app/api/auth/` - Authentication routes
- `/app/api/quotes/` - Quote management
- `/app/api/companies/` - Company/settings
- `/app/api/stripe/` - Payment processing
- `/app/api/chat/` - AI chat interface

### UI Components
- `/components/ui/` - Base UI components
- `/components/quote-form/` - Quote form steps
- `/components/chat/` - Chat interface
- `/components/settings/` - Settings forms

### Pages (App Router)
- `/app/dashboard/` - Protected app pages
- `/app/auth/` - Authentication pages
- `/app/(marketing)/` - Public SEO pages
- `/app/api/` - API route handlers

## 🔍 Quick Reference

### Environment Variables Required
```env
# Database
DATABASE_URL=

# Authentication  
JWT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# AI Services
ANTHROPIC_API_KEY=
OPENROUTER_API_KEY=

# Stripe (Optional)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (Future)
RESEND_API_KEY=
```

### Key Dependencies
```json
{
  "core": [
    "next@14",
    "react@18",
    "typescript@5",
    "tailwindcss@3",
    "prisma@5"
  ],
  "auth": [
    "bcryptjs",
    "jsonwebtoken"
  ],
  "ai": [
    "@anthropic-ai/sdk",
    "openai"
  ],
  "payments": [
    "@stripe/stripe-js",
    "@stripe/react-stripe-js"
  ],
  "forms": [
    "react-hook-form",
    "zod"
  ]
}
```

### Database Models Overview
```
Companies: Multi-tenant root
Users: Authentication & access
Customers: Client management  
Quotes: Core business object
Settings: JSON configuration
```

## 🎯 Implementation Priorities

### Phase 1: Complete Core (Current)
- [x] Authentication system
- [x] Quote generation
- [x] AI chat integration
- [x] Basic dashboard
- [ ] Email sending
- [ ] PDF generation

### Phase 2: Enhance Business Features
- [ ] Advanced analytics
- [ ] Team management
- [ ] Quote templates
- [ ] Customer portal
- [ ] Automated follow-ups

### Phase 3: Scale & Optimize
- [ ] Performance optimization
- [ ] Caching layer
- [ ] Background jobs
- [ ] Webhook processing
- [ ] API rate limiting

### Phase 4: Advanced Features
- [ ] Mobile app
- [ ] White labeling
- [ ] API for integrations
- [ ] Advanced AI features
- [ ] International support

## 📈 Monitoring & Maintenance

### What to Monitor
- API response times
- Error rates
- AI token usage
- Database query performance
- Web Vitals scores
- User engagement metrics

### Maintenance Tasks
- Weekly: Review error logs
- Monthly: Update dependencies
- Quarterly: Performance audit
- Yearly: Security review

## 🔐 Security Considerations

### Current Security Measures
- JWT authentication
- HTTP-only cookies
- Password hashing (bcrypt)
- Input validation (Zod)
- SQL injection prevention (Prisma)

### Security Gaps
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] API key rotation
- [ ] Audit logging
- [ ] 2FA support

## 📝 Notes for AI Assistants

When working on this codebase:

1. **Always check this file first** to understand interconnections
2. **Update this file** when adding/modifying features
3. **Follow the patterns** established in existing code
4. **Consider all touchpoints** when making changes
5. **Maintain type safety** throughout the system
6. **Document changes** in relevant .md files

### Common Pitfalls to Avoid
- Don't modify API routes without updating TypeScript types
- Don't change database schema without migrations
- Don't add features without considering auth implications
- Don't forget to update settings when adding configurables
- Don't skip error handling in new endpoints

---

*Implementation Guide Version: 1.0.0*  
*Last Updated: 2025-08-20*  
*Next Review: When adding major features*

## Related Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design details
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development standards
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Business context
- [MCP_SETUP_GUIDE.md](./MCP_SETUP_GUIDE.md) - MCP configuration