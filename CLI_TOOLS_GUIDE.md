# CLI Tools Guide for PaintQuote Pro

## Overview

This guide documents all CLI tools installed and configured for the PaintQuote Pro project. These tools streamline development, improve code quality, and simplify project management.

## 🎯 Quick Start

The project now includes a custom CLI for common tasks:

```bash
# Show all available commands
npm run cli help

# Start development
npm run cli dev

# Check code quality
npm run cli check

# Fix code issues
npm run cli fix

# Show project status
npm run cli status
```

## 📦 Installed CLI Tools

### 1. Global Tools

These tools are installed globally and available system-wide:

| Tool | Purpose | Command |
|------|---------|---------|
| **tsx** | Run TypeScript files directly | `tsx script.ts` |
| **npm-check-updates** | Check/update dependencies | `ncu` |
| **license-checker** | Audit licenses | `license-checker` |
| **@squoosh/cli** | Image optimization | `squoosh-cli` |
| **vercel** | Deployment to Vercel | `vercel` |
| **railway** | Alternative deployment | `railway` |

### 2. Project-Specific Tools

These are available through npm scripts or npx:

| Tool | Purpose | Command |
|------|---------|---------|
| **Prisma CLI** | Database management | `npx prisma` |
| **ESLint** | Code linting | `npm run lint` |
| **Prettier** | Code formatting | `npm run format` |
| **TypeScript** | Type checking | `npm run typecheck` |
| **Playwright** | E2E testing | `npm run test` |
| **Husky** | Git hooks | Auto-runs on commit |
| **lint-staged** | Pre-commit linting | Auto-runs with Husky |

## 🚀 Enhanced NPM Scripts

### Development Scripts

```bash
# Start development server (port 3005)
npm run dev

# Start with Turbopack (faster HMR)
npm run dev:turbo

# Build for production
npm run build

# Start production server
npm run start
```

### Code Quality Scripts

```bash
# Run ESLint
npm run lint

# Run ESLint and auto-fix
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check

# TypeScript type checking
npm run typecheck

# Run all checks in parallel
npm run check:all
```

### Database Scripts

```bash
# Open Prisma Studio (GUI)
npm run db:studio

# Push schema changes
npm run db:push

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

### Testing Scripts

```bash
# Run all Playwright tests
npm run test

# Open Playwright UI
npm run test:ui

# Debug tests
npm run test:debug

# Specific test suites
npm run test:links          # Check links
npm run test:accessibility  # A11y audit
npm run test:payments       # Payment flow
npm run test:tiers          # Tier features
npm run test:all           # All test suites
```

### Dependency Management

```bash
# Check for updates
npm run deps:check

# Update dependencies
npm run deps:update

# Security audit
npm run deps:audit
```

### Utility Scripts

```bash
# Clean build artifacts
npm run clean

# Clean and reinstall
npm run clean:install

# Analyze bundle size
npm run analyze

# Custom CLI
npm run cli <command>
```

## 🎮 Custom PaintQuote CLI

The project includes a custom CLI at `scripts/cli.js` for common tasks:

### Available Commands

#### Development
- `npm run cli dev` - Start development server
- `npm run cli dev:turbo` - Start with Turbopack

#### Database
- `npm run cli db:studio` - Open Prisma Studio
- `npm run cli db:reset` - Reset database (with confirmation)

#### Code Quality
- `npm run cli check` - Run all checks (lint, format, types)
- `npm run cli fix` - Auto-fix code issues

#### Testing
- `npm run cli test` - Run all tests

#### Deployment
- `npm run cli deploy` - Deploy to production (with checks)

#### Utilities
- `npm run cli clean` - Clean project
- `npm run cli deps` - Check dependencies
- `npm run cli analyze` - Analyze bundle
- `npm run cli status` - Show project status
- `npm run cli help` - Show help

### CLI Features

✅ **Color-coded output** - Easy to read status messages
✅ **Interactive prompts** - Confirmations for dangerous operations
✅ **Pre-flight checks** - Validates before deployment
✅ **Status monitoring** - Quick project health check

## 🔧 Configuration Files

### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Lint-staged Configuration (`.lintstagedrc.json`)
```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}
```

### Git Hooks (Husky)
- **Pre-commit**: Runs lint-staged to check/fix code
- **Pre-push**: Can be configured for tests

## 📊 Workflow Examples

### 1. Daily Development Workflow

```bash
# Start your day
npm run cli status        # Check project status
npm run cli dev          # Start dev server

