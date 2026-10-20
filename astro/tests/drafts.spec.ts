import { test, expect } from '@playwright/test';

// content/events/2099-01-01-draft-preview-test is marked `draft: true`: it is built at its URL
// for previews, but no listing, feed, calendar, index or sitemap may show it.
const DRAFT_SLUG = 'events/2099-01-01-draft-preview-test';
const DRAFT_PATH = `/${DRAFT_SLUG}/`;

// The sitemap is written by `astro build` only, so the dev server has none.
const PREVIEW = process.env.LINK_CHECK_PREVIEW === '1';

// Each listing also has to show other events, so a missing draft is not just an empty page.
const LISTINGS = [
  '/events/',
  '/eu/events/',
  '/tags/talk/',
  '/hall-of-fame/freiburggalaxyteam/',
  '/events/calendar.ics',
  '/eu/events/calendar.ics',
  '/events/feed.json',
  '/events/feed.xml',
  '/eu/events/feed.atom',
  '/search-index.json',
  '/404-lookup.json',
];
const BUILD_ONLY_LISTINGS = ['/sitemap-0.xml'];

test.describe('Draft pages', () => {
  test('a draft is built at its URL and asks search engines not to index it', async ({ page }) => {
    const response = await page.goto(DRAFT_PATH);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'Draft preview test event' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  });

  test('a published page has no robots noindex', async ({ page }) => {
    await page.goto('/events/');
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  for (const path of [...LISTINGS, ...BUILD_ONLY_LISTINGS]) {
    test(`${path} leaves the draft out`, async ({ request }) => {
      test.skip(BUILD_ONLY_LISTINGS.includes(path) && !PREVIEW, 'Built by astro build only; set LINK_CHECK_PREVIEW=1');
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      // Unfold ICS lines so a folded URL cannot hide the slug.
      const body = (await response.text()).replace(/\r\n /g, '');
      expect(body, `${path} lists other events`).toMatch(/\/?events\/\d{4}-\d{2}-\d{2}-/);
      expect(body).not.toContain(DRAFT_SLUG);
    });
  }
});
