import { test, expect } from '@playwright/test';

test.describe('Phase 1: Foundation Setup', () => {
  test('dev server responds and loads homepage', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    expect(await page.title()).toContain('Galaxy');
  });

  test('page has correct HTML structure', async ({ page }) => {
    await page.goto('/');

    // Should have proper HTML document structure
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('head meta[name="viewport"]')).toBeAttached();
    await expect(page.locator('head meta[name="description"]')).toBeAttached();

    // Should have main layout structure (sidebar + main content)
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Tailwind classes apply correctly', async ({ page }) => {
    await page.goto('/');

    // Check that Galaxy color classes are applied
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();

    // Verify main content area is visible and uses Tailwind
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check article pages have proper body classes
    await page.goto('/admin/');
    const body = page.locator('body');
    await expect(body).toHaveClass(/bg-background/);
  });

  test('shadcn button component renders', async ({ page }) => {
    // Use an article page that has sidebar with search button
    await page.goto('/admin/');

    // Find buttons on the page (from shadcn components)
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible();

    // Check that search submit button is present in sidebar
    await page.setViewportSize({ width: 1280, height: 800 });
    const searchBtn = page.locator('aside button[type="submit"]');
    await expect(searchBtn).toBeVisible();
  });

  test('sidebar visible on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    // Use an article page - homepage has special layout without sidebar
    await page.goto('/admin/');

    // Sidebar should be visible on desktop (lg:flex)
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Check sidebar contains navigation elements
    await expect(sidebar.locator('a[href="/"]').first()).toBeVisible();
    await expect(sidebar.locator('input[type="search"]')).toBeVisible();
  });

  test('sidebar hidden on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    // Use an article page - homepage has special layout
    await page.goto('/admin/');

    // Sidebar should be hidden on mobile (hidden lg:flex)
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeHidden();

    // Mobile menu button should be visible instead
    const mobileMenuBtn = page.locator('button[aria-label="Open menu"]');
    await expect(mobileMenuBtn).toBeVisible();
  });

  test('shadcn Card components render', async ({ page }) => {
    await page.goto('/');

    // Homepage has pillar cards for feature showcase
    const cards = page.locator('.pillar-card');
    await expect(cards.first()).toBeVisible();

    // Check that pillar content is present
    await expect(page.getByText('Analyze')).toBeVisible();
    await expect(page.getByText('Reproduce')).toBeVisible();
  });

  test('footer renders with proper structure', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer should contain expected sections
    await expect(footer.getByRole('heading', { name: 'Galaxy Project' })).toBeVisible();
    await expect(footer.getByText('Resources').first()).toBeVisible();
    await expect(footer.getByText('Community').first()).toBeVisible();

    // Footer should have social links
    await expect(footer.locator('a[href*="github.com/galaxyproject"]')).toBeVisible();
  });

  test('Galaxy branding colors are applied', async ({ page }) => {
    await page.goto('/');

    // Hero section should use Galaxy styling (custom CSS class)
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();

    // Homepage footer uses custom styling
    const homeFooter = page.locator('.home-footer');
    await expect(homeFooter).toBeVisible();

    // Test sidebar and standard footer on article page
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/admin/');
    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveClass(/bg-galaxy-dark/);
    // Use the main page footer (not article footer)
    const footer = page.locator('footer.bg-galaxy-dark');
    await expect(footer).toBeVisible();
  });
});
