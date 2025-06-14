import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const get: APIRoute = async function get() {
  const pages = [
    { url: '/', lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
    { url: '/paypal-to-mpesa', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
    { url: '/crypto-to-kes', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
    { url: '/withdrawal-fees', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.7' },
    { url: '/blog', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.6' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>https://www.convertksh.xyz${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return {
    body: sitemap,
  };
};
