# Deployment Workflow Guide

## 🚀 Overview

This project follows a safe, tested deployment workflow:
- **`dev` branch**: Active development and testing
- **`main` branch**: Production-ready code (auto-deploys to Vercel)
- **Docker**: Local testing in Vercel-like environment
- **Vercel**: Automatic production deployment

## 📋 Branch Strategy

```
dev (development) ──test──> Docker Local ──merge──> main (production) ──auto──> Vercel
```

### Branch Purposes

| Branch | Purpose | Deploys To | Testing |
|--------|---------|------------|---------|
| `dev` | Active development | Local/Docker | Full testing |
| `main` | Production-ready | Vercel (auto) | Pre-tested |
| `feature/*` | Feature development | None | Local only |
| `hotfix/*` | Emergency fixes | Direct to main | Critical only |

## 🔄 Development Workflow

### 1. Daily Development Flow

```bash
# Start on dev branch
git checkout dev
git pull origin dev

# Make your changes
npm run dev              # Local development
# ... make changes ...

# Test locally
npm run cli check        # Code quality
npm run test            # Run tests

# Commit to dev
git add .
git commit -m "feat: your feature"
git push origin dev
```

### 2. Testing in Docker (Vercel-like Environment)

```bash
# Ensure you're on dev branch
git checkout dev

# Build and test in Docker
docker-compose -f docker-compose.vercel.yml build
docker-compose -f docker-compose.vercel.yml up

# Access at http://localhost:3000
# Test all critical features

# If tests pass, continue to deployment
# If tests fail, fix and repeat
```

### 3. Deploying to Production

```bash
# After Docker testing passes
git checkout main
git pull origin main
git merge dev --no-ff
git push origin main

# Vercel automatically deploys from main branch
# Monitor deployment at https://vercel.com/dashboard
```

### 4. Hotfix Process

```bash
# For urgent production fixes
git checkout main
git pull origin main
git checkout -b hotfix/fix-description

# Make minimal fix
# ... fix code ...

# Test critical path
docker-compose -f docker-compose.vercel.yml up

# Merge directly to main
git checkout main
git merge hotfix/fix-description --no-ff
git push origin main

# Backport to dev
git checkout dev
git merge main
git push origin dev
```

## 🐳 Docker Testing Environment

### Setup Docker Testing

1. **Create .env file**:
```bash
cp .env.template .env
# Edit .env with your configuration
```

2. **Build Docker image**:
```bash
docker-compose -f docker-compose.vercel.yml build
```

3. **Run tests**:
```bash
docker-compose -f docker-compose.vercel.yml up
```

4. **Access application**:
- Application: http://localhost:3000
- Database: localhost:5433 (PostgreSQL)

### Docker Commands

```bash
# Start services
docker-compose -f docker-compose.vercel.yml up

# Start in background
docker-compose -f docker-compose.vercel.yml up -d

# View logs
docker-compose -f docker-compose.vercel.yml logs -f

# Stop services
docker-compose -f docker-compose.vercel.yml down

# Rebuild after changes
docker-compose -f docker-compose.vercel.yml build --no-cache

# Clean everything
docker-compose -f docker-compose.vercel.yml down -v
```

## ⚡ Vercel Configuration

### Automatic Deployment Setup

1. **Connect GitHub to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import GitHub repository
   - Select `main` branch for production

2. **Configure Environment Variables**:
   ```
   DATABASE_URL
   JWT_SECRET
   NEXTAUTH_URL
   NEXTAUTH_SECRET
   ANTHROPIC_API_KEY
   OPENROUTER_API_KEY
   STRIPE_SECRET_KEY
   STRIPE_PUBLISHABLE_KEY
   NEXT_PUBLIC_SITE_URL
   ```

3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`

### Vercel Preview Deployments

- **Dev branch**: Creates preview deployment
- **Pull Requests**: Automatic preview URLs
- **Main branch**: Production deployment

## 📋 Pre-Deployment Checklist

### Before Pushing to Dev

- [ ] Code compiles (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm run test`)
- [ ] Local development works (`npm run dev`)

### Before Merging to Main

- [ ] All dev branch tests pass
- [ ] Docker build succeeds
- [ ] Docker application runs correctly
- [ ] Database migrations work
- [ ] Critical user flows tested
- [ ] No console errors
- [ ] Performance acceptable

