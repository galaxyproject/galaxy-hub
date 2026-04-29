#!/usr/bin/env node
/**
 * Content preprocessing script for Galaxy Hub Astro v2
 *
 * Reads content from the shared /content directory (repo root)
 * and writes processed files to src/content/ (gitignored).
 *
 * This allows the astro-migrate branch to stay in sync with
 * content updates from main without merge conflicts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';
import { processMarkdown, processFrontmatter } from './markdown-processor.mjs';
import { normalizeSlugSegment, normalizeSlug } from './slug-utils.mjs';
export { normalizeSlugSegment, normalizeSlug };

const JSX_COMMENT_RE = /\{\/\*[\s\S]*?\*\/\}/g;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const PROJECT_ROOT = path.resolve(ASTRO_ROOT, '..'); // galaxy-hub/
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const ASTRO_CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const PUBLIC_IMAGES_DIR = path.join(ASTRO_ROOT, 'public/images');
const PUBLIC_ASSETS_DIR = path.join(ASTRO_ROOT, 'public/assets');
const PUBLIC_MEDIA_DIR = path.join(ASTRO_ROOT, 'public/media');
const NAVBAR_DEST_DIR = path.join(ASTRO_CONTENT_DIR, 'navbars');

/**
 * Shared glob ignore patterns for content file discovery.
 * Used by both preprocessContent and watchContent so they always operate on
 * the same set of files.
 */
const CONTENT_IGNORE = ['**/node_modules/**', '0examples/**', '**/use/**/*.yml', '**/use/**/*.yaml'];

/**
 * Copy images and assets from a content directory
 */
async function copyAssets(sourceDir, slug) {
  const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.pdf', '.mp4', '.webm'];

  async function walk(current, relative = '') {
    let entries = [];
    try {
      entries = await fs.promises.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      const relPath = path.join(relative, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath, relPath);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (!assetExtensions.includes(ext)) continue;

      const destDir = path.join(PUBLIC_IMAGES_DIR, slug, path.dirname(relPath));
      const destPath = path.join(destDir, path.basename(entry.name));
      await fs.promises.mkdir(destDir, { recursive: true });
      await fs.promises.copyFile(entryPath, destPath);
    }
  }

  await walk(sourceDir);
}

/**
 * Recursively copy a directory tree, normalizing directory names via
 * normalizeSlugSegment so that paths match what rewriteSrc produces.
 * File names are preserved as-is.
 */
async function copyDirWithNormalizedNames(srcDir, destDir) {
  await fs.promises.mkdir(destDir, { recursive: true });
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    if (entry.isDirectory()) {
      const normalizedName = normalizeSlugSegment(entry.name);
      await copyDirWithNormalizedNames(srcPath, path.join(destDir, normalizedName));
    } else {
      await fs.promises.copyFile(srcPath, path.join(destDir, entry.name));
    }
  }
}

/**
 * Determine which collection a file belongs to
 * Note: vue-articles merged into articles - all content can have components
 */
