/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://biobibar.vercel.app/',
    generateRobotsTxt: true, // (optional)
    exclude: '/admin/*'
    // ...other options
}