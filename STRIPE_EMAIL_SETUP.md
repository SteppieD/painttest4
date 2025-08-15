# Stripe Email Setup Guide - Simple Version

## Overview
This guide walks you through enabling Stripe's built-in email notifications for PaintQuote Pro. This is the simplest way to ensure customers receive payment notifications without setting up complex workflows.

## Why Use Stripe's Built-in Emails?

### Pros:
- ✅ Zero additional setup required
- ✅ Professional, tested email templates
- ✅ Automatic retry links for failed payments
- ✅ Mobile-responsive designs
- ✅ Deliverability handled by Stripe
- ✅ No maintenance needed

### Cons:
- ❌ Limited customization options
- ❌ No custom sequences or campaigns
- ❌ Can't add marketing content
- ❌ No quote follow-ups
- ❌ Basic branding only

## Step-by-Step Setup

### 1. Access Stripe Email Settings

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings** (bottom left)
3. Click **Customer emails** under Business settings

### 2. Enable Essential Emails

Turn ON these critical emails:

#### Payment Emails
- ✅ **Successful payment** - Sends receipt after payment
- ✅ **Failed payment** - Alerts customer to update payment method
- ✅ **Refund confirmation** - Confirms refunds processed

#### Subscription Emails  
- ✅ **Trial will end reminder** - Reminder before trial ends
- ✅ **Subscription renewal** - Upcoming renewal notice
- ✅ **Subscription updated** - Plan change confirmations

#### Card Management
- ✅ **Expiring card** - Warning before card expires
- ✅ **Card expiring soon** - Follow-up reminder
- ✅ **New payment method** - Confirmation when card updated

### 3. Customize Email Branding

In the same settings page:

1. **Upload your logo**
   - Recommended: PNG with transparent background
   - Size: 280x80px maximum
   - Will appear at top of all emails

2. **Set brand colors**
   - Primary color: Match your app's main color
   - Link color: Should be visible and clickable

3. **Configure support details**
   - Support email: your-support@company.com
   - Support phone: Optional but recommended
   - Support URL: Link to your help center

4. **Set reply-to address**
   - Use a monitored email address
   - Customers may reply with questions

### 4. Configure Invoice Settings

Navigate to **Settings** → **Invoicing**:

1. **Enable invoice emails**
   - ✅ Email invoices to customers
   - ✅ Email invoice receipts

2. **Set invoice footer**
   - Add business details
   - Include tax ID if applicable
   - Add terms of service link

3. **Configure invoice numbering**
   - Choose sequential or random
   - Set prefix (e.g., "PQP-")

### 5. Test Email Delivery

1. **Create a test subscription** in Stripe Test Mode
2. **Process a test payment**
3. **Verify email received** at test email address
4. **Check spam folder** if not in inbox

### 6. Monitor Email Performance

In Stripe Dashboard:
- Go to **Customers** → Select customer → **Emails**
- View sent emails and delivery status
- Check if emails are being opened

## What Customers Will Receive

### Payment Success Email
```
Subject: Your receipt from [Your Company] #PQP-0001
Content:
- Amount paid
- Invoice number
- Payment method (last 4 digits)
- Link to download PDF receipt
```

### Payment Failed Email
```
Subject: Your payment couldn't be processed
Content:
- Failure reason
- Update payment link
- Number of retry attempts remaining
- When next retry will occur
```

### Subscription Updated Email
```
Subject: Your subscription has been updated
Content:
- Old plan → New plan
- Price change
- Next billing date
- Proration details
```

## Production Checklist

Before going live:

- [ ] Enable all critical email types
- [ ] Upload company logo
- [ ] Set brand colors
- [ ] Add support email
- [ ] Test with real payment in test mode
- [ ] Verify emails aren't going to spam
- [ ] Set up email forwarding for support address
- [ ] Document which emails are enabled for support team

## Monitoring & Support

### Check Email Status
1. Stripe Dashboard → Customers → [Customer]
2. Click "Emails" tab
3. View all sent emails and status

### Common Issues

**Emails going to spam:**
- Ask customers to whitelist stripe@stripe.com
- Emails come from Stripe's domain (good deliverability)

**Customer not receiving emails:**
- Check email address is correct
- Verify email is enabled in settings
- Check customer's email events in Stripe

**Wrong branding showing:**
- Clear cache and refresh settings
- Changes take 5-10 minutes to propagate

## Future Enhancements

When you're ready for advanced email workflows:

### Phase 1: Basic Enhancements (1-2 months)
- Add Resend for custom transactional emails
- Send quote confirmation emails
- Add welcome emails for new signups

### Phase 2: N8N Integration (3-6 months)
- Payment recovery sequences
- Onboarding campaigns
- Quote follow-up automation
- Usage alerts and upgrades

### Phase 3: Full Marketing Automation (6+ months)
- Customer segmentation
- A/B testing
- Behavioral triggers
- Win-back campaigns

## Current Status

✅ **Stripe emails are sufficient for MVP/early stage**
✅ **N8N integration code is ready but dormant**
✅ **Can upgrade anytime without breaking changes**

## Support Resources

- [Stripe Email Documentation](https://stripe.com/docs/receipts)
- [Email Deliverability Guide](https://stripe.com/docs/receipts#deliverability)
- [Customer Portal Setup](https://stripe.com/docs/customer-portal)

## Notes

- Stripe emails are free (included with Stripe account)
- No monthly email limits
- Automatic retry for failed deliveries
- GDPR/CAN-SPAM compliant
- Mobile responsive by default

---

**Remember:** This setup ensures customers get essential payment notifications. Focus on growing your business first, then enhance email communication when you have more customers and resources.