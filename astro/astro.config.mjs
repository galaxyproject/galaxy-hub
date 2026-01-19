// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const autolinkConfig = {
  behavior: 'prepend',
  properties: {
    class: 'heading-anchor',
    ariaLabel: 'Link to this section',
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  integrations: [
    vue(),
    mdx({
      rehypePlugins: [[rehypeAutolinkHeadings, autolinkConfig]],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [[rehypeAutolinkHeadings, autolinkConfig]],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});