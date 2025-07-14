# System Architecture & Integration Plan

This document outlines the system architecture and the plan for integrating advanced features from the painttest2 repository.

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

## SEO Architecture (2025 Implementation)

### Content Prompting Methodology Integration

Based on 2025 SEO research, the system implements:

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

## Integration Plan for painttest2 Features

### Phase 1: AI Components Migration (Priority: HIGH)

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

## Success Criteria

The integration is successful when:
1. Quote creation time reduced by 50%
2. AI extraction accuracy > 95%
3. User satisfaction improves
4. System remains stable under load
5. API costs remain within budget