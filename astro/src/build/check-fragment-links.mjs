#!/usr/bin/env node
/**
 * Checks that same-page links in content pages point at an id that exists on
 * the rendered page: `[text](#frag)`, `[ref]: #frag` and `href="#frag"` in
 * inline HTML.
 *
 * Ids are computed the way the site computes them, not guessed:
 *
 * - The page body goes through the same pre-steps as preprocess.mjs
 *   (JSX comments stripped, <slot name="..."> inserts inlined, headings
 *   shifted, autotoc heading added).
 * - It is then rendered with Astro's markdown processor and rehype-slug, the
 *   pipeline astro.config.mjs uses, so heading ids come from github-slugger
 *   with smartypants applied, duplicate headings numbered (-1, -2, ...) and
 *   the slugger reset per page.
 * - Explicit `id="..."` on any element and `name="..."` on <a> in inline HTML
 *   count as ids too.
 *
 * Emoji headings are the usual trap: "# 🛠️ Tools" slugs to "️-tools"
 * (the invisible variation selector survives), so a hand-written TOC link to
 * "#-tools" goes nowhere. The error shows the closest real ids with non-ASCII
 * characters escaped so the difference is visible.
 *
 * Scope and limits:
 *
 * - Only page files (index.md) are checked. Other .md files are inserts; their
 *   links are rendered inside each parent page and none currently contain
 *   fragment links.
 * - Pages with `components: true` render as MDX. They are rendered with the
 *   markdown pipeline here; heading text slugs the same way because
 *   rehype-slug ignores raw HTML and JSX in headings. Props on component tags
 *   are not ids, and ids a component renders itself are not seen: a link to
 *   one needs a bypass entry.
 * - Pages with a `redirect:` field are skipped; the site serves a redirect
 *   stub instead of the page.
 * - Fragments that are empty, "top", or contain "=" or "/" are skipped: they
 *   are page-top links or client-side state, not element ids.
 *
 * A link that cannot be fixed can be acknowledged by adding
 * "<content-relative path>#<fragment>" to content/.fragment-link-bypass
 * (a JSON array).
 *
 * Usage:
 *   node src/build/check-fragment-links.mjs
 *   node src/build/check-fragment-links.mjs --content <content dir>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import rehypeSlug from 'rehype-slug';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { inlineInserts, shiftHeadings } from './preprocess.mjs';
import { processMarkdown } from './markdown-processor.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CONTENT_DIR = path.resolve(__dirname, '../../..', 'content');

// Same JSX-comment pattern preprocess.mjs strips before rendering
const JSX_COMMENT_RE = /\{\/\*[\s\S]*?\*\/\}/g;
const HTML_COMMENT_RE = /<!--[\s\S]*?-->/g;
const HREF_FRAGMENT_RE = /\bhref\s*=\s*(["'])#([^"']*)\1/gi;
const TAG_RE = /<([a-zA-Z][\w-]*)\s([^>]*)>/g;
const ATTR_RE = /\b(id|name)="([^"]*)"/g;
// Cheap prefilter: only pages that could hold a same-page link get rendered
const FRAGMENT_HINT_RE = /\]\(\s*<?#|href\s*=\s*["']#|^\s*\[[^\]]+\]:\s*<?#/m;
const INVISIBLE_RE = /[\p{M}\p{Cf}\p{Default_Ignorable_Code_Point}]/gu;
// MDX component tags (<HarnessGuide id="...">) take props, not DOM attributes
const COMPONENT_TAG_RE = /<(\/?)([A-Z][\w.]*)/g;
const COMPONENT_PREFIX = 'x-component-';

let processorPromise;

function markdownProcessor() {
  processorPromise ??= createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [rehypeSlug] });
  return processorPromise;
}

/** Replace every non-newline character of each match with a space, keeping offsets and line numbers. */
function blank(text, re) {
  return text.replace(re, (match) => match.replace(/[^\n]/g, ' '));
}

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** Same-page links in a markdown body, as { line, fragment } with 1-based body lines. */
export function findFragmentLinks(body) {
  const tree = unified().use(remarkParse).parse(blank(body, JSX_COMMENT_RE));
  const links = [];
  visit(tree, ['link', 'definition', 'html'], (node) => {
    if (node.type === 'html') {
      const html = blank(node.value, HTML_COMMENT_RE);
      for (const match of html.matchAll(HREF_FRAGMENT_RE)) {
        const lineOffset = html.slice(0, match.index).split('\n').length - 1;
        links.push({ line: node.position.start.line + lineOffset, fragment: decodeEntities(match[2]) });
      }
    } else if (node.url.startsWith('#')) {
      links.push({ line: node.position.start.line, fragment: node.url.slice(1) });
    }
  });
  return links.sort((a, b) => a.line - b.line);
}

/** Ids a fragment can target in rendered HTML: id on any element, name on <a>. */
export function idsFromHtml(html) {
  const ids = new Set();
  for (const [, tag, attrs] of html.matchAll(TAG_RE)) {
    if (tag.startsWith(COMPONENT_PREFIX)) continue;
    for (const [, attr, value] of attrs.matchAll(ATTR_RE)) {
      if (attr === 'id' || tag.toLowerCase() === 'a') ids.add(decodeEntities(value));
    }
  }
  return ids;
}

