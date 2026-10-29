import { test, expect } from '@playwright/test';

// Events with external_url redirect to that site, so their page never renders: the footer
// keeps only the links that can show (back to events, edit on GitHub).
for (const path of ['/events/2025-admin-training-brno/', '/events/gcc2026/']) {
  test(`event footer on ${path} has back and edit links, no dead website button`, async ({ page }) => {
    await page.goto(path);
    const footer = page.locator('article > footer');
    await expect(footer.getByRole('link', { name: 'Back to Events' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Edit on GitHub' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Visit Event Website/ })).toHaveCount(0);
  });
}