function getContentCollection(filePath, contentDir = CONTENT_DIR) {
  const relativePath = path.relative(contentDir, filePath);
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

  // News collection
  if (relativePath.startsWith('news/')) {
    return 'news';
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
 * Normalize directory segments of an asset path, leaving the filename unchanged.
 * e.g. "events/gcc2013/photos/Venue.jpg" -> "events/gcc-2013/photos/Venue.jpg"
 */
function normalizeAssetPath(assetPath) {
  const lastSlash = assetPath.lastIndexOf('/');
  if (lastSlash < 0) return assetPath;
  const dir = assetPath.slice(0, lastSlash);
  const file = assetPath.slice(lastSlash);
  return normalizeSlug(dir) + file;
}

/**
 * Rewrite a single asset src to the correct served path.
 * Handles relative paths, absolute content paths, and /images/ paths,
 * normalizing directory segments to match where copyAssets puts files.
 */
function rewriteSrc(src, slug) {
  if (src.startsWith('/images/')) {
    const rest = src.slice('/images/'.length);
    return '/images/' + normalizeAssetPath(rest);
  }
  if (src.startsWith('/assets/') || src.startsWith('/media/')) return src;
  if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return src;
  if (!src.startsWith('/')) {
    const cleanSrc = src.startsWith('./') ? src.slice(2) : src;
    return `/images/${slug}/${cleanSrc}`;
  }
  return '/images/' + normalizeAssetPath(src.slice(1));
}

/**
 * Shift heading levels down by one when content has multiple h1 headings.
 * h1→h2, h2→h3, …, h5→h6. Headings already at h6 stay at h6.
 * Skips headings inside fenced code blocks.
 */
function shiftHeadings(content) {
  const h1Count = (content.match(/^# (?!#)/gm) || []).length;
  if (h1Count < 2) return content;

  let inFence = false;
  return content
    .split('\n')
    .map((line) => {
      if (/^(`{3,}|~{3,})/.test(line)) {
        inFence = !inFence;
      }
      if (inFence) return line;
      return line.replace(/^(#{1,6})( )/, (match, hashes, space) => {
        if (hashes.length >= 6) return match;
        return '#' + hashes + space;
      });
    })
    .join('\n');
}

/**
 * Process asset paths in markdown content — images, videos, PDFs, and other
 * files that live alongside content and get copied to /images/{slug}/.
 */
function processImagePaths(content, slug) {
  let processed = content;

  const assetExts = 'jpg|jpeg|png|gif|svg|webp|pdf|mp4|webm';

  // Markdown images: ![alt](file.ext) or ![alt](file.ext "title")
  processed = processed.replace(
    new RegExp(`!\\[([^\\]]*)\\]\\(([^)\\s]+\\.(${assetExts}))([^)]*)\\)`, 'gi'),
    (match, alt, src, ext, rest) => {
      const rewritten = rewriteSrc(src, slug);
      if (rewritten !== src) return `![${alt}](${rewritten}${rest})`;
      return match;
    }
  );

  // HTML img tags
  processed = processed.replace(
    new RegExp(`<img\\s+([^>]*src=["'])([^"']+\\.(${assetExts}))["']([^>]*)>`, 'gi'),
    (match, prefix, src, ext, suffix) => {
      const rewritten = rewriteSrc(src, slug);
      if (rewritten !== src) return `<img ${prefix}${rewritten}"${suffix}>`;
      return match;
    }
  );

  // HTML a href pointing to local asset files
  processed = processed.replace(
    new RegExp(`(<a\\s[^>]*href=["'])([^"']+\\.(${assetExts}))(["'][^>]*>)`, 'gi'),
    (match, prefix, src, ext, suffix) => {
      const rewritten = rewriteSrc(src, slug);
      if (rewritten !== src) return `${prefix}${rewritten}${suffix}`;
      return match;
    }
  );

  // HTML source/video/video-player src tags
  processed = processed.replace(
    new RegExp(`(<(?:source|video|video-player)\\s[^>]*src=["'])([^"']+\\.(${assetExts}))(["'][^>]*>)`, 'gi'),
    (match, prefix, src, ext, suffix) => {
      const rewritten = rewriteSrc(src, slug);
      if (rewritten !== src) return `${prefix}${rewritten}${suffix}`;
      return match;
    }
  );

  // Markdown links to asset files: [text](file.ext)
  // Negative lookbehind avoids re-matching markdown images already handled above
  processed = processed.replace(
    new RegExp(`(?<!!)\\[([^\\]]*)\\]\\(([^)\\s]+\\.(?:${assetExts}))\\)`, 'gi'),
    (match, text, src) => {
      const rewritten = rewriteSrc(src, slug);
      if (rewritten !== src) return `[${text}](${rewritten})`;
      return match;
    }
  );

  // Catch-all for ](url.ext) — handles nested markdown like [![img](src)](target)
  // where the outer link target wasn't caught by earlier regexes because [^\]]*
  // can't match alt text containing ] characters
  processed = processed.replace(new RegExp(`\\]\\(([^)\\s]+\\.(?:${assetExts}))\\)`, 'gi'), (match, src) => {
    const rewritten = rewriteSrc(src, slug);
    if (rewritten !== src) return `](${rewritten})`;
    return match;
  });

  return processed;
}

/**
 * Add 'bs-compat' marker class to elements using Bootstrap patterns.
 * This allows bootstrap-compat.css to target only legacy Bootstrap content
 * without conflicting with Tailwind or custom styling elsewhere.
 *
 * Example: class="btn btn-primary" -> class="bs-compat btn btn-primary"
 */
function addBootstrapMarker(content) {
  // Bootstrap class patterns that should be marked.
  // When any of these appear in a class attribute, the 'bs-compat' marker is added.
  const bootstrapPatterns = [
    // Buttons
    'btn-primary',
    'btn-secondary',
    'btn-success',
    'btn-danger',
    'btn-warning',
    'btn-info',
    'btn-light',
    'btn-dark',
    'btn-link',
    'btn-sm',
    'btn-lg',
    // Cards - note: 'card' alone is Bootstrap-specific (Astro uses different names)
    'card',
    'card-deck',
    'card-header',
    'card-body',
    'card-footer',
    'card-img-top',
    'card-img-bottom',
    'card-title',
    'card-text',
    // Alerts
    'alert',
    'alert-primary',
    'alert-secondary',
    'alert-success',
    'alert-danger',
    'alert-warning',
    'alert-info',
    'alert-light',
    'alert-dark',
    // Typography
    'lead',
    // Tables
    'table',
    'table-striped',
    'table-bordered',
    'table-hover',
  ];

  let processed = content;

  for (const pattern of bootstrapPatterns) {
    // Match class="...pattern..." and add 'bs-compat' marker if not already present
    // Use word boundary \b to avoid partial matches
    const regex = new RegExp(`class="([^"]*\\b${pattern}\\b[^"]*)"`, 'g');
    processed = processed.replace(regex, (match, classes) => {
      // Check if 'bs-compat' marker already present
      if (/\bbs-compat\b/.test(classes)) {
        return match;
      }
      return `class="bs-compat ${classes}"`;
    });
  }

  return processed;
}

/**
 * Build the canonical slug for news content.
 * Keeps the `news/` prefix and removes any year bucket directory.
 */
export function deriveNewsNaturalSlug(normalizedDirname) {
  const parts = normalizedDirname.split('/');
  if (parts.length >= 3 && parts[0] === 'news' && /^\d{4}$/.test(parts[1])) {
    return `news/${parts.slice(2).join('/')}`;
  }
  if (parts.length >= 2 && parts[0] === 'news') {
    return `news/${parts.slice(1).join('/')}`;
  }
  return normalizedDirname === '.' ? 'home' : normalizedDirname;
}

// Cache for resolved insert content (inserts are referenced by multiple pages)
const insertCache = new Map();

/**
 * Resolve an insert file's content, applying the same transforms used for page content.
 * Returns { content, hasComponents } or null if the file doesn't exist.
 */
function resolveInsertContent(slotName, depth = 0, contentDir = CONTENT_DIR) {
  if (depth > 2) {
    console.warn(`  Warning: insert nesting too deep for ${slotName}, stopping at depth ${depth}`);
    return { content: `<!-- Insert nesting too deep: ${slotName} -->`, hasComponents: false };
  }

  const cacheKey = `${slotName}:${depth}`;
  if (insertCache.has(cacheKey)) {
    return insertCache.get(cacheKey);
  }

  // Map slot name to file path: "/foo/bar" -> "content/foo/bar.md"
  const relativePath = slotName.replace(/^\//, '');
  const filePath = path.join(contentDir, relativePath + '.md');

  let rawContent;
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8');
  } catch {
    // Fallback: try the un-normalized filename (e.g., slot "ifb/lead-1" → file "ifb/lead1.md")
    const segments = relativePath.split('/');
    const lastSeg = segments[segments.length - 1];
    const denormalized = lastSeg.replace(/-/g, '');
    if (denormalized !== lastSeg) {
      const fallbackPath = path.join(contentDir, ...segments.slice(0, -1), denormalized + '.md');
      try {
        rawContent = fs.readFileSync(fallbackPath, 'utf-8');
      } catch {
        // fall through to warning below
      }
    }
    if (!rawContent) {
      console.warn(`  Warning: insert not found: ${slotName} (looked for ${filePath})`);
      insertCache.set(cacheKey, null);
      return null;
    }
  }

  const { data: insertFrontmatter, content: body } = matter(rawContent);

  // Compute the insert's own slug for image path resolution
  const insertSlug = normalizeSlug(relativePath);

  // Apply the same content transforms used in processMarkdownFile
  let processed = body;
  processed = processed.replace(JSX_COMMENT_RE, '');
  const { content: inlined, hasComponents: nestedComponents } = inlineInserts(processed, depth + 1, contentDir);
  processed = inlined;
  processed = addBootstrapMarker(processed);
  processed = processImagePaths(processed, insertSlug);

  const hasComponents = insertFrontmatter.components === true || nestedComponents;
  const result = { content: processed, hasComponents };
  insertCache.set(cacheKey, result);
  return result;
}

/**
 * Inline <slot name="..."> references by reading insert files and splicing
 * their processed content directly into the parent. This eliminates the MDX
 * requirement for pages that only used slots (171 of 184 conflict pages).
 * Returns { content, hasComponents } — hasComponents is true if any inlined
 * insert had components: true in its frontmatter.
 */
function inlineInserts(content, depth = 0, contentDir = CONTENT_DIR) {
  let hasComponents = false;
  const result = content.replace(/<slot\s+name=["']([^"']+)["']\s*\/?>/gi, (match, slotName) => {
    const resolved = resolveInsertContent(slotName, depth, contentDir);
    if (resolved === null) {
      return `<!-- Insert not found: ${slotName} -->`;
    }
    if (resolved.hasComponents) {
      hasComponents = true;
    }
    // Wrap in a div with data-name so layout CSS selectors can target inserts
    return `<div class="insert" data-name="${slotName}">\n${resolved.content}\n</div>`;
  });
  return { content: result, hasComponents };
}

/**
 * Extract a tease (short description) from raw markdown body text.
 * Strips markdown/HTML syntax and returns the first sentence or ~200 chars,
 * breaking at a word boundary.
 */
function generateTease(markdownBody) {
  let text = markdownBody
    .replace(/^---[\s\S]*?---\s*/m, '') // strip any residual frontmatter
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // strip images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → text
    .replace(/<[^>]+>/g, '') // strip HTML tags
    .replace(/^#{1,6}\s+/gm, '') // strip heading markers
    .replace(/[*_~`]+/g, '') // strip emphasis/code markers
    .replace(/^\s*[-*+]\s+/gm, '') // strip list markers
    .replace(/^\s*\d+\.\s+/gm, '') // strip ordered list markers
    .replace(/^\s*>/gm, '') // strip blockquotes
    .replace(/\n+/g, ' ') // collapse newlines
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();

  if (!text) return null;

  // Try to end at the first sentence boundary within ~200 chars
  const sentenceEnd = text.search(/[.!?]\s/);
  if (sentenceEnd > 0 && sentenceEnd < 200) {
    return text.slice(0, sentenceEnd + 1);
  }

  // Otherwise truncate at a word boundary near 200 chars
  if (text.length <= 200) return text;
  const truncated = text.slice(0, 200);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

/**
 * Process a single markdown file
 */
async function processMarkdownFile(filePath, { contentDir = CONTENT_DIR, outputDir = ASTRO_CONTENT_DIR } = {}) {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(rawContent);

  const collection = getContentCollection(filePath, contentDir);
  const relativePath = path.relative(contentDir, filePath);
  const dirname = path.dirname(relativePath);

  // Create slug from path
  let naturalSlug;
  if (path.basename(filePath) === 'index.md') {
    const normalizedDirname = dirname.replace(/\\/g, '/');
    if (collection === 'news') {
      naturalSlug = deriveNewsNaturalSlug(normalizedDirname);
    } else {
      naturalSlug = normalizedDirname === '.' ? 'home' : normalizedDirname;
    }
  } else {
    const filename = path.basename(filePath, '.md');
    naturalSlug = dirname === '.' ? filename : `${dirname}/${filename}`.replace(/\\/g, '/');
  }

  // Normalize the slug (lowercase-hyphenated)
  const slug = normalizeSlug(naturalSlug);

  // Copy assets for index files (use normalized slug for image paths)
  if (path.basename(filePath) === 'index.md') {
    await copyAssets(path.dirname(filePath), slug);
  }

  // Inline insert content before checking for components — slots are resolved
  // at preprocess time now, so pages that only had slots won't need MDX.
  // If any inlined insert has components: true, the parent must become MDX too.
  let processedContent = body;
  processedContent = processedContent.replace(JSX_COMMENT_RE, '');
  const { content: inlinedContent, hasComponents: insertsHaveComponents } = inlineInserts(processedContent, 0, contentDir);
  processedContent = inlinedContent;

  // Shift headings down if content has multiple h1s
  processedContent = shiftHeadings(processedContent);

  // Process content
  processedContent = addBootstrapMarker(processedContent);
  processedContent = processImagePaths(processedContent, slug);

  // Skip remark processing for files with HTML that remark would mangle
  const hasHtmlContent = /<(div|table|span)[\s>]/i.test(processedContent);
  if (!hasHtmlContent) {
    processedContent = await processMarkdown(processedContent, {
      addToc: frontmatter.autotoc === true,
      fixLinks: true,
    });
  }

  // Process frontmatter
  const processedFrontmatter = processFrontmatter({ ...frontmatter });
  processedFrontmatter.slug = slug;
  processedFrontmatter.sourceFile = relativePath.replace(/\\/g, '/');

  // Rewrite frontmatter image path the same way we rewrite body image paths
  if (processedFrontmatter.image && typeof processedFrontmatter.image === 'string') {
    processedFrontmatter.image = rewriteSrc(processedFrontmatter.image, slug);
  }

  // Rewrite external_url when it points to a local asset file
  if (processedFrontmatter.external_url && typeof processedFrontmatter.external_url === 'string') {
    const extUrl = processedFrontmatter.external_url;
    if (!extUrl.startsWith('http') && /\.(pdf|mp4|webm|png|jpg|jpeg|gif|svg|webp)$/i.test(extUrl)) {
      processedFrontmatter.external_url = rewriteSrc(extUrl, slug);
    }
  }

  // Store original slug for redirect generation when it differs from normalized
  if (naturalSlug !== slug) {
    processedFrontmatter.naturalSlug = naturalSlug;
  }

  if (collection === 'news' && !processedFrontmatter.tease) {
    const articleDate = processedFrontmatter.date ? new Date(processedFrontmatter.date) : null;
    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);

    if (articleDate && articleDate < cutoffDate) {
      const autoTease = generateTease(body);
      if (autoTease) {
        processedFrontmatter.tease = autoTease;
      }
    } else {
      console.warn(`  Warning: news article missing tease: ${relativePath}`);
    }
  }

  // Ensure collection directory exists
  const collectionDir = path.join(outputDir, collection);
  await fs.promises.mkdir(collectionDir, { recursive: true });

  const useMdx = frontmatter.components === true || insertsHaveComponents;
  const destPath = path.join(collectionDir, slugToFilename(slug, useMdx));
  const newContent = matter.stringify(processedContent, processedFrontmatter);
  await fs.promises.writeFile(destPath, newContent);

  return { source: filePath, destination: destPath, collection, slug, naturalSlug };
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
 * Process navbar YAML files from content/<subsite>/navbar.yml
 */
async function processNavbar(filePath) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const relativeDir = path.dirname(relativePath);
  const navName = relativeDir === '.' ? 'global' : relativeDir;
  const destDir = path.join(NAVBAR_DEST_DIR, navName);
  const destPath = path.join(destDir, path.basename(filePath));

  await fs.promises.mkdir(destDir, { recursive: true });
  await fs.promises.copyFile(filePath, destPath);

  return { source: filePath, destination: destPath, collection: 'navbars', slug: `${navName}/navbar` };
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
    const batchResults = await Promise.allSettled(batch.map((item) => processFn(item)));

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
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  return { results, errors };
}

/**
 * Main preprocessing function
 */
export async function preprocessContent(options = {}) {
  const { clear = true } = options;

  console.log('Galaxy Hub Astro v2 - Content Preprocessing');
  console.log(`Reading from: ${CONTENT_DIR}`);
  console.log(`Writing to: ${ASTRO_CONTENT_DIR}`);
  console.log('');

  // Clear existing processed content
  if (clear) {
    console.log('Clearing existing processed content...');
    await fs.promises.rm(ASTRO_CONTENT_DIR, { recursive: true, force: true });
    await fs.promises.rm(PUBLIC_IMAGES_DIR, { recursive: true, force: true });
    await fs.promises.rm(PUBLIC_ASSETS_DIR, { recursive: true, force: true });
    await fs.promises.rm(PUBLIC_MEDIA_DIR, { recursive: true, force: true });
  }

  // Find all content files
  const markdownFiles = await glob('**/*.md', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: CONTENT_IGNORE,
  });

  // Only process YAML files that are true datasets, not platform-specific ones
  // Platform-specific files (in use/*/) would overwrite each other since they have same basenames
  const yamlFiles = await glob('**/*.{yml,yaml}', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: CONTENT_IGNORE,
  });

  const navbarFiles = await glob('**/navbar.{yml,yaml}', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/0examples/**'],
  });
  const navbarFileSet = new Set(navbarFiles);
  const nonNavbarYamlFiles = yamlFiles.filter((file) => !navbarFileSet.has(file));

  console.log(`Found ${markdownFiles.length} markdown files`);
  console.log(`Found ${nonNavbarYamlFiles.length} YAML files`);
  console.log(`Found ${navbarFiles.length} navbar files`);
  console.log('');

  // Process markdown files in batches
  console.log('Processing markdown files...');
  const { results: mdResults, errors: mdErrors } = await processBatch(
    markdownFiles,
    processMarkdownFile,
    50 // batch size
  );

  // Process YAML files in batches
  console.log('Processing YAML files...');
  const { results: yamlResults, errors: yamlErrors } = await processBatch(nonNavbarYamlFiles, processDataset, 50);

  console.log('Processing navbar files...');
  const { results: navbarResults, errors: navbarErrors } = await processBatch(navbarFiles, processNavbar, 50);

  const results = [...mdResults, ...yamlResults, ...navbarResults];
  const errors = mdErrors + yamlErrors + navbarErrors;

  // Check for duplicate slugs within the same collection (skip datasets — they use filenames, not slugs)
  const slugMap = new Map();
  for (const result of results) {
    if (!result.slug) continue;
    const key = `${result.collection}/${result.slug}`;
    if (!slugMap.has(key)) {
      slugMap.set(key, []);
    }
    slugMap.get(key).push(result.source);
  }
  const duplicates = [...slugMap.entries()].filter(([, sources]) => sources.length > 1);
  if (duplicates.length > 0) {
    console.warn('');
    console.warn(`Warning: ${duplicates.length} duplicate slug(s) detected:`);
    for (const [key, sources] of duplicates) {
      console.warn(`  "${key}":`);
      for (const src of sources) {
        console.warn(`    ${path.relative(CONTENT_DIR, src)}`);
      }
    }
    console.warn('Later files overwrite earlier ones in the same collection.');
  }

  // Copy global images directory (content/images/ -> public/images/)
  // Directory names are normalized to match rewriteSrc path normalization
  const globalImagesDir = path.join(CONTENT_DIR, 'images');
  try {
    const stats = await fs.promises.stat(globalImagesDir);
    if (stats.isDirectory()) {
      console.log('Copying global images directory...');
      await copyDirWithNormalizedNames(globalImagesDir, PUBLIC_IMAGES_DIR);
      const imageCount = (await glob('**/*', { cwd: globalImagesDir, nodir: true })).length;
      console.log(`  Copied ${imageCount} files from content/images/`);
    }
  } catch {
    // Global images directory doesn't exist, that's fine
  }

  // Copy ESG project assets (no index.md so copyAssets doesn't run for it)
  const esgDir = path.join(CONTENT_DIR, 'projects', 'esg');
  try {
    const stats = await fs.promises.stat(esgDir);
    if (stats.isDirectory()) {
      await copyAssets(esgDir, 'projects/esg');
      const assetCount = (await glob('**/*.{png,jpg,svg,gif}', { cwd: esgDir, nodir: true })).length;
      console.log(`  Copied ${assetCount} ESG project assets`);
    }
  } catch {
    // ESG directory doesn't exist, that's fine
  }

  // Copy global assets directory (content/assets/ -> public/assets/)
  const globalAssetsDir = path.join(CONTENT_DIR, 'assets');
  try {
    const stats = await fs.promises.stat(globalAssetsDir);
    if (stats.isDirectory()) {
      console.log('Copying global assets directory...');
      await fs.promises.cp(globalAssetsDir, PUBLIC_ASSETS_DIR, { recursive: true });
      const assetCount = (await glob('**/*', { cwd: globalAssetsDir, nodir: true })).length;
      console.log(`  Copied ${assetCount} files from content/assets/`);
    }
  } catch {
    // Global assets directory doesn't exist, that's fine
  }

  // Copy global media directory (content/media/ -> public/media/)
  const globalMediaDir = path.join(CONTENT_DIR, 'media');
  try {
    const stats = await fs.promises.stat(globalMediaDir);
    if (stats.isDirectory()) {
      console.log('Copying global media directory...');
      await fs.promises.cp(globalMediaDir, PUBLIC_MEDIA_DIR, { recursive: true });
      const mediaCount = (await glob('**/*', { cwd: globalMediaDir, nodir: true })).length;
      console.log(`  Copied ${mediaCount} files from content/media/`);
    }
  } catch {
    // Global media directory doesn't exist, that's fine
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

const SLOT_RE = /<slot\s+name=["']([^"']+)["']\s*\/?>/gi;

/**
 * Build a reverse index from insert slot-name → Set<absoluteParentFilePath>.
 * Used during watch mode to propagate insert edits to the parent pages that
 * inline them via <slot name="...">.
 */
async function buildInsertIndex(mdFiles) {
  const index = new Map();
  for (const fullPath of mdFiles) {
    const raw = await fs.promises.readFile(fullPath, 'utf-8').catch(() => null);
    if (!raw) continue;
    SLOT_RE.lastIndex = 0;
    let m;
    while ((m = SLOT_RE.exec(raw)) !== null) {
      const slotName = m[1];
      if (!index.has(slotName)) index.set(slotName, new Set());
      index.get(slotName).add(fullPath);
    }
  }
  return index;
}

/**
 * Compute the destination path(s) that processMarkdownFile would have written
 * for a given source file. Returns both the .md and .mdx candidates so the
 * caller can remove whichever exists without knowing which variant was written.
 */
function destPathsForMarkdown(fullPath, contentDir = CONTENT_DIR, outputDir = ASTRO_CONTENT_DIR) {
  const relativePath = path.relative(contentDir, fullPath);
  const dirname = path.dirname(relativePath).replace(/\\/g, '/');
  const collection = getContentCollection(fullPath, contentDir);
  let naturalSlug;
  if (path.basename(fullPath) === 'index.md') {
    naturalSlug = collection === 'news' ? deriveNewsNaturalSlug(dirname) : dirname === '.' ? 'home' : dirname;
  } else {
    const filename = path.basename(fullPath, '.md');
    naturalSlug = dirname === '.' ? filename : `${dirname}/${filename}`;
  }
  const slug = normalizeSlug(naturalSlug);
  const collectionDir = path.join(outputDir, collection);
  return [path.join(collectionDir, slugToFilename(slug, false)), path.join(collectionDir, slugToFilename(slug, true))];
}

/**
 * Watch content/ for changes and re-process only the affected file(s).
 *
 * Handles:
 *   - Edits to existing pages and datasets.
 *   - New file creation (previously silently ignored).
 *   - Deletions — removes the corresponding generated file from src/content/.
 *   - Insert edits — propagates to all parent pages that inline them via
 *     <slot name="...">. The reverse index tracks direct references only;
 *     deeply-nested chains (insert A → insert B → page C) will update when
 *     any file in the chain is resaved.
 *
 * On Linux, fs.watch({ recursive }) sometimes reports only the basename instead
 * of the full relative path. The watcher therefore treats every event as a hint
 * that *something* changed, then finds files modified since the last scan via
 * mtime comparison — reliable regardless of how the filename is reported.
 */
async function watchContent() {
  console.log(`[watch] Watching for changes in: ${CONTENT_DIR}`);

  const globOpts = { cwd: CONTENT_DIR, absolute: true, ignore: CONTENT_IGNORE };

  // Snapshot of mtimes at startup so the first scan doesn't re-process everything.
  const mtimes = new Map();
  {
    const initial = await glob('**/*.{md,yml,yaml}', globOpts);
    for (const f of initial) {
      const st = await fs.promises.stat(f).catch(() => null);
      if (st) mtimes.set(f, st.mtimeMs);
    }
  }

  // Reverse index: slot name → Set of parent file paths that reference it.
  const insertIndex = await buildInsertIndex([...mtimes.keys()].filter((f) => f.endsWith('.md')));

  /**
   * Re-scan the slot references in a markdown file and update insertIndex.
   */
  const updateInsertIndex = async (fullPath) => {
    // Remove this file as a parent from all existing entries
    for (const parents of insertIndex.values()) {
      parents.delete(fullPath);
    }
    const raw = await fs.promises.readFile(fullPath, 'utf-8').catch(() => null);
    if (!raw) return;
    SLOT_RE.lastIndex = 0;
    let m;
    while ((m = SLOT_RE.exec(raw)) !== null) {
      const slotName = m[1];
      if (!insertIndex.has(slotName)) insertIndex.set(slotName, new Set());
      insertIndex.get(slotName).add(fullPath);
    }
  };

  const processFile = async (fullPath) => {
    const relative = path.relative(CONTENT_DIR, fullPath);
    console.log(`[watch] Processing: ${relative}`);
    try {
      if (fullPath.endsWith('.md')) {
        for (const dest of destPathsForMarkdown(fullPath)) {
          await fs.promises.rm(dest, { force: true });
        }
        await processMarkdownFile(fullPath);
        await updateInsertIndex(fullPath);

        // If this file is an insert, re-process every parent that inlines it.
        if (getContentCollection(fullPath) === 'inserts') {
          // Index keys on the normalized path. resolveInsertContent also accepts
          // denormalized slot names (e.g. <slot name="/ifb/lead-1" /> → lead1.md),
          // but those aliases won't match here and inserts using them won't hot-reload.
          const relNoExt = path.relative(CONTENT_DIR, fullPath).replace(/\.md$/, '').replace(/\\/g, '/');
          const slotName = '/' + relNoExt;
          const parents = insertIndex.get(slotName);
          if (parents && parents.size > 0) {
            console.log(`[watch] Insert changed — re-processing ${parents.size} parent(s)`);
            for (const parentPath of parents) {
              const parentRel = path.relative(CONTENT_DIR, parentPath);
              console.log(`[watch]   Re-processing parent: ${parentRel}`);
              try {
                for (const dest of destPathsForMarkdown(parentPath)) {
                  await fs.promises.rm(dest, { force: true });
                }
                await processMarkdownFile(parentPath);
              } catch (err) {
                console.error(`[watch]   Error in parent ${parentRel}:`, err.message);
              }
            }
          }
        }
      } else if (path.basename(fullPath) === 'navbar.yml' || path.basename(fullPath) === 'navbar.yaml') {
        await processNavbar(fullPath);
      } else {
        await processDataset(fullPath);
      }
      console.log(`[watch] Done: ${relative}`);
    } catch (err) {
      console.error(`[watch] Error: ${relative}:`, err.message);
    }
  };

  const removeStale = async (fullPath) => {
    const relative = path.relative(CONTENT_DIR, fullPath);
    try {
      if (fullPath.endsWith('.md')) {
        for (const dest of destPathsForMarkdown(fullPath)) {
          await fs.promises.rm(dest, { force: true });
        }
        // If this was an insert, re-process parents before cleaning the index.
        const relNoExt = path.relative(CONTENT_DIR, fullPath).replace(/\.md$/, '').replace(/\\/g, '/');
        const slotName = '/' + relNoExt;
        const parents = insertIndex.get(slotName);
        if (parents && parents.size > 0) {
          console.log(`[watch] Insert deleted — re-processing ${parents.size} parent(s)`);
          for (const parentPath of [...parents]) {
            const parentRel = path.relative(CONTENT_DIR, parentPath);
            console.log(`[watch]   Re-processing parent: ${parentRel}`);
            try {
              for (const dest of destPathsForMarkdown(parentPath)) {
                await fs.promises.rm(dest, { force: true });
              }
              await processMarkdownFile(parentPath);
            } catch (err) {
              console.error(`[watch]   Error in parent ${parentRel}:`, err.message);
            }
          }
        }
        // Clean up insert index
        for (const ps of insertIndex.values()) ps.delete(fullPath);
        insertIndex.delete(slotName);
      } else if (path.basename(fullPath) === 'navbar.yml' || path.basename(fullPath) === 'navbar.yaml') {
        const relativePath = path.relative(CONTENT_DIR, fullPath);
        const relativeDir = path.dirname(relativePath);
        const navName = relativeDir === '.' ? 'global' : relativeDir;
        const dest = path.join(NAVBAR_DEST_DIR, navName, path.basename(fullPath));
        await fs.promises.rm(dest, { force: true });
      } else {
        const dest = path.join(ASTRO_CONTENT_DIR, 'datasets', path.basename(fullPath));
        await fs.promises.rm(dest, { force: true });
      }
      console.log(`[watch] Removed: ${relative}`);
    } catch (err) {
      console.error(`[watch] Error removing ${relative}:`, err.message);
    }
    mtimes.delete(fullPath);
  };

  let scanTimer = null;
  let scanning = false;
  let pendingScan = false;

  /**
   * The actual scan: find changed/new/deleted files and process them.
   * Protected by a scanning flag so concurrent executions never overlap.
   */
  const runScan = async () => {
    if (scanning) {
      // Another scan is running; remember to re-run once it finishes.
      pendingScan = true;
      return;
    }
    scanning = true;
    pendingScan = false;
    try {
      // Clear insert cache once per scan batch (not per file) so a burst of
      // changes from git-checkout or mass-edit resolves inserts fresh.
      insertCache.clear();

      const files = await glob('**/*.{md,yml,yaml}', globOpts);
      const fileSet = new Set(files);

      // Process new and modified files (prev === undefined → new file, always process)
      for (const fullPath of files) {
        const st = await fs.promises.stat(fullPath).catch(() => null);
        if (!st) continue;
        const prev = mtimes.get(fullPath);
        if (prev === undefined || st.mtimeMs > prev) {
          mtimes.set(fullPath, st.mtimeMs);
          await processFile(fullPath);
        }
      }

      // Remove output for files deleted since the last scan
      for (const fullPath of [...mtimes.keys()]) {
        if (!fileSet.has(fullPath)) {
          await removeStale(fullPath);
        }
      }
    } catch (err) {
      console.error('[watch] Scan error:', err.message);
    } finally {
      scanning = false;
      if (pendingScan) {
        // A change arrived while we were scanning — run again after a short delay.
        scanTimer = setTimeout(runScan, 200);
      }
    }
  };

  const scheduleScan = () => {
    if (scanTimer) clearTimeout(scanTimer);
    scanTimer = setTimeout(runScan, 200);
  };

  // Fallback interval poll — catches any events that fs.watch drops under heavy
  // inotify load (queue overflow with large directory trees is common on Linux).
  const pollInterval = setInterval(scheduleScan, 10000);

  // Event-driven watch for fast (<200 ms) response. Best-effort on Linux — if
  // the kernel drops events or the watcher fails, the interval above takes over.
  try {
    const watcher = fs.watch(CONTENT_DIR, { recursive: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of watcher) {
      scheduleScan();
    }
    // The watcher closed cleanly (CONTENT_DIR was removed, etc.).
    console.warn('[watch] fs.watch closed; continuing in poll-only mode');
  } catch (err) {
    console.warn(`[watch] fs.watch error (${err.message}); continuing in poll-only mode`);
  }

  // Keep the process alive indefinitely in poll-only mode.
  // pollInterval keeps the event loop alive; this promise never settles.
  await new Promise(() => {
    void pollInterval;
  });
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.includes('--watch-only')) {
    // Just watch — assumes a full preprocess already ran
    watchContent().catch((error) => {
      console.error('Watch error:', error);
      process.exit(1);
    });
  } else {
    const options = {
      verbose: args.includes('--verbose') || args.includes('-v'),
      clear: !args.includes('--no-clear'),
    };

    preprocessContent(options)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
      });
  }
}

// Exports for testing
export {
  addBootstrapMarker,
  processImagePaths,
  rewriteSrc,
  inlineInserts,
  resolveInsertContent,
  insertCache,
  generateTease,
  shiftHeadings,
  processMarkdownFile,
  destPathsForMarkdown,
};
