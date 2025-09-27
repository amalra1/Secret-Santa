import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',

  basePath: '/pac20/SecretSanta',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
