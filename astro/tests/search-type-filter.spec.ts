import { test, expect, type Page } from '@playwright/test';

const typeSelect = (page: Page) => page.getByRole('combobox', { name: 'Content type' });
const results = (page: Page) => page.locator('.search-page article');

async function openSearch(page: Page, path = '/search/') {
  // Keep these tests offline; the Google tab is covered by search-cse-history.spec.ts
  await page.route(/cse\.google\.com/, (route) => route.abort());
  await page.goto(path);
  await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
  // The type options come from the search index
  await expect(typeSelect(page).locator('option[value="events"]')).toHaveCount(1, { timeout: 60_000 });
}

// The collection badge of every result
const badges = (page: Page) =>
  results(page).evaluateAll((els) =>
    els.map((el) => (el.querySelector('span.rounded-full')?.textContent || '').trim())
  );

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the filters
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

test.describe('Hub Search content type in the URL', () => {
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(90_000);

  test('choosing a type writes type after q and narrows the results', async ({ page }) => {
    await openSearch(page, '/search/?q=galaxy');
    await expect(results(page).first()).toBeVisible();

    await typeSelect(page).selectOption('events');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&type=events$/);
    await expect(results(page).first()).toBeVisible();
    expect(new Set(await badges(page))).toEqual(new Set(['Event']));

    await typeSelect(page).selectOption('all');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy$/);
  });

  test('a deep link keeps its type while the index loads and after a reload', async ({ page }) => {
    await openSearch(page, '/search/?q=galaxy&type=news');
    await expect(typeSelect(page)).toHaveValue('news');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&type=news$/);
    expect(new Set(await badges(page))).toEqual(new Set(['News']));

    await page.reload();
    await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(typeSelect(page)).toHaveValue('news');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&type=news$/);
  });

  test('an unknown type is dropped once the index has loaded', async ({ page }) => {
    await openSearch(page, '/search/?q=galaxy&type=bogus');
    await expect(typeSelect(page)).toHaveValue('all');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy$/);
  });

  test('the type stays in the URL next to the tab', async ({ page }) => {
    await openSearch(page, '/search/?q=galaxy&type=events');
    await page.getByRole('tab', { name: 'Publication Search' }).click();
    await expect
      .poll(() => {
        const url = new URL(page.url());
        return [url.searchParams.get('q'), url.searchParams.get('type'), url.searchParams.get('tab')];
      })
      .toEqual(['galaxy', 'events', 'publications']);

    await page.getByRole('tab', { name: 'Hub Search' }).click();
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&type=events$/);
    await expect(typeSelect(page)).toHaveValue('events');
  });

  test('popstate and back/forward restore the type', async ({ page }) => {
    await openSearch(page, '/search/?q=galaxy');
    await popTo(page, '/search/?q=galaxy&type=platforms');
    await expect(typeSelect(page)).toHaveValue('platforms');

    await popTo(page, '/search/?q=galaxy');
    await expect(typeSelect(page)).toHaveValue('all');

    await typeSelect(page).selectOption('events');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&type=events$/);
    await page.locator('a[href="/news/"]').first().click();
    await expect(page).toHaveURL(/\/news\/$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&type=events$/);
    await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(typeSelect(page)).toHaveValue('events');
    await page.goForward();
    await expect(page).toHaveURL(/\/news\/$/);
  });
});

test.describe('Search tabs on a phone', () => {
  test.setTimeout(90_000);

  test('the tabs wrap inside the card with 44px targets', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openSearch(page, '/search/?q=galaxy');
    const card = await page.locator('.search-page').boundingBox();
    expect(card).not.toBeNull();
    for (const name of ['Hub Search', 'Pan-Galactic Search', 'Publication Search']) {
      const tab = page.getByRole('tab', { name });
      await expect(tab).toBeVisible();
      const box = (await tab.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(card!.x);
      expect(box.x + box.width).toBeLessThanOrEqual(card!.x + card!.width + 0.5);
      expect(box.height).toBeGreaterThanOrEqual(44);
      // The label is not cut off inside the tab
      expect(await tab.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
