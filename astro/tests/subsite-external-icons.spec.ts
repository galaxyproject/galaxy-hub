import { test, expect } from '@playwright/test';

test.describe('Subsite external link indicators', () => {
  test('/eu/news/ shows external icon for news with external_url', async ({ page }) => {
    const response = await page.goto('/eu/news/?year=2025');
    expect(response?.status()).toBe(200);

    const icons = page.locator('[data-external-icon]');
    await expect(icons.first()).toBeVisible();
  });

  test('/eu/events/ shows external icon for events with external_url', async ({ page }) => {
    const response = await page.goto('/eu/events/');
    expect(response?.status()).toBe(200);

    const event = page.getByRole('link', { name: /ecoCompute conference 2025/i });
    await expect(event).toBeVisible();
    await expect(event.locator('[data-external-icon]')).toBeVisible();
  });
});
