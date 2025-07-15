# Context Engineering Guide - PaintQuote Pro

This document provides the complete context needed to recreate or continue development on PaintQuote Pro using AI assistants.

## 🎯 Master Prompt for Project Recreation

```
Create a comprehensive painting contractor quote generation platform called "PaintQuote Pro" with the following specifications:

BUSINESS CONTEXT:
- Target Users: Painting contractors who currently spend 3-6 hours creating quotes manually
- Core Value Prop: Reduce quote creation to 10-15 minutes using AI
- Business Model: Freemium - 5 free quotes/month, Pro at $47/month for unlimited
- Expected Outcome: Users increase revenue by average $8,400/month

CRITICAL MARKET INSIGHTS:
- 73% of customers choose the contractor who responds within 24 hours
- Professional presentation increases win rates by 40-60%
- Same-day quotes close 2.5x more often than 48+ hour quotes
- Manual quote creation is the #1 time sink for contractors

TECHNICAL REQUIREMENTS:
- Framework: Next.js 14 with App Router
- Language: TypeScript with strict typing
- Database: PostgreSQL with Prisma ORM
- Auth: Custom JWT implementation (not NextAuth)
- Styling: Tailwind CSS with shadcn/ui components
- AI: OpenRouter API integration (fallback from Anthropic)
- Deployment: Docker & Docker Compose

CORE FEATURES NEEDED:
1. AI-powered quote chat assistant
2. Mobile-optimized with swipe navigation
3. Customer CRM with quote history
4. Dashboard with business analytics
5. Freemium model with locked features
6. Settings for labor rates, paint costs, taxes
7. Multi-step quote form as alternative to chat
8. Professional quote templates

UNIQUE REQUIREMENTS:
- Mobile-first design with floating action buttons
- Bottom navigation bar for mobile users
- Haptic feedback on mobile interactions
- Blur effect on locked premium features
- Response time tracking throughout system
- Win rate analytics per customer
```

## 📋 Incremental Context Prompts

### 1. After Initial Setup
```
Add the following to the PaintQuote Pro application:

DATABASE SCHEMA:
- User belongs to Company (many-to-one)
- Company has many Quotes, Customers, PaintProducts
- Quote belongs to Customer and has many Surfaces
- BusinessSettings stores rates and multipliers
- Include soft delete (deletedAt) on all models

AUTHENTICATION FLOW:
- Custom JWT stored in httpOnly cookies
- Middleware to protect /dashboard routes
- Sign up creates User and Company
- Test user: test@paintquotepro.com / test123
```

### 2. For AI Integration
```
Implement AI quote generation for PaintQuote Pro:

INTEGRATION:
- Use OpenRouter API (not direct Anthropic)
- Model: anthropic/claude-3-5-sonnet
- Fallback when ANTHROPIC_API_KEY not available

CHAT FLOW:
1. User describes painting job in natural language
2. AI extracts: customer info, surfaces, measurements
3. AI asks clarifying questions if needed
4. When complete, generate structured quote data
5. Save to database with proper calculations

IMPORTANT: 
- Handle OpenRouter API key in format: sk-or-v1-xxxxx
- Parse surfaces with area, linearFeet, or count
- Include project type detection (interior/exterior/both)
```

### 3. For Mobile Optimization
```
Make PaintQuote Pro fully mobile-optimized:

MOBILE FEATURES:
1. Create /dashboard/quotes/mobile route
2. Implement swipe gestures for form navigation
3. Add floating action buttons (FAB) for quick access
4. Bottom tab navigation with 5 main sections
5. Touch-friendly with minimum 44px tap targets
6. Responsive chat with larger input fields
7. Haptic feedback using navigator.vibrate(50)

MOBILE-SPECIFIC UI:
- Progress bar instead of step circles
- Emoji icons for visual steps
- Full-height chat view
- Sticky bottom navigation
- Sheet component for mobile menu
```

### 4. For Business Logic
```
Implement pricing calculations for PaintQuote Pro:

CALCULATION ENGINE:
- Base rate × surface area × number of coats
- Condition multipliers (good: 1.0, fair: 1.5, poor: 2.0)
- Prep work charges as percentage of surface cost
- Labor calculation using hourly rate
- Overhead (15%) and profit (30%) margins
- Tax calculation on final total

SETTINGS NEEDED:
- Charge rates per surface type (walls, ceilings, etc.)
- Labor hourly rate and productivity rates
- Paint cost per gallon and coverage
- Tax rate configuration
- Default coats per surface type
```

