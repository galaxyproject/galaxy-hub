import { test, expect, type Page } from '@playwright/test';

// isOnPage mount guard: a list island that hydrates after back/forward already moved the URL to
// another page must not read (or write) that page's filters. The island scripts are held back
// until the URL points elsewhere, then released. Every script is held, so this works on the built
// site (/_astro/) and on the dev server CI runs (/src/, /@fs/, /node_modules/.vite/).

async function hydrateAfterLeaving(page: Page, path: string, elsewhere: string) {
  let release = () => {};
  const held = new Promise<void>((resolve) => (release = resolve));
  const heldUrls: string[] = [];
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'script') return route.fallback();
    heldUrls.push(new URL(route.request().url()).pathname);
    await held;
    await route.continue();
  });
  await page.goto(path, { waitUntil: 'commit' });
  await page.waitForFunction(() => document.querySelector('astro-island') !== null);
  await page.evaluate((url) => window.history.replaceState(window.history.state, '', url), elsewhere);
  release();
  return heldUrls;
}

// The list component's own module was among the held scripts, so it really hydrated late
const heldComponent = (heldUrls: string[], name: string) => heldUrls.filter((url) => url.includes(name));

// Two frames after the list has rendered, so a mount-time filter change would have painted
const settle = (page: Page) =>
  page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

test.describe('List islands that hydrate after leaving their page', () => {
  test('news ignores the other page URL', async ({ page }) => {
    const elsewhere = '/elsewhere/?year=2020';
    const heldUrls = await hydrateAfterLeaving(page, '/news/', elsewhere);

    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await settle(page);
    expect(heldComponent(heldUrls, 'NewsList').length).toBeGreaterThan(0);
    await expect(page.locator('.news-list [data-filter-count]')).toHaveText(/^\s*\d+ articles\s*$/);
    expect(await page.evaluate(() => `${location.pathname}${location.search}`)).toBe(elsewhere);
  });

  test('events ignore the other page URL', async ({ page }) => {
    const elsewhere = '/elsewhere/?status=past';
    const heldUrls = await hydrateAfterLeaving(page, '/events/', elsewhere);

    const count = page.locator('.events-list [data-filter-count]');
    await expect(count).toBeVisible({ timeout: 60_000 });
    await settle(page);
    expect(heldComponent(heldUrls, 'EventsList').length).toBeGreaterThan(0);
    await expect(count).toHaveText(/^\s*\d+ events\s*$/);
    expect(await page.evaluate(() => `${location.pathname}${location.search}`)).toBe(elsewhere);
  });
});
