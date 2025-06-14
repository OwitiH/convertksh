import type { APIRoute } from 'astro';

// Sitemap configuration
const siteUrl = 'https://www.convertksh.xyz';
const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' as const },
  { url: '/paypal-to-mpesa', priority: '0.8', changefreq: 'weekly' as const },
  { url: '/crypto-to-kes', priority: '0.8', changefreq: 'weekly' as const },
  { url: '/withdrawal-fees', priority: '0.7', changefreq: 'weekly' as const },
  { url: '/blog', priority: '0.6', changefreq: 'weekly' as const },
];

export const get: APIRoute = async function get() {
  // Generate the sitemap XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${siteUrl}${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'X-Robots-Tag': 'noindex',
    },
  });
};
