/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Handle webpack configuration for server-only modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve these modules on the client side
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        buffer: false,
        util: false,
        stream: false,
        events: false,
        child_process: false,
        worker_threads: false,
        perf_hooks: false,
      };
    }
    
    // Ignore better-sqlite3 on client side
    config.externals.push({
      'better-sqlite3': 'commonjs better-sqlite3',
    });
    
    return config;
  },
  
  // Tell Next.js which packages to transpile
  transpilePackages: ['@supabase/supabase-js'],
  
  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3', 'bcryptjs'],
    optimizeCss: false
  },
  
  // Image configuration
  images: {
    domains: ['localhost', 'paintquotepro.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;