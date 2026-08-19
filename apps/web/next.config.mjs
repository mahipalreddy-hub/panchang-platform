/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@panchang/types', '@panchang/astro-core', '@panchang/api-client', '@panchang/ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;