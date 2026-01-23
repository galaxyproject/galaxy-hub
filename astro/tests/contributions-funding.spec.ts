import { test, expect } from '@playwright/test';

test.describe('Contributions funding precedence', () => {
  test('news page prefers funding over supporters and maps grants/orgs', async ({ page }) => {
    await page.goto('/news/2026-01-07-hf-integration/');

    const cards = page.locator('[data-supporter-card]');
    await expect(cards.filter({ hasText: 'NFDI4Bioimage' })).toBeVisible();
    await expect(cards.filter({ hasText: 'University of Freiburg' })).toBeVisible();

    // Original supporters entry "denbi" should be ignored when funding is present
    await expect(cards.filter({ hasText: /de\.?NBI/i })).toHaveCount(0);
  });

  test('hall of fame shows contributor profile details', async ({ page }) => {
    await page.goto('/hall-of-fame/anuprulez/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.chip').first()).toBeVisible();
  });

  test('hall of fame shows GTN link with icon when available', async ({ page }) => {
    await page.goto('/hall-of-fame/bgruening/');
    const gtnLink = page.locator('a[aria-label="GTN Hall of Fame"]');
    await expect(gtnLink).toBeVisible();
    await expect(gtnLink.locator('img')).toBeVisible();
  });
});
