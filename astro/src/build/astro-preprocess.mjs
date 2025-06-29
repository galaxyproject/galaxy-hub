#!/usr/bin/env node
/**
 * Astro-adapted preprocessing script for Galaxy Hub content
 * 
 * This script processes content from the original /content directory
 * and prepares it for Astro's content collections.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const ASTRO_CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');

// Components that indicate a file needs Vue processing
const VUE_COMPONENTS = [
  'slot',
  'g-image',
  'g-link',
  'link-box',
  'vega-embed',
  'calendar-embed',
  'markdown-embed',
  'twitter',
  'video-player',
  'carousel',
  // Add more as we discover them
];

/**
 * Determines if a markdown file needs Vue processing
 */
function needsVueProcessing(content, frontmatter) {
  // Check frontmatter flag
  if (frontmatter.components === true) {
    return true;
  }
  
  // Check for Vue component usage in content
  for (const component of VUE_COMPONENTS) {
    if (content.includes(`<${component}`) || content.includes(`</${component}>`)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Determines the content collection based on path and content
 */
function getContentCollection(filePath, content, frontmatter) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  
  // Check if it's an insert (non-index markdown files)
  if (path.basename(filePath) !== 'index.md' && filePath.endsWith('.md')) {
    return 'inserts';
  }
  
  // Check for platform pages
  if (relativePath.startsWith('use/') && !relativePath.startsWith('use/index')) {
    return 'platforms';
  }
  
  // Check for bare articles (from config)
  if (relativePath.startsWith('bare/')) {
    return 'bare-articles';
  }
  
  // Check if needs Vue processing
  if (needsVueProcessing(content, frontmatter)) {
    return 'vue-articles';
  }
  
  // Default to regular articles
  return 'articles';
}

/**
 * Process a single markdown file
 */
async function processMarkdownFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(content);
  
  const collection = getContentCollection(filePath, body, frontmatter);
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const dirname = path.dirname(relativePath);
  
  // Create a slug from the directory path
  let slug = dirname;
  if (path.basename(filePath) === 'index.md') {
    // For index files, use the directory name as slug
    slug = dirname === '.' ? 'home' : dirname.replace(/\\/g, '/');
  } else {
    // For non-index files, include the filename
    const filename = path.basename(filePath, '.md');
    slug = dirname === '.' ? filename : `${dirname}/${filename}`.replace(/\\/g, '/');
  }
  
  // Ensure the collection directory exists
  const collectionDir = path.join(ASTRO_CONTENT_DIR, collection);
  await fs.promises.mkdir(collectionDir, { recursive: true });
  
  // Generate a safe filename for the content collection
  const safeFilename = slug.replace(/\//g, '--') + '.md';
  const destPath = path.join(collectionDir, safeFilename);
  
  // Add slug to frontmatter for URL generation
  frontmatter.slug = slug;
  
  // Convert Gridsome-specific syntax to Astro
  let processedContent = body;
  
  // Replace g-link with regular links (we'll handle this in components)
  processedContent = processedContent.replace(/<g-link/g, '<a');
  processedContent = processedContent.replace(/<\/g-link>/g, '</a>');
  
  // Replace g-image with regular images
  processedContent = processedContent.replace(/<g-image/g, '<img');
  processedContent = processedContent.replace(/<\/g-image>/g, '</img>');
  
  // Reconstruct the file with updated frontmatter
  const newContent = matter.stringify(processedContent, frontmatter);
  
  await fs.promises.writeFile(destPath, newContent);
  
  return {
    source: filePath,
    destination: destPath,
    collection,
    slug
  };
}

/**
 * Process YAML datasets
 */
async function processDataset(filePath) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const destPath = path.join(ASTRO_CONTENT_DIR, 'datasets', path.basename(filePath));
  
  await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  await fs.promises.copyFile(filePath, destPath);
  
  return {
    source: filePath,
    destination: destPath,
    collection: 'datasets'
  };
}

/**
 * Main preprocessing function
 */
export async function preprocessContent(options = {}) {
  const { clear = true, verbose = false } = options;
  
  console.log('Starting content preprocessing for Astro...');
  
  // Clear existing content collections if requested
  if (clear) {
    console.log('Clearing existing content collections...');
    await fs.promises.rm(ASTRO_CONTENT_DIR, { recursive: true, force: true });
  }
  
  // Find all content files
  const markdownFiles = await glob('**/*.md', { 
    cwd: CONTENT_DIR,
    absolute: true
  });
  
  const yamlFiles = await glob('**/*.{yml,yaml}', {
    cwd: CONTENT_DIR,
    absolute: true
  });
  
  console.log(`Found ${markdownFiles.length} markdown files and ${yamlFiles.length} YAML files`);
  
  const results = [];
  
  // Process markdown files
  for (const file of markdownFiles) {
    try {
      const result = await processMarkdownFile(file);
      results.push(result);
      if (verbose) {
        console.log(`Processed: ${result.slug} → ${result.collection}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  // Process YAML files
  for (const file of yamlFiles) {
    try {
      const result = await processDataset(file);
      results.push(result);
      if (verbose) {
        console.log(`Copied dataset: ${path.basename(file)}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  // Create a summary
  const summary = results.reduce((acc, result) => {
    acc[result.collection] = (acc[result.collection] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\nPreprocessing complete!');
  console.log('Content distribution:');
  for (const [collection, count] of Object.entries(summary)) {
    console.log(`  ${collection}: ${count} files`);
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
  
  preprocessContent(options).catch(console.error);
}