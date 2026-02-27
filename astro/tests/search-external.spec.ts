import { test, expect } from '@playwright/test';

test.describe('Search external event indicator', () => {
  test('search results show external icon for events with external_url', async ({ page }) => {
    const response = await page.goto('/search/?q=GenAP');
    expect(response?.status()).toBe(200);

    const result = page.getByRole('link', { name: /Comment GenAP peut vous aider/i });
    await expect(result).toBeVisible();
    await expect(result.locator('[data-external-icon]')).toBeVisible();
  });

  test('search finds hall-of-fame result by organisation id', async ({ page }) => {
    const response = await page.goto('/search/?q=denbi');
    expect(response?.status()).toBe(200);

    const hallOfFameResult = page.locator('article a[href="/hall-of-fame/denbi/"]').first();
    await expect(hallOfFameResult).toBeVisible();
  });
});
