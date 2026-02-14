import { test, expect } from '@playwright/test';

/**
 * Link/image checker — crawls the sitemap and verifies every <img> src resolves.
 * Gated behind LINK_CHECK=1 so it doesn't run in the normal test suite.
 *
 * Usage:
 *   LINK_CHECK=1 npx playwright test link-check
 *   or via the Makefile:
 *   make astro-link-check
 */

const ENABLED = process.env.LINK_CHECK === '1';

test.describe('Link & image checker', () => {
  test.skip(!ENABLED, 'Set LINK_CHECK=1 to enable');

  test('all images on every sitemap page resolve', async ({ page, baseURL }) => {
    test.setTimeout(600_000);

    // Fetch and parse the sitemap
    const sitemapUrl = `${baseURL}/sitemap-index.xml`;
    const sitemapRes = await page.request.get(sitemapUrl);
    expect(sitemapRes.ok(), `Failed to fetch sitemap index at ${sitemapUrl}`).toBeTruthy();

    const sitemapIndexXml = await sitemapRes.text();
    const sitemapLocs = [...sitemapIndexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    // Collect all page URLs from child sitemaps
    const pageUrls: string[] = [];
    for (const loc of sitemapLocs) {
      const res = await page.request.get(loc);
      if (!res.ok()) continue;
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      pageUrls.push(...urls);
    }

    expect(pageUrls.length).toBeGreaterThan(0);
    console.log(`Checking images on ${pageUrls.length} pages...`);

    const broken: { page: string; src: string; status: number | string }[] = [];

    for (const url of pageUrls) {
      const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      if (!res || !res.ok()) continue;

      const images = await page.locator('img[src]').all();
      for (const img of images) {
        const src = await img.getAttribute('src');
        if (!src) continue;

        // Skip external images and data URIs
        if (src.startsWith('data:')) continue;
        if (src.startsWith('http') && !src.startsWith(baseURL!)) continue;

        const imgUrl = src.startsWith('http') ? src : `${baseURL}${src.startsWith('/') ? '' : '/'}${src}`;
        try {
          const imgRes = await page.request.head(imgUrl);
          if (!imgRes.ok()) {
            broken.push({ page: url, src, status: imgRes.status() });
          }
        } catch (e) {
          broken.push({ page: url, src, status: 'error' });
        }
      }
    }

    if (broken.length > 0) {
      const summary = broken.map((b) => `  ${b.src} (status: ${b.status}) on ${b.page}`).join('\n');
      console.log(`\nBroken images (${broken.length}):\n${summary}`);
    }

    expect(broken, `Found ${broken.length} broken image(s)`).toHaveLength(0);
  });
});
