// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  integrations: [vue(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});