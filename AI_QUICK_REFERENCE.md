# 🤖 AI Assistant Quick Reference Card

## ⚡ Start Here Every Session

```bash
# 1. Check status
npm run cli status

# 2. Ensure on dev branch
git checkout dev
git pull origin dev

# 3. Start development
npm run dev
```

## 🎯 Most Important Commands

| Task | Command | Notes |
|------|---------|-------|
| **Start Dev** | `npm run dev` | Port 3005 |
| **Check Code** | `npm run cli check` | Before commits |
| **Fix Issues** | `npm run cli fix` | Auto-fix |
| **Test Docker** | `npm run docker:test` | Port 3000 |
| **Deploy** | `npm run deploy` | Interactive |
| **Database GUI** | `npm run db:studio` | Prisma Studio |

## 📁 Where to Find Things

```
Critical Files:
├── CLAUDE.md              # Read this first!
├── IMPLEMENTATION.md      # System map
├── package.json          # All scripts
└── .env                  # Configuration

Code Locations:
├── /app/api/            # API routes
├── /app/dashboard/      # App pages
├── /lib/ai/            # AI logic
├── /lib/calculators/   # Quote logic
└── /components/        # UI components
```

## 🔄 Git Workflow

```bash
# Always on dev branch
dev → test locally → docker test → main → Vercel

# Quick commit
git add . && git commit -m "type: message"
git push origin dev
```

## ⚠️ Never Do This

- ❌ Push directly to main
- ❌ Skip Docker testing
- ❌ Commit .env files
- ❌ Use port 3000 for dev (use 3005)
- ❌ Forget to run checks

## ✅ Always Do This

- ✅ Work on dev branch
- ✅ Test in Docker before deploy
- ✅ Run `npm run cli check`
- ✅ Update documentation
- ✅ Use existing patterns

## 🚨 Quick Fixes

```bash
# Port in use
lsof -i :3005 && kill -9 <PID>

# TypeScript errors
npx prisma generate

# Module not found
npm ci

# Database issues
npm run db:studio
```

## 📊 System Status

- **Dev Port**: 3005
- **Docker Port**: 3000
- **Branch**: dev (development)
- **Deploy**: main → Vercel
- **Database**: PostgreSQL/SQLite

---
*Always read CLAUDE.md for full context*