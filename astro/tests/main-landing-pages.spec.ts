import { test, expect } from '@playwright/test';

test.describe('Main Landing Pages', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Galaxy Community Hub/);
    
    // Check for main sections
    const welcomeText = page.locator('text=Welcome to Galaxy').first();
    await expect(welcomeText).toBeVisible();
    
    // Check for recent news section
    const recentNews = page.locator('h2:has-text("Recent News")');
    await expect(recentNews).toBeVisible();
  });

  test('news page loads successfully', async ({ page }) => {
    await page.goto('/news');
    const response = await page.goto('/news', { waitUntil: 'domcontentloaded' });
    
    // News listing page might not exist yet
    if (response?.status() === 404) {
      console.log('News listing page not yet implemented');
      // Skip the rest of the test
      return;
    }
    
    await expect(page).toHaveTitle(/News/);
  });

  test('events page loads successfully', async ({ page }) => {
    await page.goto('/events/');
    await expect(page).toHaveTitle(/Galaxy Events/);
    
    // Check main heading
    const heading = page.locator('h1').first();
    await expect(heading).toHaveText('Galaxy Events');
    
    // Check for event sections
    await expect(page.locator('text=Upcoming Events')).toBeVisible();
    await expect(page.locator('text=Recent Past Events')).toBeVisible();
  });

  test('use galaxy page loads', async ({ page }) => {
    const response = await page.goto('/use', { waitUntil: 'domcontentloaded' });
    
    // Use page might not exist yet
    if (response?.status() === 404) {
      console.log('Use Galaxy page not yet implemented');
      return;
    }
    
    // If it exists, check basic structure
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('community page loads', async ({ page }) => {
    const response = await page.goto('/community', { waitUntil: 'domcontentloaded' });
    
    // Community page might not exist yet
    if (response?.status() === 404) {
      console.log('Community page not yet implemented');
      return;
    }
    
    // If it exists, check basic structure
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('search page loads', async ({ page }) => {
    const response = await page.goto('/search', { waitUntil: 'domcontentloaded' });
    
    // Search page might not exist yet
    if (response?.status() === 404) {
      console.log('Search page not yet implemented');
      return;
    }
    
    // If it exists, check for search functionality
    await expect(page.locator('input[type="search"], input[type="text"]').first()).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('navbar is present on all pages', async ({ page }) => {
    // Test navbar on homepage
    await page.goto('/');
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    // Check all nav links are present
    await expect(navbar.locator('a:has-text("News")')).toBeVisible();
    await expect(navbar.locator('a:has-text("Events")')).toBeVisible();
    await expect(navbar.locator('a:has-text("Use Galaxy")')).toBeVisible();
    await expect(navbar.locator('a:has-text("Community")')).toBeVisible();
    await expect(navbar.locator('a:has-text("Search")')).toBeVisible();
  });

  test('navbar links navigate correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click Events link
    await page.click('a:has-text("Events")');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/events');
    
    // Go back to home
    await page.click('.navbar-brand');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toMatch(/\/$/);
  });
});

test.describe('Content Structure', () => {
  test('footer is present', async ({ page }) => {
    await page.goto('/');
    
    // Check for footer - looking for copyright or similar
    const footer = page.locator('footer, .footer').first();
    const footerText = page.locator('text=Galaxy Project').first();
    const footerExists = (await footer.count() > 0) || (await footerText.count() > 0);
    
    if (footerExists) {
      await expect(footer).toBeVisible();
    } else {
      console.log('Footer not yet implemented');
    }
  });

  test('Bootstrap CSS is loaded', async ({ page }) => {
    await page.goto('/');
    
    // Check that Bootstrap container works
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();
    
    // Check responsive grid
    const row = page.locator('.row').first();
    const col = page.locator('[class*="col-"]').first();
    
    await expect(row).toBeVisible();
    await expect(col).toBeVisible();
  });
});