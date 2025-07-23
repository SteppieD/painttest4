# PaintQuote Pro Tech Stack

## Frontend
- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.8.3
- **UI Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.6
- **UI Components**: Radix UI (dialogs, dropdowns, forms, etc.)
- **Form Handling**: React Hook Form 7.52.1 with Zod validation
- **Animations**: Framer Motion 11.18.2
- **Icons**: Lucide React & React Icons

## Backend & Database
- **Database**: Supabase (PostgreSQL) with fallback to SQLite (better-sqlite3)
- **ORM**: Direct SQL queries (no Prisma in current setup)
- **Authentication**: JWT-based with bcryptjs
- **API**: Next.js API routes

## AI Integration
- **Anthropic SDK**: 0.54.0
- **Google Generative AI**: 0.21.0
- **OpenRouter**: For Claude access

## Payment & Email
- **Stripe**: React Stripe.js for payments
- **Resend**: Email service (4.6.0)

## Development Tools
- **Linting**: ESLint with TypeScript plugin
- **Type Checking**: TypeScript strict mode
- **Testing**: Playwright (devDependency)
- **Build Tool**: Next.js built-in webpack