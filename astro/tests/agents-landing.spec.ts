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

    // Two paths on equal footing: Orbit, then bringing your own coding agent.
    const paths = page.locator('.agl-path');
    await expect(paths).toHaveCount(2);
    await expect(paths.first()).toContainText('Use Orbit');
    await expect(paths.first().locator('a.agl-btn[href="/agents/orbit/"]')).toBeVisible();
    await expect(paths.nth(1)).toContainText('Add Galaxy to your agent');
    await expect(paths.nth(1).locator('a.agl-btn[href="/agents/plugins/"]')).toBeVisible();

    await expect(page.locator('.agl-tile[href="/agents/stack/"]')).toBeVisible();

    // The page's own markdown still renders under the component.
    await expect(page.getByRole('heading', { name: /Either way, it.s still Galaxy/ })).toBeVisible();
  });
});
