// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { markdownConfig } from './src/build/markdown-config.mjs';
import { collectDraftPaths, isDraftPageUrl } from './src/build/draft-pages.mjs';
import generatedRedirects from './src/build/generated-redirects.json' with { type: 'json' };
import releaseGuardiansRedirect from './src/data/release-guardians/redirect.json' with { type: 'json' };

// Build redirect config with 301 status for SEO
// Simple redirects: exact path mappings
const simpleRedirects = Object.fromEntries(
  Object.entries(generatedRedirects.redirects).map(([from, to]) => [from, { destination: to, status: 301 }])
);
// Pattern redirects: dynamic route patterns (e.g. /blog/[...slug] → /news/[...slug])
const patternRedirects = Object.fromEntries(
  Object.entries(generatedRedirects.patterns).map(([from, to]) => [from, { destination: to, status: 301 }])
);

let draftPaths;
const getDraftPaths = () => (draftPaths ??= collectDraftPaths());

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
    sitemap({ filter: (page) => !isDraftPageUrl(page, getDraftPaths()) }),
  ],
  // Shared with the post creator preview, so it renders bodies the way the site does
  markdown: markdownConfig,
  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
      // @astrojs/markdown-remark reads this at load time. The post creator preview loads it in the
      // browser, where dev has no `process`; the build already turns `process.env` into `{}`.
      'process.env.ASTRO_PERFORMANCE_BENCHMARK': 'undefined',
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
