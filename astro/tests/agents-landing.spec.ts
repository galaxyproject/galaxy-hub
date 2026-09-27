import { test, expect } from '@playwright/test';

/**
 * /agents/ -- the front door for the agent section: Orbit for people without
 * an agent, the plugin guides for people bringing one, then pointers onward.
 */
test.describe('Agents landing page', () => {
  test('leads with Orbit, then the plugins, then the rest of the section', async ({ page }) => {
    const response = await page.goto('/agents/');
    expect(response?.status()).toBe(200);

    // The hero supplies the only h1.
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('AI agent');

    // Orbit is the default answer: the card with the app comes before the bring-your-own strip.
    const orbit = page.locator('.agl-orbit');
    await expect(orbit).toContainText('Use Orbit');
    await expect(orbit.locator('a[href="/agents/orbit/"]')).toBeVisible();
    await expect(orbit.locator('img')).toBeVisible();
    await expect(page.locator('.agl-own a[href="/agents/plugins/"]')).toBeVisible();
    const orbitBox = await orbit.boundingBox();
    const ownBox = await page.locator('.agl-own').boundingBox();
    expect(orbitBox!.y).toBeLessThan(ownBox!.y);

    await expect(page.locator('.agl-tile[href="/agents/stack/"]')).toBeVisible();

    // The page's own markdown still renders under the component.
    await expect(page.getByRole('heading', { name: /Either way, it.s still Galaxy/ })).toBeVisible();
  });
});
