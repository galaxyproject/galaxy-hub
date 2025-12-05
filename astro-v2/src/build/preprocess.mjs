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
 * Check if content contains Vue components
 */
function needsVueProcessing(content, frontmatter) {
  if (frontmatter.components === true) {
    return true;
  }

  for (const component of VUE_COMPONENTS) {
    if (content.includes(`<${component}`) || content.includes(`</${component}>`)) {
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
 */
function getContentCollection(filePath, content, frontmatter) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const basename = path.basename(filePath);

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

  // Bare articles (minimal layout)
  const barePaths = ['eu/news', 'eu/events', 'eu/latest', 'fr/news', 'fr/events', 'everywhere/'];
  for (const barePath of barePaths) {
    if (relativePath.startsWith(barePath)) {
      return 'bare-articles';
    }
  }

  // Check if needs Vue processing
  if (needsVueProcessing(content, frontmatter)) {
    return 'vue-articles';
  }

  // Default to regular articles
  return 'articles';
}

/**
 * Generate a safe filename from a slug
 */
function slugToFilename(slug) {
  return slug.replace(/\//g, '--') + '.md';
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

  // Process content
  let processedContent = body;
  processedContent = convertGridsomeSyntax(processedContent);
  processedContent = processImagePaths(processedContent, slug);
  processedContent = await processMarkdown(processedContent, {
    addToc: frontmatter.autotoc === true,
    fixLinks: true
  });

  // Process frontmatter
  const processedFrontmatter = processFrontmatter({ ...frontmatter }, filePath);
  processedFrontmatter.slug = slug;

  // Ensure collection directory exists
  const collectionDir = path.join(ASTRO_CONTENT_DIR, collection);
  await fs.promises.mkdir(collectionDir, { recursive: true });

  // Write processed file
  const destPath = path.join(collectionDir, slugToFilename(slug));
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
    ignore: ['**/node_modules/**']
  });

  const yamlFiles = await glob('**/*.{yml,yaml}', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: ['**/node_modules/**']
  });

  console.log(`Found ${markdownFiles.length} markdown files`);
  console.log(`Found ${yamlFiles.length} YAML files`);
  console.log('');

  const results = [];
  let processed = 0;
  let errors = 0;

  // Process markdown files
  for (const file of markdownFiles) {
    try {
      const result = await processMarkdownFile(file);
      results.push(result);
      processed++;

      if (verbose) {
        console.log(`  ${result.slug} -> ${result.collection}`);
      } else if (processed % 500 === 0) {
        console.log(`  Processed ${processed} files...`);
      }
    } catch (error) {
      errors++;
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Process YAML files
  for (const file of yamlFiles) {
    try {
      const result = await processDataset(file);
      results.push(result);
    } catch (error) {
      errors++;
      console.error(`Error processing ${file}:`, error.message);
    }
  }

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
