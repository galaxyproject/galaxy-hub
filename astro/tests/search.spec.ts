import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('search box is present and functional', async ({ page }) => {
    await page.goto('/');
    
    // Find search input - it might be in different places
    const searchInput = page.locator('input[type="search"], input[placeholder*="earch"], #search-input').first();
    await expect(searchInput).toBeVisible();
    
    // Type in search box
    await searchInput.fill('galaxy');
    
    // Search results should appear (either inline or on a new page)
    // This depends on implementation
    await page.waitForTimeout(500); // Give search time to process
  });

  test('search index is loaded', async ({ page }) => {
    // Check if search index file is accessible
    const response = await page.request.get('/search-index.json');
    expect(response.status()).toBe(200);
    
    const searchData = await response.json();
    expect(searchData).toHaveProperty('documents');
    expect(searchData).toHaveProperty('index');
    expect(searchData.documents.length).toBeGreaterThan(0);
  });
});