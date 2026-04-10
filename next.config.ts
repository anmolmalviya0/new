import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['@sanity/client'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    dirs: ['app', 'src'],
  },
}

export default nextConfig
