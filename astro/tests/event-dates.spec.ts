import { test, expect, type Locator } from '@playwright/test';

// GBCC 2025: Jun 23 - 26, 2025 (4 days); EGD 2025: Oct 1, 2025 (one day). Both tagged conference.
const multiDay = '2025-06-23-gbcc2025/';
const singleDay = '2025-10-01-egd2025/';

async function expectMultiDay(row: Locator) {
  const date = row.locator('.gx-event-date');
  await expect(date.locator('.gx-event-date__range')).toHaveText('Jun 23 - 26, 2025');
  await expect(date.locator('.gx-event-date__dur')).toHaveText('4 days');
  const times = date.locator('time');
  await expect(times).toHaveCount(2);
  await expect(times.nth(0)).toHaveAttribute('datetime', '2025-06-23');
  await expect(times.nth(1)).toHaveAttribute('datetime', '2025-06-26');
  await expect(date.locator('.gx-event-date__icon')).toHaveAttribute('aria-hidden', 'true');
}

async function expectSingleDay(row: Locator) {
  const date = row.locator('.gx-event-date');
  await expect(date.locator('.gx-event-date__range')).toHaveText('Oct 1, 2025');
  await expect(date.locator('.gx-event-date__dur')).toHaveCount(0);
  await expect(date.locator('time')).toHaveCount(1);
  await expect(date.locator('time')).toHaveAttribute('datetime', '2025-10-01');
}

test.describe('Event date line', () => {
  test('tag pages show the range, duration pill and machine-readable dates', async ({ page }) => {
    await page.goto('/tags/conference/');

    await expectMultiDay(page.locator(`a[href="/events/${multiDay}"]`));
    await expectSingleDay(page.locator(`a[href="/events/${singleDay}"]`));
  });
});
