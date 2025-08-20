#!/bin/bash

# PaintQuote Pro Deployment Script
# Safe deployment from dev to production via Docker testing

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Header
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   PaintQuote Pro Deployment Process    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
log_info "Current branch: $CURRENT_BRANCH"

# Ensure we're on dev branch
if [ "$CURRENT_BRANCH" != "dev" ]; then
    log_warning "Not on dev branch. Switching to dev..."
    git checkout dev
fi

# Pull latest changes
log_info "Pulling latest changes from dev..."
git pull origin dev

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    log_warning "You have uncommitted changes:"
    git status --short
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_error "Deployment cancelled"
        exit 1
    fi
fi

# Run pre-deployment checks
log_info "Running pre-deployment checks..."
echo

# TypeScript check
log_info "TypeScript check..."
if npm run typecheck > /dev/null 2>&1; then
    log_success "TypeScript: No errors"
else
    log_error "TypeScript check failed"
    exit 1
fi

# Linting check
log_info "ESLint check..."
if npm run lint > /dev/null 2>&1; then
    log_success "ESLint: No issues"
else
    log_warning "ESLint issues found. Run 'npm run lint:fix' to fix"
fi

# Build test
log_info "Testing production build..."
if npm run build > /dev/null 2>&1; then
    log_success "Build: Successful"
else
    log_error "Build failed"
    exit 1
fi

echo
log_success "Pre-deployment checks passed!"
echo

# Docker testing
read -p "$(echo -e ${YELLOW}▶${NC}) Test in Docker environment? (recommended) (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Building Docker image (this may take a few minutes)..."
    
    if docker-compose -f docker-compose.vercel.yml build > /dev/null 2>&1; then
        log_success "Docker build successful"
        
        log_info "Starting Docker containers..."
        docker-compose -f docker-compose.vercel.yml up -d > /dev/null 2>&1
        
        # Wait for health check
        log_info "Waiting for application to be ready..."
        sleep 10
        
        # Check if app is running
        if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            log_success "Application running at http://localhost:3000"
            echo
            echo -e "${GREEN}════════════════════════════════════════${NC}"
            echo -e "${GREEN}  Test the application at:${NC}"
            echo -e "${GREEN}  http://localhost:3000${NC}"
            echo -e "${GREEN}════════════════════════════════════════${NC}"
            echo
            read -p "Press any key after testing is complete..."
        else
            log_error "Application failed to start"
            docker-compose -f docker-compose.vercel.yml logs --tail=20
        fi
        
        log_info "Stopping Docker containers..."
        docker-compose -f docker-compose.vercel.yml down > /dev/null 2>&1
        log_success "Docker containers stopped"
    else
        log_error "Docker build failed"
        exit 1
    fi
fi

echo
echo -e "${YELLOW}════════════════════════════════════════${NC}"
echo -e "${YELLOW}  READY TO DEPLOY TO PRODUCTION${NC}"
echo -e "${YELLOW}════════════════════════════════════════${NC}"
echo

# Show what will be deployed
log_info "Recent commits to be deployed:"
git log --oneline -5 dev
echo

# Final confirmation
read -p "$(echo -e ${RED}⚠${NC}) Deploy to production? This will merge dev → main (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_warning "Deployment cancelled"
    exit 0
fi

# Deploy to production
log_info "Switching to main branch..."
git checkout main > /dev/null 2>&1

log_info "Pulling latest main..."
git pull origin main > /dev/null 2>&1

log_info "Merging dev into main..."
MERGE_MSG="Deploy: $(date +%Y-%m-%d) at $(date +%H:%M)"
git merge dev --no-ff -m "$MERGE_MSG"

log_info "Pushing to main (triggers Vercel deployment)..."
git push origin main

log_success "Successfully pushed to main!"
echo

# Return to dev branch
log_info "Switching back to dev branch..."
git checkout dev > /dev/null 2>&1

# Success message
echo
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     DEPLOYMENT SUCCESSFUL! 🚀         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo
log_info "Vercel will automatically deploy from main branch"
log_info "Check deployment status at: https://vercel.com/dashboard"
echo
log_success "Deployment process complete!"