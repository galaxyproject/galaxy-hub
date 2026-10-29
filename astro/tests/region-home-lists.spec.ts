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

// /genouest/ differs from the global lists, so matching its region pages proves the scoping
test('/genouest/ lists the first five of /genouest/news/ and /genouest/events/, in order', async ({ page }) => {
  await page.goto('/genouest/');
  const hrefs = (heading: string) =>
    section(page, heading)
      .locator('ol.project-rows > li h3 a')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  const homeNews = await hrefs('Latest news');
  const homeEvents = await hrefs('Upcoming events');
  expect(homeNews).toHaveLength(5);

  await page.goto('/genouest/news/');
  const newsLinks = page.locator('main a[href^="/news/"]');
  await expect(newsLinks.first()).toBeVisible();
  const pageNews = await newsLinks.evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  expect([...new Set(pageNews)].slice(0, 5)).toEqual(homeNews);

  await page.goto('/genouest/events/');
  const upcoming = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: /^Upcoming Events/ }) })
    .locator('a[href^="/events/"]');
  if (homeEvents.length === 0) {
    await expect(upcoming).toHaveCount(0);
    return;
  }
  await expect(upcoming.first()).toBeVisible();
  const pageEvents = await upcoming.evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  expect([...new Set(pageEvents)].slice(0, 5)).toEqual(homeEvents);
});

test('region rows are flat: no box, hairline, title underlined only on hover', async ({ page }) => {
  // No smooth scrolling (global.css), so hover() scrolls the row in at once
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/eu/');
  const row = section(page, 'Latest news').locator('ol.project-rows > li').first();
  const style = await row.evaluate((el) => {
    const own = getComputedStyle(el);
    return { shadow: own.boxShadow, line: own.borderBottomWidth, radius: own.borderTopLeftRadius };
  });
  expect(style).toEqual({ shadow: 'none', line: '1px', radius: '0px' });

  const link = row.locator('h3 a');
  const underline = () => link.evaluate((el) => getComputedStyle(el).textDecorationLine);
  expect(await underline()).toBe('none');
  // The stretched link covers the row: hovering anywhere on it underlines the title. Images in
  // the region intro above can still shift the row after the pointer lands, so hover again.
  await expect(async () => {
    await row.hover({ position: { x: 8, y: 8 } });
    expect(await underline()).toBe('underline');
  }).toPass();

  // Short month on region news dates, e.g. "Oct 21, 2026"
  await expect(row.locator('time')).toHaveText(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
});

test('region event rows are upcoming, ESG past event rows stay muted', async ({ page }) => {
  await page.goto('/eu/');
  const events = section(page, 'Upcoming events').locator('ol.project-rows > li');
  if ((await events.count()) > 0) {
    await expect(events.locator('.gx-event-date').first()).toBeVisible();
    await expect(events.locator('.gx-event-date--past')).toHaveCount(0);
  }
  await page.goto('/projects/esg/events/');
  await expect(page.locator('[data-project-list="events"] li .gx-event-date--past').first()).toBeVisible();
});
