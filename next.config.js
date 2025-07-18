/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Add cache headers to prevent aggressive caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
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