# Prompt to Continue PaintQuote Pro Project

Copy and paste this prompt when starting a new session:

---

I'm continuing work on PaintQuote Pro, a SaaS platform for painting contractors. Here's the project context:

## Project Location
- Local path: `/Users/sepg/Desktop/paintquotepro-web/`
- GitHub: https://github.com/SteppieD/painttest3

## Project Overview
PaintQuote Pro is a Next.js 14 application with:
- **Tech Stack**: Next.js 14 (App Router), TypeScript, Prisma ORM, PostgreSQL, Tailwind CSS
- **Current State**: 9 SEO pages built, basic quote system, AI chat integration, Docker setup
- **SEO Strategy**: Content Prompting methodology for 2025 SEO optimization

## What's Been Built
1. **9 SEO-optimized pages** with Schema.org markup and Core Web Vitals monitoring
2. **AI Chat Quote System** using Claude for natural language quote creation
3. **Quote Calculator** with charge rates and pricing logic
4. **Docker Setup** ready on port 3001
5. **Authentication** with JWT and protected routes
6. **Dashboard** with quotes, chat, and settings

## Key Files to Review
- `README.md` - Setup instructions
- `PROJECT_OVERVIEW.md` - Current state and roadmap
- `ARCHITECTURE.md` - Technical details
- `DEVELOPMENT_GUIDE.md` - Coding standards
- `LOCAL_DEVELOPMENT_FIRST.md` - Git workflow

## Current Priorities
1. Build remaining SEO pages (locations, comparisons, case studies)
2. Add email functionality for quotes
3. Implement PDF generation
4. Fix remaining TypeScript issues
5. Add automated tests

## Development Commands
```bash
# Local development
npm run dev

# Docker development
docker-compose -f docker-compose.simple.yml up -d

# View Docker logs
docker-compose -f docker-compose.simple.yml logs -f web
```

## Important Context
- The project uses a "Local Development First" policy - always work on feature branches
- There are git hooks installed to prevent accidental pushes to main
- Docker runs on port 3001, local dev on port 3000
- All TypeScript errors are currently bypassed with `ignoreBuildErrors: true`

## Environment Variables Needed
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Authentication secret
- `ANTHROPIC_API_KEY` - For AI chat features

## Next Steps Suggestions
1. Run `npm install` and `npm run dev` to verify setup
2. Check `git status` to see any uncommitted changes
3. Review the todo items in PROJECT_OVERVIEW.md
4. Pick a task from the roadmap to work on

Please help me continue developing this project. What would you like to know about the current implementation or what should we work on next?

---

## Additional Context Commands

If you need more specific information, you can also add:

```
# To see recent changes:
"Show me the git log for the last 10 commits"

# To understand a specific feature:
"Explain how the AI quote chat system works by looking at /app/api/chat/quote/route.ts"

# To see what's not working:
"Run npm run typecheck and help me fix any TypeScript errors"

# To understand the database:
"Show me the Prisma schema and explain the data model"
```