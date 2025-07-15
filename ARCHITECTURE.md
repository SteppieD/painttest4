# PaintQuote Pro - System Architecture

This document provides comprehensive technical details about the PaintQuote Pro architecture, implementation decisions, and integration strategies.

## 🏗️ Architecture Overview

PaintQuote Pro is built on a modern, scalable architecture optimized for SEO performance and business functionality. The system uses Next.js 14's App Router for server-side rendering and API routes, ensuring optimal search engine visibility while maintaining a responsive user experience.

### Core Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript 5
- **Styling**: Tailwind CSS 3.3 with custom component library
- **Database**: PostgreSQL 15 with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **AI Integration**: Anthropic Claude (via API) and OpenRouter
- **Deployment**: Docker containers, Vercel-ready
- **Monitoring**: Real-time Core Web Vitals tracking

## Current Architecture (2025 SEO-Enhanced)

### System Overview
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  Next.js 14     │────▶│  API Routes      │────▶│  PostgreSQL     │
│  App Router     │     │  + SEO APIs      │     │  + Prisma ORM   │
│  + SEO Pages    │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  SEO System     │     │  Claude Sonnet   │     │  Performance    │
│  + Schema.org   │     │  (AI Chat)       │     │  Monitoring     │
│  + Breadcrumbs  │     │  + OpenRouter    │     │  (Web Vitals)   │
│  + Sitemap      │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### Data Flow

1. **Quote Creation Flow**:
   - User → Chat Interface → Claude Sonnet → Structured Data → Quote Calculator V2 → Database

2. **SEO Content Flow**:
   - User → SEO Pages → Breadcrumbs + Schema → Performance Monitoring → Analytics

3. **Performance Monitoring Flow**:
   - Page Load → WebVitalsMonitor → /api/web-vitals → Performance Database → Alerts

4. **Settings Flow**:
   - User → Settings Page → API → Company.settings (JSON) → Database

5. **Authentication Flow**:
   - User → Login → JWT Generation → HTTP-only Cookie → Protected Routes

## 📁 Project Structure

```
paintquotepro-web/
├── app/                              # Next.js 14 App Router
│   ├── (marketing)/                  # Public SEO pages group
│   ├── dashboard/                    # Protected application routes
│   ├── api/                          # API endpoints
│   ├── auth/                         # Authentication pages
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home page
│   └── sitemap.ts                    # Dynamic sitemap generation
├── components/                       # React components
│   ├── ui/                          # shadcn/ui components
│   ├── quote-form/                  # Multi-step quote form
│   ├── WebVitalsMonitor.tsx         # Performance monitoring
│   └── Breadcrumbs.tsx              # SEO breadcrumbs
├── lib/                             # Utilities and business logic
│   ├── ai/                          # AI integrations
│   ├── prisma.ts                    # Database client singleton
│   ├── auth.ts                      # Auth utilities
│   └── seo-utils.ts                 # SEO helpers
├── prisma/                          # Database schema and migrations
│   ├── schema.prisma                # Database models
│   └── seed.ts                      # Database seeding
├── public/                          # Static assets
├── docker/                          # Docker configurations
│   ├── Dockerfile.simple            # Single-package Dockerfile
│   └── docker-compose.simple.yml    # Docker Compose config
└── types/                           # TypeScript type definitions
```

## 🔐 Authentication Architecture

### JWT-Based Authentication Flow

```typescript
interface AuthFlow {
  1. Login: Email/Password → Validate → Generate JWT
  2. Token: JWT stored in HTTP-only cookie (7 days)
  3. Middleware: Verify JWT on protected routes
  4. Refresh: Auto-refresh before expiry (TODO)
  5. Logout: Clear cookie and invalidate session
}
```

