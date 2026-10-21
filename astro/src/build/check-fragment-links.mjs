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
 * Emoji headings are the usual trap: "# \u{1F6E0}\uFE0F Tools" slugs to "\uFE0F-tools"
 * (the invisible variation selector survives), so a hand-written TOC link to
 * "#-tools" goes nowhere. The error shows the closest real ids with non-ASCII
 * characters escaped so the difference is visible.
 *
 * Scope and limits:
 *
 * - Pages are the index.md files. Links in the inserts a page pulls in with
 *   <slot name="..."> are checked against that page and reported at the
 *   insert's own file and line.
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
 * A link that cannot be fixed can be acknowledged by adding the bypass key the
 * error prints ("<content-relative path>#<fragment>") to
 * content/.fragment-link-bypass, a JSON array of strings.
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
const BYPASS_FILE = '.fragment-link-bypass';

// Same JSX-comment and slot patterns preprocess.mjs uses
const JSX_COMMENT_RE = /\{\/\*[\s\S]*?\*\/\}/g;
const SLOT_RE = /<slot\s+name=["']([^"']+)["']\s*\/?>/gi;
const HAS_SLOT_RE = /<slot\s+name=/i;
const MAX_INSERT_DEPTH = 2;
const HTML_COMMENT_RE = /<!--[\s\S]*?-->/g;
const HREF_FRAGMENT_RE = /(?<![\w-])href\s*=\s*(?:(["'])#([^"']*)\1|#([^\s"'>]*))/gi;
const TAG_RE = /<([a-zA-Z][\w-]*)\s([^>]*)>/g;
const ATTR_RE = /(?<![\w-])(id|name)="([^"]*)"/g;
// Cheap prefilter: only pages that could hold a same-page link get rendered
const FRAGMENT_HINT_RE = /\]\(\s*<?#|href\s*=\s*["']?#|^\s*\[[^\]]+\]:\s*<?#/im;
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

/** Whether a source file could contain a same-page link (prefilter before rendering). */
export function mayHaveFragmentLinks(raw) {
  return FRAGMENT_HINT_RE.test(raw);
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
        const fragment = match[2] ?? match[3];
        links.push({ line: node.position.start.line + lineOffset, fragment: decodeEntities(fragment) });
      }
    } else if (node.url.startsWith('#')) {
      links.push({ line: node.position.start.line, fragment: node.url.slice(1) });
    }
  });
  return links.sort((a, b) => a.line - b.line);
}

