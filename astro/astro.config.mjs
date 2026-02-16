// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePictureWrapper from '../integrations/rehype-picture-wrapper.mjs';

const autolinkConfig = {
  behavior: 'append',
  properties: {
    class: 'heading-anchor',
    ariaLabel: 'Link to this section',
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  prefetch: {
    defaultStrategy: 'hover',
  },
  integrations: [
    vue(),
    mdx({
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig], rehypePictureWrapper],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig], rehypePictureWrapper],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Reduce inotify watcher pressure during dev/Playwright runs
      watch: {
        usePolling: true,
        ignored: [
          '**/public/images/**',
          '**/content/**/images/**'
        ],
      },
    },
  }
});
