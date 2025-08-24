# PaintQuote Pro - Task Completion Workflow

## Pre-Development Checklist

### Before Starting Work
1. **Read Documentation**: Always start by reading `CLAUDE.md`
2. **Check Branch**: Ensure you're on the `dev` branch
3. **Pull Latest**: `git pull origin dev` to get latest changes
4. **Environment Check**: Verify `.env` files are properly configured
5. **Project Status**: Run `npm run cli status` to check project health

## During Development

### Code Quality Standards
- **TypeScript Strict**: No `any` types, proper interface definitions
- **ESLint Clean**: Fix all linting warnings and errors
- **Prettier Formatted**: Consistent code formatting
- **Component Patterns**: Follow established React patterns
- **Error Handling**: Proper try-catch blocks and error boundaries

### Testing Requirements
- **Unit Testing**: Test individual functions and components
- **Integration Testing**: Test API endpoints and data flows
- **User Flow Testing**: Verify critical user journeys work
- **Cross-browser Testing**: Ensure compatibility across browsers

## Task Completion Checklist

### Code Quality Verification
```bash
# 1. TypeScript compilation check
npm run typecheck

# 2. Linting and auto-fix
npm run lint:fix

# 3. Code formatting
npm run format

# 4. Run all quality checks
npm run check:all
```

### Build Verification
```bash
# 5. Production build test
npm run build

# 6. Docker environment test
npm run docker:test

# 7. Manual testing at http://localhost:3000
# Verify critical features work correctly
```

### Testing Protocol
```bash
# 8. Run automated tests
npm run test

# 9. Run specific test suites
npm run test:payments      # Payment flow testing
npm run test:tiers        # Subscription tier testing
npm run test:links        # Link audit
npm run test:accessibility # Accessibility testing

# 10. Manual testing checklist
# - Quote creation flow
# - Authentication system
# - Dashboard functionality
# - Email automation
# - Payment processing
```

### Documentation Updates
- **Update IMPLEMENTATION.md**: Document new features or changes
- **Update API Documentation**: If API changes were made
- **Update README.md**: If setup process changed
- **Code Comments**: Add JSDoc for complex functions
- **Changelog**: Update CHANGELOG.md with notable changes

### Security Review
- **No Secrets Committed**: Check for API keys, passwords in code
- **Input Validation**: Verify all user inputs are validated
- **Authentication**: Ensure protected routes remain protected
- **SQL Injection**: Verify Prisma queries are parameterized
- **XSS Protection**: Check for proper entity escaping in JSX

## Pre-Commit Protocol

### Automated Checks (via Husky)
1. **lint-staged**: Automatically runs on staged files
   - ESLint fix for JS/TS files
   - Prettier formatting for all supported files
2. **TypeScript compilation**: Ensures no compilation errors
3. **Test execution**: Runs relevant tests (if configured)

### Manual Verification
```bash
# Verify working tree is clean
git status

# Check all quality metrics pass
npm run check:all

# Verify build succeeds
npm run build

# Test critical user flows manually
npm run dev  # Start dev server and test
```

### Commit Message Standards
```bash
# Format: type: concise description
git commit -m "feat: add email automation system"
git commit -m "fix: resolve TypeScript compilation errors"
git commit -m "docs: update API documentation"
git commit -m "test: add payment flow integration tests"
git commit -m "refactor: improve quote calculator performance"
```

## Deployment Workflow

### Pre-Deployment Verification
1. **All Tests Pass**: Comprehensive test suite completion
2. **Docker Build Success**: `npm run docker:build` completes
3. **Performance Check**: No significant performance regressions
4. **Security Scan**: No new security vulnerabilities
5. **Documentation Current**: All docs reflect current state

### Development to Production Flow
```bash
# 1. Complete work on dev branch
git checkout dev
git add .
git commit -m "type: description"
git push origin dev

# 2. Test thoroughly in dev environment
npm run dev              # Manual testing
npm run docker:test      # Docker environment testing

# 3. Merge to main when ready
git checkout main
git merge dev --no-ff
git push origin main     # Triggers Vercel deployment

# 4. Return to dev for next work
git checkout dev
```

### Production Deployment Verification
1. **Vercel Build Success**: Check Vercel dashboard for successful deployment
2. **Production Testing**: Test critical flows on live site
3. **Error Monitoring**: Check for any runtime errors
4. **Performance Metrics**: Verify Core Web Vitals remain green
5. **Analytics Verification**: Ensure tracking is working

## Post-Deployment Monitoring

### Immediate Checks (within 1 hour)
- **Site Accessibility**: Verify site loads correctly
- **Critical User Flows**: Test quote creation, authentication
- **Database Connectivity**: Verify data operations work
- **Email System**: Test email sending functionality
- **Payment Processing**: Verify Stripe integration works

### Ongoing Monitoring (24-48 hours)
- **Error Rates**: Monitor for unusual error patterns
- **Performance Metrics**: Check Core Web Vitals scores
- **User Feedback**: Monitor for user-reported issues
- **Analytics Data**: Verify tracking and conversion metrics
- **Database Performance**: Monitor query performance

## Rollback Procedures

### Emergency Rollback
```bash
# If critical issues found in production
git checkout main
git revert <commit-hash>  # Revert problematic commit
git push origin main      # Deploy rollback

# Alternative: Deploy previous known-good commit
vercel --prod --yes --name painttest41
```

### Post-Rollback Actions
1. **Identify Root Cause**: Investigate what caused the issue
2. **Fix in Development**: Address the problem on dev branch
3. **Enhanced Testing**: Add tests to prevent regression
4. **Re-deploy**: Follow normal deployment process
5. **Documentation**: Document the incident and resolution

## Communication Protocol

### Team Updates
- **Slack/Discord**: Notify team of major deployments
- **GitHub**: Use descriptive commit messages and PR descriptions
- **Documentation**: Keep CHANGELOG.md updated
- **Status Updates**: Use project management tools for progress tracking

### User Communication
- **Maintenance Windows**: Announce planned downtime
- **Feature Announcements**: Communicate new features to users
- **Issue Resolution**: Update users on bug fixes
- **Performance Improvements**: Highlight optimization work