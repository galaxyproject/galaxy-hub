import { test, expect, type Page } from '@playwright/test';

// Dark theme text contrast (DESIGN.md "Dark mode"). With the system set to dark, every visible
// text node outside the site chrome must reach WCAG AA against its effective background:
// 4.5:1, or 3:1 for large text (24px, or 18.66px bold). Colours are read from computed styles
// and resolved through a canvas, so the check does not depend on fonts or pixels. Text over a
// background image or gradient is skipped (the page grid pattern counts as its colour), and so is
// decorative text hidden from assistive tech; the chrome is covered by the axe scan. A page that
// fails here usually mixes a fixed light colour (bg-white, text-galaxy-dark, text-chicago-*) with
// a colour role.

const pages = [
  '/community/', // ArticleLayout
  '/news/2025-10-15-egd2025/', // news post
  '/news/?year=2020', // NewsList + filters
  '/events/2025-admin-training-brno/', // event page
  '/events/?year=2020', // EventsList
  '/use/', // platform directory
  '/search/?q=galaxy', // search
  '/eu/', // region home
  '/projects/esg/', // project page
  '/galaxy-updates/2018-05/', // legacy migrated page with tables
  '/this-page-does-not-exist/', // 404
];

type Failure = { text: string; ratio: number; fg: string; bg: string; source: string };

async function lowContrastText(page: Page): Promise<Failure[]> {
  return page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const rgba = (color: string): number[] => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const over = (top: number[], bottom: number[]) =>
      [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
    const luminance = (c: number[]) => {
      const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
    };
    const background = (el: Element): number[] | null => {
      const layers: number[][] = [];
      for (let e: Element | null = el; e; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.backgroundImage !== 'none' && !e.classList.contains('bg-grid')) return null;
        const c = rgba(cs.backgroundColor);
        if (c[3] > 0) {
          layers.push(c);
          if (c[3] >= 1) break;
        }
      }
      return layers.reduceRight((bg, layer) => over(layer, bg), [255, 255, 255, 1]);
    };

    const failures: Failure[] = [];
    const seen = new Set<Element>();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      if (!node.textContent?.trim() || !el || seen.has(el)) continue;
      seen.add(el);
      if (
        el.closest(
          'script, style, noscript, svg, .sr-only, [aria-hidden="true"], .site-sidebar, .site-mobile-header, .site-footer'
        )
      )
        continue;
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (rect.width < 2 || rect.height < 2 || cs.visibility !== 'visible' || Number(cs.opacity) === 0) continue;
      const bg = background(el);
      if (!bg) continue;
      const fg = over(rgba(cs.color), bg);
      const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
      const ratio = (hi + 0.05) / (lo + 0.05);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      if (ratio >= (large ? 3 : 4.5)) continue;
      let source: Element = el;
      while (source.parentElement && getComputedStyle(source.parentElement).color === cs.color)
        source = source.parentElement;
      failures.push({
        text: node.textContent.trim().slice(0, 40),
        ratio: Math.round(ratio * 100) / 100,
        fg: fg.slice(0, 3).map(Math.round).join(','),
        bg: bg.slice(0, 3).map(Math.round).join(','),
        source: `${source.tagName.toLowerCase()}.${String(source.getAttribute('class') ?? '').slice(0, 80)}`,
      });
    }
    return failures;
  });
}

test.describe('Dark theme text contrast', () => {
  test.use({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });

  for (const path of pages) {
    test(`${path} has no low-contrast text in dark`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBeNull();
      const failures = await lowContrastText(page);
      expect(
        failures,
        `Low-contrast text on ${path} in dark:\n${JSON.stringify(failures.slice(0, 15), null, 1)}`
      ).toEqual([]);
    });
  }
});
