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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const PROJECT_ROOT = path.resolve(ASTRO_ROOT, '..'); // galaxy-hub/
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const ASTRO_CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const PUBLIC_IMAGES_DIR = path.join(ASTRO_ROOT, 'public/images');
const PUBLIC_ASSETS_DIR = path.join(ASTRO_ROOT, 'public/assets');
const PUBLIC_MEDIA_DIR = path.join(ASTRO_ROOT, 'public/media');

// Post-normalization fixups for edge cases where the algorithm produces bad output.
// Keys are the bad normalized form; values are the corrected form.
// Applied after all regex rules + lowercasing, so keys should be lowercase-hyphenated.
const slugOverrides = JSON.parse(fs.readFileSync(new URL('./slug-overrides.json', import.meta.url), 'utf-8'));

/**
 * Normalize a single path segment into a lowercase-hyphenated slug.
 *
 * Rules applied in order:
 *   1. Insert hyphen at lowercase→uppercase boundary (camelCase / PascalCase)
 *   2. Insert hyphen at end-of-uppercase-run→lowercase boundary
 *   3. Insert hyphen at letter→digit boundary
 *   4. Insert hyphen at digit→letter boundary
 *   5. Replace underscores with hyphens
 *   6. Lowercase everything
 *   7. Collapse consecutive hyphens
 *   8. Apply slug-overrides.json fixups for known edge cases
 *
 * Uppercase runs are NOT split internally — "RNA" stays "rna", not "rn-a".
 */
export function normalizeSlugSegment(segment) {
  let s = segment;

  // Insert hyphen at lowercase→uppercase boundary: "chatGPT" → "chat-GPT"
  s = s.replace(/([a-z])([A-Z])/g, '$1-$2');

  // Insert hyphen at end-of-uppercase-run→lowercase boundary: "GBCCMeeting" → "GBCC-Meeting"
  // This handles runs like "GCC" followed by lowercase: "GCC2024Meeting" after step above
  // is still "GCC2024-Meeting". We need: "HTMLParser" → "HTML-Parser".
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');

  // Insert hyphen at letter→digit boundary: "PAG31" → "PAG-31"
  s = s.replace(/([a-zA-Z])(\d)/g, '$1-$2');

  // Insert hyphen at digit→letter boundary: "4Bio" → "4-Bio"
  s = s.replace(/(\d)([a-zA-Z])/g, '$1-$2');

  // Replace underscores with hyphens
  s = s.replace(/_/g, '-');

  // Lowercase
  s = s.toLowerCase();

  // Collapse consecutive hyphens
  s = s.replace(/-{2,}/g, '-');

  // Apply overrides to fix known edge cases (longest match first)
  const sortedKeys = Object.keys(slugOverrides).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (s.includes(key)) {
      s = s.replaceAll(key, slugOverrides[key]);
    }
  }

  // Trim leading/trailing hyphens (shouldn't happen normally but be safe)
  s = s.replace(/^-|-$/g, '');

  return s;
}

/**
 * Normalize a full slug path (e.g. "events/2024-01-12-PAG31").
 * Each segment is normalized independently; leading date prefixes (YYYY-MM-DD-)
 * pass through unchanged since they're already well-formed.
 */
export function normalizeSlug(slug) {
  return slug
    .split('/')
    .map((segment) => normalizeSlugSegment(segment))
    .join('/');
}

/**
 * Check if content contains patterns that break MDX parsing
 * - HTML blocks containing markdown (divs with markdown links, etc.)
 * - Complex HTML structures (tables, multiple divs)
 * - Malformed HTML tags
 */
function hasProblematicHtml(content) {
  // Check for <div> tags containing markdown syntax (links, bold, etc.)
  // This pattern fails in MDX because markdown isn't processed inside HTML
  const divWithMarkdown = /<div[^>]*>[\s\S]*?\[[^\]]+\]\([^)]+\)[\s\S]*?<\/div>/i;
  if (divWithMarkdown.test(content)) {
    return true;
  }

  // Check for multiple divs in content - MDX often fails with complex div structures
  const openDivCount = (content.match(/<div[\s>]/gi) || []).length;
  const closeDivCount = (content.match(/<\/div>/gi) || []).length;
  if (openDivCount > 1 || openDivCount !== closeDivCount) {
    return true;
  }

  // Check for HTML tables - they often contain special characters like <= that break MDX
  if (/<table[\s>]/i.test(content)) {
    return true;
  }

  // Check for markdown tables (pipe-delimited) - they may contain <= characters that break MDX
  if (/^\|.*\|.*\n\|[\s:-]+\|/m.test(content)) {
    return true;
  }

  // Check for divs with text content followed by newline (common in legacy content)
  // These often fail because MDX treats the content as a paragraph
  const divWithTextContent = /<div[^>]*>[^<\n]+\n/i;
  if (divWithTextContent.test(content)) {
    return true;
  }

  // Check for malformed/custom HTML tags like <row>, <column>, etc.
  const malformedTags = /<(row|column|linkbox|link-box)[\s>]/i;
  if (malformedTags.test(content)) {
    return true;
  }

  // Check for arrow patterns like <--- or <-- that MDX misinterprets as JSX
  if (/<-{2,}/.test(content)) {
    return true;
  }

  // Check for < followed by numbers (like <1.0km, <500) - MDX misinterprets as JSX
  if (/<\d/.test(content)) {
    return true;
  }

  return false;
}

