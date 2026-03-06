import { test, expect } from '@playwright/test';

test.describe('Event organiser rendering', () => {
  test('event page shows organisers from contributions.organisers', async ({ page }) => {
    const response = await page.goto('/events/2025-admin-training-brno/');
    expect(response?.status()).toBe(200);

    // Page header should list organiser and link to hall of fame
    const authorLink = page.locator('header.page-header a[href^="/hall-of-fame/martenson/"]');
    await expect(authorLink).toBeVisible();
  });
});
