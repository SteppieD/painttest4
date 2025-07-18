/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    webpackBuildWorker: true
  },
  webpack: (config, { isServer }) => {
    // Disable module concatenation to fix the 'call' error
    config.optimization.concatenateModules = false;
    
    // Handle server-only modules
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false
      };
    }
    
    return config;
  }
}

module.exports = nextConfig