/**
 * The site's Markdown setup (astro.config.mjs `markdown`). Kept here so the post creator preview
 * renders a body with the same processor, plugins and settings as the build.
 */
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeScrollableTables from './rehype-scrollable-tables.mjs';
import rehypeImageSize from './rehype-image-size.mjs';

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

export const markdownConfig = {
  // Astro 7 defaults to the Sätteri pipeline, which does not run remark/rehype
  // plugins. Opt back into unified() so rehype-slug + autolink headings keep working.
  processor: unified({
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig], rehypeScrollableTables, rehypeImageSize],
  }),
  shikiConfig: {
    transformers: [readableCodeComments],
  },
};