### Security Measures

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Secret**: Strong random string (change in production)
- **Cookie Settings**: httpOnly, secure (HTTPS), sameSite: 'lax'
- **Route Protection**: Middleware checks on /dashboard/* routes
- **CORS**: Configured for production domains

## 💾 Database Architecture

### Prisma Schema Overview

```prisma
// Multi-tenant structure
model Company {
  id          String   @id @default(cuid())
  name        String
  settings    Json     // Flexible settings storage
  users       User[]
  customers   Customer[]
  quotes      Quote[]
}

// User management with roles
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  role        Role     @default(USER)
  company     Company  @relation(...)
}

// Quote lifecycle management
model Quote {
  id          String   @id @default(cuid())
  status      QuoteStatus
  items       Json     // Flexible line items
  aiMetadata  Json?    // AI extraction data
  customer    Customer @relation(...)
}
```

### Database Optimization

- **Indexes**: On frequently queried fields (email, companyId, status)
- **JSON Fields**: For flexible data (settings, quote items)
- **Soft Deletes**: Via deletedAt timestamps (TODO)
- **Audit Trail**: createdAt/updatedAt on all models

## SEO Architecture (2025 Implementation)

### Content Prompting Methodology Integration

Based on 2025 SEO research and Content Prompting methodology, the system implements:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Content Prompting Architecture                │
├─────────────────────────────────────────────────────────────────┤
│  User Intent → AI Content Curation → Topic Authority → Rankings │
└─────────────────────────────────────────────────────────────────┘
         │                   │                  │
         ▼                   ▼                  ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Intent Mapping │ │  Content Clusters│ │  Performance    │
│  - Calculator   │ │  - Software      │ │  - Web Vitals   │
│  - Software     │ │  - Education     │ │  - Schema.org   │
│  - Education    │ │  - Location      │ │  - Internal     │
│  - Location     │ │  - Comparison    │ │    Linking      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### SEO Components Architecture

**1. Page Generation System**
```typescript
interface SEOPageConfig {
  type: 'product' | 'calculator' | 'location' | 'comparison'
  priority: number
  schema: SchemaType[]
  breadcrumbs: BreadcrumbItem[]
  internalLinks: InternalLink[]
}
```

**2. Performance Monitoring**
```typescript
interface WebVitalsSystem {
  monitor: WebVitalsMonitor      // Real-time tracking
  api: '/api/web-vitals'         // Data collection
  thresholds: PerformanceTargets // LCP, INP, CLS alerts
  optimization: AutoOptimizer    // Future: automatic improvements
}
```

**3. Schema Markup System**
```typescript
interface SchemaSystem {
  software: SoftwareApplicationSchema
  service: ServiceSchema
  organization: OrganizationSchema
  breadcrumbs: BreadcrumbListSchema
  faq: FAQPageSchema           // Future
  howTo: HowToSchema          // Future
}
```

### SEO File Structure
```
├── app/
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   ├── painting-contractors/         # Core product (priority 0.9)
│   ├── painting-estimate-software/   # Software focus (priority 0.9)
│   ├── interior-painting-quote-calculator/  # High-converting tool
│   ├── [location-pages]/            # Future: programmatic SEO
│   └── [comparison-pages]/          # Future: vs competitor pages
├── components/
│   ├── Breadcrumbs.tsx              # Schema-enhanced navigation
│   └── WebVitalsMonitor.tsx         # Performance tracking
├── lib/
│   └── seo-utils.ts                 # SEO utilities & topic clusters
└── api/
    └── web-vitals/                  # Performance data collection
```

## 🤖 AI Integration Architecture

### Current AI Implementation

```typescript
// Chat-based quote creation flow
interface AIQuoteSystem {
  chat: {
    model: 'claude-3-sonnet' | 'gpt-4-turbo',
    api: '/api/chat/quote',
    streaming: true,
    context: CompanySettings & ChargeRates
  },
  extraction: {
    structured: true,
    validation: 'schema-based',
    fallback: 'clarifying questions'
  },
  calculation: {
    engine: QuoteCalculatorV2,
    rates: ChargeRates,
    markup: CompanySettings
  }
}
```

### AI-Powered Features

1. **Intelligent Quote Chat** (`/dashboard/chat`)
   - Natural language quote creation
   - Context-aware suggestions
   - Real-time validation
   - Charge rate integration

2. **Quote Data Extraction**
   - Surface identification (walls, ceilings, trim)
   - Measurement parsing (sq ft, linear ft, units)
   - Condition assessment
   - Special requirements detection

3. **Pricing Intelligence**
   - Dynamic rate suggestions
   - Market-based adjustments
   - Profit margin optimization
   - Competitor analysis (future)

## 🚀 Performance Architecture

### Core Web Vitals Monitoring

```typescript
// Real-time performance tracking
interface PerformanceSystem {
  metrics: {
    LCP: 'Largest Contentful Paint',    // Target: <2.5s
    INP: 'Interaction to Next Paint',    // Target: <200ms
    CLS: 'Cumulative Layout Shift',      // Target: <0.1
    FCP: 'First Contentful Paint',      // Target: <1.8s
    TTFB: 'Time to First Byte'          // Target: <800ms
  },
  monitoring: {
    component: 'WebVitalsMonitor',
    endpoint: '/api/web-vitals',
    alerts: 'Slack/Email (TODO)'
  }
}
```

### Performance Optimizations

1. **Server-Side Rendering**: All SEO pages use SSR for faster initial load
2. **Code Splitting**: Dynamic imports for dashboard features
3. **Image Optimization**: Next.js Image component with WebP
4. **Font Loading**: Optimized web fonts with font-display: swap
5. **Caching Strategy**: 
   - Static assets: 1 year cache
   - API responses: 5 minute cache
   - Database queries: Connection pooling

## 🔧 API Architecture

### RESTful API Design

```
/api/
├── auth/
│   ├── login         POST   - User authentication
│   ├── logout        POST   - Session termination
│   └── verify        GET    - Token validation
├── quotes/
│   ├── /             GET    - List quotes
│   ├── /             POST   - Create quote
│   ├── [id]          GET    - Get quote details
│   └── [id]          PATCH  - Update quote
├── chat/
│   └── quote         POST   - AI chat for quotes
├── customers/
│   ├── /             GET    - List customers
│   └── /             POST   - Create customer
└── web-vitals/       POST   - Performance metrics
```

### API Security

- **Rate Limiting**: 100 requests/minute per IP
- **Input Validation**: Zod schemas on all endpoints
- **Error Handling**: Consistent error responses
- **Logging**: Structured logs for debugging

## 🐳 Docker Architecture

### Container Structure

```yaml
services:
  web:
    build: ./Dockerfile.simple
    environment:
      - NODE_ENV=production
      - DATABASE_URL
    ports: 3001:3000
    depends_on: postgres
    
  postgres:
    image: postgres:15-alpine
    volumes: ./data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=paintquotepro
```

### Docker Optimizations

- **Multi-stage builds**: Reduced image size
- **Layer caching**: Faster rebuilds
- **Health checks**: Automatic container recovery
- **Volume mounts**: Persistent data storage

## 🔄 State Management

### Client-Side State

```typescript
// Quote form state management
interface QuoteFormState {
  currentStep: number
  formData: Partial<QuoteFormData>
  validation: ValidationErrors
  isDirty: boolean
}

// Using React hooks for state
const useQuoteForm = () => {
  const [state, dispatch] = useReducer(quoteReducer, initialState)
  // Form logic here
}
```

### Server State

- **Database**: Single source of truth
- **Cache**: Redis for session data (future)
- **Real-time**: WebSockets for live updates (future)

## Integration Plan for Advanced Features

### Phase 1: Enhanced AI Capabilities (Current Focus)

**Goal**: Integrate the multi-LLM quote parsing system

**Files to migrate**:
- `painttest2/lib/intelligent-quote-parser.ts` → `/lib/ai/intelligent-quote-parser.ts`
- Create `/lib/ai/quote-validator.ts` for validation logic

**Implementation steps**:
1. Copy intelligent-quote-parser.ts and adapt imports
2. Update chat API route to use multi-LLM approach:
   ```typescript
   // /api/chat/quote/route.ts
   const parser = new IntelligentQuoteParser(anthropicKey, openaiKey)
   const extractedData = await parser.parseQuoteRequest(conversation)
   const validated = await parser.validateWithGPT4(extractedData)
   ```
3. Integrate with QuoteCalculatorV2 for charge rate calculations

### Phase 2: Enhanced Chat UI (Priority: HIGH)

**Goal**: Improve chat interface with proven patterns

**Updates to make**:
- `/app/dashboard/chat/page.tsx` - Add features from `quote-chat-improvements.tsx`:
  - Typing indicators
  - Message status (sent/delivered/read)
  - Quote preview during conversation
  - Suggested responses
  - File upload support for photos

### Phase 3: Data Models Alignment (Priority: MEDIUM)

**Goal**: Ensure data models support all features

**Schema updates needed**:
```prisma
model Company {
  // Add fields for advanced features
  favoriteProducts Json?  // Array of frequently used products
  templates        Json?  // Quick-start templates
  aiSettings       Json?  // AI behavior customization
}

model Quote {
  // Add fields for enhanced tracking
  aiMetadata      Json?   // AI extraction confidence, models used
  photos          Json?   // Array of photo URLs
  measurements    Json?   // Detailed measurement data
}
```

### Phase 4: Advanced Features (Priority: LOW)

**Features to consider**:
1. Setup wizard for new users
2. Favorite products management
3. Quick templates
4. SEO/marketing pages
5. Advanced reporting

## Technical Integration Details

### 1. Multi-LLM Architecture

```typescript
// Proposed architecture
interface AIQuoteExtractor {
  primaryExtraction: (text: string) => Promise<QuoteData>    // Claude Sonnet 4
  validation: (data: QuoteData) => Promise<ValidationResult> // GPT-4o-mini
  enhancement: (data: QuoteData) => Promise<QuoteData>      // Claude for clarification
}
```

### 2. Charge Rate Integration

The AI system needs to understand charge rates:

```typescript
interface AIContext {
  chargeRates: ChargeRates  // From company settings
  measurementRules: {
    walls: 'square_feet',
    baseboards: 'linear_feet',
    doors: 'unit_count'
    // ...
  }
}
```

### 3. Error Recovery

Implement graceful fallbacks:
- If GPT-4o-mini fails → use only Claude
- If charge rate missing → prompt user
- If extraction fails → ask clarifying questions

### 4. Performance Optimization

- Cache AI responses for similar queries
- Batch API calls when possible
- Stream responses to user
- Implement request debouncing

## Migration Checklist

### Immediate Actions
- [ ] Create `/lib/ai/` directory structure
- [ ] Copy and adapt intelligent-quote-parser.ts
- [ ] Add OpenAI API key to environment
- [ ] Update chat API to use new parser
- [ ] Test multi-LLM flow end-to-end

### Short-term Actions
- [ ] Enhance chat UI with better UX
- [ ] Add photo upload capability
- [ ] Implement quote preview in chat
- [ ] Add suggested responses

### Long-term Actions
- [ ] Build setup wizard
- [ ] Create template system
- [ ] Add favorite products
- [ ] Implement advanced reporting

## Security Considerations

1. **API Keys**: Store all API keys securely in environment variables
2. **Rate Limiting**: Implement rate limits for AI API calls
3. **Input Sanitization**: Validate all AI-extracted data
4. **Cost Control**: Monitor API usage and implement limits

## Monitoring & Observability

Track these metrics:
- AI extraction success rate
- Average time to quote creation
- API costs per quote
- User satisfaction scores
- Error rates by component

## Rollback Strategy

If integration causes issues:
1. Feature flags for new AI system
2. Keep original chat endpoint as fallback
3. Database migrations should be reversible
4. Monitor error rates closely post-deployment

## 📊 Monitoring & Observability

### Application Metrics

```typescript
interface MonitoringStack {
  performance: {
    tool: 'WebVitalsMonitor',
    metrics: ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'],
    endpoint: '/api/web-vitals'
  },
  errors: {
    tool: 'Console + Sentry (TODO)',
    capture: ['JavaScript errors', 'API failures', 'AI timeouts']
  },
  analytics: {
    tool: 'Google Analytics 4 (TODO)',
    events: ['Quote created', 'AI chat used', 'Calculator completed']
  },
  business: {
    dashboard: '/dashboard',
    metrics: ['Active quotes', 'Conversion rate', 'Revenue']
  }
}
```

### Logging Strategy

1. **Structured Logging**: JSON format for easy parsing
2. **Log Levels**: ERROR, WARN, INFO, DEBUG
3. **Correlation IDs**: Track requests across services
4. **PII Protection**: Never log sensitive data

## 🚦 Deployment Architecture

### Vercel Deployment (Recommended)

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   GitHub Repo   │────▶│  Vercel Build    │────▶│  Edge Network   │
│   (main branch) │     │  - Next.js       │     │  - Global CDN   │
└─────────────────┘     │  - Prisma Gen    │     │  - SSL/TLS      │
                        └──────────────────┘     └─────────────────┘
                                │                         │
                                ▼                         ▼
                        ┌──────────────────┐     ┌─────────────────┐
                        │  PostgreSQL      │     │  Production     │
                        │  (Supabase/      │────▶│  Application    │
                        │   Neon.tech)     │     │  (Serverless)   │
                        └──────────────────┘     └─────────────────┘
```

### Environment Configuration

```env
# Production Requirements
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=strong-random-secret
NEXTAUTH_URL=https://paintquotepro.com
NEXT_PUBLIC_SITE_URL=https://paintquotepro.com

# AI Services
ANTHROPIC_API_KEY=sk-ant-...
OPENROUTER_API_KEY=sk-or-...

# Analytics (Future)
GA_MEASUREMENT_ID=G-...
SENTRY_DSN=https://...
```

## 🔒 Security Architecture

### Security Layers

1. **Application Security**
   - Input validation on all forms
   - SQL injection prevention (Prisma)
   - XSS protection (React)
   - CSRF tokens (TODO)

2. **Authentication Security**
   - JWT with strong secret
   - HTTP-only cookies
   - Secure flag on HTTPS
   - Password complexity rules

3. **API Security**
   - Rate limiting per endpoint
   - API key validation
   - Request size limits
   - Timeout configurations

4. **Infrastructure Security**
   - HTTPS everywhere
   - Security headers (CSP, HSTS)
   - Environment variable encryption
   - Regular dependency updates

## 🧪 Testing Strategy

### Test Coverage Goals

```typescript
interface TestingPyramid {
  unit: {
    coverage: '80%',
    tools: ['Jest', 'React Testing Library'],
    focus: ['Utils', 'Components', 'Hooks']
  },
  integration: {
    coverage: '60%',
    tools: ['Jest', 'MSW'],
    focus: ['API routes', 'Database operations']
  },
  e2e: {
    coverage: 'Critical paths',
    tools: ['Playwright'],
    focus: ['Quote creation', 'Authentication']
  }
}
```

### Current Testing Status

- ✅ TypeScript for type safety
- ⏳ Unit tests (TODO)
- ⏳ Integration tests (TODO)
- ⏳ E2E tests (TODO)
- ✅ Manual testing completed

## 🎯 Success Metrics

### Technical Success Criteria

1. **Performance**
   - Page Speed Score > 90
   - Core Web Vitals: All green
   - API response time < 200ms
   - Uptime > 99.9%

2. **Quality**
   - TypeScript coverage: 100%
   - Test coverage > 70%
   - Zero critical bugs
   - Code review on all PRs

3. **SEO Success**
   - Organic traffic growth: 20% MoM
   - Keyword rankings: Top 10 for targets
   - Domain Authority increase
   - Rich snippets enabled

### Business Success Criteria

1. **User Engagement**
   - Quote creation time < 5 minutes
   - AI chat satisfaction > 4.5/5
   - User retention > 80%
   - Feature adoption > 60%

2. **Revenue Impact**
   - Conversion rate > 5%
   - Average revenue per user growth
   - Churn rate < 5%
   - Customer lifetime value increase

## 🔄 Continuous Improvement

### Feedback Loops

1. **User Feedback**: In-app feedback widget
2. **Performance Monitoring**: Real-time alerts
3. **Error Tracking**: Automated bug reports
4. **Analytics Review**: Weekly metrics review

### Iteration Process

1. Collect feedback and metrics
2. Prioritize improvements
3. Implement in 2-week sprints
4. Measure impact
5. Document learnings

---

*Architecture Version: 2.0*  
*Last Updated: July 2025*  
*Next Review: Q4 2025*