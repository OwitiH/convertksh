// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://convertksh.xyz',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('404') && !page.includes('api'),
      changefreq: 'weekly',
      priority: 0.7,
      customPages: [
        'https://convertksh.xyz/withdrawal-fees',
        'https://convertksh.xyz/send-money-charges',
        'https://convertksh.xyz/paybill-charges'
      ]
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Robots-Tag': 'index, follow',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  },
});