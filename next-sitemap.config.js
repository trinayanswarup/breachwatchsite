/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://breachwatchsite.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
};
