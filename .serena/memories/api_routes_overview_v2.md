# PaintQuote Pro API Routes Overview

## Authentication Routes (`/api/auth`)
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout
- `POST /api/auth/verify-code` - Verify access code
- `POST /api/auth/magic-signup` - Magic link signup
- `POST /api/auth/verify-magic-link` - Verify magic link
- `POST /api/auth/resend-code` - Resend verification code
- `POST /api/auth/simple-signup` - Simplified signup flow
- `POST /api/auth/signin-demo` - Demo login
- `POST /api/auth/admin/login` - Admin login

## Quote Management (`/api/quotes`)
- `GET /api/quotes` - List all quotes
- `POST /api/quotes` - Create new quote
- `GET /api/quotes/[id]` - Get specific quote
- `PUT /api/quotes/[id]` - Update quote
- `DELETE /api/quotes/[id]` - Delete quote
- `GET /api/quotes/[id]/public` - Public quote view
- `POST /api/quotes/[id]/track` - Track quote interactions

## AI Services (`/api/ai`)
- `POST /api/ai/create-quote` - AI-powered quote creation
- `POST /api/ai/parse-quote` - Parse quote details
- `POST /api/ai/quote-assistant` - Quote assistant chat

## Chat Services (`/api/chat`)
- `POST /api/chat` - Main chat endpoint
- `POST /api/chat/quote` - Quote-specific chat
- `POST /api/chat/test` - Chat testing endpoint
- `POST /api/chat-debug` - Debug chat endpoint

## Company Management (`/api/companies`)
- `GET /api/companies` - List companies
- `POST /api/companies` - Create company
- `GET /api/companies/[id]` - Get company details
- `PUT /api/companies/[id]` - Update company
- `GET /api/companies/settings` - Get company settings
- `PUT /api/companies/settings` - Update settings
- `GET /api/companies/usage` - Get usage stats
- `POST /api/companies/onboarding` - Company onboarding
- `POST /api/companies/onboarding/chat` - Onboarding chat

## Payment Processing (`/api/stripe`)
- `POST /api/stripe/create-checkout-session` - Create checkout
- `POST /api/stripe/create-portal-session` - Customer portal
- `GET /api/stripe/subscription-info` - Subscription details
- `POST /api/stripe/webhooks` - Stripe webhooks

## Email Services (`/api/email`)
- `POST /api/email/send-magic-link` - Send magic link
- `POST /api/email/send-welcome` - Send welcome email

## Utility Endpoints
- `GET /api/health` - Health check
- `POST /api/init-db` - Initialize database
- `POST /api/init-db/seed-demo` - Seed demo data
- `GET /api/paint-products` - Get paint products
- `GET /api/quote-usage` - Quote usage stats
- `POST /api/web-vitals` - Core Web Vitals tracking
- `GET /api/verify-code` - Verify access code
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update user settings

## Testing & Debug Endpoints
- `/api/test/*` - Various test endpoints
- `/api/debug/*` - Debug endpoints
- `/api/diagnose` - System diagnostics
- `/api/env-check` - Environment check
- `/api/check-supabase` - Supabase connection test
- `/api/ping` - Simple ping test

## Response Formats
All API endpoints return JSON responses with consistent structure:
- Success: `{ success: true, data: {...} }`
- Error: `{ success: false, error: "message" }`

## Authentication
Protected routes require JWT token in Authorization header or cookie.