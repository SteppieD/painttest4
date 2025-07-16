# Vercel Production Setup Guide

## Database Setup (Neon PostgreSQL)

1. **Create a Neon Account**
   - Go to https://neon.tech/
   - Sign up for a free account
   - Create a new project called "paintquotepro"

2. **Get Database Connection String**
   - In your Neon dashboard, go to the "Connection Details" tab
   - Copy the connection string (should look like):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

## Environment Variables for Vercel

Set these environment variables in your Vercel project settings:

### Required Variables
```bash
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="your-nextauth-secret-key-change-in-production"
NODE_ENV="production"
NEXT_PUBLIC_SITE_URL="https://your-app-name.vercel.app"
NEXT_PUBLIC_APP_NAME="PaintQuote Pro"
NEXT_PUBLIC_SUPPORT_EMAIL="support@paintquotepro.com"
NEXT_PUBLIC_ENABLE_AI_CHAT="true"
NEXT_PUBLIC_ENABLE_PAYMENTS="false"
NEXT_PUBLIC_ENABLE_EMAIL="false"
DEBUG="false"
RATE_LIMIT_WINDOW="60000"
RATE_LIMIT_MAX_REQUESTS="100"
```

### Optional Variables (for AI features)
```bash
ANTHROPIC_API_KEY="sk-ant-api03-..."
OPENROUTER_API_KEY="sk-or-..."
OPENAI_API_KEY="sk-..."
```

## Steps to Deploy

1. **Set up database**:
   ```bash
   # After setting DATABASE_URL in Vercel
   npx prisma db push
   ```

2. **Seed the database**:
   ```sql
   -- Connect to your Neon database and run:
   INSERT INTO "Company" (name, email, phone, address, plan, "billingPeriod", "quotesUsed", "quotesLimit", settings, "createdAt", "updatedAt", "quotesResetAt") 
   VALUES (
     'Acme Painting Co.',
     'admin@acmepainting.com',
     '555-0123',
     '123 Main St, Anytown, ST 12345',
     'professional',
     'monthly',
     0,
     -1,
     '{"defaultTaxRate": 8.25, "defaultOverheadPercent": 15, "defaultProfitMargin": 30, "laborRates": {"residential": 45, "commercial": 55}}'::jsonb,
     NOW(),
     NOW(),
     NOW()
   );
   
   INSERT INTO "User" (email, password, role, "firstName", "lastName", "companyId", "isActive", settings, "createdAt", "updatedAt", "lastLoginAt")
   VALUES (
     'admin@acmepainting.com',
     '$2b$10$J8HzCq5/ufH.dFGKs8jcmOHeB1E.nNGhXLLBj5DZuFQGEq6gqJhH6',
     'ADMIN',
     'Admin',
     'User',
     1,
     true,
     '{}'::jsonb,
     NOW(),
     NOW(),
     NOW()
   );
   ```

3. **Test credentials**:
   - Email: admin@acmepainting.com
   - Password: admin123

## Alternative: Simple Demo Mode

If you want to avoid setting up a database for now, you can create a demo mode by modifying the signin API to use hardcoded credentials.