/** Prefix component tag names in HTML/JSX nodes so their props are not read as ids; code is left alone. */
export function markComponentTags(markdown) {
  const ranges = [];
  visit(unified().use(remarkParse).parse(markdown), 'html', (node) => {
    ranges.push([node.position.start.offset, node.position.end.offset]);
  });
  let out = '';
  let last = 0;
  for (const [start, end] of ranges) {
    out +=
      markdown.slice(last, start) + markdown.slice(start, end).replace(COMPONENT_TAG_RE, `<$1${COMPONENT_PREFIX}$2`);
    last = end;
  }
  return out + markdown.slice(last);
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
export async function pageIds(body, frontmatter, contentDir = DEFAULT_CONTENT_DIR, filePath = undefined) {
  let content = body.replace(JSX_COMMENT_RE, '');
  const inlined = inlineInserts(content, 0, contentDir);
  content = shiftHeadings(inlined.content);
  if (frontmatter.components === true || inlined.hasComponents) {
    content = markComponentTags(content);
  }
  if (!/<(div|table|span)[\s>]/i.test(content)) {
    content = await processMarkdown(content, { addToc: frontmatter.autotoc === true, fixLinks: true });
  }
  const fileURL = filePath ? pathToFileURL(filePath) : undefined;
  const { code } = await (await markdownProcessor()).render(content, { fileURL });
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

/** The bypass-file entry for a link, as an ASCII JSON string ready to paste. */
export function bypassKey(rel, fragment) {
  return JSON.stringify(`${rel}#${fragment}`).replace(
    /[\u0080-\uffff]/g,
    (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`
  );
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

/** Same-page links of a source file, with file line numbers. */
function sourceLinks(raw) {
  const { content: body } = matter(raw);
  const offset = bodyLineOffset(raw, body);
  return findFragmentLinks(body)
    .filter(({ fragment }) => !shouldSkipFragment(fragment))
    .map(({ line, fragment }) => ({ line: line + offset, fragment }));
}

/** Insert file for a slot name, resolved like preprocess.mjs (incl. the un-normalized filename fallback). */
function insertPath(slotName, contentDir) {
  const relativePath = slotName.replace(/^\//, '');
  const direct = path.join(contentDir, relativePath + '.md');
  if (fs.existsSync(direct)) return direct;
  const segments = relativePath.split('/');
  const fallback = path.join(contentDir, ...segments.slice(0, -1), segments.at(-1).replace(/-/g, '') + '.md');
  return fs.existsSync(fallback) ? fallback : null;
}

/**
 * Insert files a body pulls in through <slot name="...">. Mirrors preprocess.mjs:
 * every slot is followed on every path until depth MAX_INSERT_DEPTH, so an insert
 * reached deep on one path still has its own slots followed where it is shallow.
 */
function insertSources(body, contentDir, depth = 0, found = new Map()) {
  if (depth > MAX_INSERT_DEPTH) return [...found.values()];
  for (const [, slotName] of body.replace(JSX_COMMENT_RE, '').matchAll(SLOT_RE)) {
    const file = insertPath(slotName, contentDir);
    if (!file) continue;
    if (!found.has(file)) {
      const rel = path.relative(contentDir, file).split(path.sep).join('/');
      found.set(file, { rel, raw: fs.readFileSync(file, 'utf8') });
    }
    insertSources(matter(found.get(file).raw).content, contentDir, depth + 1, found);
  }
  return [...found.values()];
}

function brokenLinks(links, ids, extra) {
  return links
    .filter(({ fragment }) => !ids.has(fragment) && !ids.has(decodeFragment(fragment)))
    .map(({ line, fragment }) => ({ ...extra, line, fragment, closest: closestIds(fragment, [...ids]) }));
}

/**
 * Broken same-page links for a page's raw source, as { rel, line, fragment, closest }.
 * Links that live in an insert carry the insert's rel and line plus `page`.
 */
export async function checkPage(raw, contentDir = DEFAULT_CONTENT_DIR, rel = 'index.md') {
  const { data, content: body } = matter(raw);
  if (data.redirect) return [];
  const inserts = insertSources(body, contentDir).filter((source) => mayHaveFragmentLinks(source.raw));
  const pageLinks = sourceLinks(raw);
  const insertLinks = inserts.map((source) => ({ rel: source.rel, links: sourceLinks(source.raw) }));
  if (pageLinks.length === 0 && insertLinks.every(({ links }) => links.length === 0)) return [];

  const ids = await pageIds(body, data, contentDir, path.join(contentDir, rel));
  return [
    ...brokenLinks(pageLinks, ids, { rel }),
    ...insertLinks.flatMap((insert) => brokenLinks(insert.links, ids, { rel: insert.rel, page: rel })),
  ];
}

/** Broken same-page links for one page file; errors name the page. */
export async function checkFile(rel, contentDir = DEFAULT_CONTENT_DIR) {
  try {
    const raw = fs.readFileSync(path.join(contentDir, rel), 'utf8');
    if (!mayHaveFragmentLinks(raw) && !HAS_SLOT_RE.test(raw)) return [];
    return await checkPage(raw, contentDir, rel);
  } catch (error) {
    throw new Error(`content/${rel}: ${error.message}`, { cause: error });
  }
}

/** Acknowledged links from content/.fragment-link-bypass; a missing file means none. */
export function loadBypass(contentDir = DEFAULT_CONTENT_DIR) {
  const file = path.join(contentDir, BYPASS_FILE);
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return new Set();
    throw error;
  }
  let entries;
  try {
    entries = JSON.parse(text);
  } catch (error) {
    throw new Error(`content/${BYPASS_FILE}: invalid JSON (${error.message})`, { cause: error });
  }
  if (!Array.isArray(entries) || !entries.every((entry) => typeof entry === 'string')) {
    throw new Error(`content/${BYPASS_FILE}: expected a JSON array of strings`);
  }
  return new Set(entries);
}

/** Broken links over the given pages, minus bypassed ones; an insert yields one row per including page. */
export async function collectProblems(pages, contentDir, bypassed) {
  const problems = [];
  const reported = new Set();
  for (const rel of [...pages].sort()) {
    for (const problem of await checkFile(rel, contentDir)) {
      const key = `${problem.rel}#${problem.fragment}`;
      const rowKey = `${key}@${problem.line}@${problem.page ?? ''}`;
      if (bypassed.has(key) || reported.has(rowKey)) continue;
      reported.add(rowKey);
      problems.push(problem);
    }
  }
  return problems;
}

/** Report text and exit code for a list of problems. */
export function formatReport(problems) {
  if (problems.length === 0) {
    return { exitCode: 0, text: 'All same-page fragment links resolve. \u2713' };
  }
  const rows = problems.flatMap(({ rel, page, line, fragment, closest }) => {
    const hint = closest.length
      ? `closest id: ${closest.map((id) => `#${escapeId(id)}`).join(', ')}`
      : 'page has no ids';
    const via = page ? ` on content/${page}` : '';
    return [
      `  content/${rel}:${line}  #${escapeId(fragment)}${via}  (${hint})`,
      `    bypass key: ${bypassKey(rel, fragment)}`,
    ];
  });
  const text = `Found ${problems.length} same-page link(s) with no matching id:

${rows.join('\n')}

Heading ids are github-slugger slugs of the heading text: lowercase, spaces to
"-", punctuation dropped, and duplicates numbered -1, -2. Emoji keep invisible
characters such as \\uFE0F in the id. Point the link at an existing id, or add
an explicit id to the target. To keep a link as is, add its bypass key to
content/${BYPASS_FILE} (a JSON array).`;
  return { exitCode: 1, text };
}

async function main() {
  const flag = process.argv.indexOf('--content');
  const contentDir = flag > -1 ? path.resolve(process.argv[flag + 1]) : DEFAULT_CONTENT_DIR;
  const pages = await glob('**/index.md', {
    cwd: contentDir,
    ignore: ['**/node_modules/**', '0examples/**'],
  });
  const { exitCode, text } = formatReport(await collectProblems(pages, contentDir, loadBypass(contentDir)));
  (exitCode === 0 ? console.log : console.error)(text);
  process.exit(exitCode);
}

if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
