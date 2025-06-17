/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/personel-website',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 