/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@panchang/types',
    '@panchang/astro-core',
    '@panchang/api-client',
    '@panchang/ui'
  ],
  // Ensure Next.js does not hoist styled-jsx from a nested node_modules
  // by pointing it to the workspace root dist output
  distDir: '.next'
};

export default nextConfig;