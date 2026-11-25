import { test, expect } from '@playwright/test';

// Project overviews keep "On this page" in view while the text scrolls (desktop rail, lg and up);
// below lg the same list is a collapsible block above the sections.
// Geometry is compared against the viewport and between boxes, so fonts do not matter.

const PROJECTS = ['/projects/esg/', '/projects/esg4stars/'];

for (const path of PROJECTS) {
  test.describe(`Sticky "On this page" on ${path}`, () => {
    for (const width of [1024, 1440]) {
      test(`stays at the top of the window while the page scrolls at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const rail = page.getByRole('complementary', { name: 'Project facts and contents' });
        const toc = rail.getByRole('navigation', { name: 'On this page' });
        await expect(toc).toBeVisible();
        await expect(page.locator('details.toc-mobile')).toHaveCount(1);
        await expect(page.locator('details.toc-mobile')).toBeHidden();
        const before = (await toc.boundingBox())!;

        const maxScroll = await page.evaluate(
          () => document.documentElement.scrollHeight - document.documentElement.clientHeight
        );
        expect(maxScroll, 'the page is long enough to scroll well past the rail top').toBeGreaterThan(before.y + 900);
        await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), before.y + 600);

        // The facts box above it has scrolled away; the rail has followed the window.
        const facts = (await rail.locator('.project-facts--rail').boundingBox())!;
        expect(facts.y + facts.height, 'facts box scrolled out of view').toBeLessThan(0);
        const after = (await toc.boundingBox())!;
        expect(after.y, 'rail top is on screen').toBeGreaterThanOrEqual(0);
        expect(after.y, 'rail top is near the top of the window').toBeLessThan(120);
        await expect(toc.getByRole('link').first()).toBeInViewport();
      });
    }

    test('the rail is hidden on a phone; a collapsible "On this page" block takes its place', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      // Counted first: a role query on a hidden element matches nothing, which would pass toBeHidden by itself
      const rail = page.locator('.project-columns__rail');
      await expect(rail).toHaveCount(1);
      await expect(rail).toBeHidden();

      const block = page.locator('details.toc-mobile');
      await expect(block).toBeVisible();
      await expect(block).not.toHaveAttribute('open', '');
      const toc = block.locator('nav.toc');
      await expect(toc).toHaveCount(1);
      await expect(toc).toBeHidden();

      // Keyboard: the summary takes focus and Enter opens it
      await block.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(block).toHaveAttribute('open', '');
      await expect(toc).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'On this page' })).toHaveCount(1);

      const link = toc.locator('a.toc-link').nth(1);
      const target = (await link.getAttribute('href'))!;
      await link.click();
      await expect.poll(() => page.evaluate(() => location.hash)).toBe(target);
      await expect(page.locator(`[id="${target.slice(1)}"]`)).toBeInViewport();
    });

    test('the block sits between the facts and the first section, and stays below lg only', async ({ page }) => {
      await page.setViewportSize({ width: 1023, height: 900 });
      await page.goto(path);
      const block = page.locator('details.toc-mobile');
      await expect(block).toBeVisible();
      const facts = (await page.locator('.project-columns__lead').boundingBox())!;
      const box = (await block.boundingBox())!;
      const main = (await page.locator('.project-columns__main').boundingBox())!;
      expect(box.y, 'below the lead').toBeGreaterThanOrEqual(facts.y + facts.height - 1);
      expect(box.y + box.height, 'above the main sections').toBeLessThanOrEqual(main.y + 1);

      await page.setViewportSize({ width: 1024, height: 900 });
      await expect(block).toHaveCount(1);
      await expect(block).toBeHidden();
      await expect(page.locator('.project-columns__rail nav.toc')).toBeVisible();
    });
  });
}