### After Deployment

- [ ] Vercel deployment successful
- [ ] Production site accessible
- [ ] Database connected
- [ ] APIs responding
- [ ] No errors in logs
- [ ] Core features working

## 🛠️ Helper Scripts

### Quick Deployment Script

Create `scripts/deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Deployment Process Starting..."

# Ensure on dev branch
git checkout dev
git pull origin dev

# Run checks
echo "📋 Running pre-deployment checks..."
npm run cli check

# Build Docker
echo "🐳 Building Docker image..."
docker-compose -f docker-compose.vercel.yml build

# Prompt for testing
read -p "Test in Docker now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose -f docker-compose.vercel.yml up -d
    echo "✅ Docker running at http://localhost:3000"
    echo "Test the application, then press any key to continue..."
    read -n 1
    docker-compose -f docker-compose.vercel.yml down
fi

# Merge to main
read -p "Deploy to production? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git checkout main
    git pull origin main
    git merge dev --no-ff -m "Deploy: $(date +%Y-%m-%d)"
    git push origin main
    echo "✅ Deployed to main - Vercel will auto-deploy"
    git checkout dev
fi
```

Make it executable:
```bash
chmod +x scripts/deploy.sh
```

## 🔍 Monitoring Deployment

### Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Monitor:
   - Build logs
   - Function logs
   - Analytics
   - Error tracking

### Local Monitoring

```bash
# Check deployment status
curl https://your-app.vercel.app/api/health

# View recent commits
git log --oneline -10

# Check branch status
git branch -vv
```

## 🚨 Rollback Procedures

### Quick Rollback

```bash
# If deployment fails
git checkout main
git revert HEAD
git push origin main
# Vercel auto-deploys previous version
```

### Vercel Instant Rollback

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find previous working deployment
5. Click "..." → "Promote to Production"

## 📊 Deployment Status Indicators

### Git Branch Status

```bash
# Check current branch
git branch --show-current

# Check pending changes
git status

# Check ahead/behind with remote
git status -sb
```

### Docker Health Check

```bash
# Check running containers
docker ps

# Check container health
docker inspect paintquote-vercel --format='{{.State.Health.Status}}'
```

### Production Health Check

```bash
# Check production API
curl https://your-app.vercel.app/api/health

# Check production status
curl -I https://your-app.vercel.app
```

## 🔐 Security Considerations

### Environment Variables

- **Never commit** `.env` files
- **Use different** values for dev/prod
- **Rotate secrets** regularly
- **Use Vercel's** environment variable UI

### Database Security

- **Separate databases** for dev/prod
- **Read-only replicas** for analytics
- **Regular backups** before deployment
- **Migration testing** in Docker first

## 📝 Deployment Log Template

Keep a deployment log for tracking:

```markdown
## Deployment YYYY-MM-DD

**Version**: x.x.x
**Branch**: dev → main
**Developer**: Name

### Changes
- Feature: Description
- Fix: Description
- Update: Description

### Testing
- [ ] Local tests passed
- [ ] Docker tests passed
- [ ] User flow tested

### Deployment
- Time: HH:MM
- Status: Success/Failed
- Issues: None/Description
- Rollback: Not needed/Performed

### Post-Deployment
- [ ] Production verified
- [ ] Monitoring normal
- [ ] Users notified
```

## 🎯 Best Practices

1. **Always test in Docker** before deploying
2. **Never skip the dev branch** testing
3. **Keep commits atomic** and well-described
4. **Monitor deployments** actively
5. **Document issues** in deployment log
6. **Communicate** with team about deployments
7. **Have rollback plan** ready

## 🆘 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Docker build fails | Check Dockerfile syntax, clear cache |
| Vercel build fails | Check build logs, environment variables |
| Database connection fails | Verify DATABASE_URL, check firewall |
| TypeScript errors | Run `npm run typecheck` locally |
| Missing dependencies | Run `npm ci` to match lock file |

### Getting Help

1. Check Vercel build logs
2. Review Docker container logs
3. Check application error logs
4. Review recent commits
5. Consult team or documentation

---

*Deployment Workflow Version: 1.0.0*
*Last Updated: 2025-08-20*