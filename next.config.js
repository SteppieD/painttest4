/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC minification to avoid potential issues
  swcMinify: false,
  
  // Ensure proper module resolution
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  
  // Server actions configuration
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Ensure proper error handling
  reactStrictMode: true,
}

module.exports = nextConfig