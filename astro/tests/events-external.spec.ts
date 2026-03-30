import { test, expect } from '@playwright/test';

test.describe('Events external link indicator', () => {
  test('/events/ shows external icon for events with external_url', async ({ page }) => {
    const response = await page.goto('/events/');
    expect(response?.status()).toBe(200);

    const card = page.getByRole('link', { name: /LOVE DATA week with intro to Galaxy & GTN/i });
    await expect(card).toBeVisible();
    await expect(card.locator('[data-external-icon]')).toBeVisible();
  });
});
