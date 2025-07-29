# PaintTest4 Deployment Configuration

## Deployment Platforms

### Vercel (Primary)
- **Configuration**: vercel.json
- **Environment Variables**: Set in Vercel dashboard
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 20.x

### Docker Support
- **Dockerfile**: Multi-stage build
- **docker-compose.yml**: Full stack setup
- **Ports**: 3001 (dev), 3000 (production)
- **Volumes**: SQLite database persistence

## Environment Variables

### Required Variables
```
# Database
DATABASE_TYPE=supabase|sqlite
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Authentication
JWT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# AI Services
OPENROUTER_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_AI_API_KEY=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App Configuration
NEXT_PUBLIC_APP_URL=
NODE_ENV=production|development
```

### Development Setup
1. Copy `.env.example` to `.env.local`
2. Fill in required values
3. Run `npm install`
4. Run `npm run dev`

## Database Setup
1. **Supabase**: Run SQL scripts in order
   - `supabase/migrations/000_cleanup.sql`
   - `supabase/migrations/001_create_tables.sql`
   - `supabase/migrations/002_safe_migration.sql`
   - `supabase/migrations/003_step_by_step.sql`

2. **SQLite**: Auto-initialized on first run

## Production Checklist
- [ ] Set all environment variables
- [ ] Configure Stripe webhooks
- [ ] Set up Resend domain
- [ ] Enable Supabase Row Level Security
- [ ] Configure CORS origins
- [ ] Set up monitoring
- [ ] Configure SSL certificates
- [ ] Set up backup strategy

## Monitoring
- **Health Check**: `/api/health`
- **Status Page**: `/status`
- **Web Vitals**: Automatic reporting
- **Error Tracking**: Console logs to monitoring service

## Scaling Considerations
- **Database**: Supabase auto-scales
- **API Routes**: Vercel serverless functions
- **Static Assets**: CDN distribution
- **Rate Limiting**: Built into quote generation