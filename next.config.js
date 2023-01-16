/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/[all]',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
