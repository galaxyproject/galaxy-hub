import { test, expect, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

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
    await expect(contextButton(page)).toHaveAttribute('data-context-kind', 'global');
    await expect(contextButton(page)).toHaveAccessibleName('Current context: Galaxy Project, Global. Change region');
    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Project');
    // Only the global group: it is named but has no visible heading
    const groups = sidebar.getByRole('navigation', { name: 'Main' }).getByRole('group');
    await expect(groups).toHaveCount(1);
    await expect(sidebar.getByRole('group', { name: 'Galaxy Project', exact: true })).toBeVisible();
    await expect(sidebar.locator('#sb-ng-global')).toHaveCount(0);
  });

  test('a region page shows the region context and its group first', async ({ page }) => {
    await page.goto('/freiburg/');
    const sidebar = await hydratedSidebar(page);

    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Freiburg');
    await expect(contextButton(page)).toHaveAttribute('data-context-kind', 'region');
    await expect(contextButton(page)).toHaveAccessibleName('Current context: Galaxy Freiburg, Region. Change region');
    const region = sidebar.getByRole('group', { name: 'Galaxy Freiburg', exact: true });
    await expect(region.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page');
    await expect(region.getByRole('link', { name: 'Publications' })).toHaveAttribute('href', '/freiburg/publications/');
    // The global group keeps the global News and Events next to the region ones, under a plain heading
    const global = sidebar.getByRole('group', { name: 'Galaxy Project', exact: true });
    await expect(sidebar.locator('#sb-ng-global')).toHaveText('Galaxy Project');
    await expect(global.getByRole('link', { name: 'News', exact: true })).toHaveAttribute('href', '/news/');
  });

  test('the context follows the URL across client-side navigation', async ({ page }) => {
    await page.goto('/freiburg/');
    const sidebar = await hydratedSidebar(page);

    await sidebar
      .getByRole('group', { name: 'Galaxy Project', exact: true })
      .getByRole('link', { name: 'News', exact: true })
      .click();
    await expect(page).toHaveURL(/\/news\/$/);
    await hydratedSidebar(page);
    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Project');
    await expect(sidebar.getByRole('group', { name: 'Galaxy Freiburg', exact: true })).toHaveCount(0);

    // Same context: the sidebar persists and the active link moves with the page
    await sidebar.getByRole('link', { name: 'Events', exact: true }).click();
    await expect(page).toHaveURL(/\/events\/$/);
    await expect(sidebar.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(sidebar.getByRole('link', { name: 'News', exact: true })).not.toHaveAttribute('aria-current');
  });

  test('the sidebar persists within a context and is replaced in another one', async ({ page }) => {
    await page.goto('/news/');
    const sidebar = await hydratedSidebar(page);
    const marked = () =>
      page.evaluate(() => (document.querySelector('aside.site-sidebar') as { __marker?: boolean } | null)?.__marker);
    await page.evaluate(() => {
      (document.querySelector('aside.site-sidebar') as unknown as { __marker: boolean }).__marker = true;
    });

    // A section that holds neither page stays open only if the sidebar element survives
    const applications = sidebar.getByRole('button', { name: 'Applications' });
    await applications.click();
    await expect(applications).toHaveAttribute('aria-expanded', 'true');

    await sidebar.getByRole('link', { name: 'Events', exact: true }).click();
    await expect(page).toHaveURL(/\/events\/$/);
    await expect(sidebar.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(applications).toHaveAttribute('aria-expanded', 'true');
    expect(await marked()).toBe(true);

    await contextButton(page).click();
    await page.locator('#sb-region-menu a[data-region="freiburg"]').click();
    await expect(page).toHaveURL(/\/freiburg\/$/);
    await expect(contextButton(page).locator('[data-context-name]')).toHaveText('Galaxy Freiburg');
    expect(await marked()).toBeUndefined();
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
    await expect(contextButton(page)).toHaveAttribute('data-context-kind', 'project');
    const project = sidebar.getByRole('group', { name: 'EuroScienceGateway', exact: true });
    await expect(project.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page');
  });
});

// Client-side navigation (ClientRouter) keeps the JS state; the URL alone decides the list scope
async function clientNavigate(page: Page, href: string) {
  await page.evaluate((target) => {
    (window as unknown as { __noReload?: boolean }).__noReload = true;
    const link = document.createElement('a');
    link.href = target;
    document.body.append(link);
    link.click();
  }, href);
  await expect(page).toHaveURL((url) => url.pathname === href);
  await expectNoReload(page);
}

async function expectNoReload(page: Page) {
  expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true);
}

test.describe('Subsite scope follows the URL', () => {
  test('a region list does not filter the global list after client-side navigation', async ({ page }) => {
    await page.goto('/freiburg/news/');
    await expect(page.getByText('Showing news for')).toContainText('Freiburg');

    await clientNavigate(page, '/news/');
    await expect(page.locator('.news-list')).toBeVisible();
    await expect(page.getByText('Showing news for')).toHaveCount(0);
    await expectNoReload(page);
  });

  test('a region list is filtered after client-side navigation from a global page', async ({ page }) => {
    await page.goto('/news/');
    await expect(page.locator('.news-list')).toBeVisible();
    await expect(page.getByText('Showing news for')).toHaveCount(0);

    await clientNavigate(page, '/freiburg/news/');
    await expect(page.getByText('Showing news for')).toContainText('Freiburg');
    await expectNoReload(page);
  });
});

test.describe('Mobile region chip', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('the chip shows the context and opens the sheet with the region menu', async ({ page }) => {
    await page.goto('/freiburg/');
    const header = page.locator('.site-mobile-header');
    await expect(header.locator('astro-island[ssr]')).toHaveCount(0);
    const chip = header.locator('[data-context-chip]');
    await expect(chip).toContainText('Freiburg');
    await expect(chip).toHaveAccessibleName(/current context: Galaxy Freiburg \(region\)\. Change region/);

    await chip.click();
    const sheet = page.locator('[data-testid="mobile-menu"][data-state="open"]');
    const menu = sheet.locator('#mm-region-menu');
    await expect(menu).toBeVisible();
    await expect(menu.locator('a[aria-current="true"]')).toBeFocused();

    // Escape closes the region menu first, then the sheet; focus returns to the chip
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(sheet).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(sheet).toHaveCount(0);
    await expect(chip).toBeFocused();
  });

  test('the sheet groups the region links before the global ones', async ({ page }) => {
    await page.goto('/freiburg/');
    await expect(page.locator('.site-mobile-header astro-island[ssr]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Open menu' }).click();
    const sheet = page.locator('[data-testid="mobile-menu"][data-state="open"]');

    await expect(sheet.getByRole('group', { name: 'Galaxy Freiburg', exact: true })).toBeVisible();
    await expect(sheet.getByRole('group', { name: 'Galaxy Project', exact: true })).toBeVisible();
    await expect(sheet.getByRole('button', { name: /Current context: Galaxy Freiburg/ })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});

// The site-chrome scan in axe.spec.ts masks color-contrast for the footer; scan the sidebar on its own
test.describe('Sidebar accessibility', () => {
  const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
  const serious = (violations: { id: string; impact?: string | null }[]) =>
    violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => v.id);

  for (const path of ['/community/', '/freiburg/', '/projects/esg/']) {
    test(`desktop context header and open region menu have no serious violations on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      await hydratedSidebar(page);
      await contextButton(page).click();
      await expect(page.locator('#sb-region-menu')).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(tags)
        .include('aside [aria-controls="sb-region-menu"]')
        .include('#sb-region-menu')
        .analyze();
      expect(serious(results.violations)).toEqual([]);
    });

    // color-contrast is off here: chicago-400 links (3.59:1) and the archive notice (4.46:1) are the
    // known sidebar contrast issue (axe.spec.ts knownIssues, chrome)
    test(`desktop sidebar groups and links have no other serious violations on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      await hydratedSidebar(page);

      const results = await new AxeBuilder({ page })
        .withTags(tags)
        .include('aside.site-sidebar')
        .disableRules(['color-contrast'])
        .analyze();
      expect(serious(results.violations)).toEqual([]);
    });
  }

  test('mobile header and menu sheet have no serious violations', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/freiburg/');
    await expect(page.locator('.site-mobile-header astro-island[ssr]')).toHaveCount(0);
    let results = await new AxeBuilder({ page }).withTags(tags).include('header.site-mobile-header').analyze();
    expect(serious(results.violations)).toEqual([]);

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('[data-testid="mobile-menu"][data-state="open"]')).toBeVisible();
    results = await new AxeBuilder({ page }).withTags(tags).include('[data-testid="mobile-menu"]').analyze();
    expect(serious(results.violations)).toEqual([]);
  });
});
