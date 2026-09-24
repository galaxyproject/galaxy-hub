import { test, expect } from '@playwright/test';

test.describe('Subsite home inserts', () => {
  for (const site of ['eu', 'freiburg', 'genouest']) {
    test(`/${site}/ renders the shared Galaxy intro`, async ({ page }) => {
      await page.goto(`/${site}/`);

      await expect(page.locator('.subsite-inserts #galaxy-europe-intro')).toBeVisible();
      await expect(page.locator('.subsite-inserts euintro')).toHaveCount(0);
    });
  }

  test('/freiburg/ renders the training insert', async ({ page }) => {
    await page.goto('/freiburg/');

    await expect(page.locator('.subsite-inserts a[href="https://training.galaxyproject.org"]')).toBeVisible();
  });

  for (const width of [1024, 1440]) {
    test(`/freiburg/ training screenshot stays above Upcoming Events at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/freiburg/');

      const image = page.locator('.subsite-inserts img[src*="training-home"]');
      await expect(image).toBeVisible();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
        .toBe(true);

      const imageBox = await image.boundingBox();
      const headingBox = await page.getByRole('heading', { name: 'Upcoming Events' }).boundingBox();
      expect(imageBox).not.toBeNull();
      expect(headingBox).not.toBeNull();
      expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(headingBox!.y);
    });
  }
});
