# Local Development First Policy

This guide ensures all development work happens locally before being pushed to GitHub.

## 🛡️ Git Configuration for Safety

### 1. Disable Auto-Push (Recommended)
```bash
# Remove push permission from origin temporarily while developing
git remote set-url --push origin no_push

# When ready to push, restore the URL
git remote set-url --push origin https://github.com/SteppieD/painttest3.git
```

### 2. Create Local-Only Branches
```bash
# Always work on feature branches locally
git checkout -b local/feature-name

# Use prefix 'local/' for branches you don't want to accidentally push
```

### 3. Git Hooks for Protection
Create `.git/hooks/pre-push` file:
```bash
#!/bin/sh
# Prevent accidental pushes to main
protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]; then
    echo "⚠️  Cannot push directly to main branch!"
    echo "Please create a feature branch first."
    exit 1
fi

# Warn before pushing local branches
if [[ $current_branch == local/* ]]; then
    read -p "⚠️  You're pushing a local branch. Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-push
```

## 📋 Development Workflow

### Step 1: Always Pull Latest First
```bash
# Start your day by syncing
git checkout main
git pull origin main
```

### Step 2: Create Local Feature Branch
```bash
# Create a new branch for your work
git checkout -b local/todays-work-$(date +%Y%m%d)
```

### Step 3: Work Locally
```bash
# Make changes
npm run dev

# Commit frequently locally
git add .
git commit -m "WIP: working on feature X"
```

### Step 4: Test Everything Locally
```bash
# Run all checks before considering push
npm run lint
npm run typecheck
npm run build
npm test (when implemented)

# Test with Docker
docker-compose -f docker-compose.simple.yml up
```

### Step 5: Review Changes
```bash
# See what you've changed
git log --oneline main..HEAD
git diff main...HEAD

# Review each file
git diff main...HEAD --name-only
```

### Step 6: Clean Up Commits (Optional)
```bash
# Squash WIP commits into meaningful ones
git rebase -i main
```

### Step 7: Push Only When Ready
```bash
# Create a proper feature branch
git checkout -b feature/descriptive-name

# Push to GitHub
git push origin feature/descriptive-name
```

## 🔒 Additional Safeguards

### 1. Use a Local Git Server
```bash
# Create a local bare repository
mkdir ~/local-repos
git init --bare ~/local-repos/paintquotepro.git

# Add as a remote
git remote add local ~/local-repos/paintquotepro.git

# Push to local first
git push local main
```

### 2. Environment Separation
```bash
# .env.local (for local development only)
DATABASE_URL="postgresql://localhost/paintquote_dev"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# .env.staging (for testing)
DATABASE_URL="postgresql://localhost/paintquote_staging"
NEXT_PUBLIC_SITE_URL="http://localhost:3001"
```

### 3. Docker Compose Override
Create `docker-compose.override.yml` (git ignored):
```yaml
# Local overrides - not committed
version: '3.8'
services:
  web:
    volumes:
      - .:/app  # Mount entire directory for hot reload
    environment:
      - NODE_ENV=development
```

### 4. VS Code Settings
`.vscode/settings.json`:
```json
{
  "git.confirmSync": true,
  "git.confirmPush": true,
  "git.pushTags": false,
  "git.defaultBranchName": "local/dev"
}
```

## 🚦 Daily Workflow Checklist

- [ ] Morning: Pull latest from main
- [ ] Create local working branch
- [ ] Make changes and test locally
- [ ] Commit frequently (locally)
- [ ] Run all tests and linters
- [ ] Review changes thoroughly
- [ ] Push only complete, tested features

## 🎯 Best Practices

1. **Commit Often Locally**
   - Small, frequent commits locally
   - Use descriptive messages
   - Keep commits focused

2. **Use Stash for Switching**
   ```bash
   # Save work temporarily
   git stash save "WIP: feature description"
   
   # Switch branches
   git checkout main
   
   # Return to work
   git checkout local/feature
   git stash pop
   ```

3. **Backup Local Work**
   ```bash
   # Create a backup branch
   git branch backup/$(date +%Y%m%d-%H%M%S)
   
   # Or use git bundle
   git bundle create ~/backups/paintquote-$(date +%Y%m%d).bundle --all
   ```

4. **Use Git Worktrees**
   ```bash
   # Work on multiple branches simultaneously
   git worktree add ../paintquote-feature feature/new-feature
   git worktree add ../paintquote-hotfix hotfix/urgent-fix
   ```

## ⚠️ Warning Signs You're About to Push

- You haven't run tests
- You have "WIP" commits
- You haven't pulled latest main
- Your branch name starts with "local/"
- You have uncommitted changes
- You haven't reviewed your diff

## 🔄 Recovery from Mistakes

### If You Accidentally Pushed
```bash
# If you pushed to wrong branch (within minutes)
git push --force-with-lease origin main:main^

# If you need to revert a pushed commit
git revert <commit-hash>
git push origin main
```

### If You Lost Local Work
```bash
# Check reflog
git reflog

# Recover lost commits
git checkout <commit-hash>
```

## 📝 Summary

The key is to make pushing a deliberate action, not a habit:

1. Work locally by default
2. Push only complete features
3. Use safeguards and checks
4. Review before pushing
5. Keep local backups

Remember: **Git is distributed - use it locally first!**