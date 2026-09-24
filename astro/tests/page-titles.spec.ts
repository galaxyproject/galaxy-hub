import { test, expect } from '@playwright/test';

test.describe('Page titles', () => {
  test('untitled page takes its title from its leading heading', async ({ page }) => {
    await page.goto('/people/anton/');
    await expect(page).toHaveTitle('Anton Nekrutenko | Galaxy Hub');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Anton Nekrutenko');
  });

  test('untitled page without a leading heading takes its title from the slug', async ({ page }) => {
    await page.goto('/cloudman/services/');
    await expect(page).toHaveTitle('Services | Galaxy Hub');
    await expect(page.locator('h1')).toHaveText('Services');
  });

  test('subsite did-you-know page has a document title', async ({ page }) => {
    await page.goto('/ifb/did-you-know/');
    await expect(page).toHaveTitle('ELIXIR-FR/IFB — Did You Know | Galaxy Hub');
  });
});
