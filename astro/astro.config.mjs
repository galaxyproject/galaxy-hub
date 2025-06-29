// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      appEntrypoint: '/src/vue-app.js'
    }),
    mdx(),
    sitemap()
  ],
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    ssr: {
      noExternal: ['bootstrap-vue']
    }
  }
});
