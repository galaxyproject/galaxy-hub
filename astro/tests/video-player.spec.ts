import { test, expect } from '@playwright/test';

test.describe('VideoPlayer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/video-player');
  });

  test('page loads with video player test components', async ({ page }) => {
    await expect(page).toHaveTitle(/VideoPlayer Component Test/);
    await expect(page.locator('h1').first()).toHaveText('VideoPlayer Component Test');
  });

  test('basic video player renders', async ({ page }) => {
    // Check that video wrapper exists
    const videoWrapper = page.locator('.video-player-wrapper').first();
    await expect(videoWrapper).toBeVisible();
    
    // Check that video element exists
    const video = videoWrapper.locator('video');
    await expect(video).toBeVisible();
    
    // Check video has controls
    await expect(video).toHaveAttribute('controls', '');
    
    // Check video has correct src
    await expect(video).toHaveAttribute('src', /Big_Buck_Bunny.*\.mp4/);
  });

  test('video player with poster renders', async ({ page }) => {
    const videoWrapper = page.locator('.video-player-wrapper').nth(1);
    const video = videoWrapper.locator('video');
    
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('poster', /Big_Buck_Bunny.*\.jpg/);
  });

  test('video player with dimensions renders correctly', async ({ page }) => {
    const videoWrapper = page.locator('.video-player-wrapper').nth(2);
    const video = videoWrapper.locator('video');
    
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('width', '640');
    await expect(video).toHaveAttribute('height', '360');
  });

  test('video player with autoplay attributes', async ({ page }) => {
    const videoWrapper = page.locator('.video-player-wrapper').nth(3);
    const video = videoWrapper.locator('video');
    
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('autoplay', '');
    await expect(video).toHaveAttribute('muted', '');
  });

  test('video player with loop attribute', async ({ page }) => {
    const videoWrapper = page.locator('.video-player-wrapper').nth(4);
    const video = videoWrapper.locator('video');
    
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('loop', '');
  });

  test('multiple video players on page', async ({ page }) => {
    const videoWrappers = page.locator('.video-player-wrapper');
    const count = await videoWrappers.count();
    
    // Should have at least 6 video players based on test page
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('video player styling is applied', async ({ page }) => {
    const videoWrapper = page.locator('.video-player-wrapper').first();
    const video = videoWrapper.locator('video');
    
    // Check that video has max-width styling
    await expect(video).toHaveCSS('max-width', '100%');
    await expect(video).toHaveCSS('display', 'block');
  });

  test('fallback message exists', async ({ page }) => {
    // Check that fallback message is in the HTML (even if not visible)
    const videos = page.locator('video');
    const firstVideo = videos.first();
    
    const html = await firstVideo.innerHTML();
    expect(html).toContain("Your browser doesn't support HTML5 video");
  });
});