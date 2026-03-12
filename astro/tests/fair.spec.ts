import { test, expect } from '@playwright/test';

test.describe('FAIR pages', () => {
  test('/fair/ exposes all four principle cards', async ({ page }) => {
    const response = await page.goto('/fair/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('[data-fair-card="findability"]')).toHaveAttribute('href', '/fair/findability/');
    await expect(page.locator('[data-fair-card="accessibility"]')).toHaveAttribute('href', '/fair/accessibility/');
    await expect(page.locator('[data-fair-card="interoperability"]')).toHaveAttribute('href', '/fair/interoperability/');
    await expect(page.locator('[data-fair-card="reusability"]')).toHaveAttribute('href', '/fair/reusability/');
  });

  test('FAIR subpages expose cross-navigation to the overview and sibling sections', async ({ page }) => {
    const response = await page.goto('/fair/findability/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('link', { name: 'FAIR overview' })).toHaveAttribute('href', '/fair/');
    await expect(page.locator('[data-fair-card="accessibility"]')).toHaveAttribute('href', '/fair/accessibility/');
    await expect(page.locator('[data-fair-card="interoperability"]')).toHaveAttribute('href', '/fair/interoperability/');
    await expect(page.locator('[data-fair-card="reusability"]')).toHaveAttribute('href', '/fair/reusability/');

    await page.locator('[data-fair-card="reusability"]').click();
    await expect(page).toHaveURL('/fair/reusability/');
    await expect(page.getByRole('link', { name: 'FAIR overview' })).toHaveAttribute('href', '/fair/');
    await expect(page.locator('[data-fair-card="findability"]')).toHaveAttribute('href', '/fair/findability/');
  });
});
