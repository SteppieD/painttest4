# PaintQuote Pro Dashboard Documentation

## Overview
The dashboard is the central hub for PaintQuote Pro users, displaying key business metrics and providing quick access to all major features. The experience differs between Free and Professional tier users.

## Dashboard Metrics Cards

### 1. Total Quotes Card
**Location**: Top-left metric card  
**Color Scheme**: Blue to Cyan gradient  
**Icon**: FileText

#### Behavior by Tier:
- **Free Tier**: Shows actual count (max 5/month)
- **Professional Tier**: Shows unlimited quotes created

#### Display Logic:
```
IF quotes > 0:
  Display: Quote count number
  Change indicator: "+12%" (demo)
ELSE:
  Display: "Start Creating"
  Subtext: "Create your first quote!"
```

#### Navigation:
- **Click Action**: Routes to `/dashboard/quotes`
- **Link Text**: "View all quotes →"
- **Accessible to**: All users

#### Connected Features:
- Quotes list page
- Quote creation workflow
- Quote templates
- Quote search and filtering

---

### 2. Win Rate Card
**Location**: Top-right metric card  
**Color Scheme**: Emerald to Green gradient  
**Icon**: Percent

#### Behavior by Tier:
- **Free Tier**: 
  - Display: Blurred with lock overlay
  - Text: "Unlock win rate analytics"
  - CTA: "Upgrade to Pro" button
- **Professional Tier**: 
  - Display: Actual win rate percentage
  - Full visibility of metrics

#### Display Logic:
```
IF isPro AND quotes > 0:
  Display: "{acceptanceRate}%"
  Change indicator: "+5%" (trend)
ELSE IF !isPro:
  Display: Blurred/Locked state
ELSE:
  Display: "Coming Soon"
```

#### Navigation:
- **Click Action**: Routes to `/dashboard/analytics/performance`
- **Link Text**: "Performance metrics →"
- **Accessible to**: Professional tier only

#### Connected Features:
- Performance analytics dashboard
- Conversion rate tracking
- Weekly/monthly trends
- Quote acceptance analytics

---

### 3. Total Revenue Card
**Location**: Bottom-left metric card  
**Color Scheme**: Purple to Pink gradient  
**Icon**: DollarSign

#### Behavior by Tier:
- **Free Tier**: 
  - Display: Blurred with lock overlay
  - Text: "Track revenue metrics"
  - CTA: "Upgrade to Pro" button
- **Professional Tier**: 
  - Display: Total revenue amount
  - Full financial insights

#### Display Logic:
```
IF isPro AND revenue > 0:
  Display: "${amount.toLocaleString()}"
  Change indicator: "+18%" (growth)
ELSE IF !isPro:
  Display: Blurred/Locked state
ELSE:
  Display: "Track Sales"
```

#### Navigation:
- **Click Action**: Routes to `/dashboard/analytics/revenue`
- **Link Text**: "Revenue insights →"
- **Accessible to**: Professional tier only

#### Connected Features:
- Revenue analytics dashboard
- Monthly revenue tracking
- Project profitability analysis
- Revenue forecasting

---

### 4. Active Customers Card
**Location**: Bottom-right metric card  
**Color Scheme**: Amber to Orange gradient  
**Icon**: Users

#### Behavior by Tier:
- **Free Tier**: Shows actual customer count
- **Professional Tier**: Shows full customer analytics

#### Display Logic:
```
IF customers > 0:
  Display: Customer count
  Change indicator: "+8%" (growth)
ELSE:
  Display: "Build Your Base"
  Subtext: "Customer insights →"
```

#### Navigation:
- **Click Action**: Routes to `/dashboard/analytics/customers`
- **Link Text**: "Customer insights →"
- **Accessible to**: All users (full analytics for Pro)

#### Connected Features:
- Customer list and management
- Customer lifetime value
- Customer growth tracking
- Top customers analysis

---

## Page Connections and Routes

### Primary Dashboard Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/dashboard` | Main Dashboard | All | Landing page with metrics |
| `/dashboard/quotes` | Quotes List | All | View and manage all quotes |
| `/dashboard/quotes/new` | New Quote | All | Create new quote |
| `/dashboard/quotes/[id]` | Quote Detail | All | View specific quote |
| `/dashboard/quotes/mobile` | Mobile Quote | All | Mobile-optimized quote creation |

### Analytics Routes (Professional Tier)

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/dashboard/analytics/performance` | Performance Analytics | Pro | Win rates, conversion metrics |
| `/dashboard/analytics/revenue` | Revenue Analytics | Pro | Financial insights and trends |
| `/dashboard/analytics/customers` | Customer Analytics | All* | Customer metrics and growth |
| `/dashboard/analytics/projects` | Project Analytics | Pro | Project profitability analysis |

*Customer analytics shows basic data for free users, full insights for Pro

### Settings and Management Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/dashboard/settings` | Settings Hub | All | Account and company settings |
| `/dashboard/settings/billing` | Billing | All | Subscription management |
| `/dashboard/settings/team` | Team Management | Pro | Add and manage team members |
| `/dashboard/settings/integrations` | Integrations | Pro | Third-party connections |

