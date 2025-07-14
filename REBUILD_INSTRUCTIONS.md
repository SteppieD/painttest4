# PaintQuote Pro - Complete Rebuild Instructions

This document provides step-by-step instructions to rebuild the entire PaintQuote Pro platform from scratch.

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL (or use Docker)
- Git

## Step 1: Clone Repository

```bash
git clone [repository-url]
cd paintquotepro-web
```

## Step 2: Environment Setup

Create `.env.local` file with all required variables:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/paintquotepro"

# Authentication
JWT_SECRET="generate-a-secure-random-string-here"

# AI Integration
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Optional: Enhanced AI parsing
OPENROUTER_API_KEY="your-openrouter-api-key"

# Payment Processing (for freemium)
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## Step 3: Install Dependencies

```bash
# Install all dependencies
npm install

# If you get peer dependency warnings, use:
npm install --legacy-peer-deps
```

## Step 4: Database Setup

### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d postgres

# Wait for database to be ready
sleep 5

# Run Prisma migrations
npx prisma migrate dev

# Seed the database with test data
npx prisma db seed
```

### Option B: Using Local PostgreSQL

1. Create database:
```sql
CREATE DATABASE paintquotepro;
```

2. Update DATABASE_URL in `.env.local`

3. Run migrations:
```bash
npx prisma migrate dev
npx prisma db seed
```

## Step 5: Build and Run

### Development Mode

```bash
# Start development server
npm run dev

# Access at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment (Complete Stack)

```bash
# Build all containers
docker-compose build

# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Access at http://localhost:3000
```

## Step 6: Verify Installation

### Test Credentials

After seeding the database:
- **Admin**: admin@acmepainting.com / admin123
- **User**: painter@acmepainting.com / user123

### Functional Tests

1. **Authentication**
   - Sign in with test credentials
   - Verify JWT cookie is set
   - Access protected routes

2. **Quote Creation**
   - Create manual quote
   - Test AI chat interface
   - Verify charge rate calculations

3. **Pricing/Subscription**
   - Visit `/pricing` page
   - Check plan features
   - Test plan selection flow

4. **Business Suite**
   - Dashboard metrics
   - Settings management
   - Customer management

## Step 7: Configure Integrations

### Stripe (for payments)

1. Get API keys from Stripe Dashboard
2. Add to `.env.local`
3. Set up webhook endpoint at `/api/webhooks/stripe`
4. Configure webhook in Stripe Dashboard

### AI Services

1. **Anthropic Claude**
   - Get API key from console.anthropic.com
   - Required for basic chat functionality

2. **OpenRouter (Optional)**
   - Get API key from openrouter.ai
   - Enables enhanced parsing capabilities

## Common Issues & Solutions

### Issue: bcryptjs authentication failures
**Solution**: Ensure using bcryptjs@2.4.3 exactly
```bash
npm install bcryptjs@2.4.3 --save-exact
```

### Issue: Prisma client errors
**Solution**: Regenerate Prisma client
```bash
npx prisma generate
```

### Issue: Docker port conflicts
**Solution**: Stop conflicting services or change ports in docker-compose.yml

### Issue: Database connection errors
**Solution**: Ensure PostgreSQL is running and DATABASE_URL is correct

## Project Structure

```
paintquotepro-web/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   └── pricing/           # Pricing page
├── components/            # React components
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and helpers
│   ├── ai/               # AI integration
│   └── validations/      # Zod schemas
├── prisma/               # Database schema
├── public/               # Static assets
└── docker-compose.yml    # Docker configuration
```

## Deployment Options

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Railway

1. Connect GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

### Traditional VPS

1. Install Node.js and PostgreSQL
2. Clone repository
3. Set up PM2 for process management
4. Configure Nginx reverse proxy
5. Set up SSL with Let's Encrypt

## Monitoring & Maintenance

### Database Backups

```bash
# Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore database
psql $DATABASE_URL < backup_20250714.sql
```

### Log Monitoring

```bash
# Docker logs
docker-compose logs -f web

# PM2 logs (if using PM2)
pm2 logs
```

### Performance Monitoring

- Use Vercel Analytics (if on Vercel)
- Set up Sentry for error tracking
- Monitor database query performance

## Security Checklist

- [ ] Change all default passwords
- [ ] Generate secure JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Regular security updates
- [ ] Database connection pooling
- [ ] Input validation on all forms

## Support Resources

- **Documentation**: See README.md, DEVELOPMENT.md, ARCHITECTURE.md
- **Project Overview**: See PROJECT_OVERVIEW.md
- **API Reference**: See /api routes in codebase
- **Community**: GitHub Issues

## Final Notes

This platform is production-ready but should be customized for your specific needs:
1. Update branding and styling
2. Configure payment processing
3. Set up email delivery (SendGrid, AWS SES, etc.)
4. Implement additional integrations as needed
5. Customize quote templates for your market

For any issues during rebuild, check the detailed documentation in the project root.