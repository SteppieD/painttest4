# Task Completion Checklist

When completing any development task in PaintQuote Pro, follow this checklist:

## Pre-Completion Checks

### 1. Code Quality
- [ ] Run `npm run lint` - Fix any ESLint warnings/errors
- [ ] Run `npm run typecheck` - Ensure no TypeScript errors
- [ ] Remove any `console.log` statements (except for debugging)
- [ ] Check for unused imports and variables

### 2. Testing
- [ ] Test the feature/fix locally at http://localhost:3001
- [ ] Check browser console for errors
- [ ] Test on mobile viewport (responsive design)
- [ ] Verify database operations work correctly

### 3. Code Review
- [ ] Follow existing code patterns and conventions
- [ ] Use TypeScript types properly (avoid `any`)
- [ ] Components use proper prop interfaces
- [ ] Forms use React Hook Form + Zod validation

### 4. Git Hygiene
- [ ] Work on feature branch (never on main)
- [ ] Use conventional commit messages
- [ ] Keep commits focused and atomic
- [ ] Update relevant documentation if needed

### 5. Performance
- [ ] Check for unnecessary re-renders
- [ ] Optimize images and assets
- [ ] Ensure API calls have proper error handling
- [ ] Loading states implemented where needed

## Common Issues to Check
- Authentication flow works correctly
- Quote calculations are accurate
- Mobile navigation functions properly
- SEO meta tags are present on marketing pages
- Environment variables are properly configured

## Before Pushing Code
1. All tests pass (when available)
2. No linting errors
3. No TypeScript errors
4. Feature works as expected
5. Code follows project conventions