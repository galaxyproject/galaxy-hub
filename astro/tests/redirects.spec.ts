import { test, expect } from '@playwright/test';

test.describe('External URL redirects', () => {
  test('news item with external_url redirects to target', async ({ page }) => {
    const response = await page.goto('/news/2024-12-19-community_page/');
    expect(response?.status()).toBe(200);

    await expect(page).toHaveURL(
      'https://training.galaxyproject.org/training-material/news/2024/12/19/community_page.html'
    );
  });
});
