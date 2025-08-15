# N8N Integration Setup Guide for PaintQuote Pro

## Overview
This guide will help you connect N8N to PaintQuote Pro for automated email workflows, payment notifications, and customer lifecycle management.

## Prerequisites
- Active N8N instance (cloud or self-hosted)
- PaintQuote Pro application running
- Stripe webhook configured
- Email service (Resend or similar) configured in N8N

## Step 1: Database Setup

Run the SQL migration in your Supabase dashboard:

```sql
-- Copy and run the contents of n8n-integration-setup.sql in Supabase SQL editor
```

This creates:
- N8N workflow logging tables
- Email event tracking
- Email preferences management
- Webhook deduplication

## Step 2: Environment Variables

### Local Development (.env.local)
```env
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.n8n.cloud
N8N_API_KEY=your-n8n-api-key-here
```

### Production (Vercel)
Add these environment variables in Vercel dashboard:
- `N8N_WEBHOOK_BASE_URL` - Your N8N instance URL
- `N8N_API_KEY` - Your N8N API key (optional but recommended)

## Step 3: N8N Workflow Setup

### Create Webhook Endpoints in N8N

1. **Payment Success Workflow**
   - Create new workflow in N8N
   - Add Webhook node with path: `/webhook/payment-success`
   - Set to respond immediately
   - Add your email sending nodes
   - Template variables available:
     ```json
     {
       "companyId": 1,
       "amount": 99.99,
       "currency": "usd",
       "invoiceNumber": "INV-001",
       "invoiceUrl": "https://...",
       "customerEmail": "customer@example.com",
       "customerName": "Company Name",
       "subscriptionPlan": "professional",
       "nextBillingDate": "2024-02-01"
     }
     ```

2. **Payment Failed Workflow**
   - Create workflow with path: `/webhook/payment-failed`
   - Add logic for retry attempts (1st, 2nd, 3rd attempt)
   - Include escalating urgency in emails
   - Template variables:
     ```json
     {
       "companyId": 1,
       "amount": 99.99,
       "failureReason": "Card declined",
       "attemptCount": 1,
       "nextRetryDate": "2024-01-20"
     }
     ```

3. **Subscription Created Workflow**
   - Path: `/webhook/subscription-created`
   - Welcome email sequence
   - Onboarding tips over 7-14 days
   - Variables include plan type and trial info

4. **Quote Created Workflow**
   - Path: `/webhook/quote-created`
   - Send quote to customer
   - Follow-up sequence (2, 5, 10 days)
   - Include discount offers for conversion

5. **Usage Warning Workflow**
   - Path: `/webhook/usage-limit-warning`
   - Triggered at 80% usage
   - Upgrade prompts
   - Usage statistics

### Email Template Setup in N8N

Use HTML templates with these merge fields:
- `{{customerName}}` - Customer's name
- `{{amount}}` - Payment/quote amount
- `{{companyName}}` - Your company name
- `{{invoiceUrl}}` - Link to invoice
- `{{updatePaymentUrl}}` - Payment update link
- `{{quoteUrl}}` - Link to quote

### Example N8N Workflow JSON

Import this into N8N for a basic payment success workflow:

```json
{
  "nodes": [
    {
      "parameters": {
        "path": "payment-success",
        "responseMode": "onReceived",
        "responseData": "allEntries"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    },
    {
      "parameters": {
        "fromEmail": "billing@yourcompany.com",
        "toEmail": "={{$json.data.customerEmail}}",
        "subject": "Payment Received - Thank You!",
        "emailType": "html",
        "htmlBody": "<h1>Payment Confirmed</h1><p>Thank you {{$json.data.customerName}}!</p><p>We've received your payment of ${{$json.data.amount}}.</p>"
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "position": [450, 300]
    }
  ]
}
```

## Step 4: Testing the Integration

### 1. Test N8N Connection
```bash
curl http://localhost:3005/api/n8n/test
```

### 2. Trigger Test Workflows
Use the test endpoint to trigger workflows:

```javascript
// Test payment success workflow
fetch('/api/n8n/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    workflowType: 'payment_success',
    testData: {
      companyId: 1,
      amount: 99.99,
      customerEmail: 'test@example.com',
      customerName: 'Test Company'
    }
  })
});
```

### 3. Check Workflow Logs
Monitor in Supabase:
```sql
SELECT * FROM n8n_workflow_logs ORDER BY triggered_at DESC;
SELECT * FROM email_events ORDER BY sent_at DESC;
```

## Step 5: Production Deployment

### Stripe Webhook Configuration
1. The enhanced subscription service automatically triggers N8N workflows
2. No changes needed to existing Stripe webhook endpoint
3. All payment events flow through: Stripe → Your App → N8N → Email Service

### Monitoring & Analytics

View email analytics:
```sql
SELECT * FROM email_analytics WHERE month = DATE_TRUNC('month', NOW());
```

Check subscription health:
```sql
SELECT * FROM subscription_health WHERE health_status = 'At Risk';
```

## Common N8N Workflow Patterns

### 1. Payment Recovery Sequence
```
Day 0: Payment fails → Immediate notification
Day 1: Friendly reminder
Day 3: Urgent reminder + Support offer
Day 7: Final notice
Day 10: Account suspension warning
```

### 2. Onboarding Sequence
```
Day 0: Welcome email
Day 1: Getting started guide
Day 3: Tips & tricks
Day 7: Check-in survey
Day 14: Feature highlights
Day 30: Usage report
```

### 3. Quote Follow-up
```
Day 0: Quote sent
Day 2: "Any questions?"
Day 5: 10% discount offer
Day 10: Final follow-up
Day 14: Archive
```

## Troubleshooting

### N8N not receiving webhooks
1. Check N8N_WEBHOOK_BASE_URL is correct
2. Verify N8N webhook is active
3. Check N8N logs for incoming requests
4. Test with curl directly to N8N

### Emails not sending
1. Verify email service is configured in N8N
2. Check email service API keys
3. Review N8N execution logs
4. Check email_events table for status

### Database errors
1. Ensure all migrations have run
2. Check table permissions
3. Verify foreign key constraints
4. Review n8n_workflow_logs for errors

## Best Practices

1. **Use Templates**: Create reusable email templates in N8N
2. **Add Delays**: Space out email sequences appropriately
3. **Track Opens**: Use email tracking to optimize send times
4. **A/B Testing**: Test different subject lines and content
5. **Respect Preferences**: Always check email_preferences before sending
6. **Error Handling**: Add error catchers in N8N workflows
7. **Rate Limiting**: Don't overwhelm customers with emails
8. **Personalization**: Use all available data for personalization
9. **Mobile Optimization**: Ensure emails work on mobile
10. **Unsubscribe Links**: Include in all marketing emails

## Security Considerations

1. **API Key**: Always use N8N_API_KEY in production
2. **Webhook Validation**: Verify webhook signatures
3. **Data Privacy**: Don't log sensitive payment data
4. **SSL/TLS**: Ensure N8N uses HTTPS
5. **Access Control**: Limit N8N webhook access
6. **Audit Logs**: Monitor workflow executions

## Support

For issues or questions:
1. Check the n8n_workflow_logs table for errors
2. Review N8N execution history
3. Test individual workflows with the test endpoint
4. Monitor email_events for delivery status

## Next Steps

1. Set up monitoring dashboards
2. Create custom email templates
3. Implement A/B testing
4. Add SMS notifications (via N8N + Twilio)
5. Set up customer segmentation
6. Create retention campaigns
7. Build re-engagement workflows