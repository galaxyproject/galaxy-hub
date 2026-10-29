import { test, expect, type Page } from '@playwright/test';

// isOnPage mount guard: a list island that hydrates after back/forward already moved the URL to
// another page must not read (or write) that page's filters. The island scripts are held back
// until the URL points elsewhere, then released.

async function hydrateAfterLeaving(page: Page, path: string, elsewhere: string) {
  let release = () => {};
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route('**/_astro/**/*.js', async (route) => {
    await held;
    await route.continue();
  });
  await page.goto(path, { waitUntil: 'commit' });
  await page.waitForFunction(() => document.querySelector('astro-island') !== null);
  await page.evaluate((url) => window.history.replaceState(window.history.state, '', url), elsewhere);
  release();
}

// Two frames after the list has rendered, so a mount-time filter change would have painted
const settle = (page: Page) =>
  page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

test.describe('List islands that hydrate after leaving their page', () => {
  test('news ignores the other page URL', async ({ page }) => {
    const elsewhere = '/elsewhere/?year=2020';
    await hydrateAfterLeaving(page, '/news/', elsewhere);

    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await settle(page);
    await expect(page.locator('.news-list [data-filter-count]')).toHaveText(/^\s*\d+ articles\s*$/);
    expect(await page.evaluate(() => `${location.pathname}${location.search}`)).toBe(elsewhere);
  });

  test('events ignore the other page URL', async ({ page }) => {
    const elsewhere = '/elsewhere/?status=past';
    await hydrateAfterLeaving(page, '/events/', elsewhere);

    const count = page.locator('.events-list [data-filter-count]');
    await expect(count).toBeVisible({ timeout: 60_000 });
    await settle(page);
    await expect(count).toHaveText(/^\s*\d+ events\s*$/);
    expect(await page.evaluate(() => `${location.pathname}${location.search}`)).toBe(elsewhere);
  });
});
