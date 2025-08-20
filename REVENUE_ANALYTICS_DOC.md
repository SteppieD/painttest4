# Revenue Analytics Documentation

## Overview
The Revenue Analytics page provides comprehensive financial insights for painting contractors using PaintQuote Pro. This premium feature helps businesses track revenue performance, identify trends, and make data-driven decisions.

## Page Location
- **URL**: `/dashboard/analytics/revenue`
- **File**: `/app/dashboard/analytics/revenue/page.tsx`
- **API**: `/app/api/analytics/revenue/route.ts`
- **Access**: Premium tier only (Professional at $79/month)

## Purpose & Business Value

### Why This Page Exists
1. **Financial Visibility**: Contractors need clear insights into their revenue streams
2. **Growth Tracking**: Monitor business growth month-over-month
3. **Customer Analysis**: Identify top revenue-generating customers
4. **Project Type Analysis**: Understand which services are most profitable
5. **Export Capability**: Generate CSV reports for accounting/tax purposes

### Target User
- Painting contractors with established businesses
- Companies processing multiple quotes per month
- Business owners focused on growth and profitability
- Teams needing revenue reporting for stakeholders

## Data Structure & Connections

### Frontend Data Interface (RevenueData)
```typescript
interface RevenueData {
  totalRevenue: number           // All-time revenue from accepted quotes
  monthlyRevenue: number          // Last 30 days revenue
  averageQuoteValue: number       // Average value per accepted quote
  largestQuote: number           // Highest single quote value
  revenueByMonth: Array<{        // Monthly breakdown (last 6 months)
    month: string                // e.g., "Jan", "Feb"
    revenue: number              // Total for that month
  }>
  revenueByProjectType: Array<{  // Revenue by service type
    type: string                 // e.g., "Interior Residential"
    revenue: number              // Total revenue for type
    percentage: number           // Percentage of total revenue
  }>
  revenueGrowth: number          // Percentage growth vs previous period
  projectedRevenue: number       // Forecast for next month
  topRevenueCustomers: Array<{   // Best customers by revenue
    name: string                 // Customer name
    revenue: number              // Total revenue from customer
    quotes: number               // Number of quotes for customer
  }>
}
```

### API Endpoint Details
- **Method**: GET
- **Path**: `/api/analytics/revenue`
- **Authentication**: Simple auth via `x-company-data` header
- **Query Parameters**: 
  - `range`: Time range filter (`30d`, `90d`, `1y`, `all`)

### Database Connections
The revenue API connects to these database tables:
1. **quotes**: Primary data source for all revenue calculations
   - Filters by `status = 'accepted'` for revenue
   - Uses `pricing.total` field for amounts
   - Groups by `customer_name` for customer analysis
   - Groups by `project_type` for service analysis

2. **companies**: Authentication and company context
   - Validates access via `access_code`
   - Ensures data isolation per company

## Key Features

### 1. Revenue Metrics Cards
- **Total Revenue**: Sum of all accepted quotes
- **Monthly Average**: Current month's performance
- **Average Quote Value**: Mean value per accepted quote
- **Projected Next Month**: Simple forecast based on trends

### 2. Revenue Trend Chart
- Visual bar chart showing last 6 months
- Height proportional to revenue amount
- Month labels for easy reference
- Responsive design adapts to screen size

### 3. Revenue by Project Type
- Breakdown by service categories
- Shows both dollar amount and percentage
- Visual progress bars for quick comparison
- Helps identify most profitable services

### 4. Top Revenue Customers
- Lists top 3 customers by total revenue
- Shows number of quotes per customer
- Calculates percentage of total revenue
- Helps identify VIP clients

### 5. Export Functionality
- Generates CSV report with all data
- Includes monthly breakdown
- Adds summary statistics
- Automatic download with timestamp

## Time Range Filters
Users can filter data by:
- **30 Days**: Last month's performance
- **90 Days**: Quarterly view (default)
- **1 Year**: Annual overview
- **All Time**: Complete history

## Technical Implementation

### Authentication Flow
1. Page checks for company in localStorage
2. Redirects to `/access-code` if not authenticated
3. Passes company data in request header
4. API validates against database

