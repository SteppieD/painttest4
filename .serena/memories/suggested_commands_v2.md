# PaintQuote Pro Suggested Commands

## Development Commands

### Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
open http://localhost:3001
```

### Database Management
```bash
# Initialize SQLite database
npm run setup-db

# View database (SQLite)
sqlite3 painting_quotes_app.db

# Common SQL commands
.tables                    # List all tables
.schema companies         # Show table structure
SELECT * FROM companies;  # View data
```

### Testing
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Docker Commands
```bash
# Build and run with Docker
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Clean volumes
docker-compose down -v
```

### Build & Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel

# Deploy to specific environment
vercel --prod
```

## Useful Development Patterns

### Create a New API Route
```bash
# Create new API endpoint
mkdir -p app/api/new-feature
touch app/api/new-feature/route.ts
```

### Add a New Component
```bash
# Create component file
touch components/ui/new-component.tsx
```

### Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
code .env.local
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Stage changes
git add .

# Commit with conventional commits
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature
```

### Database Migrations
```bash
# For schema changes, edit:
lib/database/unified-schema.sql

# Then reinitialize database
rm painting_quotes_app.db
npm run setup-db
```

### Debugging
```bash
# Check API health
curl http://localhost:3001/api/health

# Test database connection
curl http://localhost:3001/api/test-db

# View environment
curl http://localhost:3001/api/env-check
```

## Production Commands

### Monitoring
```bash
# Check production health
curl https://yoursite.com/api/health

# View Web Vitals
# Check browser console for metrics
```

### Backup Database (SQLite)
```bash
# Create backup
cp painting_quotes_app.db backup-$(date +%Y%m%d).db

# Restore from backup
cp backup-20240101.db painting_quotes_app.db
```

## Troubleshooting

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Reset Database
```bash
rm painting_quotes_app.db
npm run setup-db
```

### Fix Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```