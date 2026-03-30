import { test, expect } from '@playwright/test';

test.describe('Events archive external link indicator', () => {
  test('/events/archive/ shows external icon for archived event with external_url', async ({ page }) => {
    const response = await page.goto('/events/archive/');
    expect(response?.status()).toBe(200);

    const eventLink = page.getByRole('link', { name: /Comment GenAP peut vous aider/i });
    await expect(eventLink).toBeVisible();
    await expect(eventLink.locator('[data-external-icon]')).toBeVisible();
  });
});
