import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    transpilePackages: ['@evently/models'],
};

export default nextConfig;
