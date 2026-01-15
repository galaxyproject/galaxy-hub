/**
 * Astro integration to rewrite internal links with the base URL.
 * This transforms href="/path" to href="/astro-preview/path" during build.
 */
import type { AstroIntegration } from 'astro';
import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';

export function baseUrlLinks(): AstroIntegration {
  let base = '/';
  let outDir = '';

  return {
    name: 'base-url-links',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base;
        outDir = config.outDir.pathname;
      },
      'astro:build:done': async () => {
        // Only transform if we have a non-root base
        if (base === '/' || base === '') {
          return;
        }

        // Normalize base to ensure it ends with /
        const normalizedBase = base.endsWith('/') ? base : base + '/';

        // Find all HTML files in the output directory
        const htmlFiles = await glob('**/*.html', { cwd: outDir });

        console.log(`[base-url-links] Rewriting links in ${htmlFiles.length} HTML files with base: ${normalizedBase}`);

        for (const file of htmlFiles) {
          const filePath = join(outDir, file);
          let html = await readFile(filePath, 'utf-8');

          // Rewrite href="/..." to href="${base}/..." for internal links
          // Match href="/" or href="/path" but not href="//" (protocol-relative) or href="http"
          const newHtml = html.replace(
            /href="\/(?!\/|[a-zA-Z]+:)([^"]*)"/g,
            (match, path) => {
              // Don't double-prefix if already has base
              if (path.startsWith(normalizedBase.slice(1))) {
                return match;
              }
              return `href="${normalizedBase}${path}"`;
            }
          );

          if (newHtml !== html) {
            await writeFile(filePath, newHtml, 'utf-8');
          }
        }

        console.log(`[base-url-links] Done rewriting links.`);
      },
    },
  };
}
