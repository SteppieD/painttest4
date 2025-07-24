# Suggested Commands

## Development
```bash
npm run dev          # Start development server on port 3001
npm run build        # Build for production
npm run start        # Start production server
```

## Code Quality
```bash
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking (tsc --noEmit)
```

## Database (Supabase)
```bash
# No Prisma in this project - using Supabase directly
# Database migrations are in supabase/migrations/
```

## Docker Development
```bash
docker-compose -f docker-compose.simple.yml up -d    # Start containers
docker-compose -f docker-compose.simple.yml down     # Stop containers
docker-compose -f docker-compose.simple.yml logs -f  # View logs
docker-compose -f docker-compose.simple.yml down -v  # Full reset
```

## Git Commands (Darwin/macOS)
```bash
git status              # Check working tree status
git add .               # Stage all changes
git commit -m "message" # Commit with message
git push origin branch  # Push to remote
git checkout -b feature/name  # Create feature branch
```

## System Utilities (Darwin/macOS)
```bash
ls -la              # List files with details
find . -name "*.ts" # Find TypeScript files
grep -r "pattern" . # Search for pattern
which <command>     # Find command location
```

## Testing
```bash
# No test commands configured yet
# Playwright is installed but no test scripts defined
```