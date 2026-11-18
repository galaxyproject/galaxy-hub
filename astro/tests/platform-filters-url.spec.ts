import { test, expect, type Page } from '@playwright/test';

const search = (page: Page) => page.getByPlaceholder('Search, tool:name, or reference:genome');
const location = (page: Page) => page.locator('#platform-filter-location');
const scope = (page: Page) => page.locator('#platform-filter-type');
const suggestions = (page: Page) => page.locator('#platform-search-suggestions');

async function openUse(page: Page, path = '/use/') {
  await page.goto(path);
  // client:only island: wait until the directory and its controls are rendered
  await expect(location(page)).toBeVisible({ timeout: 60_000 });
}

async function counts(page: Page) {
  const text = (await page.locator('text=/Showing \\d+ of \\d+/').textContent()) || '';
  const match = text.match(/Showing (\d+) of (\d+)/);
  expect(match).not.toBeNull();
  return { shown: Number(match?.[1]), total: Number(match?.[2]) };
}

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the filters
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

test.describe('Platform directory query and location in the URL', () => {
  test.setTimeout(90_000);

  test('typing writes q once typing pauses and keeps the list in step', async ({ page }) => {
    await openUse(page);
    const { total } = await counts(page);

    await search(page).fill('europe');
    await expect(page).toHaveURL(/\/use\/\?q=europe$/);
    const { shown } = await counts(page);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);

    await search(page).fill('');
    await expect(page).toHaveURL(/\/use\/$/);
  });

  test('location writes region, in a stable order with the other params', async ({ page }) => {
    await openUse(page, '/use/?platform_group=public-servers');
    await location(page).selectOption('DE');
    await expect(page).toHaveURL(/\/use\/\?region=DE&platform_group=public-servers$/);

    await scope(page).selectOption('domain');
    await search(page).fill('galaxy');
    await expect(page).toHaveURL(/\/use\/\?q=galaxy&region=DE&scope=domain&platform_group=public-servers$/);

    await page.getByRole('button', { name: 'Clear' }).first().click();
    await expect(page).toHaveURL(/\/use\/$/);
    await expect(location(page)).toHaveValue('all');
    await expect(search(page)).toHaveValue('');
  });

  test('a reload restores q and region without opening the suggestions', async ({ page }) => {
    await openUse(page);
    await search(page).fill('bwa');
    await expect(suggestions(page)).toBeVisible();
    await search(page).blur();
    await location(page).selectOption('US');
    await expect(page).toHaveURL(/\/use\/\?q=bwa&region=US$/);
    const { shown } = await counts(page);

    await page.reload();
    await expect(location(page)).toHaveValue('US', { timeout: 60_000 });
    await expect(search(page)).toHaveValue('bwa');
    await expect(suggestions(page)).toHaveCount(0);
    expect((await counts(page)).shown).toBe(shown);
  });

  test('an unknown region falls back to all locations', async ({ page }) => {
    await openUse(page, '/use/?region=XX');
    await expect(location(page)).toHaveValue('all');
    await expect(page).toHaveURL(/\/use\/$/);

    await openUse(page, '/use/?region=XX&scope=domain');
    await expect(location(page)).toHaveValue('all');
    await expect(scope(page)).toHaveValue('domain');
    await expect(page).toHaveURL(/\/use\/\?scope=domain$/);
  });

  test('popstate restores q and region', async ({ page }) => {
    await openUse(page);
    await popTo(page, '/use/?q=europe&region=DE');
    await expect(search(page)).toHaveValue('europe');
    await expect(location(page)).toHaveValue('DE');
    await expect(suggestions(page)).toHaveCount(0);

    await popTo(page, '/use/');
    await expect(search(page)).toHaveValue('');
    await expect(location(page)).toHaveValue('all');
    const { shown, total } = await counts(page);
    expect(shown).toBe(total);
  });

  test('back from a platform page restores q and region', async ({ page }) => {
    await openUse(page, '/use/?q=galaxy&region=DE');
    const card = page.locator('.platform-directory .grid > li h3 a').first();
    const href = (await card.getAttribute('href')) as string;
    await card.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack();
    await expect(page).toHaveURL(/\/use\/\?q=galaxy&region=DE$/);
    await expect(location(page)).toHaveValue('DE', { timeout: 60_000 });
    await expect(search(page)).toHaveValue('galaxy');

    await page.goForward();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);
  });

  test('option labels carry counts and country names', async ({ page }) => {
    await openUse(page);
    await expect(scope(page).locator('option[value="all"]')).toHaveText(/^All types \(\d+\)$/);
    await expect(scope(page).locator('option[value="tool-publishing"]')).toHaveText(/^Tool publishing \(\d+\)$/);
    await expect(location(page).locator('option[value="DE"]')).toHaveText(/^Germany \(\d+\)$/);
    await expect(location(page).locator('option[value="UK"]')).toHaveText(/^United Kingdom \(\d+\)$/);
  });

  test('Clear filters is hidden until a filter is set, then returns focus to the search box', async ({ page }) => {
    await openUse(page);
    const clear = page.getByRole('button', { name: 'Clear filters' });
    await expect(clear).toHaveCount(0);

    await location(page).selectOption('DE');
    await expect(clear).toHaveCount(1);
    await clear.click();
    await expect(clear).toHaveCount(0);
    await expect(location(page)).toHaveValue('all');
    await expect(page.locator('#platform-filter-search')).toBeFocused();
  });

  test('the empty state has one Clear filters button and clears the search', async ({ page }) => {
    await openUse(page, '/use/?q=zzzzqq');
    await expect(page.getByRole('heading', { name: 'No Galaxy servers found' })).toBeVisible();
    const clear = page.getByRole('button', { name: 'Clear filters' });
    await expect(clear).toHaveCount(1);
    await clear.click();
    await expect(page.getByRole('heading', { name: 'No Galaxy servers found' })).toHaveCount(0);
    await expect(search(page)).toHaveValue('');
  });

  test('cards show a logo only for site logo paths and initials otherwise', async ({ page }) => {
    await openUse(page);
    const cards = page.locator('.platform-directory .grid > li');
    await expect(cards.first()).toBeVisible();
    const srcs = await cards.locator('img').evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src') ?? ''));
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(src).toMatch(/^\/(?!\/).*logo/i);
    // A card without a logo shows two-letter initials instead
    await expect(cards.filter({ hasNot: page.locator('img') }).first()).toBeVisible();
    // The title link is the only link of every card, stretched over it
    const linkCounts = await cards.evaluateAll((items) => items.map((item) => item.querySelectorAll('a').length));
    expect(linkCounts.length).toBeGreaterThan(0);
    expect(linkCounts.every((count) => count === 1)).toBe(true);
  });
});