/** Ids on the rendered page for a markdown body, following preprocess.mjs and astro.config.mjs. */
export async function pageIds(body, frontmatter, contentDir = DEFAULT_CONTENT_DIR) {
  let content = body.replace(JSX_COMMENT_RE, '');
  const inlined = inlineInserts(content, 0, contentDir);
  content = shiftHeadings(inlined.content);
  if (frontmatter.components === true || inlined.hasComponents) {
    content = content.replace(COMPONENT_TAG_RE, `<$1${COMPONENT_PREFIX}$2`);
  }
  if (!/<(div|table|span)[\s>]/i.test(content)) {
    content = await processMarkdown(content, { addToc: frontmatter.autotoc === true, fixLinks: true });
  }
  const { code } = await (await markdownProcessor()).render(content);
  return idsFromHtml(code);
}

export function shouldSkipFragment(fragment) {
  return fragment === '' || fragment === 'top' || fragment.includes('=') || fragment.includes('/');
}

/** Show non-ASCII code points as escapes so invisible characters are visible. */
export function escapeId(id) {
  return [...id]
    .map((ch) => {
      const cp = ch.codePointAt(0);
      if (cp < 0x80) return ch;
      const hex = cp.toString(16).toUpperCase();
      return cp > 0xffff ? `\\u{${hex}}` : `\\u${hex.padStart(4, '0')}`;
    })
    .join('');
}

function editDistance(a, b) {
  const x = [...a];
  const y = [...b];
  let prev = Array.from({ length: y.length + 1 }, (_, j) => j);
  for (let i = 1; i <= x.length; i++) {
    const cur = [i];
    for (let j = 1; j <= y.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[y.length];
}

/** Ids equal to the fragment once invisible characters are dropped, else the two nearest by edit distance. */
export function closestIds(fragment, ids) {
  const visible = (s) => s.replace(INVISIBLE_RE, '');
  const target = visible(fragment);
  const invisibleOnly = ids.filter((id) => visible(id) === target);
  if (invisibleOnly.length > 0) return invisibleOnly;
  return ids
    .map((id) => ({ id, distance: editDistance(fragment, id) }))
    .sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id))
    .slice(0, 2)
    .map(({ id }) => id);
}

function decodeFragment(fragment) {
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
}

function bodyLineOffset(raw, body) {
  return raw.endsWith(body) ? raw.slice(0, raw.length - body.length).split('\n').length - 1 : 0;
}

/** Broken same-page links in a page's raw source, as { line, fragment, closest } with file lines. */
export async function checkPage(raw, contentDir = DEFAULT_CONTENT_DIR) {
  const { data, content: body } = matter(raw);
  if (data.redirect) return [];
  const links = findFragmentLinks(body).filter(({ fragment }) => !shouldSkipFragment(fragment));
  if (links.length === 0) return [];
  const ids = await pageIds(body, data, contentDir);
  const offset = bodyLineOffset(raw, body);
  return links
    .filter(({ fragment }) => !ids.has(fragment) && !ids.has(decodeFragment(fragment)))
    .map(({ line, fragment }) => ({ line: line + offset, fragment, closest: closestIds(fragment, [...ids]) }));
}

function loadBypass(contentDir) {
  try {
    return new Set(JSON.parse(fs.readFileSync(path.join(contentDir, '.fragment-link-bypass'), 'utf8')));
  } catch {
    return new Set();
  }
}

async function main() {
  const flag = process.argv.indexOf('--content');
  const contentDir = flag > -1 ? path.resolve(process.argv[flag + 1]) : DEFAULT_CONTENT_DIR;
  const bypassed = loadBypass(contentDir);

  const pages = await glob('**/index.md', {
    cwd: contentDir,
    ignore: ['**/node_modules/**', '0examples/**'],
  });

  const problems = [];
  for (const rel of pages.sort()) {
    const raw = fs.readFileSync(path.join(contentDir, rel), 'utf8');
    if (!FRAGMENT_HINT_RE.test(raw)) continue;
    for (const problem of await checkPage(raw, contentDir)) {
      if (!bypassed.has(`${rel}#${problem.fragment}`)) problems.push({ rel, ...problem });
    }
  }

  if (problems.length === 0) {
    console.log('All same-page fragment links resolve. ✓');
    process.exit(0);
  }

  console.error(`Found ${problems.length} same-page link(s) with no matching id:\n`);
  for (const { rel, line, fragment, closest } of problems) {
    const hint = closest.length
      ? `closest id: ${closest.map((id) => `#${escapeId(id)}`).join(', ')}`
      : 'page has no ids';
    console.error(`  content/${rel}:${line}  #${escapeId(fragment)}  (${hint})`);
  }
  console.error(`
Heading ids are github-slugger slugs of the heading text: lowercase, spaces to
"-", punctuation dropped, and duplicates numbered -1, -2. Emoji keep invisible
characters such as \\uFE0F in the id. Point the link at an existing id, or add
an explicit id to the target. To keep a link as is, add
"<content-relative path>#<fragment>" to content/.fragment-link-bypass.`);
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  main();
}
