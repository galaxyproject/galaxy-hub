import { test, expect } from '@playwright/test';

test.describe('Events external link indicator', () => {
  test('/events/ shows external icon for events with external_url', async ({ page }) => {
    const response = await page.goto('/events/');
    expect(response?.status()).toBe(200);

    const card = page.getByRole('link', { name: /LOVE DATA week with intro to Galaxy & GTN/i });
    await expect(card).toBeVisible();
    await expect(card.locator('[data-external-icon]')).toBeVisible();
  });
});

// An event with external_url never renders its own page: its URL redirects to the external site
// (a 3xx from the dev server, a meta refresh page in the static build), so an event page footer
// has no "website" link to offer.
const path = '/events/2017-02-freiburg-hts/';
const target =
  'http://www.denbi.de/22-training-cat/training-courses/213-3rd-galaxy-high-throughput-sequencing-hts-data-analysis-workshop';

test('an event with external_url is a redirect, not a page', async ({ request }) => {
  const response = await request.get(path, { maxRedirects: 0 });
  if (response.status() >= 300 && response.status() < 400) {
    expect(response.headers()['location']).toBe(target);
    return;
  }
  const html = await response.text();
  expect(html).toContain(`http-equiv="refresh" content="2;url=${target}"`);
  expect(html).not.toContain('<footer');
});
