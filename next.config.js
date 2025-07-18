/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: false,
  // Generate unique build IDs based on timestamp to force cache refresh
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Add balanced cache headers
  async headers() {
    return [
      {
        // Only disable cache for HTML pages, not assets
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Allow caching for static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Disable module concatenation to fix webpack issues
    config.optimization.concatenateModules = false;
    
    // Handle server-only modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false
      };
    }
    
    // Ensure proper module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  }
}

module.exports = nextConfig