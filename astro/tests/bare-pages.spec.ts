import { test, expect } from '@playwright/test';

test.describe('Bare Pages', () => {
  test.describe('EU Events', () => {
    test('/bare/eu/events/ loads with table layout', async ({ page }) => {
      const response = await page.goto('/bare/eu/events/');
      expect(response?.status()).toBe(200);

      // Insert header from /eu/events/main should render
      const insert = page.locator('.insert[data-name="/eu/events/main"]');
      await expect(insert).toBeVisible();

      // Table should have correct column headers
      const table = page.locator('table.events-table').first();
      await expect(table).toBeVisible();
      await expect(table.locator('th')).toContainText(['Date', 'Topic/Event', 'Venue/Location', 'Contact']);
    });

    test('/bare/eu/events/ has upcoming and/or recent sections', async ({ page }) => {
      await page.goto('/bare/eu/events/');

      // At least one section with a table should exist
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThan(0);

      // Section headers (inside <section>) should describe the time period
      const sectionHeading = sections.first().locator('h3');
      await expect(sectionHeading).toBeVisible();
      const text = await sectionHeading.textContent();
      expect(text).toMatch(/upcoming|recent/i);
    });

    test('/bare/eu/events/ table rows have event links', async ({ page }) => {
      await page.goto('/bare/eu/events/');

      const firstRow = page.locator('table.events-table tbody tr').first();
      if (await firstRow.isVisible()) {
        // Date column should have content
        const dateCell = firstRow.locator('td').first();
        const dateText = await dateCell.textContent();
        expect(dateText?.trim().length).toBeGreaterThan(0);

        // Topic column should have a link
        const topicLink = firstRow.locator('td').nth(1).locator('a');
        await expect(topicLink).toBeVisible();
      }
    });
  });

  test.describe('EU News', () => {
    test('/bare/eu/news/ loads with table layout', async ({ page }) => {
      const response = await page.goto('/bare/eu/news/');
      expect(response?.status()).toBe(200);

      // Insert header from /eu/news/main should render
      const insert = page.locator('.insert[data-name="/eu/news/main"]');
      await expect(insert).toBeVisible();

      // Table should have correct column headers
      const table = page.locator('table.news-table');
      await expect(table).toBeVisible();
      await expect(table.locator('th')).toContainText(['Date', 'Title', 'Tease']);
    });

    test('/bare/eu/news/ table rows have article links', async ({ page }) => {
      await page.goto('/bare/eu/news/');

      const firstRow = page.locator('table.news-table tbody tr').first();
      await expect(firstRow).toBeVisible();

      // Title column should have a link
      const titleLink = firstRow.locator('td').nth(1).locator('a');
      await expect(titleLink).toBeVisible();
    });
  });

  test.describe('FR Events', () => {
    test('/bare/fr/events/ loads with table layout', async ({ page }) => {
      const response = await page.goto('/bare/fr/events/');
      expect(response?.status()).toBe(200);

      await expect(page.locator('h2')).toContainText('Galaxy France Events');

      // Table should be present (may have upcoming and/or recent sections)
      const table = page.locator('table.events-table').first();
      await expect(table).toBeVisible();
      await expect(table.locator('th')).toContainText(['Date', 'Topic/Event', 'Venue/Location', 'Contact']);
    });
  });

  test.describe('FR News', () => {
    test('/bare/fr/news/ loads with table layout', async ({ page }) => {
      const response = await page.goto('/bare/fr/news/');
      expect(response?.status()).toBe(200);

      await expect(page.locator('h2')).toContainText('Galaxy France News');

      const table = page.locator('table.news-table');
      await expect(table).toBeVisible();
      await expect(table.locator('th')).toContainText(['Date', 'Title', 'Tease']);
    });
  });

  test.describe('EU Latest News (iframe feed)', () => {
    test('/bare/eu/latest/news/ loads with compact feed', async ({ page }) => {
      const response = await page.goto('/bare/eu/latest/news/');
      expect(response?.status()).toBe(200);

      // Should show news items
      const newsItems = page.locator('.news-item');
      await expect(newsItems.first()).toBeVisible();

      // Each news item should have a link
      const firstLink = newsItems.first().locator('a');
      await expect(firstLink).toBeVisible();

      // Should have "More news" link
      const moreLink = page.locator('.more-link');
      await expect(moreLink).toBeVisible();
      await expect(moreLink).toContainText('More news');
    });
  });

  test.describe('EU Latest Events (iframe feed)', () => {
    test('/bare/eu/latest/events/ loads with compact feed', async ({ page }) => {
      const response = await page.goto('/bare/eu/latest/events/');
      expect(response?.status()).toBe(200);

      // Should show event items or "No upcoming events"
      const feed = page.locator('.events-feed');
      await expect(feed).toBeVisible();

      // Should have "More events" link
      const moreLink = page.locator('.more-link');
      await expect(moreLink).toBeVisible();
      await expect(moreLink).toContainText('More events');
    });
  });

  test.describe('FR Latest News (iframe feed)', () => {
    test('/bare/fr/latest/news/ loads with compact feed', async ({ page }) => {
      const response = await page.goto('/bare/fr/latest/news/');
      expect(response?.status()).toBe(200);

      const newsItems = page.locator('.news-item');
      await expect(newsItems.first()).toBeVisible();

      const moreLink = page.locator('.more-link');
      await expect(moreLink).toBeVisible();
      await expect(moreLink).toContainText('More news');
    });
  });

  test.describe('FR Latest Events (iframe feed)', () => {
    test('/bare/fr/latest/events/ loads with compact feed', async ({ page }) => {
      const response = await page.goto('/bare/fr/latest/events/');
      expect(response?.status()).toBe(200);

      const feed = page.locator('.events-feed');
      await expect(feed).toBeVisible();

      const moreLink = page.locator('.more-link');
      await expect(moreLink).toBeVisible();
      await expect(moreLink).toContainText('More events');
    });
  });

  test.describe('Bare Article Pages (dynamic routes)', () => {
    test('/bare/eu/usegalaxy/main/ renders with MDX components', async ({ page }) => {
      const response = await page.goto('/bare/eu/usegalaxy/main/');
      expect(response?.status()).toBe(200);

      // Should have Insert content rendered
      const allInserts = page.locator('.insert');
      const totalInserts = await allInserts.count();
      expect(totalInserts).toBeGreaterThan(0);

      // Iframes for latest news/events feeds should be present
      const iframes = page.locator('iframe.resize-y');
      const iframeCount = await iframes.count();
      expect(iframeCount).toBe(2);
    });

    test('/bare/eu/usegalaxy/main/ has no bare layout chrome', async ({ page }) => {
      await page.goto('/bare/eu/usegalaxy/main/');

      // Bare pages should not have sidebar or footer navigation
      const sidebar = page.locator('nav.sidebar, [data-sidebar]');
      expect(await sidebar.count()).toBe(0);

      const footer = page.locator('footer nav, footer .footer-links');
      expect(await footer.count()).toBe(0);
    });
  });
});
