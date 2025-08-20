# AI Assistant Reference Guide (CLAUDE.md)

## 🤖 Purpose
This file contains essential information for AI assistants working on the PaintQuote Pro project. Always read this file first when starting a session.

## 🏗️ Project Overview

**Project**: PaintQuote Pro - AI-powered painting quote generation platform
**Stack**: Next.js 14, TypeScript, Prisma, PostgreSQL, Tailwind CSS
**Current Branch Strategy**: `dev` (development) → `main` (production/Vercel)
**Port**: 3005 (development)

### 💰 Business Model
**Type**: Freemium SaaS
**Tiers**: 
- Free: 5 quotes/month ($0)
- Professional: Unlimited quotes with AI ($79/month)
**Details**: See [FREEMIUM_MODEL.md](./FREEMIUM_MODEL.md) for complete strategy

## 📁 Critical Files to Reference

1. **IMPLEMENTATION.md** - Complete system architecture and component map
2. **FREEMIUM_MODEL.md** - Freemium strategy, tiers, and conversion paths
3. **PRICING_STRATEGY.md** - Pricing decisions and future add-ons
4. **DEPLOYMENT_WORKFLOW.md** - Deployment procedures and safety checks
5. **CLI_TOOLS_GUIDE.md** - Available CLI tools and commands
6. **GIT_WORKFLOW_SUMMARY.md** - Quick Git workflow reference
7. **package.json** - Scripts and dependencies

## 🔄 Standard Development Workflow

### 1. Starting Development
```bash
# Always start on dev branch
git checkout dev
git pull origin dev

# Start development server
npm run dev              # Runs on port 3005

# Or use the CLI
npm run cli dev
```

### 2. Before Making Changes
```bash
# Check project status
npm run cli status

# Ensure environment is configured
ls -la .env || echo "Need to create .env file"
```

### 3. Making Changes
```bash
# Use appropriate tools for different tasks
npm run dev              # Development server
npm run db:studio        # Database GUI
npm run cli check        # Code quality check

# For AI/Chat features, check:
# - /lib/ai/ directory
# - /app/api/chat/ routes
# - /app/dashboard/chat/ UI
```

### 4. Committing Changes
```bash
# Check what changed
git status

# Run quality checks
npm run cli check        # Or npm run check:all

# Fix any issues
npm run cli fix          # Or npm run lint:fix && npm run format

# Commit (Husky will run pre-commit hooks)
git add .
git commit -m "type: description"  # feat|fix|docs|chore|test
git push origin dev
```

### 5. Testing in Docker (Vercel-like environment)
```bash
# Build and test
npm run docker:build
npm run docker:test      # Access at http://localhost:3000
npm run docker:down      # When done
```

### 6. Deploying to Production

#### Option A: Automatic GitHub → Vercel (painttest4)
```bash
# Use the automated script
npm run deploy

# Or manually:
git checkout main
git merge dev --no-ff
git push origin main     # Triggers Vercel deployment
git checkout dev
```

#### Option B: Direct Vercel Deployment (painttest4.1)
```bash
# Deploy directly to painttest4.1 project on Vercel
vercel --prod --yes --name painttest41

# Alternative: Deploy specific branch
vercel --prod --yes --scope danger-dangers-projects --project painttest4.1

# Note: The painttest4.1 project is configured as:
# - Project Name: painttest4.1
# - Production URL: https://painttest41.vercel.app
# - Preview URLs: https://painttest41-[hash]-danger-dangers-projects.vercel.app
```

## 🎯 Quick Command Reference

### Most Used Commands
```bash
npm run dev              # Start development (port 3005)
npm run cli status       # Check project health
npm run cli check        # Run all code checks
npm run cli fix          # Auto-fix issues
npm run db:studio        # Open Prisma Studio
npm run docker:test      # Test in Docker
npm run deploy           # Deploy to production
```

### Custom CLI Commands
```bash
npm run cli help         # Show all CLI commands
npm run cli dev          # Start development
npm run cli check        # Code quality checks
npm run cli fix          # Fix code issues
npm run cli db:studio    # Database GUI
npm run cli db:reset     # Reset database (careful!)
npm run cli status       # Project status
npm run cli deploy       # Deploy with checks
```

### Docker Commands
```bash
npm run docker:build     # Build Docker image
npm run docker:up        # Run containers
npm run docker:down      # Stop containers
npm run docker:test      # Test in background
```

### Database Commands
```bash
npm run db:studio        # Prisma Studio GUI
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run typecheck        # TypeScript check
npm run check:all        # All checks in parallel
```

## 🏗️ Architecture Quick Reference

