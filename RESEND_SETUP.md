# Resend Email Setup Guide

## Quick Setup

1. **Get your Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create a new API key
   - Copy the key (starts with `re_`)

2. **Add to Vercel Environment Variables**
   ```
   RESEND_API_KEY=re_your_api_key_here
   DEFAULT_FROM_EMAIL=noreply@paintquotepro.com
   ```

3. **Verify Your Domain (Production)**
   - In Resend dashboard, go to Domains
   - Add your domain (e.g., paintquotepro.com)
   - Add the DNS records they provide
   - Wait for verification (usually 5-10 minutes)

## What's Already Set Up

✅ **Magic Link Emails** (`/api/email/send-magic-link`)
- Beautiful HTML template
- Secure login links
- 15-minute expiry warning

✅ **Welcome Emails** (`/api/email/send-welcome`)
- Access code display
- Getting started guide
- Professional design

✅ **Automatic Fallbacks**
- Works without Resend in development
- Logs emails to console
- Shows magic links in terminal

## Testing

### Local Development
1. Run without `RESEND_API_KEY` - emails log to console
2. Add `RESEND_API_KEY` to `.env.local` - real emails sent

### Test Email Flow
```bash
# Test magic link signup
curl -X POST http://localhost:3001/api/auth/magic-signup \
  -H "Content-Type: application/json" \
  -d '{"companyName": "Test Co", "email": "your@email.com"}'

# Check console for magic link if no API key
# Check inbox if API key is set
```

## Email Templates

### Magic Link Email
- Subject: "Complete your PaintQuote Pro signup" or "Your PaintQuote Pro login link"
- Clean, professional design
- Clear call-to-action button
- Mobile responsive

### Welcome Email  
- Subject: "Welcome to PaintQuote Pro - Your Access Code"
- Large, visible access code
- Step-by-step getting started guide
- Support contact information

## Production Checklist

- [ ] Add `RESEND_API_KEY` to Vercel
- [ ] Add `DEFAULT_FROM_EMAIL` (use verified domain)
- [ ] Verify your domain in Resend
- [ ] Test with a real email address
- [ ] Monitor Resend dashboard for bounces/issues

## Common Issues

### "Email not delivered"
1. Check Resend dashboard for errors
2. Verify domain is authenticated
3. Check spam folder
4. Ensure email address is valid

### "From address not allowed"
1. Use `onboarding@resend.dev` for testing
2. Verify your domain for custom from addresses
3. Update `DEFAULT_FROM_EMAIL` in Vercel

### Development vs Production
- Dev: Emails log to console by default
- Prod: Real emails sent via Resend
- Both: Fallback to console if no API key

## Monitoring

Check Resend dashboard for:
- Email delivery status
- Open rates
- Bounce rates
- API usage

## Support

- Resend docs: [resend.com/docs](https://resend.com/docs)
- Status page: [status.resend.com](https://status.resend.com)