### Data Processing
1. API fetches all quotes for company
2. Filters by acceptance status
3. Calculates aggregations and metrics
4. Returns formatted data structure
5. Frontend renders with null safety

### Error Handling
- Returns demo data if no quotes exist
- Graceful fallback for API errors
- Loading states during data fetch
- Null-coalescing for safe rendering

## Demo Data
When a company has no accepted quotes, the system returns realistic demo data:
- Shows example revenue trends
- Demonstrates all features
- Uses believable dollar amounts
- Includes varied project types

## Integration Points

### Connected Pages
1. **Main Dashboard** (`/dashboard`)
   - Revenue card links here
   - Shows summary metrics

2. **Performance Analytics** (`/dashboard/analytics/performance`)
   - Complements with conversion data
   - Shows win rates alongside revenue

3. **Customer Analytics** (`/dashboard/analytics/customers`)
   - Deeper customer insights
   - Lifetime value calculations

### Data Dependencies
- Requires quotes with accepted status
- Needs pricing data in quotes
- Uses customer names for grouping
- Relies on project type categorization

## Business Logic

### Revenue Calculation
```
Total Revenue = Sum of all accepted quote totals
Monthly Revenue = Sum of accepted quotes in last 30 days
Average Quote Value = Total Revenue / Number of Accepted Quotes
```

### Growth Calculation
```
Revenue Growth = ((Current Month - Previous Month) / Previous Month) * 100
```

### Projection Calculation
```
Projected Revenue = (Monthly Revenue * 12) / Current Month Number
```

## User Experience Considerations

### Loading States
- Spinner while fetching data
- Prevents interaction during load
- Smooth transition to content

### Empty States
- Demo data for new users
- Helpful for understanding features
- No error messages for empty data

### Responsive Design
- Mobile-friendly layout
- Cards stack on small screens
- Charts adapt to viewport

### Visual Hierarchy
- Key metrics at top
- Trend chart prominent
- Supporting data below
- Export action at bottom

## Security Considerations

1. **Data Isolation**: Each company only sees their own data
2. **Authentication**: Access code validation on every request
3. **No PII Exposure**: Customer names only, no personal details
4. **Rate Limiting**: Standard Next.js API protections

## Performance Optimizations

1. **Efficient Queries**: Single database call for all quotes
2. **Client-side Filtering**: Time range changes don't hit API
3. **Memoization**: Calculations cached during request
4. **Lazy Loading**: Charts render after data loads

## Future Enhancements

### Planned Features
1. **Custom Date Ranges**: User-defined periods
2. **Revenue Goals**: Set and track targets
3. **Comparative Analysis**: Year-over-year comparisons
4. **Revenue Forecasting**: ML-based predictions
5. **Invoice Integration**: Connect to payment systems

### Potential Improvements
1. **Real-time Updates**: WebSocket for live data
2. **Advanced Filtering**: By service, customer, region
3. **Revenue Attribution**: Track lead sources
4. **Profitability Analysis**: Include costs/margins
5. **Team Performance**: Revenue by salesperson

## Testing Checklist

- [ ] Page loads without errors
- [ ] Authentication redirects work
- [ ] All metrics display correctly
- [ ] Time range filters update data
- [ ] Charts render properly
- [ ] Export generates valid CSV
- [ ] Demo data shows for new users
- [ ] Responsive on mobile devices
- [ ] Loading states appear
- [ ] Error handling works

## Maintenance Notes

### Common Issues
1. **Undefined errors**: Check API response field names
2. **No data showing**: Verify quotes have accepted status
3. **Wrong calculations**: Check pricing field structure
4. **Export fails**: Validate CSV generation logic

### Monitoring
- Track API response times
- Monitor error rates
- Check data accuracy
- Validate calculations

## Related Documentation
- [Dashboard Documentation](./DASHBOARD_ANALYTICS_DOC.md)
- [Freemium Model](./FREEMIUM_MODEL.md)
- [Implementation Guide](./IMPLEMENTATION.md)
- [API Architecture](./app/api/README.md)

---

*Last Updated: 2025-08-20*
*Version: 1.0.0*
*Status: Production Ready*