/**
 * Check if content contains Vue components that need MDX processing
 * Only use MDX for files that explicitly opt-in OR have specific safe component patterns
 */
function needsVueProcessing(content, frontmatter) {
  // Components that are safe MDX patterns — unlikely to appear in malformed HTML.
  // Both kebab-case and PascalCase variants, since raw content may use either.
  const SAFE_COMPONENTS = [
    'twitter',
    'Twitter', // Social embeds
    'mastodon',
    'Mastodon',
    'vega-embed',
    'VegaEmbed', // Data viz
    'calendar-embed',
    'CalendarEmbed', // Calendar
    'video-player',
    'VideoPlayer', // Media
    'carousel',
    'Carousel',
    'flickr',
    'Flickr',
    'supporters',
    'Supporters', // Custom lists
    'contacts',
    'Contacts',
    'markdown-embed',
    'MarkdownEmbed',
    'Insert', // Content insertion component (case-sensitive to avoid "<insert your text here>")
  ];

  // Explicit opt-in via frontmatter overrides HTML detection — the author
  // is asserting the page is MDX-compatible (Vue imports and kramdown are
  // stripped during preprocessing so this is safe)
  if (frontmatter.components === true) {
    return true;
  }

  // Check for problematic HTML patterns that break MDX
  if (hasProblematicHtml(content)) {
    return false;
  }

  for (const component of SAFE_COMPONENTS) {
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
function getContentCollection(filePath) {
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
 * Convert kramdown-style inline attributes to HTML
 * Kramdown syntax like [text](url){:target="_blank"} is not supported by Astro/remark
 *
 * Handles:
 * - [text](url){:target="_blank"} -> <a href="url" target="_blank">text</a>
 * - [text](url){: .class1 .class2} -> <a href="url" class="class1 class2">text</a>
 * - [text](url){: .class target="_blank"} -> <a href="url" class="class" target="_blank">text</a>
 */
function convertKramdownAttributes(content) {
  let processed = content;

  // Match markdown links followed by kramdown attribute blocks
  // Pattern: [content](url){: attributes }
  // Content can include HTML like <i class="..."></i>
  // Use a function to handle nested brackets in content
  const linkWithAttrsRegex = /\[([^\]]*(?:\[[^\]]*\][^\]]*)*)\]\(([^)]+)\)\{:\s*([^}]+)\}/g;

  processed = processed.replace(linkWithAttrsRegex, (match, text, url, attrs) => {
    // Parse attributes: can be .class, target="value", style="value", etc.
    const classes = [];
    const otherAttrs = [];

    // Split by spaces but respect quoted values
    const attrParts = attrs.match(/(?:[^\s"]+|"[^"]*")+/g) || [];

    for (const part of attrParts) {
      if (part.startsWith('.')) {
        // Class attribute: .classname
        classes.push(part.slice(1));
      } else if (part.includes('=')) {
        // Key-value attribute: target="_blank"
        otherAttrs.push(part);
      }
    }

    // Build the anchor tag
    let anchor = `<a href="${url}"`;
    if (classes.length > 0) {
      anchor += ` class="${classes.join(' ')}"`;
    }
    for (const attr of otherAttrs) {
      anchor += ` ${attr}`;
    }
    anchor += `>${text}</a>`;

    return anchor;
  });

  // Handle block-level kramdown attributes like {:.table.table-striped}
  // These appear on their own line after a block element
  // For now, just remove them as they're less critical
  processed = processed.replace(/^\{:\.[\w.-]+\}\s*$/gm, '');

  return processed;
}

/**
 * Convert Font Awesome icons to inline Lucide SVGs
 * Maps FA class names to equivalent Lucide icons rendered as inline SVG
 */
function convertFontAwesomeToLucide(content) {
  // Lucide SVG paths (24x24 viewBox)
  const icons = {
    laptop:
      '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    'external-link':
      '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    'share-2':
      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m8.59 10.49 6.83-3.98"/>',
    'alert-circle': '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    files:
      '<path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"/><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"/>',
    'wand-2':
      '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    video:
      '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    folder:
      '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    settings:
      '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    pencil:
      '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
    presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
    'help-circle':
      '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    list: '<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
    mouse: '<rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'square-check': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    tv: '<rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'refresh-cw':
      '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    keyboard:
      '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'graduation-cap':
      '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    calendar:
      '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    coffee:
      '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
    wrench:
      '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    rocket:
      '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>',
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    twitter:
      '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'grid-3x3':
      '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>',
    hash: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
    monitor:
      '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  };

  // FA to Lucide mapping
  const faToLucide = {
    'fa-laptop': 'laptop',
    'fa-external-link-alt': 'external-link',
    'fa-external-link': 'external-link',
    'fa-share-alt': 'share-2',
    'fa-exclamation-circle': 'alert-circle',
    'fa-files-o': 'files',
    'fa-magic': 'wand-2',
    'fa-file': 'file',
    'fa-envelope': 'mail',
    'fa-video': 'video',
    'fa-folder': 'folder',
    'fa-cog': 'settings',
    'fa-pencil-alt': 'pencil',
    'fa-book': 'book',
    'fa-slideshare': 'presentation',
    'fa-question-circle': 'help-circle',
    'fa-question-circle-o': 'help-circle',
    'fa-list-ul': 'list',
    'fa-list-alt': 'list',
    'fa-mouse': 'mouse',
    'fa-copy': 'copy',
    'fa-check-square': 'square-check',
    'fa-tv': 'tv',
    'fa-comments-o': 'message-square',
    'fa-sync': 'refresh-cw',
    'fa-keyboard': 'keyboard',
    'fa-eye': 'eye',
    'fa-caret-square-down': 'chevron-down',
    'fa-graduation-cap': 'graduation-cap',
    'fa-bullseye': 'target',
    'fa-calendar': 'calendar',
    'fa-cloud': 'cloud',
    'fa-coffee': 'coffee',
    'fa-wrench': 'wrench',
    'fa-fighter-jet': 'rocket',
    'fa-road': 'monitor',
    'fa-github': 'github',
    'fa-twitter': 'twitter',
    'fa-linkedin': 'linkedin',
    'fa-whatsapp': 'message-circle',
    'fa-mastodon': 'message-circle',
    'fa-orcid': 'user',
    'fa-matrix': 'grid-3x3',
    'fa-topic': 'hash',
    'fa-chalkboard-teacher': 'presentation',
    'fa-laptop-code': 'code',
    'fa-optin-monster': 'user',
    'fa-bug': 'alert-circle',
    'fa-rss': 'rss',
    'fa-gitlab': 'code',
  };

  icons.rss = '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>';

  // Convert kramdown FA patterns: [](){: .fa .fa-xxx style="..."} → Lucide SVG
  content = content.replace(
    /\[\]\(\)\{:\s*\.fa[sbrld]?\s+\.(fa-[a-z0-9-]+)(?:\s+style="([^"]*)")?\s*\}/g,
    (match, iconClass, style) => {
      const lucideName = faToLucide[iconClass];
      if (!lucideName || !icons[lucideName]) return '';
      const colorStyle = style || '';
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;${colorStyle}">${icons[lucideName]}</svg>`;
    }
  );

  return content.replace(/<i\s+[^>]*class="([^"]*\bfa[sbrld]?\b[^"]*)"[^>]*><\/i>/gi, (match, classes) => {
    // Extract the actual icon name (last fa-xxx that isn't fa-solid/fa-regular/fa-brands/fa-light/fa-duotone)
    const allFaClasses = classes.match(/fa-[a-z0-9-]+/g) || [];
    const styleClasses = ['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone', 'fa-thin'];
    const iconClass = allFaClasses.find((cls) => !styleClasses.includes(cls));
    if (!iconClass) return match;

    const lucideName = faToLucide[iconClass];
    if (!lucideName || !icons[lucideName]) return match;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;">${icons[lucideName]}</svg>`;
  });
}

// Cache for resolved insert content (inserts are referenced by multiple pages)
const insertCache = new Map();

/**
 * Resolve an insert file's content, applying the same transforms used for page content.
 * Returns the processed body HTML, or null if the file doesn't exist.
 */
function resolveInsertContent(slotName, depth = 0) {
  if (depth > 2) {
    console.warn(`  Warning: insert nesting too deep for ${slotName}, stopping at depth ${depth}`);
    return `<!-- Insert nesting too deep: ${slotName} -->`;
  }

  const cacheKey = `${slotName}:${depth}`;
  if (insertCache.has(cacheKey)) {
    return insertCache.get(cacheKey);
  }

  // Map slot name to file path: "/foo/bar" -> "content/foo/bar.md"
  const relativePath = slotName.replace(/^\//, '');
  const filePath = path.join(CONTENT_DIR, relativePath + '.md');

  let rawContent;
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8');
  } catch {
    // Fallback: try the un-normalized filename (e.g., slot "ifb/lead-1" → file "ifb/lead1.md")
    const segments = relativePath.split('/');
    const lastSeg = segments[segments.length - 1];
    const denormalized = lastSeg.replace(/-/g, '');
    if (denormalized !== lastSeg) {
      const fallbackPath = path.join(CONTENT_DIR, ...segments.slice(0, -1), denormalized + '.md');
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

  const { content: body } = matter(rawContent);

  // Compute the insert's own slug for image path resolution
  const insertSlug = normalizeSlug(relativePath);

  // Apply the same content transforms used in processMarkdownFile
  let processed = body;
  processed = inlineInserts(processed, depth + 1);
  processed = convertKramdownAttributes(processed);
  processed = convertFontAwesomeToLucide(processed);
  processed = addBootstrapMarker(processed);
  processed = processImagePaths(processed, insertSlug);

  insertCache.set(cacheKey, processed);
  return processed;
}

/**
 * Inline <slot name="..."> references by reading insert files and splicing
 * their processed content directly into the parent. This eliminates the MDX
 * requirement for pages that only used slots (171 of 184 conflict pages).
 */
function inlineInserts(content, depth = 0) {
  return content.replace(/<slot\s+name=["']([^"']+)["']\s*\/?>/gi, (match, slotName) => {
    const resolved = resolveInsertContent(slotName, depth);
    if (resolved === null) {
      return `<!-- Insert not found: ${slotName} -->`;
    }
    // Wrap in a div with data-name so layout CSS selectors can target inserts
    return `<div class="insert" data-name="${slotName}">\n${resolved}\n</div>`;
  });
}

/**
 * Strip Vue/Gridsome artifacts that aren't valid in Astro/MDX.
 * Runs early (before needsVueProcessing) so these patterns don't
 * trigger hasProblematicHtml false positives.
 */
function stripVueArtifacts(content) {
  let processed = content;
  // Remove Vue import statements (Gridsome artifact)
  processed = processed.replace(/^import\s+\w+\s+from\s+['"][^'"]+['"];?\s*$/gm, '');
  // Convert Vue :prop="value" bindings to standard attributes
  processed = processed.replace(/\s:(\w+)="([^"]*)"/g, ' $1="$2"');
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

  // Slots are now inlined at preprocess time by inlineInserts(), but convert
  // any remaining <slot name="..."> as a safety net for unresolved references
  processed = processed.replace(/<slot(\s+name=["'][^"']+["']\s*)\/?>/gi, '<Insert$1/>');

  return processed;
}

/**
 * Convert kebab-case component names to PascalCase for MDX
 * MDX treats lowercase/kebab-case as HTML elements, PascalCase as components
 */
function convertComponentsToPascalCase(content) {
  // Map of kebab-case to PascalCase component names
  const componentMap = {
    'vega-embed': 'VegaEmbed',
    twitter: 'Twitter',
    mastodon: 'Mastodon',
    'video-player': 'VideoPlayer',
    carousel: 'Carousel',
    'calendar-embed': 'CalendarEmbed',
    'markdown-embed': 'MarkdownEmbed',
    flickr: 'Flickr',
    supporters: 'Supporters',
    contacts: 'Contacts',
  };

  let processed = content;

  for (const [kebab, pascal] of Object.entries(componentMap)) {
    // Convert opening tags: <kebab-case ... > to <PascalCase ...>
    processed = processed.replace(new RegExp(`<${kebab}(\\s|>|\\/)`, 'gi'), `<${pascal}$1`);
    // Convert closing tags: </kebab-case> to </PascalCase>
    processed = processed.replace(new RegExp(`</${kebab}>`, 'gi'), `</${pascal}>`);
  }

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
  processed = processed.replace(/<!--([\s\S]*?)-->/g, (match, content) => {
    const cleaned = content.replace(/\\([_*`~])/g, '$1');
    return `{/* ${cleaned} */}`;
  });

  // Convert markdown auto-links <URL> to proper links [URL](URL)
  // MDX interprets <URL> as JSX tags
  processed = processed.replace(/<(https?:\/\/[^>]+)>/g, '[$1]($1)');

  // Escape empty angle brackets <> which look like JSX fragments
  processed = processed.replace(/<>/g, '&lt;&gt;');

  // Convert void HTML elements to self-closing JSX
  const voidElements = [
    'br',
    'hr',
    'img',
    'input',
    'embed',
    'source',
    'track',
    'wbr',
    'area',
    'base',
    'col',
    'meta',
    'link',
  ];
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
    processed = processed.replace(/(\s)(\w+)=(\d+)(?=\s|>|\/)/g, '$1$2="$3"');
  } while (prev !== processed);

  // Convert Vue bindings :prop="value" to JSX prop={value}
  // Handle numeric values
  processed = processed.replace(/:(\w+)="(\d+(?:\.\d+)?)"/g, '$1={$2}');

  // Handle string values (keep as strings for now)
  processed = processed.replace(/:(\w+)="([^"]+)"/g, (match, prop, value) => {
    // If it looks like a variable/expression, use JSX syntax
    if (/^[a-zA-Z_]\w*$/.test(value) || value.includes('.')) {
      return `${prop}={${value}}`;
    }
    // Otherwise keep as string attribute
    return `${prop}="${value}"`;
  });

  return processed;
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
async function processMarkdownFile(filePath) {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(rawContent);

  const collection = getContentCollection(filePath);
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const dirname = path.dirname(relativePath);

  // Create slug from path
  let naturalSlug;
  if (path.basename(filePath) === 'index.md') {
    naturalSlug = dirname === '.' ? 'home' : dirname.replace(/\\/g, '/');
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
  // at preprocess time now, so pages that only had slots won't need MDX
  let processedContent = body;
  processedContent = inlineInserts(processedContent);

  // Strip Gridsome Vue import statements (e.g. "import Flickr from '@/components/Flickr.vue';")
  // and convert Vue :prop bindings to standard attributes before MDX detection,
  // since both patterns trigger hasProblematicHtml false positives
  processedContent = stripVueArtifacts(processedContent);

  // Check if content needs Vue/component processing (after inlining inserts)
  const hasComponents = needsVueProcessing(processedContent, frontmatter, filePath);

  // Process content
  processedContent = convertGridsomeSyntax(processedContent);
  processedContent = convertKramdownAttributes(processedContent);
  processedContent = convertFontAwesomeToLucide(processedContent);
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

  // Convert Vue bindings/HTML to JSX for MDX files (AFTER markdown processing
  // to avoid remark escaping asterisks in JSX comments)
  if (hasComponents) {
    processedContent = convertVueToJsx(processedContent);
    // Convert kebab-case component names to PascalCase for MDX
    processedContent = convertComponentsToPascalCase(processedContent);
  }

  // Process frontmatter
  const processedFrontmatter = processFrontmatter({ ...frontmatter });
  processedFrontmatter.slug = slug;

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

  // Add hasComponents flag for rendering
  if (hasComponents) {
    processedFrontmatter.hasComponents = true;
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
  const collectionDir = path.join(ASTRO_CONTENT_DIR, collection);
  await fs.promises.mkdir(collectionDir, { recursive: true });

  // Write processed file - use .mdx extension for files with components
  // But inserts stay as .md (they don't need MDX and often have < characters)
  const useMdx = hasComponents && collection !== 'inserts';
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
    ignore: ['**/node_modules/**', '0examples/**'],
  });

  // Only process YAML files that are true datasets, not platform-specific ones
  // Platform-specific files (in use/*/) would overwrite each other since they have same basenames
  const yamlFiles = await glob('**/*.{yml,yaml}', {
    cwd: CONTENT_DIR,
    absolute: true,
    ignore: [
      '**/node_modules/**',
      '**/navbar.yml',
      '**/navbar.yaml',
      '**/use/**/*.yml', // Exclude platform-specific YAML files (they have duplicate names)
      '**/use/**/*.yaml',
    ],
  });

  console.log(`Found ${markdownFiles.length} markdown files`);
  console.log(`Found ${yamlFiles.length} YAML files`);
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
  const { results: yamlResults, errors: yamlErrors } = await processBatch(yamlFiles, processDataset, 50);

  const results = [...mdResults, ...yamlResults];
  const errors = mdErrors + yamlErrors;

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

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
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

// Exports for testing
export {
  hasProblematicHtml,
  needsVueProcessing,
  convertGridsomeSyntax,
  convertKramdownAttributes,
  convertFontAwesomeToLucide,
  convertVueToJsx,
  convertComponentsToPascalCase,
  addBootstrapMarker,
  processImagePaths,
  rewriteSrc,
  inlineInserts,
  resolveInsertContent,
  insertCache,
  stripVueArtifacts,
  generateTease,
};
