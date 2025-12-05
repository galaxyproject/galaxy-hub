#!/usr/bin/env node
/**
 * Content preprocessing script for Galaxy Hub Astro v2
 *
 * Reads content from the shared /content directory (repo root)
 * and writes processed files to src/content/ (gitignored).
 *
 * This allows the astro-migrate branch to stay in sync with
 * content updates from master without merge conflicts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';
import { processMarkdown, processFrontmatter } from './markdown-processor.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const PROJECT_ROOT = path.resolve(ASTRO_ROOT, '..');  // galaxy-hub/
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const ASTRO_CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const PUBLIC_IMAGES_DIR = path.join(ASTRO_ROOT, 'public/images');

// Vue components that indicate a file needs special processing
const VUE_COMPONENTS = [
  'slot',
  'g-image',
  'g-link',
  'link-box',
  'vega-embed',
  'calendar-embed',
  'markdown-embed',
  'twitter',
  'mastodon',
  'video-player',
  'carousel',
  'flickr',
  'supporters',
  'contacts',
];

/**
 * Check if content contains Vue components that need MDX processing
 * Only use MDX for files that explicitly opt-in OR have specific safe component patterns
 */
function needsVueProcessing(content, frontmatter, filePath = '') {
  // Skip MDX for directories with known broken HTML or complex patterns
  // These directories have content that can't be parsed by MDX (divs containing markdown, etc.)
  // Also skip news (has Gridsome import statements that won't work in Astro)
  // Skip bare/ as it has complex component usage requiring full Vue component suite
  const SKIP_MDX_DIRS = ['cloudman/', 'community/', 'events/', 'news/', 'bare/'];
  for (const dir of SKIP_MDX_DIRS) {
    if (filePath.includes(dir)) {
      return false;
    }
  }

  // Explicit opt-in via frontmatter (for other directories)
  if (frontmatter.components === true) {
    return true;
  }

  // Only check for components that are unlikely to appear in malformed HTML
  // and are clearly custom Vue components (not standard HTML-like)
  // Note: slot/Insert removed - requires complex MDX config that's not worth it
  // Those files stay as .md and we handle inserts differently
  const SAFE_COMPONENTS = [
    'twitter',        // Social embeds
    'mastodon',
    'vega-embed',     // Data viz
    'calendar-embed', // Calendar
    'video-player',   // Media
    'carousel',
    'flickr',
    'supporters',     // Custom lists
    'contacts',
    'markdown-embed',
  ];

  for (const component of SAFE_COMPONENTS) {
    // Only match properly formatted component tags (with space after name or self-closing)
    // Case-sensitive to avoid false positives like "<insert your text here>"
    const openTagRegex = new RegExp(`<${component}(\\s|>|\\/)`);
    if (openTagRegex.test(content)) {
      return true;
    }
  }

  return false;
}

/**
 * Copy images and assets from a content directory
 */
async function copyAssets(sourceDir, slug) {
  const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.pdf', '.mp4', '.webm'];

  try {
    const files = await fs.promises.readdir(sourceDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (assetExtensions.includes(ext)) {
        const sourcePath = path.join(sourceDir, file);
        const destDir = path.join(PUBLIC_IMAGES_DIR, slug);
        const destPath = path.join(destDir, file);

        await fs.promises.mkdir(destDir, { recursive: true });
        await fs.promises.copyFile(sourcePath, destPath);
      }
    }
  } catch {
    // Directory might not exist or have no assets
  }
}

/**
 * Determine which collection a file belongs to
 * Note: vue-articles merged into articles - all content can have components
 */
function getContentCollection(filePath, content, frontmatter) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const basename = path.basename(filePath);

  // Bare articles - must check early, before inserts check
  // Content in bare/ directory uses minimal layout
  if (relativePath.startsWith('bare/')) {
    // Non-index files in bare/ are still inserts
    if (basename !== 'index.md') {
      return 'inserts';
    }
    return 'bare-articles';
  }

  // Non-index markdown files are inserts
  if (basename !== 'index.md' && filePath.endsWith('.md')) {
    return 'inserts';
  }

  // Events collection
  if (relativePath.startsWith('events/')) {
    return 'events';
  }

  // Platform pages (Galaxy servers)
  if (relativePath.startsWith('use/') && !relativePath.startsWith('use/index')) {
    return 'platforms';
  }

  // All other content goes to articles (including those with components)
  return 'articles';
}

/**
 * Generate a safe filename from a slug
 */
