import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@panchang/types', '@panchang/astro-core', '@panchang/api-client', '@panchang/ui'],
  webpack: (config) => {
    // Force Next.js to use the exact same React package to prevent duplicate React instances in monorepo
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom')
    };
    return config;
  }
};

export default nextConfig;