---

## API Endpoints Supporting Dashboard

### Core Dashboard APIs

| Endpoint | Purpose | Authentication |
|----------|---------|----------------|
| `/api/companies/usage` | Quote usage and limits | Company auth |
| `/api/quote-usage` | Current month usage | Company auth |
| `/api/quotes` | Quote CRUD operations | Company auth |
| `/api/companies/settings` | Company configuration | Company auth |

### Analytics APIs (Professional Tier)

| Endpoint | Purpose | Returns |
|----------|---------|---------|
| `/api/analytics/performance` | Win rate and conversion data | Weekly/monthly trends |
| `/api/analytics/revenue` | Revenue metrics and forecasts | Financial analytics |
| `/api/analytics/customers` | Customer lifetime value | Customer insights |
| `/api/analytics/projects` | Project profitability | Project ROI data |

---

## Free vs Professional Experience

### Free Tier Dashboard Experience

1. **Visible Features**:
   - Total Quotes (limited to 5/month)
   - Active Customers count
   - Basic quote management
   - Quote usage indicator (3/5 used)

2. **Locked Features** (Blurred with upgrade prompts):
   - Win Rate analytics
   - Revenue tracking
   - Advanced analytics
   - Team features

3. **Upgrade Prompts**:
   - Quick upgrade button in header
   - Locked cards show "Upgrade to Pro"
   - Usage limit warnings at 3/5 quotes

### Professional Tier Dashboard Experience

1. **Full Access Features**:
   - Unlimited quotes (no usage indicator)
   - Complete win rate analytics
   - Full revenue tracking
   - All analytics dashboards
   - Team management
   - Custom branding
   - Priority support indicator

2. **Enhanced Metrics**:
   - Real-time conversion rates
   - Revenue trends with forecasting
   - Customer lifetime value
   - Performance benchmarks

3. **No Restrictions**:
   - No upgrade prompts
   - No blurred content
   - No usage limits
   - Full data export capabilities

---

## Testing Checklist for Premium Users

### Dashboard Main Page (`/dashboard`)
- [ ] No quote usage indicator shown (unlimited)
- [ ] Win Rate card shows actual percentage, not locked
- [ ] Revenue card shows dollar amount, not locked
- [ ] No "Upgrade to Pro" buttons visible
- [ ] Professional tier badge displayed

### Analytics Access
- [ ] `/dashboard/analytics/performance` loads without 401
- [ ] `/dashboard/analytics/revenue` shows full data
- [ ] `/dashboard/analytics/customers` displays all metrics
- [ ] Charts and graphs are visible (not blurred)

### Navigation Flow
- [ ] All metric cards are clickable
- [ ] Navigation to analytics pages works
- [ ] No authentication errors in console
- [ ] Data loads on all analytics pages

### Data Display
- [ ] Real metrics shown, not placeholder text
- [ ] Trend indicators display properly
- [ ] Historical data graphs render
- [ ] Export functions available

---

## Implementation Details

### Tier Detection
```typescript
const isPro = dashboardData.subscriptionTier !== 'free'
```

### Feature Gating Pattern
```typescript
{isPro ? (
  <ActualMetric value={data} />
) : (
  <LockedMetric 
    text="Unlock this feature"
    onUpgrade={() => router.push('/pricing')}
  />
)}
```

### Authentication Flow
1. User logs in with access code
2. Company data stored in localStorage
3. `subscription_tier` field determines access
4. API routes check company auth via `getCompanyFromRequest`
5. Features rendered based on tier

---

## Common Issues and Solutions

### Issue: Analytics pages return 401
**Solution**: Ensure company data has `subscription_tier` field set to 'professional'

### Issue: Metrics show as locked for premium users
**Solution**: Check localStorage has correct tier data, re-login if needed

### Issue: "Coming Soon" instead of actual data
**Solution**: Create sample quotes to generate metrics

### Issue: Navigation doesn't work
**Solution**: Verify all route files exist in app directory structure

---

## Market Alignment

Based on the research showing contractors lose 40-60% of jobs due to slow quotes, the dashboard emphasizes:

1. **Speed**: "Create quotes in under 2 minutes" messaging
2. **Professional**: Win rate tracking shows improvement
3. **Revenue Impact**: Direct revenue tracking demonstrates ROI
4. **Customer Growth**: Shows business expansion

The Professional tier dashboard directly addresses:
- **3-6 hours → 2 minutes**: Time savings visible
- **40-60% better win rate**: Tracked in metrics
- **$8,400/month potential**: Shown in revenue tracking
- **Professional appearance**: Reflected in acceptance rates

---

*Last Updated: August 2024*
*Dashboard Version: 2.0*
*Tier System: Freemium (Free/Professional)*