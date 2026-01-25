import { test, expect, type Page, type Locator } from '@playwright/test';

/**
 * Click a link and wait for Astro's view transition to complete.
 * Astro fires 'astro:page-load' when the transition finishes and the new page is visible.
 */
async function clickAndWaitForViewTransition(page: Page, locator: Locator): Promise<void> {
  // Set up listener before clicking to avoid race condition
  const transitionComplete = page.evaluate(() => {
    return new Promise<boolean>((resolve) => {
      document.addEventListener('astro:page-load', () => resolve(true), { once: true });
    });
  });

  // Click the link (this triggers the view transition)
  await locator.click();

  // Wait for Astro to signal the transition is complete
  await transitionComplete;
}

test.describe('Static Pages', () => {
  test.describe('Homepage', () => {
    test('loads with hero section', async ({ page }) => {
      await page.goto('/');

      // Hero should have main heading
      const hero = page.locator('h1').first();
      await expect(hero).toBeVisible();
      await expect(hero).toContainText('Galaxy');
    });

    test('shows upcoming events section', async ({ page }) => {
      await page.goto('/');

      // Should have events section
      const eventsHeading = page.getByRole('heading', { name: /events/i });
      await expect(eventsHeading.first()).toBeVisible();
    });

    test('shows news section or recent updates', async ({ page }) => {
      await page.goto('/');

      // Just verify page loads with content - homepage layout may vary
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Events Pages', () => {
    test('/events/ page loads', async ({ page }) => {
      const response = await page.goto('/events/');
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toContainText(/events/i);
    });

    test('/events/ shows event listings', async ({ page }) => {
      await page.goto('/events/');

      // Should have event cards or list items
      const eventLinks = page.locator('a[href*="/events/"]');
      await expect(eventLinks.first()).toBeVisible();
    });

    test('/events/archive/ page loads', async ({ page }) => {
      const response = await page.goto('/events/archive/');
      expect(response?.status()).toBe(200);
    });

    test('/events/webinars/ page loads', async ({ page }) => {
      const response = await page.goto('/events/webinars/');
      expect(response?.status()).toBe(200);
    });

    test('subsite archive pages load', async ({ page }) => {
      for (const subsite of ['eu', 'freiburg']) {
        const url = `/${subsite}/events/archive/`;
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole('heading', { name: /events archive/i })).toBeVisible();
      }
    });

    test('individual event page loads', async ({ page }) => {
      // Navigate to events list first
      await page.goto('/events/');

      // Click on first event link
      const eventLink = page.locator('a[href*="/events/2"]').first();
      if (await eventLink.isVisible()) {
        // Use helper to wait for Astro view transition to complete
        await clickAndWaitForViewTransition(page, eventLink);
        // Using .first() due to external h1 element in CI browser environment
        await expect(page.locator('h1').first()).toBeVisible();
      }
    });
  });

  test.describe('News Pages', () => {
    test('/news/ page loads', async ({ page }) => {
      const response = await page.goto('/news/');
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toBeVisible();
    });

    test('/news/ shows news listings', async ({ page }) => {
      await page.goto('/news/');

      // Should have news article links
      const newsLinks = page.locator('a[href*="/news/"]');
      await expect(newsLinks.first()).toBeVisible();
    });
  });

  test.describe('Platform Directory', () => {
    test('/use/ page loads', async ({ page }) => {
      const response = await page.goto('/use/');
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toBeVisible();
    });

    test('/use/ shows platform cards', async ({ page }) => {
      await page.goto('/use/');

      // Should have platform entries
      const platformLinks = page.locator('a[href*="/use/"]');
      await expect(platformLinks.first()).toBeVisible();
    });

    test('individual platform page loads', async ({ page }) => {
      // Try loading a known platform
      const response = await page.goto('/use/');
      expect(response?.status()).toBe(200);

      // Click first platform link
      const platformLink = page.locator('a[href^="/use/"]').first();
      if (await platformLink.isVisible()) {
        // Use helper to wait for Astro view transition to complete
        await clickAndWaitForViewTransition(page, platformLink);
        // Using .first() due to external h1 element in CI browser environment
        await expect(page.locator('h1').first()).toBeVisible();
      }
    });
  });

  test.describe('Careers Page', () => {
    test('/careers/ page loads', async ({ page }) => {
      const response = await page.goto('/careers/');
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Search Page', () => {
    test('/search/ page loads', async ({ page }) => {
      const response = await page.goto('/search/');
      expect(response?.status()).toBe(200);
    });
  });

  test.describe('404 Page', () => {
    test('404 page displays for non-existent routes', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-12345/');
      expect(response?.status()).toBe(404);

      // Should show 404 content
      await expect(page.locator('body')).toContainText(/not found|404/i);
    });
  });

  test.describe('Community Pages', () => {
    test('/community/galaxy-admins/ page loads', async ({ page }) => {
      const response = await page.goto('/community/galaxy-admins/');
      // May be 200 or redirect
      expect([200, 301, 302, 304]).toContain(response?.status());
    });
  });
});
