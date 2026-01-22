import { test, expect } from '@playwright/test';

const supporterSlug = 'eurosciencegateway'; // present in supporters frontmatter

test.describe('Hall of Fame', () => {
  test('/hall-of-fame/ lists contributors', async ({ page }) => {
    const response = await page.goto('/hall-of-fame/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: /hall of fame/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /authors/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /supporters/i })).toBeVisible();

    const authors = page.locator('[data-kind="author"]');
    const supporters = page.locator('[data-kind="supporter"]');
    await expect(authors.first()).toBeVisible();
    await expect(supporters.first()).toBeVisible();
    expect(await authors.count()).toBeGreaterThan(0);
    expect(await supporters.count()).toBeGreaterThan(0);
  });

  test(`/hall-of-fame/${supporterSlug} renders contributions`, async ({ page }) => {
    const response = await page.goto(`/hall-of-fame/${supporterSlug}/`);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /news/i })).toBeVisible();

    const items = page.locator('[data-item]');
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThan(0);
  });
});
