// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeScrollableTables from './src/build/rehype-scrollable-tables.mjs';
import generatedRedirects from './src/build/generated-redirects.json' with { type: 'json' };
import releaseGuardiansRedirect from './src/data/release-guardians/redirect.json' with { type: 'json' };

const autolinkConfig = {
  behavior: 'append',
  properties: {
    class: 'heading-anchor',
    ariaLabel: 'Link to this section',
  },
};

// github-dark renders comments in #6A737D, 3.05:1 on its #24292E background; use its
// lighter grey (5.34:1) so comments meet WCAG AA.
const readableCodeComments = {
  name: 'readable-code-comments',
  tokens(lines) {
    for (const line of lines) {
      for (const token of line) {
        if (token.color?.toLowerCase() === '#6a737d') {
          token.color = '#959da5';
        }
      }
    }
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
  // Astro 7 changed the default to 'jsx', which strips whitespace between inline
  // elements; keep v6 HTML-aware compression so legacy content spacing is preserved.
  compressHTML: true,
  prefetch: {
    defaultStrategy: 'hover',
  },
  redirects: {
    ...simpleRedirects,
    ...patternRedirects,
    [releaseGuardiansRedirect.from]: { destination: releaseGuardiansRedirect.to, status: 301 },
  },
  integrations: [
    vue(),
    // MDX inherits the base `markdown` config (extendMarkdownConfig defaults to true),
    // so the unified() processor below applies to .mdx as well as .md.
    mdx(),
    sitemap(),
  ],
  markdown: {
    // Astro 7 defaults to the Sätteri pipeline, which does not run remark/rehype
    // plugins. Opt back into unified() so rehype-slug + autolink headings keep working.
    processor: unified({
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig], rehypeScrollableTables],
    }),
    shikiConfig: {
      transformers: [readableCodeComments],
    },
  },
  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    },
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
