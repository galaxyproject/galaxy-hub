import { test, expect, type Page } from '@playwright/test';

// Astro's ClientRouter keeps its navigation index in history.state
const historyIndex = (page: Page) => page.evaluate(() => window.history.state?.index);

test.describe('Filter URL sync keeps router history state and hash', () => {
  test('search query', async ({ page }) => {
    await page.goto('/search/#keep-me');
    const input = page.getByPlaceholder('Search articles, events, platforms...');
    await expect(input).toBeVisible();
    const before = await historyIndex(page);
    expect(typeof before).toBe('number');

    await input.fill('galaxy');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy#keep-me$/);
    expect(await historyIndex(page)).toBe(before);
  });

  test('news year', async ({ page }) => {
    await page.goto('/news/#keep-me');
    const before = await historyIndex(page);
    expect(typeof before).toBe('number');

    await page.getByRole('button', { name: /^\d{4}/ }).first().click();
    await expect(page).toHaveURL(/\/news\/\?year=\d{4}#keep-me$/);
    expect(await historyIndex(page)).toBe(before);
  });

  test('events past year', async ({ page }) => {
    await page.goto('/events/#keep-me');
    const before = await historyIndex(page);
    expect(typeof before).toBe('number');

    await page
      .locator('section:has-text("Past Events") button', { hasText: /^\s*\d{4}/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/events\/\?year=\d{4}#keep-me$/);
    expect(await historyIndex(page)).toBe(before);
  });
});
