// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import generatedRedirects from './src/build/generated-redirects.json' with { type: 'json' };

const autolinkConfig = {
  behavior: 'append',
  properties: {
    class: 'heading-anchor',
    ariaLabel: 'Link to this section',
  },
};

// Build redirect config with 301 status for SEO
const redirectConfig = Object.fromEntries(
  Object.entries(generatedRedirects).map(([from, to]) => [
    from,
    { destination: to, status: 301 },
  ])
);

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  prefetch: {
    defaultStrategy: 'hover',
  },
  redirects: {
    // Generated legacy URL redirects (from Gridsome-style to natural Astro URLs)
    ...redirectConfig,
    // Pattern redirects for blog -> news migration
    '/blog/[...slug]': { destination: '/news/[...slug]', status: 301 },
  },
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
