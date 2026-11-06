/**
 * The text steps the preprocessor applies to a page body, with no Node APIs, so the post creator
 * preview runs exactly the same steps in the browser. The two steps that need the file system
 * (inlining <Insert> snippets and rewriting asset paths) are passed in by the caller.
 */
import { processMarkdown } from './markdown-processor.mjs';
import { normalizeSlug } from './slug-utils.mjs';

export const JSX_COMMENT_RE = /\{\/\*[\s\S]*?\*\/\}/g;

/**
 * Shift heading levels down by one when content has multiple h1 headings.
 * h1→h2, h2→h3, …, h5→h6. Headings already at h6 stay at h6.
 * Lines inside fenced code blocks are neither counted nor shifted.
 */
export function shiftHeadings(content) {
  const lines = content.split('\n');
  const inFence = fencedCodeLines(content.split(/\r?\n/));
  const h1Count = lines.filter((line, i) => !inFence[i] && /^# (?!#)/.test(line)).length;
  if (h1Count < 2) return content;

  return lines
    .map((line, i) => {
      if (inFence[i]) return line;
      return line.replace(/^(#{1,6})( )/, (match, hashes, space) => {
        if (hashes.length >= 6) return match;
        return '#' + hashes + space;
      });
    })
    .join('\n');
}

/**
 * Flag each line that belongs to a fenced code block, fence lines included.
 * A fence closes only on a line of the same character at least as long as its opener.
 */
function fencedCodeLines(lines) {
  let fence = null;
  return lines.map((line) => {
    if (fence) {
      const close = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) fence = null;
      return true;
    }
    // A backtick fence's info string can't contain backticks, so ```x``` is inline code
    const open = line.match(/^ {0,3}(?:(`{3,})[^`]*|(~{3,}).*)$/);
    if (open) fence = open[1] || open[2];
    return Boolean(open);
  });
}

/**
 * Add 'bs-compat' marker class to elements using Bootstrap patterns.
 * This allows bootstrap-compat.css to target only legacy Bootstrap content
 * without conflicting with Tailwind or custom styling elsewhere.
 *
 * Example: class="btn btn-primary" -> class="bs-compat btn btn-primary"
 */
export function addBootstrapMarker(content) {
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
export function rewriteSrc(src, slug) {
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
export function processImagePaths(content, slug) {
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

// Remark would mangle these HTML blocks, so such bodies skip the Markdown round trip
const HTML_CONTENT_RE = /<(div|table|span)[\s>]/i;

/**
 * The preprocessor's body steps, in its order. `inlineInserts` and `processImagePaths` default to
 * doing nothing; `hasComponents` reports whether an inlined insert needs MDX.
 */
export async function preprocessBody(
  body,
  {
    inlineInserts = (content) => ({ content, hasComponents: false }),
    processImagePaths = (content) => content,
    addToc = false,
  } = {}
) {
  const inlined = inlineInserts(body.replace(JSX_COMMENT_RE, ''));
  let content = shiftHeadings(inlined.content);
  content = addBootstrapMarker(content);
  content = processImagePaths(content);
  if (!HTML_CONTENT_RE.test(content)) content = await processMarkdown(content, { addToc, fixLinks: true });
  return { content, hasComponents: inlined.hasComponents };
}
