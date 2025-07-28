# Dashboard Navigation Test Checklist

## Test Setup
1. Clear browser cache and localStorage
2. Navigate to the app

## Test Case 1: Magic Link Login Flow
- [ ] Go to `/trial-signup` and sign up with email
- [ ] Check email for magic link
- [ ] Click magic link
- [ ] Verify redirected to dashboard
- [ ] Verify NO access code is displayed on dashboard
- [ ] Check localStorage has `paintquote_company` with `loginTime` field

## Test Case 2: Quick Actions Navigation (from Dashboard)
All of these should work WITHOUT redirecting to login:

### AI Quote Assistant
- [ ] Click "AI Quote Assistant" card
- [ ] Should navigate to `/create-quote`
- [ ] Should NOT redirect to `/access-code`
- [ ] Quote builder should load properly

### Manage Customers  
- [ ] Click "Manage Customers" card
- [ ] Should navigate to `/dashboard/customers`
- [ ] Should NOT redirect to `/access-code`
- [ ] Customer list should load

### ROI Calculator
- [ ] Click "ROI Calculator" card  
- [ ] Should navigate to `/roi-calculator`
- [ ] Should NOT redirect to `/access-code`
- [ ] Calculator should be functional

## Test Case 3: Sidebar Navigation
Test each link in the sidebar:

- [ ] Dashboard → `/dashboard` (no redirect to login)
- [ ] Quotes → `/dashboard/quotes` (no redirect to login)
- [ ] Customers → `/dashboard/customers` (no redirect to login)
- [ ] Settings → `/dashboard/settings` (no redirect to login)
- [ ] Billing → `/dashboard/settings/billing` (no redirect to login)

## Test Case 4: Locked Stats Navigation
- [ ] Click on locked "Win Rate" stat
- [ ] Should navigate to `/unlock-analytics` sales page
- [ ] Should NOT redirect to `/access-code`
- [ ] Sales page should load with pricing options

- [ ] Click on locked "Total Revenue" stat
- [ ] Should navigate to `/unlock-analytics` sales page
- [ ] Should NOT redirect to `/access-code`

## Test Case 5: Access Code Login Flow
- [ ] Log out (clear localStorage)
- [ ] Go to `/access-code`
- [ ] Login with company name and access code
- [ ] Verify redirected to dashboard
- [ ] Test all navigation again (repeat Test Cases 2-4)

## Test Case 6: Returning User Login
- [ ] Log out but keep localStorage data
- [ ] Go to `/access-code`
- [ ] Should see "Welcome back, [Company Name]"
- [ ] Should only need to enter access code (not company name)
- [ ] After login, test all navigation again

## Common Issues to Check
- [ ] No infinite redirect loops
- [ ] No white/blank pages
- [ ] All loading states work properly
- [ ] No console errors about missing auth
- [ ] localStorage persists across page refreshes
- [ ] Session stays active for 7 days

## Authentication State Verification
After each login method, check localStorage:
```javascript
// In browser console:
const auth = JSON.parse(localStorage.getItem('paintquote_company'))
console.log({
  hasId: !!auth.id,
  hasAccessCode: !!auth.accessCode,
  hasLoginTime: !!auth.loginTime,
  loginTime: new Date(auth.loginTime),
  name: auth.name
})
```

## Notes
- If any navigation redirects to `/access-code` when already logged in, that's a BUG
- All dashboard pages should maintain authentication state
- The `loginTime` field is CRITICAL - without it, auth will fail