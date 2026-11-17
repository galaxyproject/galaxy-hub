import { test, expect } from '@playwright/test';

// Project overviews keep "On this page" in view while the text scrolls (desktop rail only).
// Geometry is compared against the viewport, so fonts do not matter.

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

    test('is hidden on a phone, where the page shows the inline facts instead', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await expect(page.getByRole('complementary', { name: 'Project facts and contents' })).toBeHidden();
      await expect(page.getByRole('navigation', { name: 'On this page' })).toBeHidden();
    });
  });
}
