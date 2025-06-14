// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://convertksh.xyz',
  // Handle www to non-www in server config
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      },
    },
  },
});