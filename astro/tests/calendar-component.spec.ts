import { test, expect } from '@playwright/test';

test.describe('Calendar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/calendar');
  });

  test('page loads with Calendar test components', async ({ page }) => {
    await expect(page).toHaveTitle(/Calendar Component Test/);
    await expect(page.locator('h1').first()).toHaveText('Calendar Component Test');
  });

  test('Eventzilla calendar container renders', async ({ page }) => {
    // Check that Eventzilla container exists
    const eventzillaContainer = page.locator('#eventzilla-widget-container-a-2026621820');
    await expect(eventzillaContainer).toBeVisible();
    
    // Check that Eventzilla script is injected
    await page.waitForTimeout(2500); // Wait for script to load
    const eventzillaScript = await page.evaluate(() => {
      return document.querySelector('script[src*="eventzilla.net"]') !== null;
    });
    expect(eventzillaScript).toBe(true);
  });

  test('Google Calendar embeds render', async ({ page }) => {
    // Check that Google Calendar iframes exist
    const googleCalendars = page.locator('iframe.google-calendar-embed');
    await expect(googleCalendars).toHaveCount(3);
    
    // Check first calendar has correct src
    const firstCalendar = googleCalendars.first();
    await expect(firstCalendar).toBeVisible();
    await expect(firstCalendar).toHaveAttribute('src', /calendar\.google\.com/);
    await expect(firstCalendar).toHaveAttribute('src', /4479a7d76a41a3160e0dd6f173dc3180cd90efd503930a87037dd136fd83b864/);
    
    // Check timezone parameter
    await expect(firstCalendar).toHaveAttribute('src', /ctz=Europe%2FBerlin/);
  });

  test('Calendar dimensions are applied correctly', async ({ page }) => {
    const calendars = page.locator('iframe.google-calendar-embed');
    
    // Small calendar (300px height)
    const smallCalendar = calendars.nth(0);
    await expect(smallCalendar).toHaveAttribute('height', '300');
    
    // Large calendar (600px height)
    const largeCalendar = calendars.nth(1);
    await expect(largeCalendar).toHaveAttribute('height', '600');
    await expect(largeCalendar).toHaveAttribute('width', '100%');
    
    // Fixed width calendar
    const fixedCalendar = calendars.nth(2);
    await expect(fixedCalendar).toHaveAttribute('height', '400');
    await expect(fixedCalendar).toHaveAttribute('width', '800');
  });

  test('Calendar iframe attributes are set correctly', async ({ page }) => {
    const googleCalendars = page.locator('iframe.google-calendar-embed');
    const firstCalendar = googleCalendars.first();
    
    // Check iframe attributes
    await expect(firstCalendar).toHaveAttribute('frameborder', '0');
    await expect(firstCalendar).toHaveAttribute('scrolling', 'no');
    await expect(firstCalendar).toHaveCSS('border', '1px solid rgb(119, 119, 119)');
  });

  test('Different timezones are applied', async ({ page }) => {
    const calendars = page.locator('iframe.google-calendar-embed');
    
    // Europe/Berlin timezone
    await expect(calendars.nth(0)).toHaveAttribute('src', /ctz=Europe%2FBerlin/);
    
    // America/New_York timezone
    await expect(calendars.nth(1)).toHaveAttribute('src', /ctz=America%2FNew_York/);
    
    // UTC timezone
    await expect(calendars.nth(2)).toHaveAttribute('src', /ctz=UTC/);
  });
});