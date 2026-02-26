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
  escapeLtDigits: runAll || args.includes('--escape-lt-digits'),
  fixAutolinks: runAll || args.includes('--fix-autolinks'),
};

if (!Object.values(transforms).some(Boolean)) {
  console.error('Usage: node src/build/normalize-content.mjs <transform> [--check]');
  console.error('Transforms: --strip-layout, --normalize-frontmatter-arrays,');
  console.error('  --strip-vue-artifacts, --convert-gridsome-syntax, --convert-kramdown,');
  console.error('  --fix-void-elements, --fix-unquoted-attrs, --escape-lt-digits,');
  console.error('  --fix-autolinks, --all');
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
 * Covers all 13 HTML void elements.
 */
function fixVoidElements(content) {
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
 * Escape bare < before digits: <10 → &lt;10, <500 → &lt;500
 * MDX misinterprets these as JSX opening tags.
 * Only touches occurrences outside code fences and not inside HTML tags.
 */
function escapeLtDigits(content) {
  return outsideCodeFences(content, (text) => {
    // Match < followed by a digit, but not when preceded by = (<=) which is
    // already a valid HTML entity context, and not inside an HTML tag
    return text.replace(/(?<![<\w/=])(<)(\d)/g, '&lt;$2');
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
    if (transforms.escapeLtDigits) {
      const newBody = escapeLtDigits(body);
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
