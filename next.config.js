/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/all/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
