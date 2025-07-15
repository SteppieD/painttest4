# PaintQuote Pro

AI-powered painting quote generation platform that helps contractors create professional quotes in minutes instead of hours. Built with Next.js 14, TypeScript, and Prisma.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC)

## 🎯 Business Impact

Based on market research with painting contractors:
- **Traditional quote time**: 3-6 hours
- **PaintQuote Pro time**: 10-15 minutes
- **Average revenue increase**: +$8,400/month
- **Win rate improvement**: 40-60% higher
- **Critical stat**: 73% of customers choose contractors who respond within 24 hours

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+ (or use Docker)
- Git

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/SteppieD/painttest3.git
cd painttest3

# Install dependencies
npm install

# Set up local development safeguards
./scripts/install-git-hooks.sh

# Create a local working branch
git checkout -b local/development

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up the database
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Option 2: Docker Development (Recommended)

```bash
# Clone the repository
git clone https://github.com/SteppieD/painttest3.git
cd painttest3

# Start with Docker Compose
docker-compose -f docker-compose.simple.yml up -d

# View logs
docker-compose -f docker-compose.simple.yml logs -f web
```

Open [http://localhost:3001](http://localhost:3001) to see the application.

To stop:
```bash
docker-compose -f docker-compose.simple.yml down
```

## 🏗️ Project Structure

```
paintquotepro-web/
├── app/                          # Next.js 14 App Router
│   ├── (marketing)/             # Public pages (SEO optimized)
│   │   ├── painting-contractors/
│   │   ├── painting-estimate-software/
│   │   └── ... (9 SEO pages total)
│   ├── dashboard/               # Protected app pages
│   │   ├── quotes/              # Quote management
│   │   ├── chat/                # AI chat assistant
│   │   └── settings/            # User settings
│   ├── api/                     # API routes
│   └── layout.tsx               # Root layout with monitoring
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── quote-form/              # Multi-step quote form
│   ├── WebVitalsMonitor.tsx     # Performance monitoring
│   └── Breadcrumbs.tsx          # SEO breadcrumbs
├── lib/                         # Utilities and helpers
│   ├── ai/                      # AI integration
│   ├── prisma.ts                # Database client
│   └── seo-utils.ts             # SEO utilities
├── prisma/                      # Database schema
├── public/                      # Static assets
└── docker-compose.simple.yml    # Docker configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/paintquotepro?schema=public"

# Authentication
JWT_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# AI Services (Optional)
ANTHROPIC_API_KEY="your-anthropic-api-key"
OPENROUTER_API_KEY="your-openrouter-api-key"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (creates test users)
npx prisma db seed

# View database in Prisma Studio
npx prisma studio
```

### Test Credentials

After seeding, you can log in with:
- Email: `test@paintquotepro.com`
- Password: `test123`

## 🚀 Key Features Implemented

### Core Features (Free Tier - 5 quotes/month)
- **AI Quote Assistant**: Chat interface using Claude via OpenRouter
- **Mobile-Optimized**: Swipe navigation, touch gestures, floating action buttons
- **Customer Management**: Track customers and their quote history
- **Basic Analytics**: Total quotes, customers, win rate tracking
- **Professional Templates**: Clean, professional quote formatting
- **Multi-step Quote Form**: Guided process for accurate quotes
- **Paint Product Management**: Track inventory and costs

### Premium Features (Pro Tier - $47/month)
- **Unlimited Quotes**: No monthly limits
- **Advanced Analytics**: Response time, monthly revenue, pipeline tracking
- **Team Access**: Up to 3 team members
- **Custom Branding**: Add your logo and customize templates
- **Priority Support**: Get help when you need it
- **Automated Follow-ups**: Never miss a lead

### 📱 Mobile Features
- Swipe navigation between form steps
- Touch-optimized interface with larger tap targets
- Floating action buttons for quick quote creation
- Bottom navigation bar for easy access
- Haptic feedback on mobile devices
- Responsive design for all screen sizes

### 📊 Dashboard Analytics
- **Free metrics**: Total quotes, quoted amount, customers, win rate
- **Premium metrics** (locked with blur effect):
  - Average response time
  - Monthly revenue
  - Monthly pipeline
  - Average quote value

## 📄 SEO Pages Built

1. **Marketing Pages**
   - Homepage with time savings hero section
   - Pricing page with freemium model
   - ROI Calculator
   - Paint estimate templates
   - Painting quote templates  
   - Case studies / Success stories
   - Our Work / Portfolio

2. **Location Pages**
   - Phoenix, Denver, Orlando, Las Vegas, Miami

3. **Feature Updates**
   - Updated testimonials with real metrics
   - Time comparison (3-6 hours → 10-15 minutes)
   - Revenue impact messaging (+$8,400/month)

## 🛠️ Development

### Local Development First

This project follows a **Local Development First** policy to ensure code quality and prevent accidental pushes. See [LOCAL_DEVELOPMENT_FIRST.md](./LOCAL_DEVELOPMENT_FIRST.md) for detailed guidelines.

**Quick Tips:**
- Always work on feature branches (`feature/` or `local/` prefix)
- Never push directly to `main`
- Test everything locally before pushing
- Use git hooks to enforce best practices

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks

# Database
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio

# Docker
npm run docker:build # Build Docker image
npm run docker:up    # Start Docker containers
npm run docker:down  # Stop Docker containers
```

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

## 🐛 Known Issues & Solutions

### Common Issues

1. **Module not found errors**
   - Solution: Ensure `npm install` completed successfully
   - Check that prisma client is generated: `npx prisma generate`

2. **Database connection errors**
   - Solution: Verify PostgreSQL is running
   - Check DATABASE_URL in `.env`
   - For Docker: Ensure postgres container is healthy

3. **TypeScript errors during build**
   - Current workaround: `ignoreBuildErrors: true` in next.config.js
   - TODO: Fix remaining type issues

### Docker Troubleshooting

```bash
# View container logs
docker-compose -f docker-compose.simple.yml logs

# Rebuild containers
docker-compose -f docker-compose.simple.yml build --no-cache

# Reset everything
docker-compose -f docker-compose.simple.yml down -v
docker-compose -f docker-compose.simple.yml up -d
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy

### Docker Production

```bash
# Build production image
docker build -f Dockerfile.simple -t paintquotepro .

# Run with environment file
docker run -p 3000:3000 --env-file .env.production paintquotepro
```

## 📈 Monitoring & Analytics

- **Core Web Vitals**: Built-in monitoring at `/api/web-vitals`
- **Prisma Studio**: Database viewer at `npx prisma studio`
- **Error Tracking**: Console logs (TODO: Add Sentry)
- **Analytics**: Ready for Google Analytics 4

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/SteppieD/painttest3/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SteppieD/painttest3/discussions)

## 🎯 Next Steps

1. **Complete SEO Implementation**
   - Build remaining location pages
   - Add blog functionality
   - Implement FAQ system

2. **Feature Development**
   - Email quote sending
   - Payment integration
   - Team collaboration

3. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Edge caching

---

Built with ❤️ by PaintQuote Pro Team