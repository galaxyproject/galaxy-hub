import { test, expect, type Page } from '@playwright/test';

// The URL decides the sidebar context (prototype A, R2): region pages show the region,
// every other page shows the global Galaxy Project context. Nothing is remembered.
async function hydratedSidebar(page: Page) {
  const sidebar = page.locator('aside');
  await expect(sidebar.locator('astro-island[ssr]')).toHaveCount(0);
  return sidebar;
}

function contextButton(page: Page) {
  return page.locator('aside').getByRole('button', { name: /Current context:/ });
}

test.describe('Sidebar context header', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('a global page shows the Galaxy Project context and no region group', async ({ page }) => {
    await page.goto('/community/');
    const sidebar = await hydratedSidebar(page);

    await expect(contextButton(page)).toHaveAttribute('data-context', 'global');
    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Project');
    await expect(contextButton(page).locator('[data-context-kind-label]')).toContainText('Global');
    await expect(sidebar.getByRole('group', { name: /Region$/ })).toHaveCount(0);
    await expect(sidebar.getByRole('group', { name: 'Galaxy Project Global' })).toBeVisible();
  });

  test('a region page shows the region context and its group first', async ({ page }) => {
    await page.goto('/freiburg/');
    const sidebar = await hydratedSidebar(page);

    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Freiburg');
    await expect(contextButton(page).locator('[data-context-kind-label]')).toContainText('Region');
    const region = sidebar.getByRole('group', { name: 'Galaxy Freiburg Region' });
    await expect(region.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page');
    await expect(region.getByRole('link', { name: 'Publications' })).toHaveAttribute('href', '/freiburg/publications/');
    // The global group keeps the global News and Events next to the region ones
    const global = sidebar.getByRole('group', { name: 'Galaxy Project Global' });
    await expect(global.getByRole('link', { name: 'News', exact: true })).toHaveAttribute('href', '/news/');
  });

  test('the context follows the URL across client-side navigation', async ({ page }) => {
    await page.goto('/freiburg/');
    const sidebar = await hydratedSidebar(page);

    await sidebar
      .getByRole('group', { name: 'Galaxy Project Global' })
      .getByRole('link', { name: 'News', exact: true })
      .click();
    await expect(page).toHaveURL(/\/news\/$/);
    await hydratedSidebar(page);
    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Project');
    await expect(sidebar.getByRole('group', { name: 'Galaxy Freiburg Region' })).toHaveCount(0);

    // Same context: the sidebar persists and the active link moves with the page
    await sidebar.getByRole('link', { name: 'Events', exact: true }).click();
    await expect(page).toHaveURL(/\/events\/$/);
    await expect(sidebar.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(sidebar.getByRole('link', { name: 'News', exact: true })).not.toHaveAttribute('aria-current');
  });

  test('the region menu is a keyboard disclosure of links', async ({ page }) => {
    await page.goto('/freiburg/');
    await hydratedSidebar(page);
    const button = contextButton(page);
    const menu = page.locator('#sb-region-menu');

    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();
    await expect(menu.locator('a[aria-current="true"]')).toBeFocused();
    await expect(menu.locator('a[aria-current="true"]')).toHaveAttribute('href', '/freiburg/');

    await page.keyboard.press('Home');
    await expect(menu.locator('a[data-region="global"]')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(menu.locator('a[data-region="ca"]')).toBeFocused();
    await expect(menu.locator('a[data-region="ca"]')).toHaveAttribute('target', '_blank');

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toBeFocused();

    await button.click();
    await expect(menu).toBeVisible();
    await page.locator('main').click({ position: { x: 5, y: 5 } });
    await expect(menu).toBeHidden();
  });

  test('picking a region from the menu switches the context', async ({ page }) => {
    await page.goto('/community/');
    await hydratedSidebar(page);

    await contextButton(page).click();
    await page.locator('#sb-region-menu a[data-region="eu"]').click();
    await expect(page).toHaveURL(/\/eu\/$/);
    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Europe');
  });

  test('ESG pages show the project context', async ({ page }) => {
    await page.goto('/projects/esg/');
    const sidebar = await hydratedSidebar(page);

    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('EuroScienceGateway');
    await expect(contextButton(page).locator('[data-context-kind-label]')).toContainText('Project');
    const project = sidebar.getByRole('group', { name: 'EuroScienceGateway Project' });
    await expect(project.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page');
  });
});
