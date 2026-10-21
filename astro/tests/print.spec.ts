import { test, expect } from '@playwright/test';

/**
 * Print stylesheet regression tests.
 *
 * Background (issue #3544): articles printed with paragraphs truncated
 * mid-sentence and headings reduced to a bare underline. Three causes --
 * nested flex containers fragmenting across printed pages, `overflow: hidden`
 * clipping anything past page one, and a `position: fixed` header that Chrome
 * repeats on every page and paints over the content beneath it.
 *
 * A second class of bug only shows up with "Background graphics" disabled,
 * which is the default in Chrome's print dialog: anything that relies on a
 * dark background for contrast (page header, table headers, code blocks)
 * renders white-on-white and disappears.
 *
 * These tests assert against computed styles under `media: 'print'` rather
 * than pixels, so they stay stable as content changes.
 */

const ARTICLE = '/news/2026-07-06-gcc2026-recap/';
const TABLE_PAGE = '/galaxy-updates/2017-10/';
const CODE_PAGE = '/galaxy-updates/2016-10/';

/** Parsed rgb()/rgba() -> perceived luminance (0 = black, 255 = white). */
function luminance(color: string): number {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return NaN;
  const [r, g, b] = m[1].split(',').map((v) => parseFloat(v));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

test.describe('Print stylesheet', () => {
  test.describe('site chrome is hidden', () => {
    test('navigation, footer and TOC do not print', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      await expect(page.locator('.site-sidebar')).toBeHidden();
      await expect(page.locator('.site-mobile-header')).toBeHidden();
      await expect(page.locator('.site-footer')).toBeHidden();

      // The article itself must still be there.
      await expect(page.locator('article')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('heading anchor links do not print', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      const anchors = page.locator('.heading-anchor');
      if ((await anchors.count()) > 0) {
        await expect(anchors.first()).toBeHidden();
      }
    });
  });

  test.describe('layout is not clipped', () => {
    test('no print container establishes a scroll/clip context', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      // `overflow-x: hidden` computes overflow-y to `auto` per spec, which makes
      // the element a scroll container and drops everything past page one.
      const selectors = ['html', 'body', '.site-shell', '.site-main', '.site-content'];
      for (const selector of selectors) {
        const overflow = await page
          .locator(selector)
          .first()
          .evaluate((el) => {
            const s = getComputedStyle(el);
            return { x: s.overflowX, y: s.overflowY };
          });
        expect(overflow.x, `${selector} overflow-x`).toBe('visible');
        expect(overflow.y, `${selector} overflow-y`).toBe('visible');
      }
    });

    test('flex shells unwind to block flow so content fragments across pages', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      for (const selector of ['.site-shell', '.site-main', '.site-content']) {
        const display = await page
          .locator(selector)
          .first()
          .evaluate((el) => getComputedStyle(el).display);
        expect(display, `${selector} display`).toBe('block');
      }
    });

    test('no element stays fixed or sticky in print', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      // A fixed element is painted onto every printed page, over the content.
      const stuck = await page.evaluate(() =>
        [...document.querySelectorAll('body *')]
          .filter((el) => {
            const s = getComputedStyle(el);
            if (s.display === 'none' || s.visibility === 'hidden') return false;
            return s.position === 'fixed' || s.position === 'sticky';
          })
          .map((el) => `${el.tagName.toLowerCase()}.${el.className}`)
          .slice(0, 10)
      );
      expect(stuck).toEqual([]);
    });
  });

  test.describe('readable without background graphics', () => {
    test('page header text is dark, not white-on-dark', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      const color = await page
        .locator('.page-header h1')
        .first()
        .evaluate((el) => getComputedStyle(el).color);
      expect(luminance(color)).toBeLessThan(100);
    });

    test('table headers are dark text, not white on blue', async ({ page }) => {
      await page.goto(TABLE_PAGE);
      await page.emulateMedia({ media: 'print' });

      const th = page.locator('.prose table th').first();
      await expect(th).toBeVisible();
      const color = await th.evaluate((el) => getComputedStyle(el).color);
      expect(luminance(color)).toBeLessThan(100);
    });

    test('code blocks are dark text and wrap instead of scrolling', async ({ page }) => {
      await page.goto(CODE_PAGE);
      await page.emulateMedia({ media: 'print' });

      const pre = page.locator('.prose pre').first();
      await expect(pre).toBeVisible();
      const style = await pre.evaluate((el) => {
        const s = getComputedStyle(el);
        return { color: s.color, whiteSpace: s.whiteSpace, overflowX: s.overflowX };
      });
      expect(luminance(style.color)).toBeLessThan(100);
      // Long lines scroll on screen; on paper they must wrap or be lost.
      expect(style.whiteSpace).toBe('pre-wrap');
      expect(style.overflowX).toBe('visible');
    });
  });

  test.describe('link URLs', () => {
    test('external links print their target', async ({ page }) => {
      await page.goto(ARTICLE);
      await page.emulateMedia({ media: 'print' });

      const link = page.locator('.prose a[href^="http"]').first();
      const href = await link.getAttribute('href');
      const after = await link.evaluate((el) => getComputedStyle(el, '::after').content);
      expect(after).toContain(href!);
    });

    test('internal links print an absolute URL', async ({ page }) => {
      // Release notes link internally far more than news articles do.
      await page.goto(CODE_PAGE);
      await page.emulateMedia({ media: 'print' });

      // Skip the cases the stylesheet deliberately leaves bare: image links,
      // badge lists and table cells.
      const result = await page.evaluate(() => {
        const links = [...document.querySelectorAll('.prose a[href^="/"]')].filter(
          (el) => !el.querySelector('img') && !el.closest('table') && !el.closest('.tool-list')
        );
        const el = links[0];
        if (!el) return null;
        return { href: el.getAttribute('href'), after: getComputedStyle(el, '::after').content };
      });

      expect(result, 'expected at least one plain internal prose link').not.toBeNull();
      expect(result!.after).toContain(`https://galaxyproject.org${result!.href}`);
    });

    test('in-page anchors and table links stay clean', async ({ page }) => {
      await page.goto(TABLE_PAGE);
      await page.emulateMedia({ media: 'print' });

      // A URL in every cell squeezes columns until real content wraps mid-word.
      const cellLink = page.locator('.prose table a[href^="http"]').first();
      if ((await cellLink.count()) > 0) {
        const after = await cellLink.evaluate((el) => getComputedStyle(el, '::after').content);
        expect(['none', '""', 'normal']).toContain(after);
      }
    });
  });

  test('print media hides chrome without dropping body copy', async ({ page }) => {
    await page.goto(ARTICLE);
    await page.waitForLoadState('networkidle');

    const countParagraphs = () =>
      page.evaluate(
        () =>
          [...document.querySelectorAll('.prose p')].filter((el) => {
            const s = getComputedStyle(el);
            return s.display !== 'none' && s.visibility !== 'hidden' && el.textContent!.trim().length > 0;
          }).length
      );

    const onScreen = await countParagraphs();
    await page.emulateMedia({ media: 'print' });
    const onPaper = await countParagraphs();

    // Hiding navigation is the point; hiding article prose is the regression
    // this guards against.
    expect(onScreen).toBeGreaterThan(0);
    expect(onPaper).toBe(onScreen);
  });

  test('a real PDF render produces multiple pages of content', async ({ page }) => {
    await page.goto(ARTICLE);
    await page.waitForLoadState('networkidle');

    // printBackground:false mirrors the browser dialog default, which is where
    // the original bug was worst.
    const pdf = await page.pdf({ format: 'Letter', printBackground: false });
    expect(pdf.byteLength).toBeGreaterThan(1000);

    // A long article must not collapse to a single clipped page.
    const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    expect(pageCount).toBeGreaterThan(1);
  });
});
