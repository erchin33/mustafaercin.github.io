/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/mustafaercin.github.io',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 