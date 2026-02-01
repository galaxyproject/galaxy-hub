import { test, expect } from '@playwright/test';

test.describe('Event authorship rendering', () => {
  test('event page shows authorship from contributions.authorship', async ({ page }) => {
    const response = await page.goto('/events/2025-admin-training-brno/');
    expect(response?.status()).toBe(200);

    // Page header should list author and link to hall of fame
    const authorLink = page.locator('header.page-header a[href^="/hall-of-fame/martenson/"]');
    await expect(authorLink).toBeVisible();
  });
});
