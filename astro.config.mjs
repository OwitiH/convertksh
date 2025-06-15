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
    resolve: {
      alias: {
        '@': new URL('src/', import.meta.url).pathname,
      },
    },
    server: {
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
          warn(warning);
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          defaults: true,
          drop_console: true,
        },
      },
    },
    optimizeDeps: {
      include: ['@astrojs/mdx', '@astrojs/markdown-remark'],
    },
    ssr: {
      noExternal: ['@astrojs/mdx', '@astrojs/markdown-remark'],
    },
  },
  build: {
    format: 'file',
  },
});