import { test, expect } from '@playwright/test';

test.describe('Bare URLs', () => {
  test('underscores in bare URLs are not escaped in the link', async ({ page }) => {
    await page.goto('/toolshed/contributions/2014-12/');
    await expect(page.locator('a[href="https://github.com/galaxy-iuc/tool_shed/"]').first()).toHaveText(
      'https://github.com/galaxy-iuc/tool_shed/'
    );
    await expect(page.locator('a[href*="%5C"]')).toHaveCount(0);
  });
});
