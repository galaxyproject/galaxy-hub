import { test, expect, type Page } from '@playwright/test';

// Stand-in for cse.google.com/cse.js so the tests need no network. It models what the real
// element script does on render (seen in cse_element__*.js): unless enableHistory is false it
// calls history.replaceState(null, '', '#…&gsc.tab=0'), which wipes Astro's ClientRouter state.
const FAKE_CSE = `
(() => {
  window.__cseRenderConfigs = [];
  const elements = {};
  window.google = { search: { cse: { element: {
    render(config) {
      window.__cseRenderConfigs.push(config);
      if (config.attributes?.enableHistory !== false) {
        history.replaceState(null, '', (location.hash || '#') + '&gsc.tab=0');
      }
      elements[config.gname] = { execute() {}, clearAllResults() {} };
    },
    getElement(name) { return elements[name]; },
  } } } };
  window.__gcse?.callback?.();
})();
`;

// Astro's ClientRouter keeps its navigation index in history.state
const historyIndex = (page: Page) => page.evaluate(() => window.history.state?.index);

async function stubCse(page: Page) {
  const requests: string[] = [];
  await page.route(/cse\.google\.com/, (route) => {
    requests.push(route.request().url());
    return route.fulfill({ contentType: 'text/javascript', body: FAKE_CSE });
  });
  return requests;
}

async function waitForSearchPage(page: Page) {
  await expect(page.locator('astro-island:has(.search-page)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
}

test.describe('Search page keeps router history state with Google CSE', () => {
  // Serial: parallel cold page loads race Vite's dev dependency re-optimisation and fail hydration
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(90_000);

  test('default tab does not load Google CSE', async ({ page }) => {
    const requests = await stubCse(page);
    await page.goto('/search/#keep-me');
    await waitForSearchPage(page);
    const before = await historyIndex(page);
    expect(typeof before).toBe('number');

    await page.getByPlaceholder('Search articles, events, platforms...').fill('galaxy');
    await expect(page).toHaveURL(/\/search\/\?q=galaxy#keep-me$/);
    await page.waitForLoadState('networkidle');
    expect(requests).toEqual([]);
    expect(await historyIndex(page)).toBe(before);
  });

  test('opening the Google tab loads CSE and keeps history state', async ({ page }) => {
    const requests = await stubCse(page);
    await page.goto('/search/?q=galaxy#keep-me');
    await waitForSearchPage(page);
    const before = await historyIndex(page);
    await page.waitForLoadState('networkidle');
    expect(requests).toEqual([]);

    await page.getByRole('tab', { name: 'Pan-Galactic Search' }).click();
    await expect.poll(() => requests.length).toBe(1);
    await expect.poll(() => page.evaluate(() => (window as any).__cseRenderConfigs?.length ?? 0)).toBe(1);
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&tab=google#keep-me$/);
    expect(await historyIndex(page)).toBe(before);
  });

  test('Google tab deep link keeps history state and hash', async ({ page }) => {
    const requests = await stubCse(page);
    await page.goto('/search/?tab=google&q=galaxy#keep-me');
    await waitForSearchPage(page);
    await expect.poll(() => requests.length).toBeGreaterThan(0);
    await expect.poll(() => page.evaluate(() => (window as any).__cseRenderConfigs?.length ?? 0)).toBe(1);

    expect(typeof (await historyIndex(page))).toBe('number');
    await expect(page).toHaveURL(/\/search\/\?tab=google&q=galaxy#keep-me$/);
  });

  test('back navigation restores the search page after the Google tab loaded', async ({ page }) => {
    await stubCse(page);
    await page.goto('/search/?tab=google&q=galaxy');
    await waitForSearchPage(page);
    await expect.poll(() => page.evaluate(() => (window as any).__cseRenderConfigs?.length ?? 0)).toBe(1);

    await page.locator('a[href="/news/"]').first().click();
    await expect(page).toHaveURL(/\/news\/$/);
    await page.goBack();

    await expect(page.getByPlaceholder('Search articles, events, platforms...')).toHaveValue('galaxy');
    await expect(page).toHaveURL(/\/search\/\?tab=google&q=galaxy$/);
  });
});
