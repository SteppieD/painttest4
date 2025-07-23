# Suggested Commands for PaintQuote Pro Development

## Development Commands
```bash
# Start development server on port 3001
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run TypeScript type checking
npm run typecheck
```

## Database Commands (when using Prisma)
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

## Docker Commands
```bash
# Start with Docker Compose
docker-compose -f docker-compose.simple.yml up -d

# View logs
docker-compose -f docker-compose.simple.yml logs -f web

# Stop containers
docker-compose -f docker-compose.simple.yml down

# Rebuild containers
docker-compose -f docker-compose.simple.yml build --no-cache
```

## Git Commands
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Create local development branch
git checkout -b local/development

# Conventional commit examples
git commit -m "feat: add new feature"
git commit -m "fix: resolve calculation error"
git commit -m "docs: update README"
```

## System Utilities (macOS/Darwin)
```bash
# List files with details
ls -la

# Find files
find . -name "*.tsx"

# Search in files (use ripgrep if available)
grep -r "pattern" .
rg "pattern"

# Watch file changes
fswatch -o . | xargs -n1 -I{} echo "File changed"
```

## When Task is Completed
Always run these commands before considering a task complete:
1. `npm run lint` - Check for linting errors
2. `npm run typecheck` - Verify TypeScript types
3. Test the changes locally
4. Ensure no console errors