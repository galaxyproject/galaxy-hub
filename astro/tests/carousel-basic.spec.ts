import { test, expect } from '@playwright/test';

test.describe('Basic Carousel Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Carousel Component Test/);
    await expect(page.locator('h1').first()).toHaveText('Carousel Component Test');
  });

  test('default carousel is present and has slides', async ({ page }) => {
    // Check that the carousel container exists
    const carousel = page.locator('.carousel-container').first();
    await expect(carousel).toBeVisible();
    
    // Check that slides are present
    const slides = carousel.locator('.carousel-item');
    const slideCount = await slides.count();
    expect(slideCount).toBeGreaterThan(0);
    
    // Check that at least one slide is active
    const activeSlide = carousel.locator('.carousel-item.active');
    await expect(activeSlide).toBeVisible();
  });

  test('carousel images load', async ({ page }) => {
    const carousel = page.locator('.carousel-container').first();
    const images = carousel.locator('img');
    const imageCount = await images.count();
    
    expect(imageCount).toBeGreaterThan(0);
    
    // Check first image loads
    const firstImage = images.first();
    await expect(firstImage).toBeVisible();
    await expect(firstImage).toHaveAttribute('src', /\.(png|jpg|jpeg)$/i);
  });

  test('multiple carousels on page', async ({ page }) => {
    const carousels = page.locator('.carousel');
    const carouselCount = await carousels.count();
    
    // Should have at least 3 carousels based on test page
    expect(carouselCount).toBeGreaterThanOrEqual(3);
  });
});