import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const LINK_CHECK_ENABLED = process.env.LINK_CHECK === '1';
const MAX_PAGES = Number(process.env.LINK_CHECK_MAX || '0'); // 0 = no limit
const IMAGE_CHECK_LIMIT = Number(process.env.LINK_CHECK_IMG_MAX || '200'); // cap per page to keep runs reasonable
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const DEFAULT_TIMEOUT = Number(process.env.LINK_CHECK_TIMEOUT || '120000');

async function fetchXml(request, target) {
  const res = await request.get(target);
  if (!res.ok()) return null;
  return res.text();
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

function remapToBase(urlString, baseURL) {
  if (!baseURL) return urlString;
  try {
    const target = new URL(urlString);
    const base = new URL(baseURL);
    target.protocol = base.protocol;
    target.host = base.host;
    return target.toString();
  } catch {
    return urlString;
  }
}

async function collectUrlsFromSitemaps(request, baseURL) {
  const urls = new Set();

  let indexXml =
    (await fetchXml(request, remapToBase('/sitemap-index.xml', baseURL))) ??
    (await fetchXml(request, remapToBase('/sitemap.xml', baseURL)));
  if (!indexXml) {
    // Fallback to disk for preview runs where sitemap may not be served
    const diskIndex = path.join(DIST_DIR, 'sitemap-index.xml');
    const diskSingle = path.join(DIST_DIR, 'sitemap.xml');
    if (fs.existsSync(diskIndex)) {
      indexXml = fs.readFileSync(diskIndex, 'utf-8');
    } else if (fs.existsSync(diskSingle)) {
      indexXml = fs.readFileSync(diskSingle, 'utf-8');
    } else {
      return [];
    }
  }

  const firstLocs = extractLocs(indexXml);
  const queue = [...firstLocs];

  while (queue.length) {
    const loc = queue.shift();
    if (loc.endsWith('.xml')) {
      const mapped = remapToBase(loc, baseURL);
      let xml = await fetchXml(request, mapped);
      if (!xml) {
        const diskPath = path.join(DIST_DIR, path.basename(loc));
        if (fs.existsSync(diskPath)) {
          xml = fs.readFileSync(diskPath, 'utf-8');
        }
      }
      if (!xml) continue;
      extractLocs(xml).forEach((u) => queue.push(u));
    } else {
      urls.add(remapToBase(loc, baseURL));
    }
  }

  return Array.from(urls);
}

test.describe('Link & image check (@linkcheck)', () => {
  test.skip(!LINK_CHECK_ENABLED, 'Set LINK_CHECK=1 to enable link check');
  test.setTimeout(DEFAULT_TIMEOUT);

  test('all sitemap pages return OK and images resolve', async ({ page, request, baseURL }) => {
    const sitemapUrls = await collectUrlsFromSitemaps(request, baseURL);
    if (sitemapUrls.length === 0) {
      test.skip('Sitemap not available on this server');
    }

    const urls = MAX_PAGES > 0 ? sitemapUrls.slice(0, MAX_PAGES) : sitemapUrls;
    const errors = [];

    for (const url of urls) {
      const res = await request.get(url);
      const status = res.status();

      if (status >= 400) {
        errors.push(`PAGE ${status}: ${url}`);
        continue;
      }

      // For redirects, don't try to load images on the intermediate page
      if (status >= 300 && status < 400) {
        continue;
      }

      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const imgSrcs = await page.$$eval('img', (imgs) => imgs.map((img) => img.getAttribute('src')).filter(Boolean));

      let checked = 0;
      for (const src of imgSrcs) {
        if (IMAGE_CHECK_LIMIT && checked >= IMAGE_CHECK_LIMIT) break;
        if (src.startsWith('data:')) continue;
        if (src.startsWith('http') && !src.includes('localhost')) {
          // Skip external assets; we only assert site-hosted images
          continue;
        }

        // Resolve relative URLs against the current page URL
        const resolved = new URL(src, url).toString();
        const imgRes = await request.get(resolved, { maxRedirects: 2 });
        const imgStatus = imgRes.status();
        if (imgStatus >= 400) {
          errors.push(`IMG ${imgStatus}: ${url} -> ${resolved}`);
        }
        checked += 1;
      }
    }

    expect(errors, `Broken pages/images:\n${errors.join('\n')}`).toEqual([]);
  });
});
