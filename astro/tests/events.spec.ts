import { test, expect } from '@playwright/test';

test.describe('Events System', () => {
  test('events listing page structure', async ({ page }) => {
    await page.goto('/events/');
    
    // Check page title and heading
    await expect(page).toHaveTitle(/Galaxy Events/);
    await expect(page.locator('h1').first()).toHaveText('Galaxy Events');
    
    // Check for lead paragraph
    const lead = page.locator('.lead');
    await expect(lead).toContainText('Galaxy events are geographically diverse');
    
    // Check for event submission info
    const alert = page.locator('.alert-info');
    await expect(alert).toContainText('Add Your Event!');
    
    // Check sidebar exists
    const sidebar = page.locator('.col-lg-3');
    await expect(sidebar).toBeVisible();
    
    // Check for event series section
    await expect(sidebar.locator('h5:has-text("Event Series")')).toBeVisible();
    await expect(sidebar.locator('a:has-text("Galaxy Webinars")')).toBeVisible();
  });

  test('individual event page loads', async ({ page }) => {
    // First get an event link from the listing
    await page.goto('/events/');
    
    // Try to find an event link (upcoming or past)
    const eventLink = page.locator('.list-group-item').first();
    const hasEvents = await eventLink.count() > 0;
    
    if (hasEvents) {
      const eventUrl = await eventLink.getAttribute('href');
      if (eventUrl) {
        await page.goto(eventUrl);
        
        // Check that we're on an event page - use first() to avoid strict mode
        await expect(page.locator('h1').first()).toBeVisible();
        
        // Event pages should have date information
        const content = await page.locator('body').textContent();
        expect(content).toMatch(/\d{4}/); // Should contain a year
      }
    } else {
      console.log('No events found in listing');
    }
  });

  test('event dates are formatted correctly', async ({ page }) => {
    await page.goto('/events/');
    
    // Check for month headings in upcoming events
    const monthHeadings = page.locator('h3');
    const monthCount = await monthHeadings.count();
    
    if (monthCount > 0) {
      const firstMonth = await monthHeadings.first().textContent();
      // Should be in format "Month Year" (e.g., "March 2024")
      expect(firstMonth).toMatch(/\w+ \d{4}/);
    }
    
    // Check date format in event listings
    const eventDates = page.locator('.list-group-item small').first();
    const hasEventDates = await eventDates.count() > 0;
    
    if (hasEventDates) {
      const dateText = await eventDates.textContent();
      // Should be in format "MMM d" (e.g., "Mar 15")
      expect(dateText).toMatch(/\w{3} \d{1,2}/);
    }
  });

  test('past events section exists', async ({ page }) => {
    await page.goto('/events/');
    
    // Check for past events heading
    const pastEventsHeading = page.locator('h2:has-text("Recent Past Events")');
    await expect(pastEventsHeading).toBeVisible();
    
    // Check for archive link
    const archiveLink = page.locator('a:has-text("View All Past Events")');
    await expect(archiveLink).toBeVisible();
    await expect(archiveLink).toHaveAttribute('href', '/events/archive');
  });
});