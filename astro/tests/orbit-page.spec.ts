import { test, expect } from '@playwright/test';

/**
 * /agents/orbit/ -- the Orbit hero (OrbitHero) followed by the banded
 * install, setup and reference sections.
 */

const URL = '/agents/orbit/';

test.describe('Orbit page', () => {
  test('hero downloads the latest release and points at the install guide', async ({ page }) => {
    const response = await page.goto(URL);
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Orbit');
    await expect(page.locator('.page-header')).toHaveCount(0);

    const ctas = page.locator('.orh__cta a');
    await expect(ctas.first()).toHaveAttribute('href', 'https://github.com/galaxyproject/loom/releases/latest');
    await expect(ctas.nth(1)).toHaveAttribute('href', '#installation');
  });

  test('sections stay h2s and the anchors other pages link to exist', async ({ page }) => {
    await page.goto(URL);
    for (const id of ['installation', 'set-up', 'choosing-a-model', 'getting-help']) {
      await expect(page.locator(`h2#${id}`), id).toHaveCount(1);
    }
    await expect(page.locator('.ag-steps > li h3')).toHaveCount(3);
    await expect(page.locator('.ag-os__item h3')).toHaveText(['macOS', 'Linux', 'Windows']);
  });

  test('fits a phone without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(URL);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
