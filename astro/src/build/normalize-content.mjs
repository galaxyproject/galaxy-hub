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
 *   node src/build/normalize-content.mjs --fix-autolinks
 *   node src/build/normalize-content.mjs --fix-component-case
 *   node src/build/normalize-content.mjs --convert-fa-to-icon
 *   node src/build/normalize-content.mjs --sync-components-flag
 *   node src/build/normalize-content.mjs --days-to-end
 *   node src/build/normalize-content.mjs --all
 *   node src/build/normalize-content.mjs --check  (dry-run, exits non-zero if changes needed)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { glob } from 'glob';
import {
  bodyHasComponents,
  convertFaToIcon,
  convertFaToIconFrontmatter,
  convertGridsomeSyntax,
  convertKramdownAttributes,
  fixAutolinks,
  fixComponentCase,
  fixUnquotedAttributes,
  fixVoidElements,
  stripVueArtifacts,
} from './normalize-transforms.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '../../..', 'content');

const isMain = process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href;
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
  syncComponentsFlag: runAll || args.includes('--sync-components-flag'),
  daysToEnd: runAll || args.includes('--days-to-end'),
};

if (isMain && !Object.values(transforms).some(Boolean)) {
  console.error('Usage: node src/build/normalize-content.mjs <transform> [--check]');
  console.error('Transforms: --strip-layout, --normalize-frontmatter-arrays,');
  console.error('  --strip-vue-artifacts, --convert-gridsome-syntax, --convert-kramdown,');
  console.error('  --fix-void-elements, --fix-unquoted-attrs, --fix-autolinks,');
  console.error('  --fix-component-case, --convert-fa-to-icon,');
  console.error('  --sync-components-flag, --days-to-end, --all');
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
 * Normalize scalar tags/subsites to single-element arrays.
 * Operates on raw YAML text to avoid reformatting.
 *
 * Converts:  tags: foo        →  tags: [foo]
 *            tags: "foo bar"  →  tags: ["foo bar"]
 *
 * Leaves alone: tags: [a, b], tags:\n  - a, etc.
 */
function normalizeFrontmatterArrays(fm) {
  const fields = ['tags', 'subsites'];
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

/**
 * Replace an event's `days:` with an `end:` date (its last day); one-day
 * events just lose `days:`. Operates on raw YAML text to avoid reformatting.
 * Leaves the frontmatter alone when there is no full `date:` to count from.
 */
export function daysToEnd(fm) {
  const daysMatch = fm.match(/^days:[ \t]*(\d*)[ \t]*\r?\n/m);
  if (!daysMatch) return fm;
  const days = Number(daysMatch[1]);
  let result = fm.slice(0, daysMatch.index) + fm.slice(daysMatch.index + daysMatch[0].length);
  if (days > 1 && !/^end:/m.test(result)) {
    const dateMatch = result.match(/^date:[ \t]*(['"]?)(\d{4}-\d{2}-\d{2})\1[ \t]*$/m);
    if (!dateMatch) return fm;
    const end = new Date(`${dateMatch[2]}T00:00:00Z`);
    if (isNaN(end.getTime())) return fm;
    end.setUTCDate(end.getUTCDate() + days - 1);
    const quote = dateMatch[1];
    const at = dateMatch.index + dateMatch[0].length;
    result = `${result.slice(0, at)}\nend: ${quote}${end.toISOString().slice(0, 10)}${quote}${result.slice(at)}`;
  }
  return result;
}

// ── Helpers ──────────────────────────────────────────────────────────

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
      if (transforms.daysToEnd && path.relative(CONTENT_DIR, filePath).startsWith('events/')) {
        const newFm = daysToEnd(fm);
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

    // Sync components: true flag with actual component usage
    if (fm !== null && transforms.syncComponentsFlag) {
      const hasFlag = /^components:\s*true\s*$/m.test(fm);
      const hasComps = bodyHasComponents(body);
      if (hasComps && !hasFlag) {
        // Add components: true before the closing ---
        fm = fm + 'components: true\n';
        changed = true;
      } else if (hasFlag && !hasComps) {
        // Remove the components: true line
        const newFm = fm.replace(/^components:\s*true\s*\n/m, '');
        if (newFm !== fm) {
          fm = newFm;
          changed = true;
        }
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

if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
