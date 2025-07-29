# PaintTest4 Key Business Logic

## Quote Calculation Engine
Location: `lib/calculators/quote-calculator.ts`

### Core Calculations
1. **Surface Area Calculations**
   - Walls: sqft × painting_rate
   - Ceilings: sqft × ceiling_rate
   - Trim: linear_ft × trim_rate
   - Doors: count × door_rate
   - Windows: count × window_rate

2. **Paint Material Costs**
   - Coverage: 350 sqft per gallon (default)
   - Walls: $26/gallon
   - Ceilings: $25/gallon
   - Trim: $35/gallon

3. **Pricing Formula**
   - Base Cost = Labor + Materials
   - Sundries = Materials × 12%
   - Labor = Total Revenue × 30%
   - Profit = Total Revenue - (Labor + Materials + Sundries)

## AI Quote Generation
Location: `lib/ai/quote-assistant.ts`

### Conversation Flow
1. **Initial Greeting**: Understand project scope
2. **Information Gathering**: 
   - Property details (sqft, rooms)
   - Surface measurements
   - Paint quality preferences
   - Timeline requirements
3. **Quote Generation**: Convert conversation to structured data
4. **Confirmation**: Review and finalize quote

### Intelligence Features
- Natural language understanding
- Context preservation across messages
- Automatic data extraction
- Professional tone maintenance

## Authentication System
Location: `lib/auth/`

### Access Methods
1. **Access Code**: Company-specific codes (e.g., DEMO2024)
2. **Magic Links**: Email-based passwordless auth
3. **Sessions**: JWT tokens with expiration
4. **Admin Access**: Separate authentication flow

### Security Features
- bcrypt password hashing
- JWT token validation
- Session expiration
- CORS protection

## Subscription Management
Location: `lib/services/subscription.ts`

### Tiers
1. **Free Trial**: 5 quotes
2. **Starter**: $79/month - 50 quotes
3. **Professional**: $149/month - 200 quotes
4. **Business**: $299/month - 1000 quotes
5. **Enterprise**: Custom pricing

### Usage Tracking
- Quote count per company
- Monthly reset
- Overage handling
- Grace period for expired subscriptions

## Quote Number Generation
Location: `lib/quote-number-generator.ts`

### Format: YYYY-MM-XXXX
- Year and month prefix
- Sequential counter
- Unique per company
- Rate limiting (5 quotes/minute)

## Email Workflows
1. **Magic Link**: 15-minute expiration
2. **Welcome Email**: After signup
3. **Quote Sharing**: Public quote links
4. **Payment Receipts**: Via Stripe