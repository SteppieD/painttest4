# PaintQuote Pro

A modern painting contractor quoting application with AI-powered quote generation using Claude Sonnet.

## Overview

PaintQuote Pro is a comprehensive web application designed for painting contractors to create accurate quotes using a charge rate system. The application features:

- **Charge Rate Pricing Model**: Unified pricing per surface type that includes both labor and materials
- **AI-Powered Quote Generation**: Natural language chat interface with Claude Sonnet for quote creation
- **Multiple Measurement Units**: Square feet, linear feet, and unit-based pricing
- **Automatic Labor Calculation**: Labor is automatically calculated as 30% of total charge

## Business Logic

### Charge Rate System

The application uses a charge rate system instead of separate material/labor calculations:

- **Charge Rate** = Total cost per measurement unit (includes both materials and labor)
- **Labor Cost** = 30% of total charge (automatically calculated)
- **Material Cost** = 70% of total charge (implicit)

### Surface Types and Measurements

#### Interior Surfaces
- **Walls**: Charged per square foot
- **Ceilings**: Charged per square foot  
- **Baseboards**: Charged per linear foot
- **Crown Molding**: Charged per linear foot
- **Doors (with jams)**: Charged per unit
- **Windows**: Charged per unit

#### Exterior Surfaces
- **Exterior Walls**: Charged per square foot
- **Fascia Boards**: Charged per linear foot
- **Soffits**: Charged per square foot
- **Exterior Doors**: Charged per unit
- **Exterior Windows**: Charged per unit

## Project Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Docker (for local development)

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/paintquotepro"

# Authentication
JWT_SECRET="your-secret-key-here"

# AI Integration
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Optional: For enhanced AI parsing
OPENROUTER_API_KEY="your-openrouter-api-key"
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d

   # Run migrations
   npx prisma migrate dev

   # Seed the database
   npx prisma db seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Default Test Credentials

After seeding:
- Admin: `admin@acmepainting.com` / `admin123`
- User: `painter@acmepainting.com` / `user123`

## Key Features

### 1. Settings Management
- Configure charge rates for each surface type
- Separate rates for interior and exterior surfaces
- Rates automatically saved to company profile

### 2. Quote Calculator V2
- Uses charge rates instead of material/labor separation
- Automatically calculates labor as 30% of total charge
- Supports multiple measurement units per surface type

### 3. AI Chat Interface
- Natural conversation with Claude Sonnet
- Extracts quote information from conversation
- Automatically creates quotes when sufficient information is collected
- Validates and structures data before quote creation

### 4. Authentication System
- JWT-based authentication
- Role-based access control (admin/user)
- Secure password hashing with bcryptjs

## Technical Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Components**: Custom components with Radix UI primitives
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context

### Backend
- **API**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with HTTP-only cookies
- **AI Integration**: Anthropic Claude API

### Key Libraries
- `@anthropic-ai/sdk`: Claude API integration
- `decimal.js`: Precise financial calculations
- `zod`: Runtime type validation
- `bcryptjs@2.4.3`: Password hashing (specific version for compatibility)

## Error Handling

The application uses a Result pattern for consistent error handling:
- Success results contain data
- Error results contain error messages and optional metadata
- All API endpoints return standardized responses

## Known Issues Fixed

1. **bcryptjs Version Mismatch**: Must use version 2.4.3 for compatibility
2. **React Hydration Errors**: Fixed with ClientTimestamp component
3. **Missing UI Components**: All toast components now properly implemented

## Deployment Considerations

1. Ensure all environment variables are set
2. Run database migrations before deployment
3. Consider using connection pooling for PostgreSQL
4. Set appropriate CORS headers for production
5. Use HTTPS for all API communications

## Pricing Model (Freemium)

### Subscription Tiers

1. **Free** - $0/month
   - 1 quote per month
   - Basic features
   - Email support

2. **Professional** - $49/month ($490/year)
   - Unlimited quotes
   - AI-powered assistant
   - Analytics dashboard
   - Custom branding

