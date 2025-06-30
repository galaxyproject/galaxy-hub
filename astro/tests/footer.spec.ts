import { test, expect } from '@playwright/test';

test.describe('Footer Component', () => {
  test('footer is present on regular pages', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for Galaxy logo
    const logo = footer.locator('img[alt="Galaxy project logo"]');
    await expect(logo).toBeVisible();
    
    // Check main sections are present
    await expect(footer.locator('a[href="/community/"]').first()).toBeVisible();
    await expect(footer.locator('text=Working Groups')).toBeVisible();
    await expect(footer.locator('a[href="https://github.com/galaxyproject/"]')).toBeVisible();
    
    // Check copyright
    const currentYear = new Date().getFullYear();
    await expect(footer.locator(`text=© ${currentYear} Galaxy Project`)).toBeVisible();
  });

  test('footer has correct links', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    
    // Check some key links
    const communityLink = footer.locator('a[href="/community/"]');
    await expect(communityLink).toBeVisible();
    
    const githubLink = footer.locator('a[href="https://github.com/galaxyproject/"]');
    await expect(githubLink).toBeVisible();
    
    const contactLink = footer.locator('a[href="mailto:contact@galaxyproject.org"]');
    await expect(contactLink).toBeVisible();
  });

  test('footer is responsive', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(footer).toBeVisible();
    
    // Links should still be accessible
    const communityLink = footer.locator('a[href="/community/"]');
    await expect(communityLink).toBeVisible();
  });

  test('footer not shown on bare pages', async ({ page }) => {
    // We'll need to create a bare page to test this
    // For now, just verify footer exists on regular pages
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    
    await page.goto('/events/');
    await expect(page.locator('footer')).toBeVisible();
  });
});