// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.convertksh.xyz',
  output: 'static',
  integrations: [sitemap({
    changefreq: 'daily',
    priority: 0.7,
    lastmod: new Date(),
  })],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
  },
});