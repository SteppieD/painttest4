# Vercel & Stripe Setup Instructions

Based on your Vercel environment variables, here's how to complete your Stripe setup:

## Your Current Price IDs

You have these Stripe Price IDs in Vercel:
- **Professional Monthly**: `STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID` (needs correction - current value is a Supabase JWT)
- **Professional Yearly**: `price_1RgwOdGbblInKQeXfAbQkfPo`
- **Business Monthly**: `price_1RgwQRGbblInKQeXxTxAs1Gl`
- **Business Yearly**: `price_1RgwSSGbblInKQeXVcNtdFKn`

## Step 1: Fix the Professional Monthly Price ID

The current value for `STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID` appears to be a Supabase JWT token. You need to:
1. Go to your Stripe Dashboard
2. Find the correct price ID for Professional Monthly ($29.99/month)
3. Update it in Vercel

## Step 2: Create Payment Links

Since you already have products and prices in Stripe, you can create payment links for them:

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Payment Links** → **+ New**
3. For each plan:

### Professional Monthly
- Select existing price: Use the price with ID that should replace the JWT
- Add metadata:
  - `plan`: `professional`
  - `billing`: `monthly`

### Professional Yearly  
- Select existing price: `price_1RgwOdGbblInKQeXfAbQkfPo`
- Add metadata:
  - `plan`: `professional`
  - `billing`: `yearly`

### Business Monthly
- Select existing price: `price_1RgwQRGbblInKQeXxTxAs1Gl`
- Add metadata:
  - `plan`: `business`
  - `billing`: `monthly`

### Business Yearly
- Select existing price: `price_1RgwSSGbblInKQeXVcNtdFKn`
- Add metadata:
  - `plan`: `business`
  - `billing`: `yearly`

## Step 3: Configure Payment Link Settings

For each payment link:

1. **Success URL**: `https://paintquotepro.com/dashboard/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`
2. **Cancel URL**: `https://paintquotepro.com/dashboard/settings/billing`
3. **Options**:
   - ✅ Collect customer address
   - ✅ Allow promotion codes
   - ✅ Adjustable quantity: OFF
   - ✅ Customer email: Required

## Step 4: Add to Vercel Environment

After creating the payment links, add these to your Vercel environment:

```bash
# Professional Plan
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK=https://buy.stripe.com/[your_link_id]
NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK=https://buy.stripe.com/[your_link_id]

# Business Plan  
NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_LINK=https://buy.stripe.com/[your_link_id]
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_LINK=https://buy.stripe.com/[your_link_id]

# General Upgrade Link (use Professional Monthly as default)
NEXT_PUBLIC_STRIPE_UPGRADE_LINK=https://buy.stripe.com/[your_pro_monthly_link_id]
```

## Step 5: Test the Integration

1. Deploy to Vercel or run locally with the new environment variables
2. Click on any locked feature in the dashboard
3. Verify you're redirected to the correct Stripe payment link
4. Complete a test purchase (use test mode first)
5. Verify you're redirected back to the success URL

## Optional: Future Webhook Setup

To automatically update user subscriptions after payment:

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add endpoint: `https://paintquotepro.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Save the webhook signing secret to Vercel as `STRIPE_WEBHOOK_SECRET`

## Debugging Tips

If payment links aren't working:
1. Check browser console for errors
2. Verify environment variables are loaded (check Network tab)
3. Test with Stripe test mode first
4. Check that payment links are active in Stripe Dashboard

## Notes

- Payment links handle all the complexity of subscriptions
- No need to implement complex Stripe Checkout flows
- Customers can manage subscriptions via Stripe's customer portal
- The app will need webhook integration to auto-update subscription status