# PaintQuote Pro Tech Stack

## Frontend Framework
- **Next.js 14.2.30** with App Router
- **React 18.2.0** with React Hook Form
- **TypeScript 5.8.3** (strict mode enabled)

## Styling & UI
- **Tailwind CSS 3.3.6** with custom components
- **Radix UI** components for accessibility
- **Framer Motion** for animations
- **Lucide React** and **React Icons** for icons
- **class-variance-authority** for component variants
- **tailwindcss-animate** for animations

## Database & ORM
- **SQLite** (better-sqlite3) for local development
- **Supabase** (PostgreSQL) for production
- Custom database adapters supporting both environments
- Multi-tenant architecture with companies and access codes

## Authentication & Security
- JWT-based authentication
- NextAuth 4.24.5 for session management
- bcryptjs for password hashing
- Access code system for multi-tenant access

## AI Integration
- **Anthropic SDK** for Claude AI
- **Google Generative AI** for Gemini
- **OpenRouter** API for Claude Sonnet 4
- **OpenAI** SDK support

## Payment Processing
- **Stripe** (React Stripe.js + Stripe SDK)
- Support for subscriptions and payment links

## Email Services
- **Resend** API for transactional emails

## Development Tools
- **Playwright** for E2E testing
- **ESLint** with TypeScript support
- **Docker** for containerization
- **Vercel** for deployment

## Data Visualization
- **Recharts** for charts and graphs
- **canvas-confetti** for celebrations

## Utilities
- **date-fns** for date manipulation
- **zod** for schema validation
- **decimal.js** for precise calculations
- **jsonwebtoken** for JWT handling

## Build Tools
- Next.js built-in bundler
- PostCSS with Autoprefixer
- TypeScript compiler

## Feature Flags
- Environment-based feature toggles
- AI chat, payments, and email features configurable