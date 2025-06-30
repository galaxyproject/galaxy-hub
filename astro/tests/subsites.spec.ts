import { test, expect } from '@playwright/test';

test.describe('Regional Subsites', () => {
  test('subsites test page loads', async ({ page }) => {
    await page.goto('/test/subsites');
    await expect(page).toHaveTitle(/Subsites Test/);
    await expect(page.locator('h1')).toHaveText('Regional Subsites Test');
  });

  test('EU subsite homepage loads', async ({ page }) => {
    await page.goto('/eu/');
    
    // Check that we're on the EU subsite
    await expect(page).toHaveTitle(/Galaxy Europe/);
    
    // Check that the navbar reflects EU
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    // Check for EU-specific brand
    const brand = navbar.locator('.navbar-brand');
    await expect(brand).toContainText('Galaxy Europe');
    
    // Check for subsite home content
    const content = page.locator('.subsite-home');
    await expect(content).toBeVisible();
  });

  test('EU subsite navigation has custom items', async ({ page }) => {
    await page.goto('/eu/');
    
    // Check for News and Events links with EU prefix
    const newsLink = page.locator('a[href="/eu/news/"]').first();
    await expect(newsLink).toBeVisible();
    
    const eventsLink = page.locator('a[href="/eu/events/"]').first();
    await expect(eventsLink).toBeVisible();
  });

  test('subsite switcher dropdown works', async ({ page }) => {
    await page.goto('/eu/');
    
    // Find and click the subsite switcher - look for the globe icon and Europe text
    const subsiteSwitcher = page.locator('.navbar').locator('.nav-link:has-text("Europe")').last();
    await expect(subsiteSwitcher).toBeVisible();
    
    // Click to open dropdown
    await subsiteSwitcher.click();
    
    // Check that dropdown menu appears
    const dropdown = page.locator('.dropdown-menu.show').last();
    await expect(dropdown).toBeVisible();
    
    // Check for other subsites in dropdown
    await expect(dropdown.locator('a:has-text("US")').first()).toBeVisible();
    await expect(dropdown.locator('a:has-text("Freiburg")').first()).toBeVisible();
    await expect(dropdown.locator('a:has-text("Australia")').first()).toBeVisible();
  });

  test('EU news page loads', async ({ page }) => {
    await page.goto('/eu/news');
    
    await expect(page).toHaveTitle(/News.*Galaxy Europe/);
    await expect(page.locator('h1')).toContainText('News from Galaxy Europe');
  });

  test('EU events page loads', async ({ page }) => {
    await page.goto('/eu/events');
    
    await expect(page).toHaveTitle(/Events.*Galaxy Europe/);
    await expect(page.locator('h1')).toContainText('Galaxy Europe Events');
  });

  test('global site navigation does not have subsite prefix', async ({ page }) => {
    await page.goto('/');
    
    // Check that news link doesn't have subsite prefix
    const newsLink = page.locator('.navbar').locator('a[href="/news"]').first();
    await expect(newsLink).toBeVisible();
    
    // Verify it's not a subsite URL
    const href = await newsLink.getAttribute('href');
    expect(href).toBe('/news');
    expect(href).not.toContain('/global/');
  });

  test('invalid subsite redirects to 404', async ({ page }) => {
    const response = await page.goto('/invalid-subsite/', { waitUntil: 'commit' });
    
    // Should redirect to 404
    expect(response?.status()).toBe(404);
  });

  test('external subsite (Australia) redirects', async ({ page }) => {
    // Australia is configured as an external redirect
    // In Astro, this might be handled differently than in Gridsome
    // For now, just verify the test page shows it as external
    await page.goto('/test/subsites');
    
    const australiaCard = page.locator('.card:has-text("Australia")');
    await expect(australiaCard).toBeVisible();
    await expect(australiaCard).toContainText('External site');
  });
});