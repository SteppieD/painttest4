# Required Vercel Environment Variables for Payment Processing

## Currently Configured ✅
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key (client-side)
- `STRIPE_WEBHOOK_SECRET` - For validating webhook signatures
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager (GTM-563BQKRH)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase backend access
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL

## Missing Required Variables ❌

### Critical for Payment Processing:
1. **`STRIPE_SECRET_KEY`** (Production Environment)
   - Your Stripe secret key for server-side API calls
   - Get from: https://dashboard.stripe.com/apikeys
   - Format: `sk_live_...` (production) or `sk_test_...` (test mode)

### Required for Subscription Plans:
2. **`STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID`**
   - Price ID for Professional monthly plan
   - Create in Stripe Dashboard > Products
   - Format: `price_...`

3. **`STRIPE_PROFESSIONAL_YEARLY_PRICE_ID`**
   - Price ID for Professional yearly plan
   - Format: `price_...`

4. **`STRIPE_BUSINESS_MONTHLY_PRICE_ID`**
   - Price ID for Business monthly plan
   - Format: `price_...`

5. **`STRIPE_BUSINESS_YEARLY_PRICE_ID`**
   - Price ID for Business yearly plan
   - Format: `price_...`

### Optional but Recommended:
6. **`NEXT_PUBLIC_ENABLE_PAYMENTS`**
   - Set to `true` to enable payment features
   - Default is `false` if not set

7. **`NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK`**
   - Direct Stripe Payment Link for Professional monthly
   - Alternative to checkout session API

8. **`NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK`**
   - Direct Stripe Payment Link for Professional yearly

9. **`NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_LINK`**
   - Direct Stripe Payment Link for Business monthly

10. **`NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_LINK`**
    - Direct Stripe Payment Link for Business yearly

## How to Set Up in Stripe Dashboard

1. **Create Products:**
   - Go to https://dashboard.stripe.com/products
   - Create "PaintQuote Pro - Professional" product
   - Create "PaintQuote Pro - Business" product

2. **Create Prices:**
   - For each product, add monthly and yearly prices
   - Professional: $47/month or $470/year
   - Business: $97/month or $970/year

3. **Configure Webhook:**
   - Go to https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://www.paintquoteapp.com/api/stripe/webhooks`
   - Select events: 
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

4. **Get Webhook Signing Secret:**
   - After creating webhook, copy the signing secret
   - This should match your `STRIPE_WEBHOOK_SECRET`

## Testing Payment Flow

Once all variables are set:

1. Use Stripe test mode first (keys starting with `sk_test_` and `pk_test_`)
2. Test card number: 4242 4242 4242 4242
3. Any future expiry date and any 3-digit CVC
4. Verify webhook events are received
5. Check subscription status updates in database

## Important Notes

- Never commit API keys to git
- Use different keys for development/staging/production
- Enable Stripe webhook logs for debugging
- Monitor failed payment events