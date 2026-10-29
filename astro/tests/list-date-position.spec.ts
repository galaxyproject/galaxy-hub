import { test, expect, type Page } from '@playwright/test';

// Every news and event list puts the date line under the item title (M-13), at every width.
// Font-independent: the title's last line box (Range.getClientRects) must end above the date's
// first line box, and the date must follow the title (and precede any teaser) in the DOM. No centre
// or height comparisons.

type ListCase = {
  name: string;
  path: string;
  /** One item row; the title is its h2/h3, else its first element child without the date. */
  rows: string;
  /** Wait for a client-rendered list before measuring. */
  ready?: string;
  /** Filter bar count once the URL filters apply, so hydration does not swap rows mid-measure. */
  count?: RegExp;
};

const cases: ListCase[] = [
  { name: 'news', path: '/news/?year=2020', rows: '.news-list article', count: /in 2020/ },
  { name: 'region news', path: '/eu/news/?year=2020', rows: '.news-list article', count: /in 2020/ },
  {
    name: 'news tiles',
    path: '/news/?year=2020&view=tiles',
    rows: '.news-list [data-view="tiles"] article',
    ready: '.news-list [data-view="tiles"] article',
    count: /in 2020/,
  },
  {
    name: 'upcoming events',
    path: '/events/?status=upcoming',
    rows: '.events-list article',
    ready: '.events-list article',
    count: /upcoming events?/,
  },
  {
    name: 'past events',
    path: '/events/?status=past',
    rows: '.events-list article',
    ready: '.events-list article',
    count: /past events?/,
  },
  {
    name: 'past event tiles',
    path: '/events/?status=past&view=tiles',
    rows: '.events-list [data-view="tiles"] article',
    ready: '.events-list [data-view="tiles"] article',
    count: /past events?/,
  },
  { name: 'region events', path: '/eu/events/', rows: '.events-list article', ready: '.events-list article' },
  { name: 'region archive', path: '/eu/events/archive/', rows: '.events-list article', ready: '.events-list article' },
  { name: 'events archive', path: '/events/archive/', rows: 'main section a:has(.gx-event-date)' },
  { name: 'webinars', path: '/events/webinars/', rows: 'main section a:has(.gx-event-date)' },
  { name: 'cofests', path: '/events/cofests/', rows: 'main section a:has(.gx-event-date)' },
  { name: 'papercuts', path: '/events/cofests/papercuts/', rows: 'main section a:has(.gx-event-date)' },
  { name: 'community calls', path: '/community/community-calls/', rows: 'main section a:has(.gx-event-date)' },
  { name: 'developer roundtable', path: '/community/devroundtable/', rows: 'main section a:has(.gx-event-date)' },
  { name: 'tag page', path: '/tags/conference/', rows: 'main section a:has(time)' },
];

const viewports = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'phone', width: 390, height: 844 },
];

async function misplacedDates(page: Page, rows: string): Promise<string[]> {
  return page.locator(rows).evaluateAll((els) => {
    // First 12 rows of each section (upcoming, past, archive years): enough to cover long and short
    // titles without measuring 1000+ archive rows, and upcoming rows cannot crowd out past ones
    const perSection = new Map<Element, Element[]>();
    for (const row of els) {
      const section = row.closest('section') ?? document.body;
      const list = perSection.get(section) ?? [];
      if (list.length < 12) perSection.set(section, [...list, row]);
    }
    return Array.from(perSection.values())
      .flat()
      .flatMap((row) => {
        const date = row.querySelector('.gx-event-date, time');
        if (!date) return [];
        const title =
          row.querySelector('h2, h3') ??
          Array.from(row.querySelectorAll(':scope > *, :scope > * > *')).find(
            (el) => !el.contains(date) && !date.contains(el) && (el.textContent ?? '').trim() !== ''
          );
        const label = (title?.textContent ?? row.textContent ?? '').trim().slice(0, 60);
        if (!title) return [`${label}: no title`];
        if (!(title.compareDocumentPosition(date) & Node.DOCUMENT_POSITION_FOLLOWING))
          return [`${label}: date before title`];
        // Directly under the title: a teaser paragraph comes after the date line, not between
        const teaser = Array.from(row.querySelectorAll('p')).find((p) => !p.contains(date));
        if (teaser && !(date.compareDocumentPosition(teaser) & Node.DOCUMENT_POSITION_FOLLOWING))
          return [`${label}: date after the teaser`];
        const range = document.createRange();
        range.selectNodeContents(title);
        const lines = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
        const dateLines = Array.from(date.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
        if (lines.length === 0 || dateLines.length === 0) return [`${label}: not rendered`];
        const titleBottom = Math.max(...lines.map((r) => r.bottom));
        return dateLines[0].top >= titleBottom - 0.5 ? [] : [`${label}: date beside or above title`];
      });
  });
}

for (const viewport of viewports) {
  test.describe(`date under the title at ${viewport.width}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const list of cases) {
      test(`${list.name} (${list.path})`, async ({ page }) => {
        await page.goto(list.path);
        if (list.count) {
          await expect(page.locator('[data-filter-count]').first()).toHaveText(list.count, { timeout: 60_000 });
        }
        if (list.ready) await expect(page.locator(list.ready).first()).toBeVisible({ timeout: 60_000 });
        await expect(page.locator(list.rows).first()).toBeVisible();
        expect(await misplacedDates(page, list.rows)).toEqual([]);
      });
    }
  });
}
