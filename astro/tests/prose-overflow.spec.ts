import { test, expect, type Page } from '@playwright/test';

/** Elements that stick out of the prose column without a scrolling ancestor to contain them. */
async function clippedInProse(page: Page) {
  return page.evaluate(() => {
    const prose = document.querySelector('.prose');
    if (!prose) return ['no .prose'];
    const right = prose.getBoundingClientRect().right;
    const insideScroller = (el: Element) => {
      for (let a = el.parentElement; a && a !== prose; a = a.parentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(a).overflowX)) return true;
      }
      return false;
    };
    return [...prose.querySelectorAll('*')]
      .filter((el) => {
        const box = el.getBoundingClientRect();
        return box.width > 0 && box.right > right + 1 && !insideScroller(el);
      })
      .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 30)}"`);
  });
}

test.describe('Prose overflow at 320px', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
  });

  for (const path of ['/toolshed/contributions/2018-01/', '/fair/reusability/', '/galaxy-updates/2012-02/']) {
    test(`nothing is clipped at the prose edge on ${path}`, async ({ page }) => {
      await page.goto(path);
      expect(await clippedInProse(page)).toEqual([]);
    });
  }

  test('wide tables scroll inside a focusable, labelled region', async ({ page }) => {
    await page.goto('/fair/reusability/');

    const regions = page.locator('.prose .table-wrapper');
    await expect(regions).toHaveCount(2);
    await expect(page.getByRole('region', { name: 'Table 1' })).toHaveAttribute('tabindex', '0');

    const first = regions.first();
    expect(await first.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    await first.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => first.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  });

  test('tables written as raw HTML are wrapped too', async ({ page }) => {
    await page.goto('/galaxy-updates/2012-02/');
    await expect(page.locator('.prose .table-wrapper > table')).toHaveCount(1);
  });
});
