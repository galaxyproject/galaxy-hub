import { test, expect } from '@playwright/test';

test.describe('Multi-day events', () => {
  test('event page shows the end date derived from days', async ({ page }) => {
    // date: 2025-06-23, days: 4, no end
    await page.goto('/events/2025-06-23-gbcc2025/');

    await expect(page.locator('time').first()).toHaveText('Monday, June 23, 2025 - Thursday, June 26, 2025');
  });

  test('/events/ keeps a running multi-day event under Upcoming Events', async ({ page }) => {
    // Third day of an event with date: 2026-10-12, days: 5
    await page.clock.setFixedTime(new Date('2026-10-14T12:00:00'));
    await page.goto('/events/');

    const upcoming = page.locator('section', { has: page.getByRole('heading', { name: 'Upcoming Events' }) });
    const event = upcoming.locator('a', { hasText: 'Galaxy Beyond Basics' });
    await expect(event).toBeVisible();
    await expect(event).toContainText('Oct 12 - 16, 2026');
  });
});
