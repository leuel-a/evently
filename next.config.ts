import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    config.modules.rules.push({
      test: /\.svg$/,
      user: ['@svgr/webpack'],
    })
  },
  reactStrictMode: true,
}

export default nextConfig
