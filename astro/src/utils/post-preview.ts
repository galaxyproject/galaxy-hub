/**
 * Renders a post body for the post creator preview with the build's own steps, so the preview
 * shows what the published page shows:
 *   1. the content:lint transforms (normalize-transforms.mjs), which the form applies to the file;
 *   2. the preprocessor's body steps (preprocess-transforms.mjs);
 *   3. the site's Markdown processor, plugins and settings (markdown-config.mjs) with Astro's defaults.
 * Only components differ: they render in the real build, so the preview shows a note for each.
 * The HTML goes through the `preview` sanitiser profile, which keeps authored HTML but no scripts.
 */
import { markdownConfigDefaults } from '@astrojs/markdown-remark';
import { markdownConfig } from '../build/markdown-config.mjs';
import { KNOWN_COMPONENTS, normalizeBody } from '../build/normalize-transforms.mjs';
import { preprocessBody, processImagePaths } from '../build/preprocess-transforms.mjs';
import { sanitizeHtml } from './safe-html';

type Renderer = { render: (content: string) => Promise<{ code: string }> };
let renderer: Promise<Renderer> | undefined;

// Astro builds the renderer from the resolved `markdown` config: its defaults plus the site's settings
const getRenderer = () =>
  (renderer ??= markdownConfig.processor.createRenderer({
    ...markdownConfigDefaults,
    shikiConfig: markdownConfig.shikiConfig,
  }) as Promise<Renderer>);

const names = KNOWN_COMPONENTS.join('|');
const PAIRED = new RegExp(`<(${names})\\b[^>]*>[\\s\\S]*?</\\1>`, 'g');
const SELF = new RegExp(`<(${names})\\b[^>]*/>`, 'g');

/**
 * Body HTML as the site renders it. `slug` is the page's (e.g. `news/2026-11-06-my-post`), used to
 * rewrite file paths like the build; `files` maps names in the post folder to local URLs.
 */
export async function renderPostBody(
  body: string,
  { slug = 'news/preview', files = {} }: { slug?: string; files?: Record<string, string> } = {}
): Promise<string> {
  const note = (_: string, name: string) => `\n\n*${name}: shown on the published page.*\n\n`;
  const text = normalizeBody(body).replace(PAIRED, note).replace(SELF, note);
  const { content } = await preprocessBody(text, {
    processImagePaths: (content: string) => processImagePaths(content, slug),
  });
  const { code } = await (await getRenderer()).render(content);
  let html = sanitizeHtml(code, 'preview');
  // The published page serves the post's files from /images/<slug>/; the preview shows local copies
  for (const [name, url] of Object.entries(files)) html = html.replaceAll(`"/images/${slug}/${name}"`, `"${url}"`);
  return html;
}
