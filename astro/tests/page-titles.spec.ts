import { test, expect } from '@playwright/test';

test.describe('Page titles', () => {
  test('subsite did-you-know page has a document title', async ({ page }) => {
    await page.goto('/ifb/did-you-know/');
    await expect(page).toHaveTitle('ELIXIR-FR/IFB — Did You Know | Galaxy Hub');
  });
});