# Before committing
npm run cli check        # Run all checks
npm run cli fix          # Fix any issues
git add .
git commit -m "feat: add new feature"  # Husky runs automatically
```

### 2. Database Management

```bash
# View and edit data
npm run db:studio

# After schema changes
npm run db:push          # Development
npm run db:migrate       # Production
```

### 3. Dependency Updates

```bash
# Check what needs updating
npm run deps:check

# Review and update
npm run deps:update

# Verify no breaking changes
npm run test:all
```

### 4. Pre-deployment Checklist

```bash
# Run comprehensive checks
npm run cli check        # Code quality
npm run test:all        # All tests
npm run build          # Build succeeds
npm run cli deploy     # Deploy with confidence
```

## 🛠️ Advanced CLI Usage

### Image Optimization

```bash
# Optimize images before committing
npx squoosh-cli --resize '{width:1920}' --webp auto images/*.jpg
```

### License Checking

```bash
# Check all dependency licenses
npx license-checker --summary
```

### Update Check

```bash
# Interactive dependency updates
npx npm-check-updates -i
```

### Direct TypeScript Execution

```bash
# Run TypeScript files directly
npx tsx scripts/my-script.ts
```

## 🔍 Troubleshooting

### Common Issues

1. **Command not found**
   ```bash
   # Reinstall global tools
   npm install -g tsx npm-check-updates license-checker
   ```

2. **Husky not working**
   ```bash
   # Reinstall husky
   npx husky install
   ```

3. **Prettier conflicts with ESLint**
   ```bash
   # Fix with
   npm run lint:fix
   npm run format
   ```

4. **Database commands fail**
   ```bash
   # Check DATABASE_URL in .env
   # Ensure PostgreSQL is running
   ```

## 🚦 Best Practices

### 1. Pre-commit Checks
Always ensure code passes checks before committing:
- ✅ TypeScript compiles
- ✅ ESLint passes
- ✅ Prettier formatted
- ✅ Tests pass

### 2. Regular Maintenance
Weekly tasks:
- Run `npm run deps:check`
- Run `npm run deps:audit`
- Review `npm run cli status`

### 3. Development Tips
- Use `dev:turbo` for faster HMR
- Keep `db:studio` open while developing
- Run `check:all` before pushing

### 4. Deployment Safety
- Always run `cli check` before deploying
- Use `cli deploy` for built-in safety checks
- Monitor bundle size with `analyze`

## 📈 Performance Monitoring

### Bundle Analysis
```bash
# Generate bundle analysis
npm run analyze
# Opens visualization in browser
```

### Lighthouse Checks
```bash
# After building
npm run build
npm run start
# Visit http://localhost:3005
# Run Lighthouse in Chrome DevTools
```

## 🔄 Continuous Improvement

The CLI tools setup enables:

1. **Consistent Code Quality** - Automated formatting and linting
2. **Safer Deployments** - Pre-flight checks and validations
3. **Faster Development** - Shortcuts for common tasks
4. **Better Collaboration** - Standardized workflows

## 📚 Additional Resources

- [Prisma CLI Docs](https://www.prisma.io/docs/reference/api-reference/command-reference)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Vercel CLI](https://vercel.com/docs/cli)

## 🎯 Quick Command Reference

```bash
# Most used commands
npm run dev              # Start development
npm run cli check       # Check code quality
npm run cli fix         # Fix issues
npm run db:studio       # Database GUI
npm run test           # Run tests
npm run build          # Production build
npm run cli deploy     # Deploy to production
npm run cli status     # Project health check
```

---

*CLI Tools configured on: 2025-08-20*
*Guide Version: 1.0.0*