import { test, expect } from '@playwright/test';

test.describe('Tags page external event indicator', () => {
  test('/tags/webinar/ shows external icon for tagged event with external_url', async ({ page }) => {
    const response = await page.goto('/tags/webinar/');
    expect(response?.status()).toBe(200);

    const eventLink = page.getByRole('link', { name: /Comment GenAP peut vous aider/i });
    await expect(eventLink).toBeVisible();
    await expect(eventLink.locator('[data-external-icon]')).toBeVisible();
  });
});
