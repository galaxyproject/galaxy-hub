import { test, expect, type Page } from '@playwright/test';

// Reading pages open with a breadcrumb trail inside the compact page header, above the h1:
// the project home, the region on region pages, parent pages, then the current page (unlinked).
const trails = [
  {
    name: 'nested content page',
    path: '/admin/config/windows/',
    count: 4,
    items: [
      ['Galaxy Project', '/'],
      ['Galaxy Administration', '/admin/'],
      ['Galaxy Configuration for Admins', '/admin/config/'],
      ['Running Galaxy on Windows', null],
    ],
  },
  {
    name: 'region page',
    path: '/eu/about/',
    count: 3,
    items: [
      ['Galaxy Project', '/'],
      ['Galaxy Europe', '/eu/'],
      ['About UseGalaxy.eu', null],
    ],
  },
  {
    name: 'smaller region page',
    path: '/freiburg/projects/',
    count: 3,
    items: [
      ['Galaxy Project', '/'],
      ['Galaxy Freiburg', '/freiburg/'],
      ['Freiburg Galaxy Projects', null],
    ],
  },
  {
    name: 'news post',
    path: '/news/2025-10-15-egd2025/',
    count: 3,
    items: [
      ['Galaxy Project', '/'],
      ['News', '/news/'],
    ],
  },
  {
    name: 'event page',
    path: '/events/2025-admin-training-brno/',
    count: 3,
    items: [
      ['Galaxy Project', '/'],
      ['Events', '/events/'],
    ],
  },
  {
    name: 'conference subpage',
    path: '/events/gcc2026/schedule/',
    count: 4,
    items: [
      ['Galaxy Project', '/'],
      ['Events', '/events/'],
      [null, '/events/gcc2026/'],
    ],
  },
  {
    name: 'nested conference page without a title',
    path: '/events/gcc2012/training-day/ws5/',
    count: 5,
    items: [
      ['Galaxy Project', '/'],
      ['Events', '/events/'],
      ['GCC2012', '/events/gcc2012/'],
      ['GCC2012 Training Day', '/events/gcc2012/training-day/'],
      ['Ws5', null],
    ],
  },
  {
    name: 'event in a meetup series',
    path: '/events/meetups/baltimore/2015-02-18/',
    count: 5,
    items: [
      ['Galaxy Project', '/'],
      ['Events', '/events/'],
      ['Meetups', '/events/meetups/'],
      ['Baltimore', '/events/meetups/baltimore/'],
      ['Feb 18, 2015 Baltimore Area Galaxy Meetup @ Johns Hopkins', null],
    ],
  },
] as const;

function trail(page: Page) {
  return page.locator('header.page-header nav[aria-label="Breadcrumb"]');
}

for (const { name, path, items, count } of trails) {
  test(`breadcrumbs on a ${name} (${path})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    const nav = trail(page);
    await expect(nav).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toHaveCount(1);

    const entries = nav.locator('ol > li');
    for (const [index, [label, href]] of items.entries()) {
      const entry = entries.nth(index);
      if (href) {
        const link = entry.locator('a');
        await expect(link).toHaveAttribute('href', href);
        if (label) await expect(link).toHaveText(label);
      } else {
        await expect(entry.locator('a')).toHaveCount(0);
        if (label) await expect(entry).toHaveText(label);
      }
    }

    // The last item is the page itself: aria-current, no link
    const current = nav.locator('[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(entries.last().locator('a')).toHaveCount(0);
    await expect(entries.last().locator('[aria-current="page"]')).toHaveCount(1);
    await expect(entries).toHaveCount(count);

    // Trail sits above the title, inside the header
    const navBox = await nav.boundingBox();
    const h1Box = await page.locator('header.page-header h1').boundingBox();
    expect(navBox && h1Box).toBeTruthy();
    expect(navBox!.y + navBox!.height).toBeLessThanOrEqual(h1Box!.y);
  });
}

test('news post: the last crumb is the post title', async ({ page }) => {
  await page.goto('/news/2025-10-15-egd2025/');
  const h1 = (await page.locator('header.page-header h1').textContent())?.trim();
  await expect(trail(page).locator('[aria-current="page"]')).toHaveText(h1!);
});

test('region pages drop the eyebrow that repeated the region', async ({ page }) => {
  await page.goto('/eu/about/');
  const head = page.locator('header.page-header');
  await expect(head.getByRole('link', { name: 'Galaxy Europe' })).toHaveCount(1);
  await expect(head.locator('a[href="/eu/"]:not(nav[aria-label="Breadcrumb"] a)')).toHaveCount(0);
});

test('phones get one back link to the nearest parent instead of the trail', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/eu/about/');
  const nav = trail(page);
  await expect(nav.locator('ol')).toBeHidden();
  const back = nav.locator('.breadcrumbs__back');
  await expect(back).toBeVisible();
  await expect(back).toHaveAttribute('href', '/eu/');
  await expect(back).toContainText('Galaxy Europe');
});

for (const path of ['/news/', '/fair/', '/eu/', '/']) {
  test(`no breadcrumbs on ${path} (hero, landing or region home)`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);
  });
}
