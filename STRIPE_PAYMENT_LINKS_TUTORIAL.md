# Step-by-Step Guide: Creating Stripe Payment Links

## Prerequisites
- Access to your Stripe Dashboard
- Your existing price IDs (which you already have)

## Step 1: Access Payment Links

1. **Log in** to your [Stripe Dashboard](https://dashboard.stripe.com)
2. In the left sidebar, click on **"Payment links"**
3. Click the **"+ Create payment link"** button (top right)

## Step 2: Create Professional Monthly Link

### 2.1 Select Product
1. On the "Add products" page, click **"Add existing product"**
2. Search for your Professional plan product
3. Select the **$29.99/month** price (this should match your monthly price ID)
4. Click **"Add"**

### 2.2 Configure Link Settings
1. Click **"After payment"** section
   - Success URL: `https://paintquotepro.com/dashboard/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`
   - Cancel URL: `https://paintquotepro.com/dashboard/settings/billing`

2. Click **"Customer info"** section
   - Toggle ON: **Collect email** (Required)
   - Toggle ON: **Collect name**
   - Toggle ON: **Collect address**
   - Toggle ON: **Collect phone**

3. Click **"Advanced options"**
   - Toggle OFF: **Allow customers to adjust quantity**
   - Toggle ON: **Allow promotion codes**
   - Add metadata (click "Add metadata"):
     - Key: `plan` | Value: `professional`
     - Key: `billing` | Value: `monthly`

### 2.3 Customize Appearance
1. Under **"Customize"**:
   - Add a description: "Professional Plan - Perfect for growing painting contractors"
   - You can add your logo if you have one uploaded

### 2.4 Create the Link
1. Click **"Create link"** button
2. Copy the generated link (it will look like: `https://buy.stripe.com/xxx`)
3. Save this as: `NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK`

## Step 3: Create Professional Yearly Link

1. Click **"Create payment link"** again
2. **Add existing product** → Select Professional plan → Choose **$299.99/year** price
3. Use the same settings as Step 2.2, but change metadata:
   - Key: `plan` | Value: `professional`
   - Key: `billing` | Value: `yearly`
4. Description: "Professional Plan (Annual) - Save $60 per year!"
5. Create and copy the link
6. Save as: `NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK`

## Step 4: Create Business Monthly Link

1. Click **"Create payment link"** again
2. **Add existing product** → Select Business plan → Choose **$79.99/month** price
3. Same settings as before, with metadata:
   - Key: `plan` | Value: `business`
   - Key: `billing` | Value: `monthly`
4. Description: "Business Plan - Unlimited quotes and advanced features"
5. Create and copy the link
6. Save as: `NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_LINK`

## Step 5: Create Business Yearly Link

1. Click **"Create payment link"** again
2. **Add existing product** → Select Business plan → Choose **$799.99/year** price
3. Same settings, with metadata:
   - Key: `plan` | Value: `business`
   - Key: `billing` | Value: `yearly`
4. Description: "Business Plan (Annual) - Save $160 per year!"
5. Create and copy the link
6. Save as: `NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_LINK`

## Step 6: Create General Upgrade Link

1. Click **"Create payment link"** one more time
2. **Add existing product** → Select Professional plan → Choose **$29.99/month** price
3. Same settings as Professional Monthly
4. Description: "Upgrade to unlock all features"
5. Create and copy the link
6. Save as: `NEXT_PUBLIC_STRIPE_UPGRADE_LINK`

## Step 7: Add to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com)
2. Select your PaintQuote Pro project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

```bash
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK = [paste your link]
NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK = [paste your link]
NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_LINK = [paste your link]
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_LINK = [paste your link]
NEXT_PUBLIC_STRIPE_UPGRADE_LINK = [paste your link]
```

5. Make sure to add for all environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

## Step 8: Test Your Links

### Test in Stripe Test Mode First
1. In Stripe Dashboard, toggle to **Test mode** (top right)
2. Create test versions of all payment links
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry, any CVC

### Test the Integration
1. Redeploy your Vercel app
2. Click on a locked feature
3. Verify redirect to Stripe
4. Complete test payment
5. Verify redirect back to success URL

## Common Issues & Solutions

### Links not redirecting?
- Check browser console for errors
- Verify environment variables are set in Vercel
- Check that links are active in Stripe

### Wrong price showing?
- Double-check you selected the correct price when creating the link
- Verify the price IDs match what you expect

### Customer email not pre-filled?
- The app should append `?prefilled_email=` to the URL
- Check browser network tab to see the full URL

## Final Checklist

- [ ] Created 5 payment links total
- [ ] Each link has proper success/cancel URLs
- [ ] Each link has metadata for plan/billing type
- [ ] All links added to Vercel environment variables
- [ ] Tested at least one link in test mode
- [ ] Redeployed Vercel app

## Next Steps

Once payment links are working:
1. Set up webhooks for automatic subscription updates
2. Configure Stripe Customer Portal for subscription management
3. Add analytics to track conversion rates