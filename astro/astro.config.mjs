// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
  integrations: [
    vue(),
    mdx({
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});