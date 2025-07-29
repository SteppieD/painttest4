# PaintTest4 API Routes Overview

## Authentication Routes (/api/auth/)
- **POST /signin**: Company login with access code
- **POST /signup**: New company registration
- **POST /signout**: Clear session
- **POST /verify-code**: Verify email verification code
- **POST /verify-magic-link**: Verify magic link token
- **POST /magic-signup**: Create account with magic link
- **POST /resend-code**: Resend verification code
- **POST /admin/login**: Admin authentication

## Quote Management (/api/quotes/)
- **GET /**: List quotes for company
- **POST /**: Create new quote
- **GET /[id]**: Get quote details
- **PUT /[id]**: Update quote
- **DELETE /[id]**: Delete quote
- **GET /[id]/public**: Public quote view
- **POST /[id]/track**: Track quote interactions

## AI Integration (/api/ai/)
- **POST /quote-assistant**: Chat-based quote creation
- **POST /create-quote**: Generate quote from conversation
- **POST /parse-quote**: Extract quote data from text

## Company Management (/api/companies/)
- **GET /**: List companies (admin)
- **POST /**: Create company
- **GET /[id]**: Get company details
- **PUT /[id]**: Update company
- **GET /settings**: Get company settings
- **POST /settings**: Update company settings
- **GET /usage**: Get usage statistics
- **POST /onboarding**: Complete onboarding
- **POST /onboarding/chat**: Onboarding chat assistant

## Stripe Integration (/api/stripe/)
- **POST /create-checkout-session**: Start subscription
- **POST /create-portal-session**: Manage subscription
- **POST /webhooks**: Handle Stripe events
- **GET /subscription-info**: Get subscription details

## Email (/api/email/)
- **POST /send-magic-link**: Send authentication email
- **POST /send-welcome**: Send welcome email

## Chat (/api/chat/)
- **POST /**: General chat endpoint
- **POST /quote**: Quote-specific chat
- **POST /test**: Test chat functionality

## Utilities
- **GET /health**: Health check
- **GET /test**: System tests
- **GET /env-check**: Environment validation
- **GET /ping**: Simple ping endpoint
- **POST /init-db**: Initialize database
- **GET /paint-products**: List paint products
- **GET /quote-usage**: Check quote limits

## Test Endpoints
- **Various /test/***: Development and testing endpoints