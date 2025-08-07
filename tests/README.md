# PaintQuote Pro Testing Suite

A comprehensive testing suite for PaintQuote Pro that validates functionality, accessibility, payment flows, and feature gating across different subscription tiers.

## 📋 Test Suites Overview

### 1. Link Audit Tests (`link-audit.js`)
Tests all navigation and external links throughout the application:

- **Main Navigation**: Home, Features, Pricing, Solutions, About, Contact, Help
- **Software Dropdown**: All painting software product pages
- **Solutions Pages**: Residential, Commercial, Franchise, Enterprise, Startups
- **Calculator Tools**: Paint quote calculators, ROI calculator, estimate tools
- **Guides & Resources**: All educational content pages
- **Location Pages**: City-specific landing pages
- **Footer Links**: All footer navigation and external links
- **Mobile Menu**: Mobile navigation functionality
- **Authentication**: Signup, signin, access code flows
- **Dashboard Navigation**: Protected dashboard routes (tests auth redirects)

### 2. Accessibility & WCAG Tests (`accessibility-audit.js`)
Ensures WCAG AA compliance and accessibility best practices:

- **Color Contrast**: Tests all text and background combinations for 4.5:1 (normal) and 3:1 (large text) ratios
- **Button Contrast**: Validates interactive elements meet 3:1 minimum contrast
- **Keyboard Navigation**: Tab order, focus indicators, keyboard shortcuts
- **ARIA Labels**: Screen reader compatibility, alt text, form labels
- **Heading Structure**: Proper H1-H6 hierarchy
- **Color Dependency**: Information conveyed without relying solely on color
- **Responsive Accessibility**: Touch target sizes, mobile usability
- **Focus Management**: Visible focus states for all interactive elements

### 3. Payment Flow Tests (`payment-flow-test.js`)
Validates Stripe integration and payment processes:

- **Pricing Page Load**: Proper display of all pricing tiers
- **Billing Toggle**: Monthly/yearly pricing switches
- **Free Tier Signup**: Access code flow for free accounts
- **Professional Plan**: Stripe checkout links (monthly/yearly)
- **Business Plan**: Stripe checkout links (monthly/yearly)
- **Enterprise Plan**: Contact form integration
- **Payment Security**: Security indicators and trust signals
- **Pricing Transparency**: Clear pricing, no hidden fees
- **ROI Calculator**: Revenue opportunity calculator functionality

### 4. Dashboard Tier Tests (`dashboard-tier-test.js`)
Tests feature access and limitations based on subscription tier:

#### Free Tier (5 quotes/month)
- ✅ **Allowed**: Professional templates, mobile interface, basic customer management, quote tracking, basic calculator, email support
- ❌ **Blocked**: AI assistant, custom branding, analytics dashboard, customer portal, team members

#### Professional Tier ($79/month)
- ✅ **Allowed**: Unlimited quotes, AI assistant, custom branding, analytics, customer portal, 3 team members, priority support
- ❌ **Blocked**: QuickBooks integration, API access

#### Business Tier ($149/month)
- ✅ **Allowed**: Everything in Professional plus unlimited team members, integrations, advanced analytics, bulk operations, API access
- ❌ **Blocked**: None (full feature access)

#### Enterprise Tier (Custom)
- ✅ **Allowed**: Everything in Business plus custom integrations, dedicated support, SLA, white-label options

## 🚀 Running Tests

### Prerequisites
```bash
npm install puppeteer
```

### Individual Test Suites
```bash
# Run link audit tests
node tests/link-audit.js

# Run accessibility tests
node tests/accessibility-audit.js

# Run payment flow tests
node tests/payment-flow-test.js

# Run dashboard tier tests
node tests/dashboard-tier-test.js
```

### Run All Tests
```bash
# Run comprehensive test suite
node tests/run-all-tests.js
```

This will:
1. Execute all test suites sequentially
2. Generate a comprehensive HTML report (`test-results.html`)
3. Provide actionable recommendations
4. Exit with appropriate status codes for CI/CD

