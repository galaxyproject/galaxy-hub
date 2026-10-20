import { test, expect, type Page } from '@playwright/test';

// Stand-in for cse.google.com/cse.js so the tests need no network. It models what the real
// element script does (seen in cse_element__*.js): unless enableHistory is false, render calls
// history.replaceState(null, '', '#…&gsc.tab=0') and execute calls history.pushState(null, …),
// both of which wipe Astro's ClientRouter state. Each script run, render and execute is recorded.
const FAKE_CSE = `
(() => {
  window.__cseLoads = (window.__cseLoads ?? 0) + 1;
  window.__cseRenderConfigs ??= [];
  window.__cseExecutes ??= [];
  const elements = (window.__cseElements ??= {});
  window.google = { search: { cse: { element: {
    render(config) {
      window.__cseRenderConfigs.push(config);
      const managesHistory = config.attributes?.enableHistory !== false;
      if (managesHistory) {
        history.replaceState(null, '', (location.hash || '#') + '&gsc.tab=0');
      }
      elements[config.gname] = {
        execute(q) {
          window.__cseExecutes.push({ q, gname: config.gname, connected: config.div.isConnected });
          if (managesHistory) history.pushState(null, '', (location.hash || '#') + '&gsc.q=' + q);
        },
        clearAllResults() {},
      };
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

const renderCount = (page: Page) => page.evaluate(() => (window as any).__cseRenderConfigs?.length ?? 0);

// The latest render targets a container that is still in the document
const lastRenderConnected = (page: Page) =>
  page.evaluate(() => (window as any).__cseRenderConfigs?.at(-1)?.div.isConnected ?? false);

// The latest execute ran on the latest rendered element while its container was in the document
const lastExecute = (page: Page) =>
  page.evaluate(() => {
    const w = window as any;
    const last = w.__cseExecutes?.at(-1);
    if (!last) return null;
    return { q: last.q, connected: last.connected, latestRender: last.gname === w.__cseRenderConfigs.at(-1).gname };
  });

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
    await expect.poll(() => renderCount(page)).toBe(1);
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&tab=google#keep-me$/);
    expect(await historyIndex(page)).toBe(before);
  });

  test('Google tab deep link keeps history state and hash', async ({ page }) => {
    const requests = await stubCse(page);
    await page.goto('/search/?tab=google&q=galaxy#keep-me');
    await waitForSearchPage(page);
    await expect.poll(() => requests.length).toBeGreaterThan(0);
    await expect.poll(() => renderCount(page)).toBe(1);

    expect(typeof (await historyIndex(page))).toBe('number');
    await expect(page).toHaveURL(/\/search\/\?tab=google&q=galaxy#keep-me$/);
  });

  test('back navigation restores the search page after the Google tab loaded', async ({ page }) => {
    const requests = await stubCse(page);
    await page.goto('/search/?tab=google&q=galaxy');
    await waitForSearchPage(page);
    await expect.poll(() => renderCount(page)).toBe(1);

    await page.locator('a[href="/news/"]').first().click();
    await expect(page).toHaveURL(/\/news\/$/);
    await page.goBack();

    await expect(page.getByPlaceholder('Search articles, events, platforms...')).toHaveValue('galaxy');
    await expect(page).toHaveURL(/\/search\/\?tab=google&q=galaxy$/);
    await expect.poll(() => renderCount(page)).toBe(2);
    expect(await lastRenderConnected(page)).toBe(true);
    await expect.poll(() => lastExecute(page)).toEqual({ q: 'galaxy', connected: true, latestRender: true });
    expect(requests).toHaveLength(1);
  });

  test('Google tab renders again when reopened after back navigation', async ({ page }) => {
    await stubCse(page);
    await page.goto('/search/?q=galaxy');
    await waitForSearchPage(page);
    await page.getByRole('tab', { name: 'Pan-Galactic Search' }).click();
    await expect.poll(() => renderCount(page)).toBe(1);
    await page.getByRole('tab', { name: 'Hub Search' }).click();
    await expect(page).toHaveURL(/\/search\/\?q=galaxy$/);

    await page.locator('a[href="/news/"]').first().click();
    await expect(page).toHaveURL(/\/news\/$/);
    await page.goBack();
    await expect(page.getByPlaceholder('Search articles, events, platforms...')).toHaveValue('galaxy');
    expect(await renderCount(page)).toBe(1);

    await page.getByRole('tab', { name: 'Pan-Galactic Search' }).click();
    await expect.poll(() => renderCount(page)).toBe(2);
    expect(await lastRenderConnected(page)).toBe(true);
    await expect.poll(() => lastExecute(page)).toEqual({ q: 'galaxy', connected: true, latestRender: true });
  });

  test('a panel mounted during the Google CSE load reuses that load', async ({ page }) => {
    let release!: () => void;
    const held = new Promise<void>((resolve) => (release = resolve));
    const requests: string[] = [];
    await page.route(/cse\.google\.com/, async (route) => {
      requests.push(route.request().url());
      await held;
      await route.fulfill({ contentType: 'text/javascript', body: FAKE_CSE });
    });
    await page.goto('/search/?q=galaxy');
    await waitForSearchPage(page);
    await page.getByRole('tab', { name: 'Pan-Galactic Search' }).click();
    await expect.poll(() => requests.length).toBe(1);
    await expect(page.getByRole('status')).toHaveText('Loading Google Search...');

    await page.locator('a[href="/news/"]').first().click();
    await expect(page).toHaveURL(/\/news\/$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/search\/\?q=galaxy&tab=google$/);
    await expect(page.getByPlaceholder('Search articles, events, platforms...')).toHaveValue('galaxy');

    release();
    await expect.poll(() => renderCount(page)).toBe(1);
    expect(await lastRenderConnected(page)).toBe(true);
    await page.waitForLoadState('networkidle');
    expect(await page.evaluate(() => (window as any).__cseLoads)).toBe(1);
  });

  test('a failed Google CSE load is announced', async ({ page }) => {
    await page.route(/cse\.google\.com/, (route) => route.abort());
    await page.goto('/search/?tab=google&q=galaxy');
    await waitForSearchPage(page);
    await expect(page.getByRole('alert')).toContainText('Could not load Google Search.');
  });
});
