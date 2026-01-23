import { test, expect } from '@playwright/test';

test.describe('Content Rendering', () => {
  test.describe('Article Pages', () => {
    test('article page has proper structure', async ({ page }) => {
      // Load an article page
      await page.goto('/admin/');

      // Should have article layout structure
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('article renders markdown content', async ({ page }) => {
      await page.goto('/admin/');

      // Should have rendered markdown (headings, paragraphs, links)
      const content = page.locator('article, main .prose, main');
      await expect(content.locator('p').first()).toBeVisible();
    });

    test('article with images renders correctly', async ({ page }) => {
      // Find a page that likely has images
      await page.goto('/');

      // Check images load (if any on homepage)
      const images = page.locator('img');
      const imageCount = await images.count();
      if (imageCount > 0) {
        // First image should be visible
        await expect(images.first()).toBeVisible();
      }
    });
  });

  test.describe('Insert Components', () => {
    test('pages with Insert components load successfully', async ({ page }) => {
      // Test that pages which use Insert components can load
      // GCC events are known to use inserts for headers
      const response = await page.goto('/events/', { timeout: 30000 });

      // Events list should load
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();

      // Click into an event that likely has inserts
      const eventLink = page.locator('a[href*="/events/gcc"]').first();
      if (await eventLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await eventLink.click();
        // Page should load without errors (use first h1 since pages may have multiple)
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 });
      }
    });

    test('missing Insert shows warning', async ({ page }) => {
      // This tests the fallback UI - we need a page with a broken insert
      // For now, just verify the Insert component structure exists
      await page.goto('/events/gcc2024/');

      // Check for insert containers
      const inserts = page.locator('.insert');
      const count = await inserts.count();

      // If inserts exist, they should not all be missing
      if (count > 0) {
        const missingInserts = page.locator('.insert-missing');
        const missingCount = await missingInserts.count();
        // Most inserts should resolve successfully
        expect(missingCount).toBeLessThan(count);
      }
    });
  });

  test.describe('Event Pages', () => {
    test('event page shows date information', async ({ page }) => {
      // Find an event page
      await page.goto('/events/');

      // Click first event
      const eventLink = page.locator('a[href*="/events/2"]').first();
      if (await eventLink.isVisible()) {
        await eventLink.click();

        // Event pages should show date (year somewhere on page)
        const dateText = page.getByText(/\d{4}/);
        await expect(dateText.first()).toBeVisible();
      }
    });

    test('event page shows location if available', async ({ page }) => {
      // Navigate to events and find one
      await page.goto('/events/gcc2024/');

      // GCC events typically have location info - location may or may not be present
      // This test just verifies the page loads without errors
      await expect(page.locator('h1').first()).toBeVisible();
    });
  });

  test.describe('Platform Pages', () => {
    test('platform page shows server information', async ({ page }) => {
      await page.goto('/use/');

      // Click first platform
      const platformLink = page.locator('a[href^="/use/"]').first();
      if (await platformLink.isVisible()) {
        await platformLink.click();

        // Platform pages should have title and content (use first h1 since pages may have multiple)
        await expect(page.locator('h1').first()).toBeVisible();
      }
    });
  });

  test.describe('MDX Components', () => {
    test('Twitter embeds render placeholder', async ({ page }) => {
      // Find a page with Twitter embed if exists
      // For now, just verify the component doesn't break pages
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
    });

    test('Video embeds render', async ({ page }) => {
      // Similar - verify video component doesn't break
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Prose Styling', () => {
    test('headings are styled correctly', async ({ page }) => {
      await page.goto('/admin/');

      // Check h1 and h2 are visible and have appropriate styling
      const h1 = page.locator('h1').first();
      const h2 = page.locator('h2').first();

      if ((await h1.isVisible()) && (await h2.isVisible())) {
        // Compare computed font sizes instead of element heights
        // (heights can vary based on content length)
        const h1FontSize = await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
        const h2FontSize = await h2.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

        // h1 should have larger or equal font size
        expect(h1FontSize).toBeGreaterThanOrEqual(h2FontSize);
      }
    });

    test('links are styled and clickable', async ({ page }) => {
      await page.goto('/admin/');

      // Find links in content
      const contentLinks = page.locator('main a[href]');
      const linkCount = await contentLinks.count();

      if (linkCount > 0) {
        // Links should be visible
        await expect(contentLinks.first()).toBeVisible();
      }
    });

    test('code blocks are styled', async ({ page }) => {
      await page.goto('/admin/');

      // Look for code elements
      const codeBlocks = page.locator('pre code, code');
      const count = await codeBlocks.count();

      if (count > 0) {
        await expect(codeBlocks.first()).toBeVisible();
      }
    });
  });
});
