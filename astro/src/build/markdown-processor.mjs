/**
 * Markdown processing utilities for Astro migration
 * Handles link fixing, TOC generation, and other markdown transformations
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import remarkToc from 'remark-toc';
import { visit } from 'unist-util-visit';
import path from 'path';

// Install remark plugins if needed
// npm install unified remark-parse remark-frontmatter remark-stringify remark-toc unist-util-visit

/**
 * Fix relative links in markdown content
 */
function fixLinksPlugin() {
  return (tree, file) => {
    visit(tree, ['link', 'image'], (node) => {
      if (!node.url) return;
      
      // Skip external URLs
      if (node.url.startsWith('http://') || 
          node.url.startsWith('https://') ||
          node.url.startsWith('//') ||
          node.url.startsWith('#')) {
        return;
      }
      
      // Handle relative paths
      if (node.url.startsWith('./') || node.url.startsWith('../')) {
        // For Astro, we'll need to convert these to absolute paths
        // based on the current file's location
        // This will be implemented based on the file context
      }
      
      // Fix image paths that might need to go to public/
      if (node.type === 'image' && !node.url.startsWith('/')) {
        // Images should be in the public directory
        if (node.url.startsWith('images/')) {
          node.url = '/' + node.url;
        }
      }
    });
  };
}

/**
 * Add or update table of contents
 */
function addTocPlugin(options = {}) {
  const { onlyIfHeadings = true } = options;
  
  return (tree, file) => {
    // Check if we should add TOC
    if (onlyIfHeadings) {
      let hasHeadings = false;
      visit(tree, 'heading', () => {
        hasHeadings = true;
        return false; // Stop after finding first heading
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
      children: [{ type: 'text', value: 'Table of contents' }]
    };
    
    // Find insertion point (after frontmatter if exists)
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
    filePath,
    addToc = true,
    fixLinks = true 
  } = options;
  
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml']);
  
  if (fixLinks) {
    processor.use(fixLinksPlugin);
  }
  
  if (addToc) {
    processor.use(addTocPlugin, { onlyIfHeadings: true });
    processor.use(remarkToc, {
      heading: 'table[ -]of[ -]contents?',
      tight: true
    });
  }
  
  processor.use(remarkStringify, {
    fences: true,
    rule: '-',
    listItemIndent: 'one'
  });
  
  const result = await processor.process(content);
  return String(result);
}

/**
 * Extract and process frontmatter
 */
export function processFrontmatter(frontmatter, filePath) {
  // Add any additional frontmatter processing here
  // For example, converting dates, adding computed fields, etc.
  
  // Remove layout field (not supported in Astro 5 content collections)
  if (frontmatter.layout) {
    delete frontmatter.layout;
  }
  
  // Ensure dates are properly formatted
  if (frontmatter.date && typeof frontmatter.date === 'string') {
    frontmatter.date = new Date(frontmatter.date).toISOString();
  }
  
  if (frontmatter.end && typeof frontmatter.end === 'string') {
    frontmatter.end = new Date(frontmatter.end).toISOString();
  }
  
  if (frontmatter.closes && typeof frontmatter.closes === 'string') {
    frontmatter.closes = new Date(frontmatter.closes).toISOString();
  }
  
  return frontmatter;
}