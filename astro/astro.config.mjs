// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { baseUrlLinks } from './src/plugins/base-url-links';

// Base path for deployment - set ASTRO_BASE=/astro-preview/ for production
const base = process.env.ASTRO_BASE || '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  base,
  integrations: [vue(), mdx(), sitemap(), baseUrlLinks()],
  vite: {
    plugins: [tailwindcss()]
  }
});