3. **Business** - $99/month ($990/year)
   - Everything in Professional
   - API access
   - Integrations
   - Priority support

4. **Enterprise** - Custom pricing
   - White-label options
   - Custom features
   - Dedicated support

### Implementation Status
- ✅ Pricing page created (`/pricing`)
- ✅ Database schema updated for subscriptions
- ✅ Freemium logic in Company model
- 🚧 Stripe integration pending
- 🚧 Quote limit enforcement pending

## Complete Project Documentation

See `PROJECT_OVERVIEW.md` for:
- Complete feature list
- Business model details
- Technical architecture
- Rebuild instructions
- Testing checklist
- Revenue projections

## SEO Implementation Status

### ✅ Completed SEO Features (2025)

**Core SEO Infrastructure:**
- **Dynamic Sitemap Generation**: Programmatic SEO-ready with priority-based URL structure
- **Schema.org Structured Data**: SoftwareApplication, Service, Organization markup
- **Breadcrumb Navigation**: Schema-enhanced breadcrumbs with JSON-LD
- **Core Web Vitals Monitoring**: Real-time performance tracking (LCP, INP, CLS, FCP, TTFB)
- **SEO Utilities**: Topic clustering, metadata generation, internal linking automation

**Content Strategy (Content Prompting Methodology):**
- **Intent-Driven Content**: User intent focus over keyword stuffing
- **Topic Authority Building**: Comprehensive topic clusters for painting contractors
- **AI-Human Balance**: Strategic AI utilization with human expertise
- **Performance-First**: Core Web Vitals optimization for 2025 ranking factors

**SEO Pages Built (9 high-priority pages):**
- `/painting-contractors` (priority 0.9) - Core product page
- `/painting-estimate-software` (priority 0.9) - Software focus
- `/interior-painting-quote-calculator` (priority 0.85) - Calculator tool
- `/exterior-painting-estimate-calculator` (priority 0.85) - Calculator tool
- `/painting-estimating-software` (priority 0.75) - Advanced features
- `/painting-business-software` (priority 0.7) - Business management
- `/paint-contractor-app` (priority 0.75) - Mobile app features
- `/commercial-painting-estimating-software` (priority 0.7) - Enterprise
- `/mobile-painting-estimate-app` (priority 0.65) - Mobile focus

**Technical SEO Features:**
- WebVitalsMonitor component with performance alerting
- API endpoint `/api/web-vitals` for data collection
- Automated internal linking system
- Meta tag optimization (60-char titles, 160-char descriptions)
- Mobile-first responsive design

### 🚧 Next Phase: Programmatic SEO

**Location-Based Pages**: 50+ city/state combinations
**Comparison Pages**: vs competitors (JobProgress, ServiceTitan, etc.)
**Educational Content**: How-to guides, industry insights
**Integration Pages**: QuickBooks, Stripe, Google Calendar connections

### Content Prompting Methodology Implementation

Based on 2025 SEO research, PaintQuote Pro implements:

1. **AI-Content Curation**: Strategic AI integration for content optimization
2. **User Intent Mapping**: Content aligned with search behavior patterns  
3. **Topic Authority**: Comprehensive coverage of painting contractor workflows
4. **Technical Excellence**: Schema markup, Core Web Vitals, structured data
5. **Conversion Focus**: Quality over traffic, aligned with 2025 ranking factors

**Performance Targets:**
- LCP < 2.5s (currently monitored)
- INP < 200ms (currently monitored) 
- CLS < 0.1 (currently monitored)
- 90+ PageSpeed score target

## Future Integration Plans

The `painttest2` repository contains advanced features to be integrated:
- Multi-LLM quote parsing (Claude Sonnet 4 + GPT-4o-mini)
- Advanced quote extraction with validation
- Setup wizard for new users
- Favorite products management
- Additional SEO-optimized marketing pages

See `ARCHITECTURE.md` for detailed integration plans.