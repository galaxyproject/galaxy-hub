/**
 * Stands in for the `shiki` package in the browser build only (see the plugin in astro.config.mjs).
 * Astro's highlighter (@astrojs/internal-helpers/shiki) imports createHighlighter from `shiki`,
 * which references every grammar it ships (about 240 files). The post creator preview, the only
 * browser user, needs the languages hub posts use. The site build keeps the full `shiki`.
 * Code in other languages shows as plain text in the preview; the published page highlights it.
 */
import { createBundledHighlighter, createCssVariablesTheme, isSpecialLang } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

// Languages used more than once in content/ code blocks, plus R, SQL, diff and CSS, with aliases.
// Big grammars used once or never (GraphQL, TypeScript, Vue, ...) are left out to keep the download small.
const grammars = {
  css: () => import('@shikijs/langs/css'),
  diff: () => import('@shikijs/langs/diff'),
  html: () => import('@shikijs/langs/html'),
  ini: () => import('@shikijs/langs/ini'),
  javascript: () => import('@shikijs/langs/javascript'),
  json: () => import('@shikijs/langs/json'),
  markdown: () => import('@shikijs/langs/markdown'),
  nginx: () => import('@shikijs/langs/nginx'),
  python: () => import('@shikijs/langs/python'),
  r: () => import('@shikijs/langs/r'),
  shellscript: () => import('@shikijs/langs/shellscript'),
  shellsession: () => import('@shikijs/langs/shellsession'),
  sql: () => import('@shikijs/langs/sql'),
  toml: () => import('@shikijs/langs/toml'),
  xml: () => import('@shikijs/langs/xml'),
  yaml: () => import('@shikijs/langs/yaml'),
  apache: () => import('@shikijs/langs/apache'),
};
const aliases = {
  bash: 'shellscript',
  console: 'shellsession',
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'shellscript',
  shell: 'shellscript',
  yml: 'yaml',
  zsh: 'shellscript',
};
const langs = {
  ...grammars,
  ...Object.fromEntries(Object.entries(aliases).map(([alias, id]) => [alias, grammars[id]])),
};

// github-dark is Astro's default theme, which the site uses
const themes = { 'github-dark': () => import('@shikijs/themes/github-dark') };

export const createHighlighter = createBundledHighlighter({
  langs,
  themes,
  // Astro passes its own engine (the same Oniguruma one the build uses); this is only the default
  engine: () => createOnigurumaEngine(import('shiki/wasm')),
});
export { createCssVariablesTheme, isSpecialLang };