function slugToFilename(slug, useMdx = false) {
  const ext = useMdx ? '.mdx' : '.md';
  return slug.replace(/\//g, '--') + ext;
}

/**
 * Process image paths in markdown content
 */
function processImagePaths(content, slug) {
  let processed = content;

  // Update markdown image syntax: ![alt](image.png) -> ![alt](/images/slug/image.png)
  processed = processed.replace(
    /!\[([^\]]*)\]\(([^)\s]+\.(jpg|jpeg|png|gif|svg|webp))([^)]*)\)/gi,
    (match, alt, src, ext, rest) => {
      if (!src.startsWith('/') && !src.startsWith('http')) {
        return `![${alt}](/images/${slug}/${src}${rest})`;
      }
      return match;
    }
  );

  // Update HTML img tags
  processed = processed.replace(
    /<img\s+([^>]*src=["'])([^"']+\.(jpg|jpeg|png|gif|svg|webp))["']([^>]*)>/gi,
    (match, prefix, src, ext, suffix) => {
      if (!src.startsWith('/') && !src.startsWith('http')) {
        return `<img ${prefix}/images/${slug}/${src}"${suffix}>`;
      }
      return match;
    }
  );

  return processed;
}

/**
 * Convert Gridsome-specific syntax to standard markdown/HTML
 */
function convertGridsomeSyntax(content) {
  let processed = content;

  // Replace g-link with regular links
  processed = processed.replace(/<g-link/g, '<a');
  processed = processed.replace(/<\/g-link>/g, '</a>');

  // Replace g-image with regular images
  processed = processed.replace(/<g-image/g, '<img');
  processed = processed.replace(/<\/g-image>/g, '');

  // Note: <slot name="/path"> tags are left as-is for now
  // They'll be rendered as text in .md files. A future enhancement could
  // implement server-side insert processing during render.

  return processed;
}

/**
 * Convert Vue-style bindings and HTML to JSX syntax for MDX compatibility
 * :prop="value" -> prop={value}
 * :prop="123" -> prop={123}
 * <!-- comment --> -> {/* comment *\/}
 * rowspan=3 -> rowspan="3"
 */
