#!/usr/bin/env node
/**
 * Content normalization script for Galaxy Hub.
 *
 * Applies source-level transformations to /content/ markdown files,
 * migrating legacy Gridsome/Jekyll syntax to standard HTML/markdown.
 * Run one transform at a time; each pass is meant to be committed separately.
 *
 * Usage:
 *   node src/build/normalize-content.mjs --strip-layout
 *   node src/build/normalize-content.mjs --normalize-frontmatter-arrays
 *   node src/build/normalize-content.mjs --strip-vue-artifacts
 *   node src/build/normalize-content.mjs --convert-gridsome-syntax
 *   node src/build/normalize-content.mjs --convert-kramdown
 *   node src/build/normalize-content.mjs --fix-void-elements
 *   node src/build/normalize-content.mjs --fix-unquoted-attrs
 *   node src/build/normalize-content.mjs --escape-lt-digits
 *   node src/build/normalize-content.mjs --fix-autolinks
 *   node src/build/normalize-content.mjs --fix-component-case
 *   node src/build/normalize-content.mjs --convert-fa-to-icon
 *   node src/build/normalize-content.mjs --all
 *   node src/build/normalize-content.mjs --check  (dry-run, exits non-zero if changes needed)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '../../..', 'content');

const args = process.argv.slice(2);
const dryRun = args.includes('--check');
const runAll = args.includes('--all');

const transforms = {
  stripLayout: runAll || args.includes('--strip-layout'),
  normalizeFrontmatterArrays: runAll || args.includes('--normalize-frontmatter-arrays'),
  stripVueArtifacts: runAll || args.includes('--strip-vue-artifacts'),
  convertGridsomeSyntax: runAll || args.includes('--convert-gridsome-syntax'),
  convertKramdown: runAll || args.includes('--convert-kramdown'),
  fixVoidElements: runAll || args.includes('--fix-void-elements'),
  fixUnquotedAttrs: runAll || args.includes('--fix-unquoted-attrs'),
  fixAutolinks: runAll || args.includes('--fix-autolinks'),
  fixComponentCase: runAll || args.includes('--fix-component-case'),
  convertFaToIcon: runAll || args.includes('--convert-fa-to-icon'),
};

if (!Object.values(transforms).some(Boolean)) {
  console.error('Usage: node src/build/normalize-content.mjs <transform> [--check]');
  console.error('Transforms: --strip-layout, --normalize-frontmatter-arrays,');
  console.error('  --strip-vue-artifacts, --convert-gridsome-syntax, --convert-kramdown,');
  console.error('  --fix-void-elements, --fix-unquoted-attrs, --fix-autolinks,');
  console.error('  --fix-component-case, --convert-fa-to-icon, --all');
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Split a file into raw frontmatter text and body. Preserves the original
 * frontmatter formatting (no YAML round-trip) so diffs stay minimal.
 * Returns { preamble, frontmatter, body } where preamble is everything
 * before the opening ---, frontmatter is the YAML between --- markers
 * (without the markers), and body is everything after the closing ---.
 */
function splitFile(content) {
  const match = content.match(/^(---\r?\n)([\s\S]*?\r?\n)(---\r?\n)/);
  if (!match) {
    // No frontmatter — treat entire file as body
    return {
      frontmatter: null,
      body: content,
      rebuild(_fm, bd) {
        return bd;
      },
    };
  }
  const fmStart = match[1].length;
  const fmEnd = fmStart + match[2].length;
  const bodyStart = fmEnd + match[3].length;
  return {
    frontmatter: content.slice(fmStart, fmEnd),
    body: content.slice(bodyStart),
    rebuild(fm, bd) {
      return `---\n${fm}---\n${bd}`;
    },
  };
}

// ── Frontmatter transforms ──────────────────────────────────────────

/**
 * Remove `layout: ...` lines from raw frontmatter text.
 */
function stripLayout(fm) {
  return fm.replace(/^layout:.*\n/gm, '');
}

