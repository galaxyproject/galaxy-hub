/**
 * Markdown processing utilities for Astro v2 migration
 * Handles link fixing, TOC generation, and other markdown transformations
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import remarkToc from 'remark-toc';
import { visit } from 'unist-util-visit';

/**
 * Fix relative links in markdown content
 */
function fixLinksPlugin() {
  return (tree) => {
    visit(tree, ['link', 'image'], (node) => {
      if (!node.url) return;

      // Skip external URLs and anchors
      if (
        node.url.startsWith('http://') ||
        node.url.startsWith('https://') ||
        node.url.startsWith('//') ||
        node.url.startsWith('#') ||
        node.url.startsWith('mailto:')
      ) {
        return;
      }

      // Fix image paths that might need to go to public/
      if (node.type === 'image' && !node.url.startsWith('/')) {
        if (node.url.startsWith('images/')) {
          node.url = '/' + node.url;
        }
      }
    });
  };
}

/**
 * Add table of contents heading if content has headings
 */
function addTocPlugin(options = {}) {
  const { onlyIfHeadings = true } = options;

  return (tree) => {
    if (onlyIfHeadings) {
      let hasHeadings = false;
      visit(tree, 'heading', (node) => {
        if (node.depth >= 2) {
          hasHeadings = true;
          return false;
        }
      });

      if (!hasHeadings) return;
    }

    // Check if TOC already exists
    let hasToc = false;
    visit(tree, 'heading', (node) => {
      if (node.children?.[0]?.value?.match(/table[ -]of[ -]contents?/i)) {
        hasToc = true;
        return false;
      }
    });

    if (hasToc) return;

    // Add TOC heading after frontmatter
    const tocHeading = {
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: 'Table of contents' }],
    };

    let insertIndex = 0;
    if (tree.children[0]?.type === 'yaml') {
      insertIndex = 1;
    }

    tree.children.splice(insertIndex, 0, tocHeading);
  };
}

/**
 * Process markdown content with all transformations
 */
export async function processMarkdown(content, options = {}) {
  const {
    addToc = false, // Don't auto-add TOC by default
    fixLinks = true,
  } = options;

  const processor = unified().use(remarkParse).use(remarkFrontmatter, ['yaml']);

  if (fixLinks) {
    processor.use(fixLinksPlugin);
  }

  if (addToc) {
    processor.use(addTocPlugin, { onlyIfHeadings: true });
    processor.use(remarkToc, {
      heading: 'table[ -]of[ -]contents?',
      tight: true,
    });
  }

  processor.use(remarkStringify, {
    fences: true,
    rule: '-',
    listItemIndent: 'one',
    resourceLink: true, // Prevent auto-link conversion for [url](url) patterns
  });

  const result = await processor.process(content);
  return String(result);
}

/**
 * Extract and process frontmatter
 */
export function processFrontmatter(frontmatter) {
  // Remove layout field (not needed in Astro content collections)
  if (frontmatter.layout) {
    delete frontmatter.layout;
  }

  // Ensure tags is always an array
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    if (typeof frontmatter.tags === 'string') {
      frontmatter.tags = [frontmatter.tags];
    } else {
      frontmatter.tags = [];
    }
  }

  // Ensure subsites is always an array
  if (frontmatter.subsites && !Array.isArray(frontmatter.subsites)) {
    if (typeof frontmatter.subsites === 'string') {
      frontmatter.subsites = [frontmatter.subsites];
    } else {
      frontmatter.subsites = [];
    }
  }

  // Ensure authors is properly formatted
  if (frontmatter.authors && !Array.isArray(frontmatter.authors) && typeof frontmatter.authors === 'string') {
    frontmatter.authors = [frontmatter.authors];
  }

  // Convert date strings to ISO format for consistency
  const dateFields = ['date', 'end', 'closes', 'opens'];
  for (const field of dateFields) {
    if (frontmatter[field]) {
      try {
        const date = new Date(frontmatter[field]);
        if (!isNaN(date.getTime())) {
          frontmatter[field] = date.toISOString();
        }
      } catch {
        // Keep original value if parsing fails
      }
    }
  }

  return frontmatter;
}
