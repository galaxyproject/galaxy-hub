import { test, expect } from '@playwright/test';

test.describe('Carousel Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
  });

  test('page loads with carousel test components', async ({ page }) => {
    await expect(page).toHaveTitle(/Carousel Component Test/);
    await expect(page.locator('h1').first()).toHaveText('Carousel Component Test');
  });

  test('default carousel renders with correct structure', async ({ page }) => {
    // Check carousel container
    const defaultCarousel = page.locator('.carousel-container').first();
    await expect(defaultCarousel).toBeVisible();
    
    // Check carousel structure
    const carousel = defaultCarousel.locator('.carousel');
    await expect(carousel).toBeVisible();
    
    // Check indicators
    const indicators = carousel.locator('.carousel-indicators button');
    await expect(indicators).toHaveCount(2);
    
    // Check first slide is active
    const activeSlide = carousel.locator('.carousel-item.active');
    await expect(activeSlide).toBeVisible();
    
    // Check controls
    const prevButton = carousel.locator('.carousel-control-prev');
    const nextButton = carousel.locator('.carousel-control-next');
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  });

  test('default carousel has correct images and links', async ({ page }) => {
    const carousel = page.locator('.carousel-container').first().locator('.carousel');
    
    // Check first slide link and image
    const firstSlide = carousel.locator('.carousel-item').first();
    const firstLink = firstSlide.locator('a');
    await expect(firstLink).toHaveAttribute('href', 'https://gbcc2025.org/');
    await expect(firstLink).toHaveAttribute('target', '_blank');
    
    const firstImage = firstLink.locator('img');
    await expect(firstImage).toHaveAttribute('src', '/images/usegalaxy-welcome/GBCC_hub_splash_screen-13x9.png');
    await expect(firstImage).toHaveAttribute('alt', 'Attend GBCC2025');
  });

  test('carousel navigation works', async ({ page }) => {
    const carousel = page.locator('.carousel').first();
    const nextButton = carousel.locator('.carousel-control-next');
    const indicators = carousel.locator('.carousel-indicators button');
    
    // Initially first slide is active
    await expect(indicators.nth(0)).toHaveClass(/active/);
    
    // Click next
    await nextButton.click();
    await page.waitForTimeout(300); // Wait for transition
    
    // Second slide should be active
    await expect(indicators.nth(1)).toHaveClass(/active/);
    
    // Click next again (should wrap to first)
    await nextButton.click();
    await page.waitForTimeout(300);
    
    // First slide should be active again
    await expect(indicators.nth(0)).toHaveClass(/active/);
  });

  test('carousel indicators work', async ({ page }) => {
    const carousel = page.locator('.carousel').first();
    const indicators = carousel.locator('.carousel-indicators button');
    
    // Click second indicator
    await indicators.nth(1).click();
    await page.waitForTimeout(300);
    
    // Second slide should be active
    await expect(indicators.nth(1)).toHaveClass(/active/);
    
    // Click first indicator
    await indicators.nth(0).click();
    await page.waitForTimeout(300);
    
    // First slide should be active
    await expect(indicators.nth(0)).toHaveClass(/active/);
  });

  test('custom carousel renders with captions', async ({ page }) => {
    // Find the custom carousel (second one)
    const customCarousel = page.locator('.carousel').nth(1);
    await expect(customCarousel).toBeAttached();
    
    // Check it has 3 slides
    const indicators = customCarousel.locator('.carousel-indicators button');
    await expect(indicators).toHaveCount(3);
    
    // Check caption exists
    const caption = customCarousel.locator('.carousel-caption');
    await expect(caption.first()).toBeAttached();
    await expect(caption.locator('h5').first()).toContainText('Welcome to Galaxy');
  });

  test('carousel without controls works', async ({ page }) => {
    // Find the third carousel
    const noControlsCarousel = page.locator('.carousel').nth(2);
    await expect(noControlsCarousel).toBeAttached();
    
    // Check controls are not present
    const prevButton = noControlsCarousel.locator('.carousel-control-prev');
    const nextButton = noControlsCarousel.locator('.carousel-control-next');
    await expect(prevButton).toHaveCount(0);
    await expect(nextButton).toHaveCount(0);
    
    // But indicators should still be present
    const indicators = noControlsCarousel.locator('.carousel-indicators button');
    await expect(indicators).toHaveCount(2);
  });

  test('carousel autoplay works', async ({ page }) => {
    const carousel = page.locator('.carousel').nth(2); // Third carousel with 2s interval
    const indicators = carousel.locator('.carousel-indicators button');
    
    // Initially first slide is active
    await expect(indicators.nth(0)).toHaveClass(/active/);
    
    // Wait for autoplay to advance
    await page.waitForTimeout(2500);
    
    // Second slide should now be active
    await expect(indicators.nth(1)).toHaveClass(/active/);
  });
});