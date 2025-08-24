# PaintQuote Pro - Essential Development Commands

## Development Workflow Commands

### Starting Development
```bash
# Start development server (port 3005)
npm run dev

# Start with Turbo mode (faster)
npm run dev:turbo

# Check project status
npm run cli status
```

### Code Quality & Testing
```bash
# Run all quality checks in parallel
npm run check:all

# Individual quality checks
npm run typecheck          # TypeScript compilation check
npm run lint               # ESLint checking
npm run lint:fix           # Auto-fix ESLint issues
npm run format             # Format code with Prettier
npm run format:check       # Check formatting without changing

# Testing
npm run test               # Run Playwright tests
npm run test:ui            # Run tests with UI
npm run test:debug         # Debug mode testing
npm run test:all           # Run comprehensive test suite
```

### Build & Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start

# Deploy to production
npm run deploy

# Direct Vercel deployment
vercel --prod --yes --name painttest41
```

### Database Commands
```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Push schema changes
npm run db:push

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

### Docker Testing
```bash
# Build Docker environment
npm run docker:build

# Start containers
npm run docker:up

# Test in Docker (port 3000)
npm run docker:test

# Stop containers
npm run docker:down
```

### Custom CLI Commands
```bash
# Show all available CLI commands
npm run cli help

# Development server via CLI
npm run cli dev

# Code quality checks via CLI
npm run cli check

# Auto-fix code issues
npm run cli fix

# Database studio via CLI
npm run cli db:studio

# Deploy with checks
npm run cli deploy

# Project status check
npm run cli status
```

### Dependency Management
```bash
# Check for updates
npm run deps:check

# Update dependencies
npm run deps:update

# Security audit
npm run deps:audit

# Clean install
npm run clean:install
```

### Git Workflow
```bash
# Always work on dev branch
git checkout dev
git pull origin dev

# After making changes
git add .
git commit -m "type: description"
git push origin dev

# Deploy to production
git checkout main
git merge dev --no-ff
git push origin main
```

## System Commands (Darwin/macOS)

### Port Management
```bash
# Find process using port 3005
lsof -i :3005

# Kill process on port
kill -9 <PID>
```

### File Operations
```bash
# List files with details
ls -la

# Search files
find . -name "*.ts" -type f

# Search content (use ripgrep)
rg "search_term" --type ts

# Change directory
cd /path/to/directory
```

### Environment Debugging
```bash
# Check environment variables
env | grep -i api

# Check Node version
node --version

# Check npm version
npm --version
```

## When Task is Completed

### Pre-commit Checklist
1. `npm run typecheck` - Ensure no TypeScript errors
2. `npm run lint:fix` - Fix any linting issues
3. `npm run format` - Format code properly
4. `npm run test` - Run tests (if applicable)
5. `npm run build` - Verify production build works

### Before Deployment
1. `npm run docker:test` - Test in Docker environment
2. Verify critical user flows work
3. Check no sensitive data in commit
4. Update documentation if needed

### Git Hooks (Automatic)
- **Pre-commit**: Runs lint-staged (ESLint + Prettier)
- **Pre-push**: Can be configured for additional checks

## Emergency Commands

### Reset Development Environment
```bash
npm run clean:install    # Clean and reinstall
npm run docker:down      # Stop all containers
rm -rf .next             # Clear Next.js cache
```

### Database Issues
```bash
npx prisma generate      # Regenerate Prisma client
npx prisma db push       # Force schema sync
```

### Build Issues
```bash
rm -rf .next node_modules .turbo
npm install
npm run build
```