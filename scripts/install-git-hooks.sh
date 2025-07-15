#!/bin/bash

# Install Git Hooks for Local Development First Policy

echo "🔧 Installing Git hooks for local development safety..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Create pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh

# Prevent accidental pushes to main
protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]; then
    echo "⚠️  Cannot push directly to main branch!"
    echo "Please create a feature branch first:"
    echo "  git checkout -b feature/your-feature-name"
    exit 1
fi

# Warn before pushing local branches
if [[ $current_branch == local/* ]]; then
    echo "⚠️  You're about to push a local development branch!"
    read -p "Are you sure you want to push '$current_branch'? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Push cancelled."
        exit 1
    fi
fi

# Check for WIP commits
if git log origin/main..HEAD --oneline | grep -q "WIP"; then
    echo "⚠️  You have WIP commits in your branch!"
    read -p "Are you sure you want to push WIP commits? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Push cancelled. Consider squashing your commits first:"
        echo "  git rebase -i origin/main"
        exit 1
    fi
fi

echo "✅ Push checks passed!"
EOF

# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

# Run linting before commit
echo "🔍 Running pre-commit checks..."

# Check if npm is available
if command -v npm &> /dev/null; then
    # Run lint
    npm run lint
    if [ $? -ne 0 ]; then
        echo "❌ Linting failed! Please fix errors before committing."
        exit 1
    fi
    
    # Run typecheck
    npm run typecheck
    if [ $? -ne 0 ]; then
        echo "❌ TypeScript errors found! Please fix before committing."
        exit 1
    fi
fi

echo "✅ Pre-commit checks passed!"
EOF

# Make hooks executable
chmod +x .git/hooks/pre-push
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "Hooks installed:"
echo "  - pre-push: Prevents direct pushes to main and warns about local branches"
echo "  - pre-commit: Runs lint and typecheck before each commit"
echo ""
echo "To bypass hooks in emergency (not recommended):"
echo "  git push --no-verify"
echo "  git commit --no-verify"