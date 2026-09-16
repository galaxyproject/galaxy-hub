import { test, expect } from '@playwright/test';

test.describe('External URL redirects', () => {
  test('news item with external_url redirects to target', async ({ page }) => {
    // waitUntil: 'commit' so we only verify the redirect lands -- the default
    // 'load' waits for the external GTN target to fully load, which flakes in CI.
    const response = await page.goto('/news/2024-12-19-community_page/', { waitUntil: 'commit' });
    expect(response?.status()).toBe(200);

    await expect(page).toHaveURL(
      'https://training.galaxyproject.org/training-material/news/2024/12/19/community_page.html'
    );
  });
});
