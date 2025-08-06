# PaintQuote Pro Setup Guide

## Critical Configuration Required

### 1. OpenRouter API Key (REQUIRED for AI Chat)

The AI chat feature requires an OpenRouter API key. Without it, you'll get 401 errors.

1. Go to https://openrouter.ai/
2. Sign up for an account
3. Go to https://openrouter.ai/keys
4. Create a new API key
5. Update `.env.local` with your key:

```bash
OPENROUTER_API_KEY=sk-or-v1-YOUR-ACTUAL-KEY-HERE
```

### 2. Current LLM Model

The chatbot is configured to use:
- **Model:** `anthropic/claude-3.5-sonnet`
- **Location:** `/lib/ai/quote-assistant.ts`

This is a good model for quote generation. Make sure your OpenRouter account has credits for this model.

### 3. Email Configuration (Optional)

For magic link emails to work in production:
1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local`:

```bash
RESEND_API_KEY=re_YOUR_KEY_HERE
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 4. Supabase (Already Configured)

Your Supabase credentials are already set up and working.

## Quick Start

1. Copy `.env.local.example` to `.env.local` (if not already done)
2. Add your OpenRouter API key (CRITICAL)
3. Run `npm install`
4. Run `npm run dev`
5. Visit http://localhost:3001

## Deployment to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add these environment variables in Vercel:
   - `OPENROUTER_API_KEY` (your actual key)
   - `RESEND_API_KEY` (if using email)
   - All `NEXT_PUBLIC_*` variables from `.env.local`
   - All Supabase keys

## Troubleshooting

### "401 Unauthorized" in Chat
- **Cause:** Missing or invalid OpenRouter API key
- **Fix:** Add valid `OPENROUTER_API_KEY` to `.env.local`

### Email Not Sending
- **Cause:** Resend not configured
- **Fix:** Add `RESEND_API_KEY` or emails will log to console in dev mode

### Database Errors
- **Cause:** Supabase connection issues
- **Fix:** Check Supabase keys are correct and project is active

## Build Status

Current issues (non-critical):
- 346 ESLint warnings (mostly formatting)
- 0 TypeScript errors
- Build completes successfully

To check:
```bash
npm run build
npm run lint
```