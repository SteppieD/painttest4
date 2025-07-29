# PaintTest4 Technology Stack

## Frontend Framework
- **Next.js 14.2.5**: React framework with App Router
- **React 18.2.0**: UI library
- **TypeScript 5.8.3**: Type-safe JavaScript

## UI & Styling
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **Radix UI**: Headless component library (@radix-ui/react-*)
- **shadcn/ui**: Component system built on Radix UI
- **Framer Motion 11.18.2**: Animation library
- **Lucide React**: Icon library
- **React Icons 5.2.1**: Additional icons

## State Management & Forms
- **React Hook Form 7.52.1**: Form handling
- **Zod 3.23.8**: Schema validation
- **@hookform/resolvers**: Form validation integration

## Database & Backend
- **Supabase**: PostgreSQL database and auth (primary)
- **Better SQLite3**: Local SQLite database option
- **Database Adapter Pattern**: Supports Supabase, SQLite, and in-memory storage

## Authentication
- **Magic Link Authentication**: Email-based passwordless auth
- **Access Code System**: Company-specific access codes
- **JWT**: JSON Web Tokens for session management
- **bcryptjs**: Password hashing (for admin features)

## AI Integration
- **OpenRouter**: AI model routing service
- **Anthropic SDK**: Claude integration
- **Google Generative AI**: Gemini integration

## Payment Processing
- **Stripe**: Payment processing and subscriptions
- **@stripe/stripe-js**: Stripe JavaScript SDK
- **@stripe/react-stripe-js**: React Stripe components

## Email
- **Resend 4.7.0**: Transactional email service

## Development Tools
- **ESLint**: Code linting
- **Playwright**: E2E testing
- **Docker**: Containerization
- **Vercel**: Deployment platform

## Additional Libraries
- **Recharts 3.1.0**: Charts and data visualization
- **Canvas Confetti**: Celebration animations
- **Date-fns 3.6.0**: Date utilities
- **Decimal.js**: Precise decimal calculations