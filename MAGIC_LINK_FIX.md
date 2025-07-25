# Magic Link Domain Configuration Fix

## The Issue
Magic links are currently going to `paintquotepro.vercel.app` instead of `https://www.paintquoteapp.com`

## Solution
You need to add the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel.

### Steps to Fix:

1. **Go to Vercel Dashboard**
   - Navigate to your project in Vercel
   - Click on "Settings" tab

2. **Add Environment Variable**
   - Go to "Environment Variables" section
   - Click "Add New"
   - Add the following:
     - **Key**: `NEXT_PUBLIC_SITE_URL`
     - **Value**: `https://www.paintquoteapp.com`
     - **Environment**: Select all (Production, Preview, Development)

3. **Redeploy**
   - After adding the environment variable, you need to redeploy
   - Go to "Deployments" tab
   - Click the three dots on your latest deployment
   - Select "Redeploy"

## Why This Works
The magic link generation code in `/lib/auth/magic-link.ts` uses:
```typescript
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
return `${baseUrl}/auth/verify?token=${token}`;
```

Without this environment variable set, it falls back to the Vercel deployment URL.

## Verification
After redeploying with the environment variable:
1. Try signing up again at https://www.paintquoteapp.com/trial-signup
2. Check that the magic link in the email now points to https://www.paintquoteapp.com/auth/verify?token=...

## Additional Notes
- The `NEXT_PUBLIC_` prefix is important - it makes the variable available to client-side code
- This same URL will be used for all authentication-related redirects
- Make sure there's no trailing slash in the URL value