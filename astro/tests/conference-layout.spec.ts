import { test, expect } from '@playwright/test';

test.describe('Conference Layout', () => {
  test.describe('GCC2026 Conference Pages', () => {
    test('conference root page loads with subnav', async ({ page }) => {
      await page.goto('/events/gcc-2026/');
      await expect(page.locator('h1').first()).toBeVisible();

      const subnav = page.locator('nav[aria-label="Conference pages"]');
      await expect(subnav).toBeVisible();

      // Should have Home + subpage links
      const navLinks = subnav.locator('a');
      const count = await navLinks.count();
      expect(count).toBeGreaterThanOrEqual(10);
    });

    test('Home link is active on conference root', async ({ page }) => {
      await page.goto('/events/gcc-2026/');

      const subnav = page.locator('nav[aria-label="Conference pages"]');
      const homeLink = subnav.locator('a', { hasText: 'Home' });
      await expect(homeLink).toHaveClass(/is-active/);
    });

    test('subpage shows subnav with correct active state', async ({ page }) => {
      await page.goto('/events/gcc-2026/register/');
      await expect(page.locator('h1').first()).toBeVisible();

      const subnav = page.locator('nav[aria-label="Conference pages"]');
      await expect(subnav).toBeVisible();

      const registerLink = subnav.locator('a', { hasText: 'Register' });
      await expect(registerLink).toHaveClass(/is-active/);

      // Home should NOT be active on a subpage
      const homeLink = subnav.locator('a', { hasText: 'Home' });
      await expect(homeLink).not.toHaveClass(/is-active/);
    });

    test('subnav links navigate between conference pages', async ({ page }) => {
      await page.goto('/events/gcc-2026/');

      const subnav = page.locator('nav[aria-label="Conference pages"]');
      const trainingLink = subnav.locator('a', { hasText: 'Training' });
      await trainingLink.click();
      await page.waitForLoadState('domcontentloaded');

      await expect(page).toHaveURL(/\/events\/gcc-2026\/training\//);
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('conference page shows date and location metadata', async ({ page }) => {
      await page.goto('/events/gcc-2026/');

      const header = page.locator('header');

      // Date should be visible in the page header
      await expect(header.getByText('Date', { exact: true })).toBeVisible();
      await expect(header.locator('time').filter({ hasText: /June.*2026/ })).toBeVisible();

      // Location should be visible in the page header
      await expect(header.getByText('Location', { exact: true })).toBeVisible();
      await expect(header.getByText('Clermont-Ferrand, France')).toBeVisible();
    });

    test('conference page has footer with back link and edit link', async ({ page }) => {
      await page.goto('/events/gcc-2026/');

      const backLink = page.locator('a[href="/events/"]');
      await expect(backLink.first()).toBeVisible();

      const editLink = page.locator('a[href*="github.com"]').filter({ hasText: 'Edit' });
      await expect(editLink).toBeVisible();
    });

    test('all subnav subpages load successfully', async ({ page }) => {
      await page.goto('/events/gcc-2026/');

      const subnav = page.locator('nav[aria-label="Conference pages"]');
      const links = subnav.locator('a');
      const hrefs: string[] = [];

      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');
        if (href) hrefs.push(href);
      }

      // Spot-check a few subpages load with 200
      const sample = hrefs.filter((h) => h !== '/events/gcc-2026/').slice(0, 4);
      for (const href of sample) {
        const response = await page.goto(href);
        expect(response?.status(), `${href} should return 200`).toBe(200);
        await expect(page.locator('h1').first()).toBeVisible();
      }
    });
  });

  test.describe('Non-conference events', () => {
    test('regular event pages do not show conference subnav', async ({ page }) => {
      // A simple one-off event should use the standard event layout
      await page.goto('/events/');
      const eventLink = page
        .locator('a[href^="/events/2"]')
        .filter({ hasNot: page.locator('[data-external-icon]') })
        .first();

      if (await eventLink.isVisible()) {
        await eventLink.click();
        await page.waitForLoadState('domcontentloaded');

        const subnav = page.locator('nav[aria-label="Conference pages"]');
        await expect(subnav).not.toBeVisible();
      }
    });
  });
});
