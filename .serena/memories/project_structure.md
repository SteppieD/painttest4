# Project Structure

```
paintquotepro/
├── app/                          # Next.js 14 App Router
│   ├── (marketing)/             # Public SEO pages
│   │   ├── painting-contractors/
│   │   ├── painting-estimate-software/
│   │   └── ... (9 SEO pages)
│   ├── dashboard/               # Protected app pages
│   │   ├── quotes/              # Quote management
│   │   ├── chat/                # AI chat assistant
│   │   └── settings/            # User settings
│   ├── api/                     # API routes
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   ├── quote-form/              # Multi-step quote form
│   └── layout/                  # Layout components
├── lib/                         # Utilities and helpers
│   ├── ai/                      # AI integration
│   └── utils.ts                 # Common utilities
├── supabase/                    # Database migrations
│   └── migrations/              # SQL migration files
├── public/                      # Static assets
├── styles/                      # Global styles
└── docker files                 # Docker configurations
```

## Key Files
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `.eslintrc.json`: ESLint rules
- `tailwind.config.ts`: Tailwind configuration
- `next.config.js`: Next.js configuration
- `docker-compose.simple.yml`: Docker setup