import { test, expect } from '@playwright/test';

test.describe('Multi-day events', () => {
  test('tag pages show event date ranges', async ({ page }) => {
    // Jun 23 - 26, 2025, tags: [conference]
    await page.goto('/tags/conference/');

    await expect(page.locator('a[href="/events/2025-06-23-gbcc2025/"] time')).toHaveText('Jun 23 - 26, 2025');
  });
});
