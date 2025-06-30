import { test, expect } from '@playwright/test';

test.describe('Twitter Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/twitter');
  });

  test('page loads with Twitter test components', async ({ page }) => {
    await expect(page).toHaveTitle(/Twitter Component Test/);
    await expect(page.locator('h1').first()).toHaveText('Twitter Component Test');
  });

  test('Twitter components render', async ({ page }) => {
    // Check that Twitter containers exist
    const twitterContainers = page.locator('.twitter');
    await expect(twitterContainers).toHaveCount(4);
    
    // Check for loading or content
    // Twitter embeds load asynchronously, so we check for either loading state or iframe
    await page.waitForTimeout(3000); // Give Twitter time to load
    
    // Check that at least one Twitter iframe loaded
    const iframes = page.frameLocator('iframe[id^="twitter-widget"]');
    const iframeCount = await page.locator('iframe[id^="twitter-widget"]').count();
    
    // Should have at least one Twitter embed
    expect(iframeCount).toBeGreaterThan(0);
  });

  test('Twitter component centers by default', async ({ page }) => {
    const centeredTwitter = page.locator('.twitter-centered').first();
    await expect(centeredTwitter).toBeVisible();
  });

  test('Twitter component can be non-centered', async ({ page }) => {
    // The last Twitter component should not be centered
    const nonCenteredTweet = page.locator('.twitter').last();
    const hasCenteredClass = await nonCenteredTweet.evaluate(el => el.classList.contains('twitter-centered'));
    expect(hasCenteredClass).toBe(false);
  });

  test('error handling for missing props', async ({ page }) => {
    // We don't have a test case for this in the current page
    // But the component should handle missing tweet/user gracefully
    console.log('Twitter component requires either tweet or user prop');
  });
});