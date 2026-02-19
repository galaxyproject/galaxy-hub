import { test, expect } from '@playwright/test';

test.describe('Subsite citations', () => {
  test('eu citations render entries', async ({ page }) => {
    const response = await page.goto('/eu/citations/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: /citations/i })).toBeVisible();
    const cards = page.locator('article');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('year filter narrows visible citations', async ({ page }) => {
    await page.goto('/eu/citations/');
    const yearButton = page.locator('[data-year-button]').nth(1); // first actual year after "All"
    const year = await yearButton.getAttribute('data-year');

    expect(year).toBeTruthy();
    await yearButton.click();

    const visibleYears = await page.$$eval('article', (els) =>
      els.filter((el) => !el.classList.contains('hidden')).map((el) => el.getAttribute('data-citation-year'))
    );
    expect(new Set(visibleYears)).toEqual(new Set([year]));
  });

  test('us citations show hint when missing', async ({ page }) => {
    const response = await page.goto('/us/citations/');
    expect(response?.status()).toBe(200);

    await expect(page.getByText(/No citations found for us/i)).toBeVisible();
  });
});
