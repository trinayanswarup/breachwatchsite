/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ciphercheck.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/quiz/api', '/test'],
  transform: async (config, path) => {
    let priority = 0.7;
    if (path === '/') priority = 1.0;
    else if (['/vpn', '/password-managers', '/antivirus', '/2fa-apps'].includes(path)) priority = 0.9;
    else if (path.startsWith('/reviews/')) priority = 0.8;
    else if (['/about', '/privacy', '/disclosure', '/stats'].includes(path)) priority = 0.6;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
