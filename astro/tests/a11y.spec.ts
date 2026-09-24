import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.describe('Skip link', () => {
    for (const path of ['/', '/community/']) {
      test(`is the first Tab stop and moves focus to main on ${path}`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        await page.keyboard.press('Tab');
        const skipLink = page.getByRole('link', { name: 'Skip to content' });
        await expect(skipLink).toBeFocused();
        await expect(skipLink).toBeInViewport();

        await page.keyboard.press('Enter');
        await expect(page.locator('#main-content')).toBeFocused();

        await page.keyboard.press('Tab');
        const focusedInMain = await page.evaluate(
          () => document.getElementById('main-content')?.contains(document.activeElement) ?? false
        );
        expect(focusedInMain).toBe(true);
      });
    }
  });

  test.describe('Landmarks', () => {
    test('article page has one main, a labelled nav and a footer outside main', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/community/');

      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      await expect(page.locator('main footer.site-footer')).toHaveCount(0);
      await expect(
        page.getByRole('contentinfo').getByRole('heading', { level: 2, name: 'Galaxy Project' })
      ).toBeVisible();
    });

    test('mobile header is a banner landmark', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/community/');

      await expect(page.getByRole('banner')).toBeVisible();
    });

    test('home page has banner, labelled nav, main and footer landmarks', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      await expect(page.getByRole('banner')).toHaveCount(1);
      await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      await expect(page.locator('main footer')).toHaveCount(0);
    });

    test('standalone feed widget has a main landmark and no skip link', async ({ page }) => {
      await page.goto('/bare/eu/latest/news/');

      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveCount(0);
    });

    test('table of contents is labelled "On this page"', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/tools/orbit/');

      await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
    });
  });

  test.describe('Current page', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
    });

    test('sidebar marks the exact page with aria-current', async ({ page }) => {
      await page.goto('/news/');

      const nav = page.getByRole('navigation', { name: 'Main' });
      await expect(nav.locator('a[aria-current="page"]')).toHaveCount(1);
      await expect(nav.locator('a[href="/news/"]')).toHaveAttribute('aria-current', 'page');
    });

    test('sidebar does not mark the parent section of a nested page', async ({ page }) => {
      await page.goto('/community/governance/');

      const nav = page.getByRole('navigation', { name: 'Main' });
      await expect(nav.locator('a[href="/community/governance/"]')).toHaveAttribute('aria-current', 'page');
      await expect(nav.locator('a[href="/community/"]')).not.toHaveAttribute('aria-current');
    });

    test('mobile menu marks the current page', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/news/');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'Open menu' }).click();
      const menu = page.locator('[data-testid="mobile-menu"][data-state="open"]');
      await expect(menu.locator('a[href="/news/"]')).toHaveAttribute('aria-current', 'page');
    });
  });

  test.describe('Accessible names', () => {
    test('sidebar search button and region switcher are named', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/community/');

      const sidebar = page.locator('aside');
      await expect(sidebar.getByRole('button', { name: 'Search' })).toBeVisible();
      await expect(sidebar.getByRole('combobox', { name: 'Region' })).toBeVisible();
    });

    test('mobile region switcher is named', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/community/');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: 'Open menu' }).click();
      const menu = page.locator('[data-testid="mobile-menu"][data-state="open"]');
      await expect(menu.getByRole('combobox', { name: 'Region' })).toBeVisible();
    });

    test('listing and directory filters are named', async ({ page }) => {
      await page.goto('/news/');
      await expect(page.getByRole('combobox', { name: 'Older years' })).toBeVisible();

      await page.goto('/use/');
      await expect(page.getByRole('combobox', { name: 'Type' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Location' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Platform' })).toBeVisible();
    });
  });
});
