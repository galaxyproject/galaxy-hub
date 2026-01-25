import { test, expect } from '@playwright/test';

test.describe('External URL redirects', () => {
  test('news item with external_url redirects to target', async ({ page }) => {
    const response = await page.goto('/news/2024-12-19-community-page/');
    expect(response?.status()).toBe(200);

    await expect(page).toHaveURL(
      'https://training.galaxyproject.org/training-material/news/2024/12/19/community_page.html'
    );
  });
});

test.describe('Frontmatter redirects', () => {
  test('redirect page shows countdown and can be cancelled', async ({ page }) => {
    await page.goto('/news/25-05-19-dh-lab/');

    await expect(page.getByTestId('redirect-message')).toContainText('/news/2025-05-19-dh-lab/');
    const countdown = page.getByTestId('redirect-countdown');
    const startingValue = Number((await countdown.textContent()) || '0');
    expect(startingValue).toBeGreaterThan(0);
    expect(startingValue).toBeLessThanOrEqual(5);

    await page.waitForTimeout(1200);
    const currentCount = Number((await countdown.textContent()) || '0');
    expect(currentCount).toBeLessThanOrEqual(startingValue);

    await page.getByRole('button', { name: /cancel redirect/i }).click();
    await page.waitForTimeout(5200);
    await expect(page).toHaveURL(/\/news\/25-05-19-dh-lab\/?$/);
  });

  test('news redirect sends visitors to the updated article', async ({ page }) => {
    await page.goto('/news/2023-01-03-nfd-i4-bioimage/');

    await page.getByTestId('redirect-proceed').click();
    await page.waitForURL(/\/news\/2023-01-03-nfdi-?4-bioimage\/?$/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /NFDI4Bioimage/i }).first()).toBeVisible();
  });

  test('redirect-only entries stay out of listings', async ({ page }) => {
    await page.goto('/news/');
    await expect(page.locator('a[href="/news/25-05-19-dh-lab/"]')).toHaveCount(0);
    await expect(page.locator('a[href="/news/2023-01-03-nfd-i4-bioimage/"]')).toHaveCount(0);

    await page.goto('/events/');
    await expect(page.locator('a[href="/events/2024-01-12-pa-g31/"]')).toHaveCount(0);
  });
});
