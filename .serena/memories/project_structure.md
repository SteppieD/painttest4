# PaintQuote Pro Project Structure

## Root Directory
```
paintquotepro/
├── app/                         # Next.js 14 App Router
├── components/                  # React components
├── lib/                        # Utilities and helpers
├── public/                     # Static assets
├── scripts/                    # Build and utility scripts
├── styles/                     # Global styles
├── supabase/                   # Supabase configuration
└── resources/                  # Additional resources
```

## App Directory Structure
```
app/
├── (marketing)/               # Public marketing pages
│   ├── painting-contractors/
│   ├── painting-estimate-software/
│   └── [9 SEO-optimized pages]
├── dashboard/                 # Protected application pages
│   ├── quotes/               # Quote management
│   ├── chat/                 # AI chat assistant
│   └── settings/             # User settings
├── api/                      # API endpoints
│   ├── auth/                # Authentication
│   ├── quotes/              # Quote operations
│   └── chat/                # AI chat endpoint
├── auth/                     # Auth pages
├── pricing/                  # Pricing page
└── layout.tsx               # Root layout
```

## Components Directory
```
components/
├── ui/                       # Reusable UI components (Radix-based)
├── quote-form/              # Multi-step quote form components
│   ├── customer-step.tsx
│   ├── project-step.tsx
│   ├── surfaces-step.tsx
│   ├── paint-step.tsx
│   └── review-step.tsx
├── WebVitalsMonitor.tsx     # Performance monitoring
└── Breadcrumbs.tsx         # SEO breadcrumbs
```

## Key Configuration Files
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint rules
- `tailwind.config.ts` - Tailwind CSS config
- `next.config.js` - Next.js configuration
- `package.json` - Dependencies and scripts
- `docker-compose.simple.yml` - Docker setup
- `.env.example` - Environment variables template