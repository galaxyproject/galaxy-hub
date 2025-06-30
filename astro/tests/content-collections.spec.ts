import { test, expect } from '@playwright/test';

test.describe('Content Collections', () => {
  test('articles collection has content', async ({ page }) => {
    // Check a known article
    await page.goto('/news/2017-10-public-galaxy-dashboard');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('.content, article').first()).toBeVisible();
  });

  test('events collection has content', async ({ page }) => {
    await page.goto('/events/');
    
    // Check that events are listed
    const eventLinks = page.locator('.list-group-item');
    const eventCount = await eventLinks.count();
    
    expect(eventCount).toBeGreaterThan(0);
    console.log(`Found ${eventCount} events on the page`);
  });

  test('platforms collection works', async ({ page }) => {
    await page.goto('/use/');
    
    // Check if any platforms are displayed
    const platformCards = page.locator('.card');
    const platformCount = await platformCards.count();
    
    // Should have at least the "Other Ways to Use Galaxy" cards
    expect(platformCount).toBeGreaterThan(0);
    console.log(`Found ${platformCount} cards on Use Galaxy page`);
  });

  test('search index exists and contains documents', async ({ page }) => {
    const response = await page.request.get('/search-index.json');
    expect(response.status()).toBe(200);
    
    const searchData = await response.json();
    expect(searchData).toHaveProperty('documents');
    expect(searchData).toHaveProperty('index');
    expect(searchData.documents.length).toBeGreaterThan(100); // Should have many documents
    
    console.log(`Search index contains ${searchData.documents.length} documents`);
  });

  test('content pages have proper metadata', async ({ page }) => {
    // Test an article page
    await page.goto('/news/2017-09-publication-lib-on-zotero');
    
    // Should have title
    const title = await page.locator('h1').first().textContent();
    expect(title).toBeTruthy();
    
    // Should have date
    const dateText = await page.locator('text=/\\d{4}/', { hasText: /published|date/i }).first().textContent();
    expect(dateText).toBeTruthy();
  });

  test('vue articles render correctly', async ({ page }) => {
    // First find a vue article from the listing
    const response = await page.request.get('/search-index.json');
    const searchData = await response.json();
    
    // Find a vue article
    const vueArticle = searchData.documents.find(doc => 
      doc.url && doc.url.includes('/') && doc.type === 'vue-articles'
    );
    
    if (vueArticle) {
      await page.goto(vueArticle.url);
      await expect(page.locator('h1').first()).toBeVisible();
      
      // Vue components might be present
      await page.waitForTimeout(1000); // Give Vue time to mount
      console.log(`Tested Vue article: ${vueArticle.url}`);
    } else {
      console.log('No Vue articles found in search index');
    }
  });
});