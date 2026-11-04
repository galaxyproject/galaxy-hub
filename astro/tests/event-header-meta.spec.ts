import { test, expect } from '@playwright/test';

// EventHeaderMeta: the event facts in the gradient page header of event and conference pages, each
// with a visible label (a <dl>). It keeps the look of the inline block it replaced: white labels,
// white/80 values, 20px gold icons beside each fact, the date range as plain text without a pill.
const WHITE = 'rgb(255, 255, 255)';
// Tailwind's `text-white/80` computes through color-mix, so Chromium reports it in oklab.
const WHITE_80 = /^(rgba\(255, 255, 255, 0\.8\)|oklab\(0\.99\d* [-\d.e]+ [-\d.e]+ \/ 0\.8\))$/;
const GOLD = 'rgb(255, 215, 0)';

test.describe('Event header facts', () => {
  test('event page shows labelled date and location in the header colours', async ({ page }) => {
    await page.goto('/events/2025-admin-training-brno/');
    const facts = page.locator('header.page-header dl.event-header-meta');
    await expect(facts).toHaveCount(1);

    const dateLabel = facts.locator('dt', { hasText: 'Date' });
    await expect(dateLabel).toBeVisible();
    await expect(dateLabel).toHaveCSS('color', WHITE);
    await expect(dateLabel).toHaveCSS('font-weight', '500');

    const range = facts.locator('.gx-event-date__range');
    await expect(range.locator('time').first()).toHaveAttribute('datetime', '2025-11-24');
    await expect(range).toHaveCSS('color', WHITE_80);
    await expect(range).toHaveCSS('font-weight', '400');
    await expect(facts.locator('.gx-event-date__dur')).toBeHidden();
    await expect(facts.locator('.gx-event-date__icon')).toBeHidden();

    const icon = dateLabel.locator('svg');
    await expect(icon).toHaveCSS('color', GOLD);
    await expect(icon).toHaveCSS('width', '20px');

    await expect(facts.locator('dt', { hasText: 'Location' })).toBeVisible();
    const location = facts.locator('dd', { hasText: 'Brno, Czechia, Europe' });
    await expect(location).toBeVisible();
    await expect(location).toHaveCSS('color', WHITE_80);
  });

  test('event page shows the labelled contact', async ({ page }) => {
    await page.goto('/events/2025-06-23-gbcc2025/');
    const facts = page.locator('header.page-header dl.event-header-meta');
    await expect(facts.locator('dt', { hasText: 'Contact' })).toBeVisible();
    await expect(facts.getByText('Organizing Committee')).toBeVisible();
  });

  test('conference page shows the labelled date', async ({ page }) => {
    await page.goto('/events/gcc2026/');
    const facts = page.locator('header.page-header dl.event-header-meta');
    await expect(facts.locator('dt', { hasText: 'Date' })).toBeVisible();
    await expect(facts.locator('.gx-event-date__range')).toHaveCSS('color', WHITE_80);
  });
});