### 5. For Freemium Implementation
```
Add freemium model to PaintQuote Pro:

FREE TIER (5 quotes/month):
- Basic analytics: total quotes, customers, win rate
- Professional templates
- Mobile access
- Email support

PRO TIER ($47/month):
- Unlimited quotes
- Advanced analytics (locked with blur for free users):
  - Average response time
  - Monthly revenue tracking
  - Pipeline value
  - Average quote value
- Team access (3 members)
- Priority support

IMPLEMENTATION:
- Blur effect with lock icon overlay on premium features
- Clickable overlays link to /pricing
- Upgrade prompt card on dashboard
- Track quote count for free users
```

## 🔧 Environment Configuration

### Required Environment Variables
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/paintquotepro"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# AI Services
ANTHROPIC_API_KEY="placeholder-or-real-key"
OPENROUTER_API_KEY="sk-or-v1-your-openrouter-api-key"

# Optional
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Docker Configuration Context
```
Tell the AI: "Set up Docker deployment with:
- PostgreSQL 15 Alpine image
- Node 18 Alpine for web app
- Health checks on database
- Proper build stages (deps, dev, runner)
- Volume mounts for development
- Network configuration for container communication
- DATABASE_URL using container names (not localhost)
- Remove quotes from environment variables in Docker"
```

## 🚨 Critical Implementation Notes

### Common Pitfalls to Avoid
1. **Don't use quotes in Docker env variables** - They're treated literally
2. **Always generate Prisma client** - Run `npx prisma generate` after schema changes
3. **Use absolute imports** - Configure `@/` prefix for clean imports
4. **Check network names** - Docker Compose creates network as `projectname_default`
5. **Handle decimal types** - Use Decimal.js for monetary calculations

### Testing Checklist
```
Provide this checklist to verify implementation:

1. [ ] Can create account and sign in
2. [ ] AI chat creates quotes correctly
3. [ ] Quote calculations are accurate (not $0)
4. [ ] Mobile swipe navigation works
5. [ ] Customer list shows all customers
6. [ ] Products page displays correctly
7. [ ] Settings save and persist
8. [ ] Dashboard shows metrics
9. [ ] Premium features are locked for free users
10. [ ] Response time tracking works
```

## 📚 Additional Context Documents

### Market Research Summary
```
Share this with AI for business context:

"Painting contractor research shows:
- Average quote takes 3-6 hours to create
- 67% of contractors lose jobs to faster competitors  
- Manual calculations cause 23% error rate
- Professional software users report 65% win rate vs 25% manual
- Fast response (< 24 hours) is #1 factor in winning jobs
- Contractors want mobile solutions for on-site quoting"
```

### User Personas
```
Primary User: Mike Rodriguez
- Owns 5-person painting company
- Spends 20 hours/week on quotes
- Loses jobs to faster competitors
- Needs professional presentation
- Works from job sites often
- Not very tech-savvy

Secondary User: Sarah Chen  
- Painting business manager
- Handles all quotes and scheduling
- Tracks win/loss rates
- Needs efficiency tools
- Wants analytics and insights
```

## 🔄 Continuous Development Prompts

### Adding New Features
```
When adding features to PaintQuote Pro:
1. Maintain mobile-first approach
2. Consider freemium model constraints
3. Keep quote creation under 15 minutes
4. Ensure offline capability where possible
5. Add to both chat and form interfaces
6. Update dashboard analytics if relevant
```

### Debugging Assistance
```
Common issues in PaintQuote Pro:

1. "$0 calculations" - Check charge rates in settings
2. "Module not found" - Run npm install and prisma generate  
3. "JWT errors" - Verify JWT_SECRET is set
4. "Chat not working" - Check OPENROUTER_API_KEY
5. "Container connection failed" - Use container names, not localhost
```

## 🎯 Success Metrics

Tell the AI to optimize for:
1. Quote creation time < 15 minutes
2. Mobile usability score > 90
3. Page load speed < 3 seconds
4. Conversion from free to paid > 10%
5. Customer retention > 80%

---

This context engineering guide provides everything needed to recreate or continue development of PaintQuote Pro with consistent results.