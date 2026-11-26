import { test, expect } from '@playwright/test';

const SCRIPT = 'script[src="https://plausible.galaxyproject.eu/js/plausible.js"]';

test.describe('Plausible on EU bare pages', () => {
  test.beforeEach(async ({ page }) => {
    // Keep the run offline: the tag is asserted in the markup, never fetched.
    await page.route('https://plausible.galaxyproject.eu/**', (route) => route.abort());
  });

  const euPages = [
    '/bare/eu/usegalaxy/ecology/',
    '/bare/eu/usegalaxy/main/',
    '/bare/eu/events/',
    '/bare/eu/news/',
    '/bare/eu/latest/news/',
    '/bare/eu/latest/events/',
  ];

  for (const path of euPages) {
    test(`${path} carries the galaxyproject.eu Plausible script`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const script = page.locator(SCRIPT);
      await expect(script).toHaveCount(1);
      await expect(script).toHaveAttribute('data-domain', 'galaxyproject.eu');
      await expect(script).toHaveAttribute('defer', '');
    });
  }

  const untrackedPages = ['/bare/fr/events/', '/bare/fr/latest/news/', '/bare/it/usegalaxy/main/', '/', '/eu/'];

  for (const path of untrackedPages) {
    test(`${path} does not load Plausible`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page.locator('script[src*="plausible"]')).toHaveCount(0);
    });
  }
});
