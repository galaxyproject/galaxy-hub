// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import generatedRedirects from './src/build/generated-redirects.json' with { type: 'json' };
import galaxyHubImageMigration from '../integrations/galaxy-hub-image-migration.mjs';

const autolinkConfig = {
  behavior: 'append',
  properties: {
    class: 'heading-anchor',
    ariaLabel: 'Link to this section',
  },
};

// Build redirect config with 301 status for SEO
// Simple redirects: exact path mappings
const simpleRedirects = Object.fromEntries(
  Object.entries(generatedRedirects.redirects).map(([from, to]) => [from, { destination: to, status: 301 }])
);
// Pattern redirects: dynamic route patterns (e.g. /blog/[...slug] → /news/[...slug])
const patternRedirects = Object.fromEntries(
  Object.entries(generatedRedirects.patterns).map(([from, to]) => [from, { destination: to, status: 301 }])
);

// https://astro.build/config
export default defineConfig({
  site: 'https://galaxyproject.org',
  prefetch: {
    defaultStrategy: 'hover',
  },
  redirects: {
    ...simpleRedirects,
    ...patternRedirects,
  },
  integrations: [
    galaxyHubImageMigration({
      imageDirs: ['../content', '../news', '../events', '../blog', '../use'],      
      destDir: 'src/assets/hub-images',      
      imageExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'],      
      useCache: true,
      verbose: process.env.NODE_ENV === 'development'
    }),
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
        ignored: ['**/public/images/**', '**/public/assets/**', '**/public/media/**', '**/content/**/images/**'],
      },
    },
  },
});
