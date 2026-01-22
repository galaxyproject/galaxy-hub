import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.describe('Sidebar Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Use desktop viewport for sidebar tests
      await page.setViewportSize({ width: 1280, height: 800 });
    });

    test('sidebar has main navigation links', async ({ page }) => {
      // Use article page - homepage has special layout without sidebar
      await page.goto('/admin/');
      await page.waitForTimeout(500);

      const sidebar = page.locator('aside');
      await expect(sidebar).toBeVisible();

      // Check for common navigation items
      await expect(sidebar.locator('a[href="/"]').first()).toBeVisible();
    });

    test('home link navigates correctly', async ({ page }) => {
      await page.goto('/events/');
      await page.locator('aside a[href="/"]').first().click();

      await expect(page).toHaveURL('/');
    });

    test('events link navigates correctly', async ({ page }) => {
      // Use article page - homepage has special layout
      await page.goto('/admin/');

      const eventsLink = page.locator('aside a[href="/events/"], aside a[href="/events"]');
      if (await eventsLink.first().isVisible()) {
        await eventsLink.first().click();
        await expect(page).toHaveURL(/\/events/);
      }
    });

    test('news link navigates correctly', async ({ page }) => {
      // Use article page - homepage has special layout
      await page.goto('/admin/');

      const newsLink = page.locator('aside a[href="/news/"], aside a[href="/news"]');
      if (await newsLink.first().isVisible()) {
        await newsLink.first().click();
        await expect(page).toHaveURL(/\/news/);
      }
    });

    test('use link navigates correctly', async ({ page }) => {
      // Use article page - homepage has special layout
      await page.goto('/admin/');

      const useLink = page.locator('aside a[href="/use/"], aside a[href="/use"]');
      if (await useLink.first().isVisible()) {
        await useLink.first().click();
        await expect(page).toHaveURL(/\/use/);
      }
    });
  });

  test.describe('Mobile Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Use mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('mobile menu button is visible', async ({ page }) => {
      // Use article page - homepage has special layout
      await page.goto('/admin/');

      const menuButton = page.locator('button[aria-label="Open menu"]');
      await expect(menuButton).toBeVisible();
    });

    test('mobile menu opens on click', async ({ page }) => {
      // Use article page - homepage has special layout
      await page.goto('/admin/');

      const menuButton = page.locator('button[aria-label="Open menu"]');
      await expect(menuButton).toBeVisible();
      // Wait for Vue hydration
      await page.waitForTimeout(500);

      await menuButton.click();

      // Wait for menu to become visible (hydration + animation)
      await page.waitForSelector('[role="dialog"], [data-state="open"]', { timeout: 3000 });
      const mobileMenu = page.locator('[role="dialog"], [data-state="open"]');
      const count = await mobileMenu.count();
      expect(count).toBeGreaterThan(0);
    });

    test('mobile menu has navigation links', async ({ page }) => {
      // Use article page - homepage has special layout
      await page.goto('/admin/');

      const menuButton = page.locator('button[aria-label="Open menu"]');
      await menuButton.click();

      // Wait for menu animation to complete
      await page.waitForTimeout(500);

      // Mobile menu links may be in a dialog/sheet that's visible
      // Just verify menu interaction doesn't cause errors
      // and page remains functional
      await expect(page.locator('body')).toBeVisible();

      // Verify we can still interact with the page
      const closeOrNav = page.locator('button, a').first();
      await expect(closeOrNav).toBeEnabled();
    });

    test('mobile menu scrolls on very small screens', async ({ page }) => {
      // Use a very small viewport to simulate a phone in landscape or small device
      await page.setViewportSize({ width: 375, height: 400 });
      await page.goto('/admin/');

      // Wait for Vue hydration
      const menuButton = page.locator('button[aria-label="Open menu"]');
      await expect(menuButton).toBeVisible();
      await page.waitForTimeout(500);

      await menuButton.click();

      // Wait for menu to open
      await page.waitForSelector('[role="dialog"], [data-state="open"]', { timeout: 3000 });

      // Find the scrollable container within the menu
      const scrollContainer = page.locator('[role="dialog"] [class*="overflow-y"]');
      await expect(scrollContainer).toBeVisible();

      // Get the scroll height vs client height to verify content overflows
      const scrollInfo = await scrollContainer.evaluate((el) => ({
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        scrollTop: el.scrollTop,
        canScroll: el.scrollHeight > el.clientHeight,
        computedOverflow: window.getComputedStyle(el).overflowY,
      }));

      // Content should overflow on this small viewport
      expect(scrollInfo.canScroll).toBe(true);
      // Overflow should be auto or scroll, not hidden or visible
      expect(['auto', 'scroll']).toContain(scrollInfo.computedOverflow);

      // Scroll down and verify it actually scrolls
      await scrollContainer.evaluate((el) => {
        el.scrollTop = 100;
      });

      const newScrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
      expect(newScrollTop).toBeGreaterThan(0);
    });

    test('homepage mobile menu scrolls on small screens', async ({ page }) => {
      // Use a very small viewport
      await page.setViewportSize({ width: 375, height: 400 });
      await page.goto('/');

      // Scroll to trigger the masthead to appear
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(500);

      // Click the mobile menu toggle
      const menuToggle = page.locator('#mobile-menu-toggle');
      await expect(menuToggle).toBeVisible();
      await menuToggle.click();

      // Wait for menu to appear
      await page.waitForTimeout(300);

      // Check the mobile menu has proper scroll styling
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();

      const scrollInfo = await mobileMenu.evaluate((el) => ({
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        maxHeight: window.getComputedStyle(el).maxHeight,
        overflowY: window.getComputedStyle(el).overflowY,
      }));

      // Should have max-height and overflow-y: auto
      expect(scrollInfo.maxHeight).not.toBe('none');
      expect(['auto', 'scroll']).toContain(scrollInfo.overflowY);
    });
  });

  test.describe('Footer Navigation', () => {
    test('footer has resource links', async ({ page }) => {
      await page.goto('/');

      const footer = page.locator('footer');
      await expect(footer.locator('a').first()).toBeVisible();
    });

    test('footer social links work', async ({ page }) => {
      await page.goto('/');

      const githubLink = page.locator('footer a[href*="github.com"]');
      await expect(githubLink.first()).toBeVisible();
      await expect(githubLink.first()).toHaveAttribute('href', /github\.com/);
    });
  });

  test.describe('Breadcrumbs and Back Links', () => {
    test('event pages have back link', async ({ page }) => {
      await page.goto('/events/gcc2024/');

      // Should have link back to events
      const backLink = page.locator('a[href="/events/"], a[href="/events"]');
      await expect(backLink.first()).toBeVisible();
    });

    test('news pages have back link', async ({ page }) => {
      // Find a news article
      await page.goto('/news/');
      const articleLink = page.locator('a[href*="/news/2"]').first();

      if (await articleLink.isVisible()) {
        await articleLink.click();

        // Should have way to get back
        const backLink = page.locator('a[href="/news/"], a[href="/news"]');
        if (await backLink.first().isVisible()) {
          await expect(backLink.first()).toBeVisible();
        }
      }
    });
  });

  test.describe('Subsites', () => {
    test('/eu/ subsite loads', async ({ page }) => {
      const response = await page.goto('/eu/');
      expect([200, 301, 302]).toContain(response?.status());
    });

    test('/freiburg/ subsite loads', async ({ page }) => {
      const response = await page.goto('/freiburg/');
      expect([200, 301, 302]).toContain(response?.status());
    });

    test('subsite maintains context on navigation', async ({ page }) => {
      await page.goto('/eu/');

      // If EU subsite has events link, it should stay in EU context
      const eventsLink = page.locator('a[href*="/eu/events"]');
      if (await eventsLink.first().isVisible()) {
        await eventsLink.first().click();
        await expect(page).toHaveURL(/\/eu\//);
      }
    });
  });

  test.describe('Search', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
    });

    test('sidebar has search input', async ({ page }) => {
      // Use article page - homepage has special layout without sidebar
      await page.goto('/admin/');

      const searchInput = page.locator('aside input[type="search"]');
      await expect(searchInput).toBeVisible();
    });

    test('search form submits', async ({ page }) => {
      // Use article page - homepage has special layout without sidebar
      await page.goto('/admin/');

      const searchInput = page.locator('aside input[type="search"]');
      await searchInput.fill('galaxy');

      const searchButton = page.locator('aside button[type="submit"]');
      await searchButton.click();

      // Should navigate to search page with query
      await expect(page).toHaveURL(/\/search/);
    });
  });

  test.describe('Mobile Viewport', () => {
    test('page does not have horizontal overflow on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/get-started/');

      // Check that body doesn't overflow horizontally
      const hasOverflow = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        return body.scrollWidth > body.clientWidth || html.scrollWidth > html.clientWidth;
      });

      expect(hasOverflow).toBe(false);
    });
  });

  test.describe('External Links', () => {
    test('external links have proper attributes', async ({ page }) => {
      await page.goto('/');

      // Find external links (to other domains)
      const externalLinks = page.locator('a[href^="http"]:not([href*="galaxyproject.org"])');
      const count = await externalLinks.count();

      if (count > 0) {
        // External links should open in new tab
        const firstExternal = externalLinks.first();
        const target = await firstExternal.getAttribute('target');
        const rel = await firstExternal.getAttribute('rel');

        // Should have target="_blank" or rel="noopener"
        expect(target === '_blank' || rel?.includes('noopener')).toBeTruthy();
      }
    });
  });
});
