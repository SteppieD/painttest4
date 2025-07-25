# Stripe Payment Links Setup Guide

This guide explains how to configure Stripe payment links for PaintQuote Pro.

## Overview

PaintQuote Pro uses Stripe Payment Links for subscription management. This approach:
- Simplifies the integration (no complex Stripe SDK setup)
- Handles all payment processing on Stripe's secure pages
- Manages subscriptions, invoices, and receipts automatically
- Provides a professional checkout experience

## Setup Steps

### 1. Create Stripe Payment Links

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products** → **Payment Links**
3. Create the following payment links:

#### Professional Plan - Monthly
- Product Name: "PaintQuote Pro - Professional"
- Price: $29.99/month
- Billing: Recurring monthly
- Features to list:
  - Up to 50 quotes per month
  - AI-powered quote generation
  - Customer management
  - Email quotes
  - Basic analytics
  - Priority support

#### Professional Plan - Yearly
- Product Name: "PaintQuote Pro - Professional (Annual)"
- Price: $299.99/year
- Billing: Recurring yearly
- Features: Same as monthly

#### Business Plan - Monthly
- Product Name: "PaintQuote Pro - Business"
- Price: $79.99/month
- Billing: Recurring monthly
- Features to list:
  - Unlimited quotes
  - Advanced AI features
  - Team collaboration
  - Custom branding
  - Advanced analytics
  - API access
  - Priority support

#### Business Plan - Yearly
- Product Name: "PaintQuote Pro - Business (Annual)"
- Price: $799.99/year
- Billing: Recurring yearly
- Features: Same as monthly

#### General Upgrade Link
- Product Name: "PaintQuote Pro - Upgrade"
- Price: $29.99/month (Professional plan as default)
- Purpose: Generic upgrade link for locked features

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Stripe Payment Links
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK=https://buy.stripe.com/your_pro_monthly_link
NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK=https://buy.stripe.com/your_pro_yearly_link
NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_LINK=https://buy.stripe.com/your_business_monthly_link
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_LINK=https://buy.stripe.com/your_business_yearly_link
NEXT_PUBLIC_STRIPE_UPGRADE_LINK=https://buy.stripe.com/your_upgrade_link

# Optional: Stripe API keys for future webhook integration
STRIPE_SECRET_KEY=sk_live_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
```

### 3. Configure Success URLs

In each Stripe Payment Link settings:
1. Set the success URL to: `https://yourdomain.com/dashboard/settings/billing?success=true`
2. Set the cancel URL to: `https://yourdomain.com/dashboard/settings/billing`

### 4. Enable Customer Portal

1. In Stripe Dashboard, go to **Settings** → **Billing** → **Customer portal**
2. Enable the customer portal
3. Configure which features customers can access:
   - View invoices
   - Update payment methods
   - Cancel subscriptions
   - Update billing address

## How It Works

### For Users

1. User clicks on a locked feature or upgrade button
2. They're redirected to the appropriate Stripe Payment Link
3. User completes payment on Stripe's secure checkout
4. After successful payment, they're redirected back to the app
5. (Future) Webhook updates their subscription status in the database

### Current Implementation

The app currently redirects to Stripe for payments but doesn't automatically update subscription status. Users will need to:
1. Complete payment on Stripe
2. Log out and log back in for changes to take effect
3. Or wait for manual admin update

### Future Webhook Integration

To automatically update subscription status:
1. Set up a webhook endpoint at `/api/webhooks/stripe`
2. Configure webhook in Stripe Dashboard
3. Listen for events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## Testing

### Test Mode Links

For development, create test mode payment links:
1. Switch to Test mode in Stripe Dashboard
2. Create the same payment links with test prices
3. Use test card: 4242 4242 4242 4242

### Environment Variables for Testing

```env
# Test mode links
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK=https://buy.stripe.com/test_your_link
NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK=https://buy.stripe.com/test_your_link
# ... etc
```

## Customization

### Styling Payment Links

In Stripe Dashboard:
1. Go to **Settings** → **Branding**
2. Upload your logo
3. Set brand colors to match PaintQuote Pro:
   - Primary: #3B82F6 (blue)
   - Secondary: #8B5CF6 (purple)

### Pre-filling Customer Data

The app automatically appends customer email when available:
```javascript
redirectToStripePayment('professional', 'monthly')
// Redirects to: https://buy.stripe.com/xxx?prefilled_email=customer@email.com
```

## Security Notes

1. Never expose `STRIPE_SECRET_KEY` to the client
2. All payment processing happens on Stripe's servers
3. Use HTTPS in production
4. Validate webhook signatures when implementing webhooks

## Support

For issues with:
- Payment links: Contact Stripe support
- Integration: Check the app logs and this documentation
- Subscription status: Check Stripe Dashboard for customer records