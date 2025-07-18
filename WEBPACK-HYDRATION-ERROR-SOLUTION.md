# Webpack Hydration Error Solution

## Problem
Next.js 14.2.29 was throwing a hydration error:
```
Unhandled Runtime Error
TypeError: Cannot read properties of undefined (reading 'call')

Call Stack
options.factory
file:///app/.next/static/chunks/webpack.js (715:31)
```

This error occurred during React's lazy component mounting and was related to webpack's module loading system.

## Root Cause
This is a known issue with webpack in Next.js 14 where module resolution fails during hydration, particularly when dealing with:
- Client components in the root layout
- Dynamic imports
- Module concatenation optimizations

## Solution: Use Turbopack

The most effective solution is to use **Turbopack** instead of webpack for development.

### Implementation

1. **Update package.json**:
```json
{
  "scripts": {
    "dev": "next dev --port 3001 --turbo",
  }
}
```

2. **Update next.config.js** (optional):
```javascript
// Note: When using Turbopack, webpack configuration is not needed
// If you must use webpack, you can disable module concatenation:
// webpack: (config) => {
//   config.optimization.concatenateModules = false;
//   return config;
// },
```

### Why Turbopack Works

- Turbopack is Next.js's new bundler written in Rust
- It handles module resolution differently than webpack
- Avoids the specific hydration issues present in webpack
- Provides faster builds and better HMR performance

## Alternative Solutions (if Turbopack cannot be used)

### 1. Disable Module Concatenation in Webpack
```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    config.optimization.concatenateModules = false;
    return config;
  },
}
```

### 2. Clear Caches
```bash
# Clear Next.js cache
rm -rf .next

# Clear browser cache and service workers
# Open Chrome DevTools > Application > Clear Storage
```

### 3. Fix Component Issues
- Ensure client components don't have global state that differs between server/client
- Use proper hydration guards for client-only code
- Avoid dynamic imports in components loaded in root layout

## Docker Configuration

The Docker setup automatically uses the updated package.json with the `--turbo` flag:

```yaml
# docker-compose.override.yml
services:
  web:
    command: ["npm", "run", "dev"]  # Will use the --turbo flag from package.json
```

## Verification

To verify the fix is working:

```bash
# Run the comprehensive hydration test
node test-hydration-comprehensive.js

# Or test manually
curl http://localhost:3001/test
# Should load without errors
```

## Notes

- Turbopack is stable for development use in Next.js 14
- For production builds, Next.js still uses webpack (which works fine)
- The `--turbo` flag only affects development mode
- If you see warnings about webpack configuration while using Turbopack, they can be safely ignored

## References

- [Next.js Turbopack Documentation](https://nextjs.org/docs/architecture/turbopack)
- [GitHub Issue #61995](https://github.com/vercel/next.js/issues/61995)
- [Webpack Module Federation Issues](https://github.com/webpack/webpack/issues/15582)