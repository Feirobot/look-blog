import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://look.syncplay.cn',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    icon(),
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
    },
  },
});
