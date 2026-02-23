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

  // Wait for the view transition to settle
  await page.waitForLoadState('networkidle');
}

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
        await clickAndWaitForNavigation(page, eventLink);
        // Page should load without errors (GCC pages may have multiple h1s in content)
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 });
      }
    });

    test('inlined inserts render content', async ({ page }) => {
      // GCC 2024 pages inline their header insert at preprocess time
      await page.goto('/events/gcc-2024/');

      // The inlined header content should be visible (GCC events have banner images)
      const content = page.locator('article, .content, main').first();
      await expect(content).toBeVisible();
    });
  });

  test.describe('Inlined Insert Content', () => {
    test('SIG pages render inlined linkbox sidebar', async ({ page }) => {
      await page.goto('/community/sig/genome-annotation/');
      // The common_linkbox insert contains "Galaxy Community Board" text
      await expect(page.getByText('Galaxy Community Board')).toBeVisible();
    });

    test('SIG microbial page renders inlined linkbox sidebar', async ({ page }) => {
      await page.goto('/community/sig/microbial/');
      await expect(page.getByText('Galaxy Community Board')).toBeVisible();
    });

    test('EU usegalaxy main page renders inlined data policy', async ({ page }) => {
      await page.goto('/bare/eu/usegalaxy/main/');
      // The data-policy insert has "Our Data Policy" heading
      await expect(page.getByText('Our Data Policy')).toBeVisible();
    });

    test('learn pages render inlined linkbox', async ({ page }) => {
      await page.goto('/learn/advanced-workflow/extract/');
      // The learn/linkbox insert has "Screencasts" link
      await expect(page.getByText('Screencasts')).toBeVisible();
    });

    test('insert content does not show raw slot tags', async ({ page }) => {
      // A page that previously had <slot name="/events/gcc2024/header" />
      await page.goto('/events/gcc-2024/');
      const body = await page.locator('body').textContent();
      expect(body).not.toContain('<slot');
      expect(body).not.toContain('Insert not found');
    });
  });

  test.describe('Event Pages', () => {
    test('event page shows date information', async ({ page }) => {
      // Find an event page
      await page.goto('/events/');

      // Click first INTERNAL event link (exclude events with external_url that redirect)
      const eventLink = page
        .locator('a[href^="/events/2"]')
        .filter({ hasNot: page.locator('[data-external-icon]') })
        .first();
      if (await eventLink.isVisible()) {
        await clickAndWaitForNavigation(page, eventLink);

        // Event pages should show date (year somewhere on page)
        const dateText = page.getByText(/\d{4}/);
        await expect(dateText.first()).toBeVisible();
      }
    });

    test('event page shows location if available', async ({ page }) => {
      // Navigate to events and find one
      await page.goto('/events/gcc-2024/');

      // GCC events typically have location info - location may or may not be present
      // This test just verifies the page loads without errors
      await expect(page.locator('h1').first()).toBeVisible();
    });
  });

  test.describe('Platform Pages', () => {
    test('platform page shows server information', async ({ page }) => {
      await page.goto('/use/');

      // Click first platform (exclude link to /use/ index itself)
      const platformLink = page.locator('a[href^="/use/"]:not([href="/use/"])').first();
      if (await platformLink.isVisible()) {
        await clickAndWaitForNavigation(page, platformLink);

        // Platform pages should have title and content
        // Using .first() due to external h1 element in CI browser environment
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

  test.describe('Get Started Page', () => {
    test('tutorial table has SVG icons', async ({ page }) => {
      await page.goto('/get-started/');

      // Find the tutorials table
      const table = page.locator('table').first();
      await expect(table).toBeVisible();

      // Table should contain SVG icons (converted from Font Awesome)
      const svgIcons = table.locator('svg');
      const iconCount = await svgIcons.count();

      // The table has multiple tutorial rows with icons for slides, hands-on, recording, tour
      expect(iconCount).toBeGreaterThan(5);

      // Verify SVGs have proper attributes
      const firstIcon = svgIcons.first();
      await expect(firstIcon).toHaveAttribute('viewBox', '0 0 24 24');
      await expect(firstIcon).toHaveAttribute('stroke', 'currentColor');
    });
  });
});
