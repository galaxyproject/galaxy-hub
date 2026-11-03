import { test, expect, type Locator, type Page } from '@playwright/test';

// Sticky bars on list pages stick again since the page shells clip instead of hiding
// overflow. Below lg they must clear the fixed mobile header, and anchor jumps must land
// below whatever stays pinned at the top. Geometry only, so fonts do not matter.

/** Bottom edge of what stays fixed at the top of the window: the mobile header, if shown. */
async function headerBottom(page: Page): Promise<number> {
  const box = await page.locator('header.site-mobile-header').boundingBox();
  return box ? box.y + box.height : 0;
}

async function scrollTo(page: Page, top: number) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
}

/** The bar is either scrolled away or fully below the mobile header, never under it. */
async function expectClearOfHeader(page: Page, bar: Locator, label: string) {
  const cover = await headerBottom(page);
  const box = await bar.boundingBox();
  expect(box, `${label} is rendered`).not.toBeNull();
  if (box!.y + box!.height <= 0) return;
  expect(box!.y, `${label} starts below the mobile header`).toBeGreaterThanOrEqual(cover - 1);
}

/** After following the link, its target starts below the header and any pinned bar. */
async function expectAnchorLands(page: Page, link: Locator, bar: Locator) {
  const href = (await link.getAttribute('href'))!;
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  const target = page.locator(href);
  // Let the (possibly smooth) scroll finish: the target's top stops moving.
  let last = NaN;
  await expect
    .poll(async () => {
      const y = (await target.boundingBox())!.y;
      const settled = Math.abs(y - last) < 0.5;
      last = y;
      return settled;
    })
    .toBe(true);
  const top = (await target.boundingBox())!.y;
  let cover = await headerBottom(page);
  const barBox = await bar.boundingBox();
  if (barBox && barBox.y + barBox.height > 0 && barBox.y < top) {
    cover = Math.max(cover, barBox.y + barBox.height);
  }
  expect(top, `${href} lands below the pinned header and bar`).toBeGreaterThanOrEqual(cover - 1);
  expect(top, `${href} is on screen`).toBeLessThan(page.viewportSize()!.height);
}

for (const [width, height] of [
  [390, 844],
  [1440, 900],
]) {
  test.describe(`Sticky bars at ${width}px`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height });
    });

    test('tags: the letter bar never hides under the header, letter links land in view', async ({ page }) => {
      await page.goto('/tags/');
      const bar = page.getByRole('navigation', { name: 'Tags by letter' });
      await scrollTo(page, 2500);
      await expectClearOfHeader(page, bar, 'letter bar');

      await scrollTo(page, 0);
      const links = bar.getByRole('link');
      await expectAnchorLands(page, links.nth(1), bar);
    });

    test('hall of fame: the section bar never hides under the header', async ({ page }) => {
      await page.goto('/hall-of-fame/');
      const bar = page.getByRole('navigation', { name: 'Hall of Fame sections' });
      await scrollTo(page, 1500);
      await expectClearOfHeader(page, bar, 'section bar');
      if (width >= 1024) {
        const box = (await bar.boundingBox())!;
        expect(box.y, 'the bar is pinned at the top').toBeLessThan(1);
      }

      await scrollTo(page, 0);
      await expectAnchorLands(page, bar.getByRole('link', { name: 'Supporters' }), bar);
    });

    test('events archive: the current year heading sticks below the header', async ({ page }) => {
      await page.goto('/events/archive/');
      await scrollTo(page, 3000);
      const cover = await headerBottom(page);
      // The year section that spans the line just below the header owns the pinned heading.
      const pinned = await page.evaluate((line) => {
        const sections = [...document.querySelectorAll('main section')].filter((s) =>
          s.querySelector(':scope > h2')
        );
        const section = sections.find((s) => {
          const r = s.getBoundingClientRect();
          return r.top < line && r.bottom > line + 120;
        });
        if (!section) return null;
        const h = section.querySelector(':scope > h2')!.getBoundingClientRect();
        return { top: h.top, bottom: h.bottom };
      }, cover);
      expect(pinned, 'a year section spans the top of the window').not.toBeNull();
      expect(pinned!.top, 'year heading starts below the mobile header').toBeGreaterThanOrEqual(cover - 1);
      expect(pinned!.top, 'year heading is pinned at the top').toBeLessThan(cover + 2);
    });
  });
}
