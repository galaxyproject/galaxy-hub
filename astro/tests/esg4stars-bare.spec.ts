import { test, expect } from '@playwright/test';

// Bare copy of the ESG4Stars overview for iframes on partner sites: the same sections as
// /projects/esg4stars/ without the Hub chrome, every link absolute and in a new tab.
// Its sitemap exclusion is build-only and covered by src/build/sitemap-pages.test.mjs.
const path = '/bare/projects/esg4stars/';

test.describe('ESG4Stars bare overview', () => {
  test('shows the head and every overview section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    const head = page.locator('.project-bare-head');
    await expect(head.getByRole('heading', { level: 1 })).toHaveText('ESG4Stars');
    await expect(head.locator('[data-project-status="active"]')).toHaveText('Active');
    await expect(head).toContainText('reduce the environmental footprint of scientific computing');
    const logo = head.locator('img');
    await expect(logo).toHaveAttribute('src', '/images/projects/esg4stars/logo_esg4stars.svg');
    expect(await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);

    const facts = page.getByRole('region', { name: 'Project facts' });
    await expect(facts).toHaveCount(1);
    await expect(facts).toContainText('Oct 2026 – Sep 2029 (36 months)');

    await expect(page.getByRole('heading', { level: 2, name: 'Project Summary' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Five pillars' }).getByRole('listitem')).toHaveCount(5);
    await expect(page.getByRole('region', { name: /Project architecture/ }).getByRole('listitem')).toHaveCount(4);
    const news = await page.locator('[data-project-list="news"] > li').count();
    expect(news).toBeGreaterThan(0);
    expect(news).toBeLessThanOrEqual(6);
    await expect(page.getByRole('region', { name: /events$/i })).toHaveCount(1);
    await expect(page.getByRole('region', { name: 'Project Partners' }).locator('tbody tr')).toHaveCount(13);
    await expect(page.getByRole('region', { name: 'Funding' })).toContainText('Grant Agreement number 101290798');
  });

  test('has no Hub chrome', async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('.site-sidebar, header, footer, nav')).toHaveCount(0);
    await expect(page.locator('.project-tabs, .project-toc, [data-toc]')).toHaveCount(0);
    await expect(page.getByRole('complementary', { name: 'Project facts and contents' })).toHaveCount(0);
  });

  test('links point at the Hub with absolute URLs and open in a new tab', async ({ page, request }) => {
    // Server HTML, before the bare-page script adds targets in the browser
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const anchors = html.match(/<a\b[^>]*>/g) ?? [];
    expect(anchors.length).toBeGreaterThan(20);
    for (const anchor of anchors) {
      const href = anchor.match(/\shref="([^"]*)"/)?.[1] ?? '';
      if (href.startsWith('#')) continue;
      expect(href, anchor).toMatch(/^https:\/\//);
      expect(anchor, href).toContain('target="_blank"');
      expect(anchor, href).toMatch(/\srel="[^"]*noopener/);
    }

    await page.goto(path);
    const facts = page.getByRole('region', { name: 'Project facts' });
    await expect(facts.getByRole('link', { name: 'EuroScienceGateway' })).toHaveAttribute(
      'href',
      'https://galaxyproject.org/projects/esg/'
    );
    await expect(facts.getByRole('link', { name: '13 organisations' })).toHaveAttribute('href', '#partners');
    const allNews = page.getByRole('region', { name: 'News' }).getByRole('link', { name: /^All \d+ news/ });
    await expect(allNews).toHaveAttribute('href', 'https://galaxyproject.org/projects/esg4stars/news/');
    const rowHrefs = await page
      .locator('[data-project-list] a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    for (const href of rowHrefs) expect(href).toMatch(/^https:\/\/galaxyproject\.org\/(news|events)\//);
  });

  test('points search engines at the Hub page with a canonical link, not noindex', async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://galaxyproject.org/projects/esg4stars/'
    );
  });

  test('fits a 390px phone without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    expect((await page.goto(path))?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    const overflowing = await page.evaluate(() => {
      const limit = document.documentElement.clientWidth + 1;
      return [...document.querySelectorAll<HTMLElement>('main *')]
        .filter((el) => el.getClientRects().length > 0 && !el.closest('.sr-only'))
        .filter((el) => el.getBoundingClientRect().right > limit)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80));
    });
    expect(overflowing).toEqual([]);
  });
});
