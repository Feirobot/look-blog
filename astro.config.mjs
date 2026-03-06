import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://look.syncplay.cn',
  output: 'static',
  compressHTML: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
});