function convertVueToJsx(content) {
  let processed = content;

  // Convert HTML comments to JSX comments
  // Also remove markdown escapes like \_ which aren't valid in JSX expressions
  processed = processed.replace(
    /<!--([\s\S]*?)-->/g,
    (match, content) => {
      const cleaned = content.replace(/\\([_*`~])/g, '$1');
      return `{/* ${cleaned} */}`;
    }
  );

  // Convert markdown auto-links <URL> to proper links [URL](URL)
  // MDX interprets <URL> as JSX tags
  processed = processed.replace(
    /<(https?:\/\/[^>]+)>/g,
    '[$1]($1)'
  );

  // Escape empty angle brackets <> which look like JSX fragments
  processed = processed.replace(/<>/g, '&lt;&gt;');

  // Convert void HTML elements to self-closing JSX
  const voidElements = ['br', 'hr', 'img', 'input', 'embed', 'source', 'track', 'wbr', 'area', 'base', 'col', 'meta', 'link'];
  for (const tag of voidElements) {
    // Match tags that aren't already self-closing
    processed = processed.replace(
      new RegExp(`<${tag}(\\s[^>]*[^/])?>`, 'gi'),
      (match, attrs) => `<${tag}${attrs || ''} />`
    );
  }

  // Fix missing space between tag and attribute (e.g., <rowclass= -> <row class=)
  // Common pattern in malformed legacy HTML
  processed = processed.replace(/<(\w+)(class|style|id|href|src|rowspan|colspan|width|height)=/gi, '<$1 $2=');

  // Fix malformed style/class attributes where class is embedded in style
  // style=" class="green"  text-align:center;" -> class="green" style="text-align:center;"
  processed = processed.replace(/style="\s*class="([^"]+)"\s*([^"]*)"/gi, 'class="$1" style="$2"');

  // Fix unquoted HTML attributes (e.g., rowspan=3 -> rowspan="3")
  // Match attribute=value where value is not quoted
  // Run multiple times to catch consecutive unquoted attributes
  let prev;
  do {
    prev = processed;
    processed = processed.replace(
      /(\s)(\w+)=(\d+)(?=\s|>|\/)/g,
      '$1$2="$3"'
    );
  } while (prev !== processed);

  // Convert Vue bindings :prop="value" to JSX prop={value}
  // Handle numeric values
  processed = processed.replace(
    /:(\w+)="(\d+(?:\.\d+)?)"/g,
    '$1={$2}'
  );

  // Handle string values (keep as strings for now)
  processed = processed.replace(
    /:(\w+)="([^"]+)"/g,
    (match, prop, value) => {
      // If it looks like a variable/expression, use JSX syntax
      if (/^[a-zA-Z_]\w*$/.test(value) || value.includes('.')) {
        return `${prop}={${value}}`;
      }
      // Otherwise keep as string attribute
      return `${prop}="${value}"`;
    }
  );

  return processed;
}

/**
 * Process a single markdown file
 */
async function processMarkdownFile(filePath) {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(rawContent);

  const collection = getContentCollection(filePath, body, frontmatter);
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const dirname = path.dirname(relativePath);

  // Create slug from path
  let slug;
  if (path.basename(filePath) === 'index.md') {
    slug = dirname === '.' ? 'home' : dirname.replace(/\\/g, '/');
  } else {
    const filename = path.basename(filePath, '.md');
    slug = dirname === '.' ? filename : `${dirname}/${filename}`.replace(/\\/g, '/');
  }

  // Copy assets for index files
  if (path.basename(filePath) === 'index.md') {
    await copyAssets(path.dirname(filePath), slug);
  }

  // Check if content needs Vue/component processing
  const hasComponents = needsVueProcessing(body, frontmatter, filePath);

  // Process content
  let processedContent = body;
  processedContent = convertGridsomeSyntax(processedContent);
  processedContent = processImagePaths(processedContent, slug);

  processedContent = await processMarkdown(processedContent, {
    addToc: frontmatter.autotoc === true,
    fixLinks: true
  });

  // Convert Vue bindings/HTML to JSX for MDX files (AFTER markdown processing
  // to avoid remark escaping asterisks in JSX comments)
  if (hasComponents) {
    processedContent = convertVueToJsx(processedContent);
  }

  // Process frontmatter
  const processedFrontmatter = processFrontmatter({ ...frontmatter }, filePath);
  processedFrontmatter.slug = slug;

  // Add hasComponents flag for rendering
  if (hasComponents) {
    processedFrontmatter.hasComponents = true;
  }

  // Ensure collection directory exists
  const collectionDir = path.join(ASTRO_CONTENT_DIR, collection);
  await fs.promises.mkdir(collectionDir, { recursive: true });

  // Write processed file - use .mdx extension for files with components
  // But inserts stay as .md (they don't need MDX and often have < characters)
  const useMdx = hasComponents && collection !== 'inserts';
  const destPath = path.join(collectionDir, slugToFilename(slug, useMdx));
  const newContent = matter.stringify(processedContent, processedFrontmatter);
  await fs.promises.writeFile(destPath, newContent);

  return { source: filePath, destination: destPath, collection, slug };
}

/**
 * Process YAML dataset files
 */
async function processDataset(filePath) {
  const destDir = path.join(ASTRO_CONTENT_DIR, 'datasets');
  const destPath = path.join(destDir, path.basename(filePath));

  await fs.promises.mkdir(destDir, { recursive: true });
  await fs.promises.copyFile(filePath, destPath);

  return { source: filePath, destination: destPath, collection: 'datasets' };
}

/**
 * Process items in batches to avoid file table overflow
 */
async function processBatch(items, processFn, batchSize = 50) {
  const results = [];
  let errors = 0;
  let processed = 0;

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map(item => processFn(item))
    );

    for (const result of batchResults) {
      if (result.status === 'fulfilled') {
        results.push(result.value);
        processed++;
      } else {
        errors++;
        console.error(`Error:`, result.reason?.message || result.reason);
      }
    }

    if (processed % 500 === 0 || i + batchSize >= items.length) {
      console.log(`  Processed ${processed}/${items.length} files...`);
    }

    // Small delay between batches to let file handles close
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }

  return { results, errors };
}

/**
 * Main preprocessing function
 */
export async function preprocessContent(options = {}) {
  const { clear = true, verbose = false } = options;

  console.log('Galaxy Hub Astro v2 - Content Preprocessing');
  console.log(`Reading from: ${CONTENT_DIR}`);
  console.log(`Writing to: ${ASTRO_CONTENT_DIR}`);
  console.log('');

  // Clear existing processed content
  if (clear) {
    console.log('Clearing existing processed content...');
    await fs.promises.rm(ASTRO_CONTENT_DIR, { recursive: true, force: true });
    await fs.promises.rm(PUBLIC_IMAGES_DIR, { recursive: true, force: true });
  }

  // Find all content files
  const markdownFiles = await glob('**/*.md', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '0examples/**']
  });

  const yamlFiles = await glob('**/*.{yml,yaml}', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/navbar.yml', '**/navbar.yaml']
  });

  console.log(`Found ${markdownFiles.length} markdown files`);
  console.log(`Found ${yamlFiles.length} YAML files`);
  console.log('');

  // Process markdown files in batches
  console.log('Processing markdown files...');
  const { results: mdResults, errors: mdErrors } = await processBatch(
    markdownFiles,
    processMarkdownFile,
    50  // batch size
  );

  // Process YAML files in batches
  console.log('Processing YAML files...');
  const { results: yamlResults, errors: yamlErrors } = await processBatch(
    yamlFiles,
    processDataset,
    50
  );

  const results = [...mdResults, ...yamlResults];
  const errors = mdErrors + yamlErrors;

  // Summary
  const summary = results.reduce((acc, result) => {
    acc[result.collection] = (acc[result.collection] || 0) + 1;
    return acc;
  }, {});

  console.log('');
  console.log('Preprocessing complete!');
  console.log('');
  console.log('Content distribution:');
  for (const [collection, count] of Object.entries(summary).sort()) {
    console.log(`  ${collection}: ${count} files`);
  }

  if (errors > 0) {
    console.log('');
    console.log(`Errors: ${errors} files failed to process`);
  }

  return results;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    clear: !args.includes('--no-clear')
  };

  preprocessContent(options)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