/**
 * Normalize scalar tags/subsites/authors to single-element arrays.
 * Operates on raw YAML text to avoid reformatting.
 *
 * Converts:  tags: foo        →  tags: [foo]
 *            tags: "foo bar"  →  tags: ["foo bar"]
 *
 * Leaves alone: tags: [a, b], tags:\n  - a, etc.
 */
function normalizeFrontmatterArrays(fm) {
  const fields = ['tags', 'subsites', 'authors'];
  let result = fm;
  for (const field of fields) {
    // Match `field: value` on a single line where value is a bare scalar.
    // [ \t]+ ensures we don't span newlines. Negative lookahead skips inline arrays.
    result = result.replace(
      new RegExp(`^(${field}:)[ \\t]+(?!\\[)(\\S.*)$`, 'gm'),
      (match, prefix, value) => `${prefix} [${value}]`
    );
  }
  return result;
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Apply a transform function only to text outside fenced code blocks.
 * Splits on ``` and ~~~ fences, transforms odd-indexed segments (outside),
 * and reassembles. This prevents modifying code examples.
 */
function outsideCodeFences(content, fn) {
  // Split on fenced code block boundaries (``` or ~~~, with optional language)
  const parts = content.split(/^(```[^\n]*\n[\s\S]*?^```\s*$|^~~~[^\n]*\n[\s\S]*?^~~~\s*$)/m);
  // parts alternates: [outside, fence, outside, fence, ...]
  return parts.map((part, i) => (i % 2 === 0 ? fn(part) : part)).join('');
}

// ── Body transforms ─────────────────────────────────────────────────
// These are copied/adapted from preprocess.mjs to operate standalone.

function stripVueArtifacts(content) {
  let processed = content;
  processed = processed.replace(/^import\s+\w+\s+from\s+['"][^'"]+['"];?\s*$/gm, '');
  processed = processed.replace(/\s:(\w+)="([^"]*)"/g, ' $1="$2"');
  return processed;
}

function convertGridsomeSyntax(content) {
  let processed = content;
  processed = processed.replace(/<g-link/g, '<a');
  processed = processed.replace(/<\/g-link>/g, '</a>');
  processed = processed.replace(/<g-image/g, '<img');
  processed = processed.replace(/<\/g-image>/g, '');
  return processed;
}

