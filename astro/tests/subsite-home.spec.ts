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
});
