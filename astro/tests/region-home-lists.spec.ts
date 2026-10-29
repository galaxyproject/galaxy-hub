import { test, expect, type Page } from '@playwright/test';

// Region homes list the region's next 5 events and latest 5 news posts (the same subsite-scoped
// content as /<region>/events/ and /<region>/news/), side by side from lg, stacked on phones.
// The rows come from the shared ProjectRows component; a list with nothing to show keeps its
// section and shows the empty state instead.
const regions = [
  { id: 'eu', name: 'Galaxy Europe' },
  { id: 'genouest', name: 'Galaxy GenOuest' },
];

function section(page: Page, heading: string) {
  return page.locator('section').filter({ has: page.getByRole('heading', { level: 2, name: heading, exact: true }) });
}

for (const { id } of regions) {
  test(`/${id}/ lists upcoming events and latest news with links to the region pages`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${id}/`);

    for (const [heading, kind, link, href] of [
      ['Upcoming events', 'events', 'All events', `/${id}/events/`],
      ['Latest news', 'news', 'All news', `/${id}/news/`],
    ]) {
      const box = section(page, heading);
      await expect(box).toHaveCount(1);
      await expect(box.getByRole('link', { name: new RegExp(`^${link}`) })).toHaveAttribute('href', href);

      const rows = box.locator(`ol.project-rows[data-project-list="${kind}"] > li`);
      const empty = box.locator('.region-empty');
      const rowCount = await rows.count();
      // Either rows or the empty state, never both
      await expect(empty).toHaveCount(rowCount > 0 ? 0 : 1);
      expect(rowCount).toBeLessThanOrEqual(5);
      if (rowCount > 0) {
        await expect(rows.first().locator('h3 a')).toHaveCount(1);
        await expect(rows.first().locator('time').first()).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}/);
      }
    }

    const events = await section(page, 'Upcoming events').boundingBox();
    const news = await section(page, 'Latest news').boundingBox();
    expect(events!.x + events!.width).toBeLessThanOrEqual(news!.x);
  });

  test(`/${id}/ stacks the two lists on a phone`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${id}/`);
    const events = await section(page, 'Upcoming events').boundingBox();
    const news = await section(page, 'Latest news').boundingBox();
    expect(events!.y + events!.height).toBeLessThanOrEqual(news!.y);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('/eu/ news rows match the first five on /eu/news/', async ({ page }) => {
  await page.goto('/eu/');
  const home = await section(page, 'Latest news')
    .locator('ol.project-rows > li h3 a')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  expect(home).toHaveLength(5);
  await page.goto('/eu/news/');
  for (const href of home) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
});
