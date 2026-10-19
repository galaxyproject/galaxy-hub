import { test, expect, type Page } from '@playwright/test';

// Astro's ClientRouter keeps its navigation index in history.state
const historyIndex = (page: Page) => page.evaluate(() => window.history.state?.index);

test.describe('Filter URL sync keeps router history state and hash', () => {
  // Serial: parallel cold page loads race Vite's dev dependency re-optimisation and fail hydration
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(90_000);

  test('search query', async ({ page }) => {
    // Google CSE rewrites the URL and nulls history.state after load
    await page.route(/cse\.google\.com/, (route) => route.abort());
    await page.goto('/search/#keep-me');
    await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
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
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
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

    const button = page
      .locator('[data-year-button][data-year]:not([data-year="all"]):not([data-year="unknown"])')
      .first();
    const year = await button.getAttribute('data-year');
    await button.click();
    await expect(page).toHaveURL(new RegExp(`/elixir-it/citations/\\?year=${year}#keep-me$`));
    expect(await historyIndex(page)).toBe(before);
  });
});

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the filters
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

test.describe('Filters follow popstate', () => {
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(90_000);

  test('news year', async ({ page }) => {
    await page.goto('/news/');
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    const second = page.getByRole('button', { name: /^\d{4}/ }).nth(1);
    const year = ((await second.textContent()) || '').match(/\d{4}/)?.[0] as string;

    await popTo(page, `/news/?year=${year}`);
    await expect(page.locator('.news-list [data-filter-count]')).toContainText(`in ${year}`);
    await popTo(page, '/news/');
    await expect(page.locator('.news-list [data-filter-count]')).not.toContainText(`in ${year}`);
  });

  test('events past year', async ({ page }) => {
    await page.goto('/events/?year=2019');
    await expect(page.locator('astro-island:has(.events-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    const pastSection = page.locator('section', { hasText: 'Past Events' });
    await expect(pastSection.locator('article time').first()).toContainText('2019');

    await popTo(page, '/events/?year=2018');
    await expect(pastSection.locator('article time').first()).toContainText('2018');
  });

  test('citations year', async ({ page }) => {
    await page.goto('/elixir-it/citations/');
    const button = page
      .locator('[data-year-button][data-year]:not([data-year="all"]):not([data-year="unknown"])')
      .first();
    const year = await button.getAttribute('data-year');

    await popTo(page, `/elixir-it/citations/?year=${year}`);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await popTo(page, '/elixir-it/citations/');
    await expect(page.locator('[data-year-button][data-year="all"]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('platform scope and group', async ({ page }) => {
    await page.goto('/use/');
    const scopeSelect = page.locator('#platform-filter-type');
    await expect(scopeSelect).toHaveValue('all');
    await expect(page.locator('astro-island:has(.platform-directory)')).not.toHaveAttribute('ssr', {
      timeout: 60_000,
    });

    await popTo(page, '/use/?scope=domain&platform_group=public-server');
    await expect(scopeSelect).toHaveValue('domain');
    await expect(page.locator('#platform-filter-platform')).toHaveValue('public-server');
    // The singular alias is read, the plural slug is written back
    await expect(page).toHaveURL(/\/use\/\?scope=domain&platform_group=public-servers$/);

    await popTo(page, '/use/');
    await expect(scopeSelect).toHaveValue('all');
    await expect(page).toHaveURL(/\/use\/$/);
  });

  test('search query and tab', async ({ page }) => {
    await page.route(/cse\.google\.com/, (route) => route.abort());
    await page.goto('/search/?q=galaxy');
    await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    const input = page.getByPlaceholder('Search articles, events, platforms...');
    await expect(input).toHaveValue('galaxy');

    await popTo(page, '/search/?q=training&tab=publications');
    await expect(input).toHaveValue('training');
    await expect(page.getByRole('tab', { name: 'Publication Search' })).toHaveAttribute('data-state', 'active');
  });
});