### Directory Structure
```
/app                     # Next.js App Router
  /api                   # API routes
  /dashboard            # Protected pages
  /(marketing)          # Public SEO pages
/components             # React components
  /ui                   # shadcn/ui components
/lib                    # Business logic
  /ai                   # AI integrations
  /calculators          # Quote calculations
  /database             # Database adapters
/scripts                # Utility scripts
  cli.js               # Custom CLI tool
  deploy.sh            # Deployment script
```

### Key Integration Points
- **Authentication**: JWT with HTTP-only cookies
- **AI Chat**: `/lib/ai/quote-assistant.ts` → `/app/api/chat/quote/route.ts`
- **Database**: Prisma with adapter pattern (SQLite/PostgreSQL)
- **Payments**: Stripe integration (basic implementation)
- **Settings**: Company.settings JSON field

### Current Implementation Status
- ✅ Authentication system
- ✅ Quote generation with AI
- ✅ Dashboard and analytics
- ✅ SEO infrastructure
- ⚠️ Email sending (not implemented)
- ⚠️ PDF generation (not implemented)
- ⚠️ Advanced team features (not implemented)

## 🔐 Environment Variables

### Required for Development
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/paintquotepro"
JWT_SECRET="development-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3005"
NEXTAUTH_SECRET="development-secret-change-in-production"
```

### Optional Services
```env
ANTHROPIC_API_KEY="sk-ant-..."
OPENROUTER_API_KEY="sk-or-..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 🚨 Common Issues and Solutions

### Issue: Port 3005 already in use
```bash
# Find and kill process
lsof -i :3005
kill -9 <PID>
```

### Issue: Database connection failed
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Or start Docker database
docker-compose -f docker-compose.vercel.yml up postgres
```

### Issue: TypeScript errors
```bash
# Check errors
npm run typecheck

# Common fix: regenerate Prisma client
npx prisma generate
```

### Issue: Module not found
```bash
# Reinstall dependencies
npm ci

# Or clean install
npm run clean:install
```

## 🎯 Development Best Practices

### 1. Always Work on Dev Branch
- Never push directly to main
- Test everything on dev first
- Use feature branches for large changes

### 2. Test Before Deploying
- Run `npm run cli check` before committing
- Test in Docker before merging to main
- Verify critical user flows work

### 3. Keep Documentation Updated
- Update IMPLEMENTATION.md for new features
- Document API changes
- Add comments for complex logic

### 4. Use Existing Patterns
- Follow existing code structure
- Use established naming conventions
- Leverage existing utilities and helpers

### 5. Security First
- Never commit .env files
- Validate all user input
- Use parameterized queries (Prisma handles this)
- Keep dependencies updated

## 📊 Project Metrics

### Performance Targets
- Page Speed Score: >90
- Core Web Vitals: All green
- Build time: <2 minutes
- API response: <200ms

### Code Quality Standards
- TypeScript strict mode
- No any types
- ESLint rules enforced
- Prettier formatting

## 🆘 Getting Help

### Resources
- Project docs: See all .md files in root
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs
- TypeScript docs: https://www.typescriptlang.org/docs

### Debugging
```bash
# Check logs
npm run dev              # See console output

# Database issues
npm run db:studio        # Visual database browser

# Build issues
npm run build           # Check for build errors

# Docker logs
docker-compose -f docker-compose.vercel.yml logs
```

## 🔄 Workflow Reminders

### Daily Workflow
1. Pull latest from dev
2. Make changes
3. Test locally
4. Commit to dev
5. Test in Docker
6. Deploy to main when ready

### Before Each Session
1. Read this file (CLAUDE.md)
2. Check IMPLEMENTATION.md for context
3. Run `npm run cli status`
4. Ensure on dev branch

### After Making Changes
1. Run quality checks
2. Test critical paths
3. Update documentation if needed
4. Commit with clear message

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] All tests pass
- [ ] Docker build succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Critical features tested
- [ ] Documentation updated

## 📝 Important Notes

1. **Current Active Branch**: Always work on `dev`
2. **Production Branch**: `main` auto-deploys to Vercel
3. **Local Port**: Development runs on 3005
4. **Docker Port**: Testing runs on 3000
5. **Database**: Can use SQLite (dev) or PostgreSQL (prod)

### Vercel Projects
- **painttest4**: Original project (auto-deploys from GitHub main branch)
- **painttest4.1**: Manual deployment project
  - Production URL: https://painttest41.vercel.app
  - Deploy command: `vercel --prod --yes --name painttest41`
  - Used for: Testing deployments independently of GitHub

## 🔑 Key Files Modified Recently
Track these files for context:
- package.json - Scripts and dependencies
- next.config.js - Standalone output enabled
- Dockerfile.vercel - Production-like environment
- docker-compose.vercel.yml - Full stack testing

---

*AI Assistant Guide Version: 1.0.0*
*Last Updated: 2025-08-20*
*Remember: Always start by reading this file!*