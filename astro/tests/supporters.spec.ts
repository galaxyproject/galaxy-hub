import { test, expect } from '@playwright/test';

test.describe('Supporters rendering', () => {
  test('news article shows supporters', async ({ page }) => {
    const response = await page.goto('/news/2025-10-15-egd2025/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: /supporters/i })).toBeVisible();

    const cards = page.locator('[data-supporter-card]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(cards.filter({ hasText: /elixir/i }).first()).toBeVisible();
  });

  test('event page shows supporters', async ({ page }) => {
    const response = await page.goto('/events/2025-admin-training-brno/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: /supporters/i })).toBeVisible();

    const cards = page.locator('[data-supporter-card]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(cards.filter({ hasText: /cesnet/i }).first()).toBeVisible();
  });
});
