// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  integrations: [
    vue({
      appEntrypoint: '/src/vue-app.js'
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/bare/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  output: 'static',
  build: {
    format: 'directory',
    inlineStylesheets: 'never'
  },
  vite: {
    ssr: {
      noExternal: ['bootstrap-vue']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue'],
            'vega-vendor': ['vega', 'vega-lite', 'vega-embed'],
            'search-vendor': ['lunr']
          }
        }
      }
    }
  }
});