## 📊 Test Results

### Console Output
- Real-time test progress with timestamps
- Color-coded results (✅ Pass, ❌ Fail, ⚠️ Warning)
- Detailed error messages and recommendations
- Final summary with success rates

### HTML Report
Generated automatically as `test-results.html` with:
- Visual dashboard of test results
- Categorized issues by type
- Pass/fail statistics
- Detailed error listings
- Professional styling matching PaintQuote Pro branding

## 🔧 Configuration

### Environment Variables
```bash
# Stripe payment links (set in .env)
NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_URL=https://buy.stripe.com/your-pro-monthly-link
NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_URL=https://buy.stripe.com/your-pro-yearly-link
```

### Test Parameters
- **Base URL**: `http://localhost:3005` (configurable in each test file)
- **Browser**: Puppeteer with Chrome (headless: false for debugging)
- **Viewport**: 1920x1080 desktop, 375x667 mobile testing
- **Timeout**: 30 seconds for page loads and navigation

## 🎯 Test Scenarios

### Critical User Journeys
1. **New User Signup**: Access code → Dashboard → First quote
2. **Pricing Evaluation**: Pricing page → Plan comparison → Stripe checkout
3. **Feature Discovery**: Dashboard navigation → Feature access by tier
4. **Mobile Experience**: Responsive design → Touch targets → Navigation

### Edge Cases
- Network timeouts and slow loading
- JavaScript disabled scenarios
- Screen reader navigation
- Keyboard-only navigation
- Color blind user simulation
- Small screen devices (mobile/tablet)

## 📈 Success Criteria

### Link Tests
- **Target**: 95% of links functional
- **Critical**: No broken payment or signup links

### Accessibility Tests
- **Target**: WCAG AA compliance (4.5:1 contrast ratio)
- **Critical**: All interactive elements keyboard accessible
- **Critical**: All images have alt text

### Payment Tests
- **Target**: 100% payment flows functional
- **Critical**: Stripe redirects work correctly
- **Critical**: Pricing displays accurately

### Tier Tests
- **Target**: 100% feature gating accuracy
- **Critical**: Free tier cannot access paid features
- **Critical**: Proper upgrade prompts displayed

## 🐛 Common Issues & Solutions

### Test Failures
1. **Link timeouts**: Check if development server is running on port 3005
2. **Stripe redirects**: Verify environment variables are set correctly
3. **Dashboard access**: Tests simulate unauthenticated users by default
4. **Mobile menu**: Ensure mobile breakpoints are correctly implemented

### Performance Issues
- Tests run with `headless: false` for debugging; set to `true` for CI/CD
- Large applications may need longer timeout values
- Consider running tests in parallel for faster execution

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: PaintQuote Pro Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm start &
      - run: sleep 10
      - run: node tests/run-all-tests.js
```

### Quality Gates
- **Merge Protection**: Require all tests to pass before merge
- **Performance**: Flag if test suite takes longer than 10 minutes
- **Accessibility**: Block deployment if critical accessibility failures
- **Payment**: Require manual approval if payment tests fail

## 📚 Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Puppeteer Documentation](https://pptr.dev/)
- [Next.js Testing Best Practices](https://nextjs.org/docs/testing)

## 🤝 Contributing

When adding new features to PaintQuote Pro:

1. **Add Link Tests**: Include new pages in `link-audit.js`
2. **Test Accessibility**: Ensure WCAG compliance for new components
3. **Update Tier Tests**: Add feature gating tests for new paid features
4. **Payment Integration**: Test any new Stripe or billing functionality
5. **Mobile Support**: Verify responsive behavior in test suites

## 📞 Support

For issues with the testing suite:
- Check console output for detailed error messages
- Review HTML report for visual debugging
- Verify all dependencies are installed
- Ensure development server is running on correct port

The testing suite is designed to catch issues early and ensure PaintQuote Pro delivers an excellent user experience across all features and subscription tiers.