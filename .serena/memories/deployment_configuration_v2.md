# PaintQuote Pro Deployment Configuration

## Deployment Platforms

### 1. Docker Deployment
- **Multi-stage Dockerfile** for optimized builds
- **Base Image**: Node.js 18 Alpine Linux
- **Dependencies**: SQLite, OpenSSL, Python3
- **Production optimizations**:
  - Non-root user (nextjs:1001)
  - Layer caching
  - Minimal runtime dependencies
  - Health checks included

### 2. Docker Compose
- **Service**: paintquote (port 3001)
- **Volume**: paintquote_data for database persistence
- **Environment**: Comprehensive env vars
- **Features**: Auto-restart, health monitoring

### 3. Vercel Deployment
- **Framework**: Next.js auto-detected
- **Region**: iad1 (US East)
- **Build**: Standard npm commands
- **Environment**: Supabase enabled for production

## Environment Variables

### Database
- `DATABASE_PATH`: SQLite file location (dev)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL (prod)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public key
- `SUPABASE_SERVICE_ROLE_KEY`: Admin key

### Authentication
- `JWT_SECRET`: Token signing key
- `NEXTAUTH_URL`: Auth callback URL
- `NEXTAUTH_SECRET`: NextAuth encryption

### AI Services (Optional)
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `OPENROUTER_API_KEY`
- `GOOGLE_GENERATIVE_AI_API_KEY`

### Payment (Stripe)
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- Price IDs for subscriptions
- Payment link URLs

### Email
- `RESEND_API_KEY`
- `DEFAULT_FROM_EMAIL`

### Application
- `NODE_ENV`: development/production
- `PORT`: Server port (default 3001)
- `NEXT_PUBLIC_SITE_URL`: Public URL
- `NEXT_PUBLIC_APP_NAME`: App branding

### Feature Flags
- `NEXT_PUBLIC_ENABLE_AI_CHAT`
- `NEXT_PUBLIC_ENABLE_PAYMENTS`
- `NEXT_PUBLIC_ENABLE_EMAIL`

## Deployment Workflows

### Local Development
```bash
npm run dev
# Runs on port 3001
# Uses SQLite database
```

### Docker Development
```bash
docker-compose up
# Full stack with persistence
# Accessible at localhost:3001
```

### Production (Vercel)
- Push to main branch
- Auto-deploy via Vercel
- Environment vars from Vercel dashboard
- Supabase for database

### Production (Docker)
```bash
docker-compose -f docker-compose.yml up -d
# Uses production image
# Configure env vars in .env file
```

## Security Considerations
- All secrets must be changed for production
- Use strong JWT secrets (32+ chars)
- Enable HTTPS in production
- Rotate API keys regularly
- Use environment-specific configs

## Monitoring
- Health endpoint: `/api/health`
- Web Vitals tracking enabled
- Docker health checks configured
- Vercel analytics available