function convertKramdownAttributes(content) {
  let processed = content;

  // [content](url){: attributes }
  const linkWithAttrsRegex = /\[([^\]]*(?:\[[^\]]*\][^\]]*)*)\]\(([^)]+)\)\{:\s*([^}]+)\}/g;

  processed = processed.replace(linkWithAttrsRegex, (match, text, url, attrs) => {
    const classes = [];
    const otherAttrs = [];
    const attrParts = attrs.match(/(?:[^\s"]+|"[^"]*")+/g) || [];

    for (const part of attrParts) {
      if (part.startsWith('.')) {
        classes.push(part.slice(1));
      } else if (part.includes('=')) {
        otherAttrs.push(part);
      }
    }

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

  // Block-level kramdown attributes like {:.table.table-striped}
  processed = processed.replace(/^\{:\.[\w.-]+\}\s*$/gm, '');

  return processed;
}

// ── MDX-compatibility transforms ────────────────────────────────────

/**
 * Self-close void HTML elements: <br> → <br />, <img src="x"> → <img src="x" />
 * MDX requires XHTML-style self-closing for void elements.
 * Note: `source` is omitted — it's technically a void HTML element (for media),
 * but our content uses `<source>` extensively in XML documentation (Galaxy tool
 * XML docs) where it's a container element. The two actual HTML media `<source>`
 * elements in content already have self-closing syntax.
 */
function fixVoidElements(content) {
  const voidElements = [
    'br',
    'hr',
    'img',
    'input',
    'embed',
    'track',
    'wbr',
    'area',
    'base',
    'col',
    'meta',
    'link',
  ];
  return outsideCodeFences(content, (text) => {
    let result = text;
    for (const tag of voidElements) {
      result = result.replace(
        new RegExp(`<${tag}(\\s[^>]*[^/])?>`, 'gi'),
        (match, attrs) => `<${tag}${attrs || ''} />`
      );
    }
    return result;
  });
}

/**
 * Quote bare numeric attribute values: rowspan=3 → rowspan="3"
 * MDX/JSX requires all attribute values to be quoted.
 */
function fixUnquotedAttributes(content) {
  return outsideCodeFences(content, (text) => {
    let result = text;
    let prev;
    do {
      prev = result;
      result = result.replace(/(\s)(\w+)=(\d+)(?=\s|>|\/)/g, '$1$2="$3"');
    } while (prev !== result);
    return result;
  });
}

/**
 * Convert markdown autolinks to standard link syntax:
 * <https://example.com> → [https://example.com](https://example.com)
 * MDX misinterprets angle-bracket URLs as JSX tags.
 */
function fixAutolinks(content) {
  return outsideCodeFences(content, (text) => {
    return text.replace(/<(https?:\/\/[^\s>]+)>/g, '[$1]($1)');
  });
}

/**
 * Convert kebab-case/lowercase MDX component names to PascalCase.
 * MDX treats lowercase as HTML elements; PascalCase signals a component.
 */
function fixComponentCase(content) {
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
  return outsideCodeFences(content, (text) => {
    let result = text;
    for (const [kebab, pascal] of Object.entries(componentMap)) {
      result = result.replace(new RegExp(`<${kebab}(\\s|>|\\/)`, 'gi'), `<${pascal}$1`);
      result = result.replace(new RegExp(`</${kebab}>`, 'gi'), `</${pascal}>`);
    }
    return result;
  });
}

// ── Font Awesome → Lucide Icon conversion ────────────────────────────

const FA_TO_LUCIDE = {
  'fa-laptop': 'laptop',
  'fa-laptop-code': 'code',
  'fa-external-link-alt': 'external-link',
  'fa-external-link': 'external-link',
  'fa-share-alt': 'share-2',
  'fa-exclamation-circle': 'alert-circle',
  'fa-exclamation-triangle': 'triangle-alert',
  'fa-info-circle': 'info',
  'fa-files-o': 'files',
  'fa-file': 'file',
  'fa-file-o': 'file',
  'fa-magic': 'wand-2',
  'fa-envelope': 'mail',
  'fa-video': 'video',
  'fa-video-camera': 'video',
  'fa-folder': 'folder',
  'fa-folder-o': 'folder',
  'fa-cog': 'settings',
  'fa-cogs': 'settings',
  'fa-pencil-alt': 'pencil',
  'fa-pencil': 'pencil',
  'fa-book': 'book',
  'fa-book-open': 'book-open',
  'fa-slideshare': 'presentation',
  'fa-chalkboard-teacher': 'presentation',
  'fa-question-circle': 'help-circle',
  'fa-question-circle-o': 'help-circle',
  'fa-list-ul': 'list',
  'fa-list-alt': 'list',
  'fa-mouse': 'mouse',
  'fa-copy': 'copy',
  'fa-check-square': 'square-check',
  'fa-check-square-o': 'square-check',
  'fa-tv': 'tv',
  'fa-comments-o': 'message-square',
  'fa-comment': 'message-circle',
  'fa-sync': 'refresh-cw',
  'fa-refresh': 'refresh-cw',
  'fa-keyboard': 'keyboard',
  'fa-eye': 'eye',
  'fa-caret-square-down': 'chevron-down',
  'fa-caret-left': 'chevron-left',
  'fa-graduation-cap': 'graduation-cap',
  'fa-bullseye': 'target',
  'fa-calendar': 'calendar',
  'fa-calendar-alt': 'calendar',
  'fa-cloud': 'cloud',
  'fa-coffee': 'coffee',
  'fa-wrench': 'wrench',
  'fa-fighter-jet': 'rocket',
  'fa-road': 'monitor',
  'fa-github': 'github',
  'fa-gitlab': 'code',
  'fa-twitter': 'twitter',
  'fa-linkedin': 'linkedin',
  'fa-whatsapp': 'message-circle',
  'fa-mastodon': 'message-circle',
  'fa-orcid': 'user',
  'fa-optin-monster': 'user',
  'fa-matrix': 'grid-3x3',
  'fa-topic': 'hash',
  'fa-rss': 'rss',
  'fa-bug': 'alert-circle',
  'fa-bullhorn': 'megaphone',
  'fa-search': 'search',
  'fa-upload': 'upload',
  'fa-download': 'download',
  'fa-database': 'database',
  'fa-server': 'server',
  'fa-cube': 'box',
  'fa-table': 'table',
  'fa-tags': 'tags',
  'fa-th': 'grid-3x3',
  'fa-columns': 'columns-3',
  'fa-sitemap': 'network',
  'fa-play-circle': 'play',
  'fa-times': 'x',
  'fa-times-circle': 'x-circle',
  'fa-minus-circle': 'minus-circle',
  'fa-plus': 'plus',
  'fa-plus-circle': 'plus-circle',
  'fa-bar-chart-o': 'bar-chart-3',
  'fa-trash-o': 'trash-2',
  'fa-floppy-o': 'save',
  'fa-user-friends': 'users',
  'fa-user-astronaut': 'user',
  'fa-hands-helping': 'hand-helping',
  'fa-rotate-270': 'rotate-ccw',
};

/**
 * Convert Font Awesome <i> tags and kramdown FA patterns to <Icon> components.
 * Handles: <i class="fa fa-xxx" aria-hidden="true"></i>
 *          [](){: .fa .fa-xxx style="..."}
 *          [](){:.fa .fa-xxx}
 */
function convertFaToIcon(content) {
  return outsideCodeFences(content, (text) => {
    // Convert <i class="fa(s|r|b|l|d)? fa-xxx" ...></i> → <Icon name="xxx" />
    let result = text.replace(
      /<i\s+[^>]*class="([^"]*\bfa[sbrld]?\b[^"]*)"[^>]*><\/i>/gi,
      (match, classes) => {
        const styleClasses = ['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone', 'fa-thin'];
        const allFaClasses = classes.match(/fa-[a-z0-9-]+/g) || [];
        const iconClass = allFaClasses.find((cls) => !styleClasses.includes(cls));
        if (!iconClass) return match;
        const lucideName = FA_TO_LUCIDE[iconClass];
        if (!lucideName) return match;
        return `<Icon name="${lucideName}" />`;
      }
    );

    // Convert <a> tags with FA icon classes:
    // <a href="url" class="fa fa-xxx" target="_blank">text</a> →
    // <a href="url" target="_blank"><Icon name="xxx" /> text</a>
    // <a href="url" class="fa fa-xxx" target="_blank"></a> →
    // <a href="url" target="_blank"><Icon name="xxx" /></a>
    result = result.replace(
      /<a\s+([^>]*)class="([^"]*\bfa[sbrld]?\b[^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi,
      (match, before, classes, after, text) => {
        const styleClasses = ['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone', 'fa-thin'];
        const allFaClasses = classes.match(/fa-[a-z0-9-]+/g) || [];
        const iconClass = allFaClasses.find((cls) => !styleClasses.includes(cls));
        if (!iconClass) return match;
        const lucideName = FA_TO_LUCIDE[iconClass];
        if (!lucideName) return match;
        // Remove FA classes from the class attribute; if no classes remain, drop the attr
        const remainingClasses = classes
          .split(/\s+/)
          .filter((c) => !c.match(/^fa[sbrld]?$/) && !c.match(/^fa-/))
          .join(' ');
        const classAttr = remainingClasses ? ` class="${remainingClasses}"` : '';
        const icon = `<Icon name="${lucideName}" />`;
        const content = text.trim() ? `${icon} ${text.trim()}` : icon;
        return `<a ${before.trim()}${classAttr}${after}>${content}</a>`;
      }
    );

    // Convert kramdown: [](){: .fa .fa-xxx style="..."} → <Icon name="xxx" />
    // Also handles [](){:.fa .fa-xxx} (no space after colon)
    result = result.replace(
      /\[\]\(\)\{:?\s*\.fa[sbrld]?\s+\.(fa-[a-z0-9-]+)(?:\s+style="[^"]*")?\s*\}/g,
      (match, iconClass) => {
        const lucideName = FA_TO_LUCIDE[iconClass];
        if (!lucideName) return match;
        return `<Icon name="${lucideName}" />`;
      }
    );

    return result;
  });
}

/**
 * Convert Font Awesome icon references in frontmatter `icon:` fields to Lucide names.
 * Converts: icon: fas fa-graduation-cap → icon: graduation-cap
 */
function convertFaToIconFrontmatter(fm) {
  return fm.replace(/^(icon:\s*)(?:fa[sbrld]?\s+)(fa-[a-z0-9-]+)\s*$/gm, (_match, prefix, iconClass) => {
    const lucideName = FA_TO_LUCIDE[iconClass];
    if (!lucideName) return _match;
    return `${prefix}${lucideName}`;
  });
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const files = await glob('**/*.md', { cwd: CONTENT_DIR, absolute: true });
  console.log(`Found ${files.length} markdown files in ${CONTENT_DIR}`);

  let totalChanged = 0;
  const changedFiles = [];

  for (const filePath of files) {
    const original = await fs.promises.readFile(filePath, 'utf-8');
    const parts = splitFile(original);
    if (!parts) continue;

    let { frontmatter: fm, body } = parts;
    let changed = false;

    // Frontmatter transforms (skip for files without frontmatter)
    if (fm !== null) {
      if (transforms.stripLayout) {
        const newFm = stripLayout(fm);
        if (newFm !== fm) {
          fm = newFm;
          changed = true;
        }
      }
      if (transforms.normalizeFrontmatterArrays) {
        const newFm = normalizeFrontmatterArrays(fm);
        if (newFm !== fm) {
          fm = newFm;
          changed = true;
        }
      }
    }

    // Body transforms
    if (transforms.stripVueArtifacts) {
      const newBody = stripVueArtifacts(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.convertGridsomeSyntax) {
      const newBody = convertGridsomeSyntax(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.convertKramdown) {
      const newBody = convertKramdownAttributes(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.fixVoidElements) {
      const newBody = fixVoidElements(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.fixUnquotedAttrs) {
      const newBody = fixUnquotedAttributes(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.fixAutolinks) {
      const newBody = fixAutolinks(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.fixComponentCase) {
      const newBody = fixComponentCase(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }
    if (transforms.convertFaToIcon) {
      const newBody = convertFaToIcon(body);
      if (newBody !== body) {
        body = newBody;
        changed = true;
      }
    }

    // Frontmatter FA icon conversion
    if (fm !== null && transforms.convertFaToIcon) {
      const newFm = convertFaToIconFrontmatter(fm);
      if (newFm !== fm) {
        fm = newFm;
        changed = true;
      }
    }

    if (changed) {
      totalChanged++;
      const rel = path.relative(CONTENT_DIR, filePath);
      changedFiles.push(rel);
      if (!dryRun) {
        await fs.promises.writeFile(filePath, parts.rebuild(fm, body), 'utf-8');
      }
    }
  }

  if (totalChanged === 0) {
    console.log('No files needed changes.');
  } else {
    const verb = dryRun ? 'would change' : 'changed';
    console.log(`\n${totalChanged} file(s) ${verb}:`);
    for (const f of changedFiles) {
      console.log(`  ${f}`);
    }
  }

  if (dryRun && totalChanged > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
