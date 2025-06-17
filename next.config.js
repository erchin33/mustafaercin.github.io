/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  images: {
    unoptimized: true,
  },
  basePath: '/personel-website',
  assetPrefix: '/personel-website/',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 