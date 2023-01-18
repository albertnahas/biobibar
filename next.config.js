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
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      ...defaultPathMap,
      '/sitemap.xml': { page: '/sitemap' },
    }
  }
}

module.exports = nextConfig
