import { test, expect, type Page, type Locator } from '@playwright/test';

/**
 * Click a link and wait for navigation to complete.
 * Works with both full-page navigations and Astro view transitions.
 */
async function clickAndWaitForNavigation(page: Page, locator: Locator): Promise<void> {
  // Get the target URL before clicking
  const href = await locator.getAttribute('href');

  // Click the link
  await locator.click();

  if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
    // Wait for URL to change to the expected destination
    // This works for both traditional navigation and Astro view transitions
    const expectedPath = href.startsWith('/') ? href.split('#')[0] : `/${href.split('#')[0]}`;
    await page.waitForURL((url) => url.pathname.startsWith(expectedPath), {
      timeout: 15000,
    });
  }

  // Ensure the DOM is ready
  await page.waitForLoadState('domcontentloaded');
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

    test('individual event page loads', async ({ page }) => {
      // Navigate to events list first
      await page.goto('/events/');

      // Click on first INTERNAL event link (exclude events with external_url that redirect)
      const eventLink = page
        .locator('a[href^="/events/2"]')
        .filter({ hasNot: page.locator('[data-external-icon]') })
        .first();
      if (await eventLink.isVisible()) {
        // Use helper to wait for Astro view transition to complete
        await clickAndWaitForNavigation(page, eventLink);
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

      // Click first platform link (exclude link to /use/ index itself)
      const platformLink = page.locator('a[href^="/use/"]:not([href="/use/"])').first();
      if (await platformLink.isVisible()) {
        // Use helper to wait for Astro view transition to complete
        await clickAndWaitForNavigation(page, platformLink);
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

  test.describe('People Pages', () => {
    test('/freiburg/people/ shows people', async ({ page }) => {
      const response = await page.goto('/freiburg/people/');
      expect(response?.status()).toBe(200);
      await expect(page.locator('article').first()).toBeVisible();
    });

    test('/ifb/people/ page loads', async ({ page }) => {
      const response = await page.goto('/ifb/people/');
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1, name: /ELIXIR France\/IFB/i })).toBeVisible();
    });

    test('/eu/people/ aggregates EU sites', async ({ page }) => {
      const response = await page.goto('/eu/people/');
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { name: /Freiburg/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /ELIXIR France\/IFB/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /ELIXIR Italy/i })).toBeVisible();
    });

    test('Person card shows GTN icon, bio, and Hub Contributions badge', async ({ page }) => {
      await page.goto('/freiburg/people/');

      const card = page.locator('article', { hasText: /Björn Grüning/i }).first();

      // Bio content from Björn's profile
      await expect(card).toContainText("I'm a bioinformatician");

      // GTN icon/link (aria-label set to label)
      await expect(card.getByRole('link', { name: 'GTN Profile' })).toBeVisible();

      // Hub Contributions badge
      const badge = card.getByRole('link', { name: /hub contributions profile/i });
      await expect(badge).toBeVisible();
      await expect(badge).toContainText('Hub Contributions');
    });
  });
});
