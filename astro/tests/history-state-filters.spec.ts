import { test, expect, type Page } from '@playwright/test';

// Astro's ClientRouter keeps its navigation index in history.state
const historyIndex = (page: Page) => page.evaluate(() => window.history.state?.index);

test.describe('Filter URL sync keeps router history state and hash', () => {
  test('search query', async ({ page }) => {
    // Google CSE rewrites the URL and nulls history.state after load
    await page.route(/cse\.google\.com/, (route) => route.abort());
    await page.goto('/search/#keep-me');
    await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 20_000 });
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
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 20_000 });
    const before = await historyIndex(page);
    expect(typeof before).toBe('number');

    await page
      .getByRole('button', { name: /^\d{4}/ })
      .first()
      .click();
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

  test('citations year', async ({ page }) => {
    await page.goto('/elixir-it/citations/#keep-me');
    const before = await historyIndex(page);
    expect(typeof before).toBe('number');

    await page.locator('[data-year-button]:not([data-year="all"])').first().click();
    await expect(page).toHaveURL(/\/elixir-it\/citations\/\?year=\d{4}#keep-me$/);
    expect(await historyIndex(page)).toBe(before);
  });
});
