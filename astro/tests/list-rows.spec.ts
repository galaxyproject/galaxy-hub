import { test, expect, type Page } from '@playwright/test';

// Shared list rows (DESIGN.md "List Rows", prototype A .row): flat rows with no background,
// shadow or radius, a 1px hairline under each row and no gap between rows. Past event rows carry
// a "Past" badge. Checks use computed styles and box edges only, so they do not depend on fonts.

type RowCase = { name: string; path: string; rows: string; past?: string; count?: RegExp };

const cases: RowCase[] = [
  { name: 'news', path: '/news/?year=2020', rows: '.news-list article', count: /in 2020/ },
  {
    name: 'upcoming events',
    path: '/events/?status=upcoming',
    rows: '.events-list article',
    count: /upcoming events?/,
  },
  {
    name: 'past events',
    path: '/events/?status=past',
    rows: '.events-list article',
    past: '.events-list article',
    count: /past events?/,
  },
  { name: 'region archive', path: '/eu/events/archive/', rows: '.events-list article', past: '.events-list article' },
  {
    name: 'events archive',
    path: '/events/archive/',
    rows: 'main section li.gx-lrow',
    past: 'main section li.gx-lrow',
  },
  {
    name: 'webinars',
    path: '/events/webinars/',
    rows: 'main section li.gx-lrow',
    past: 'main section:has(h2:text("Past Webinars")) li.gx-lrow',
  },
  {
    name: 'community calls',
    path: '/community/community-calls/',
    rows: 'main section li.gx-lrow',
    past: 'main section:has(h2:text("Past Community Calls")) li.gx-lrow',
  },
  { name: 'tag page', path: '/tags/conference/', rows: '#news-list > li, #events-list > li' },
];

const viewports = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'phone', width: 390, height: 844 },
];

async function rowProblems(page: Page, rows: string): Promise<string[]> {
  return page.locator(rows).evaluateAll((els) => {
    const visible = els.filter((el) => el.getClientRects().length > 0).slice(0, 10);
    const problems: string[] = [];
    visible.forEach((row, i) => {
      const style = getComputedStyle(row);
      const label = `row ${i + 1} (${(row.textContent ?? '').trim().slice(0, 40)})`;
      if (style.backgroundColor !== 'rgba(0, 0, 0, 0)') problems.push(`${label}: background ${style.backgroundColor}`);
      if (style.boxShadow !== 'none') problems.push(`${label}: box-shadow`);
      if (style.borderTopLeftRadius !== '0px') problems.push(`${label}: radius ${style.borderTopLeftRadius}`);
      if (style.borderTopWidth !== '0px') problems.push(`${label}: top border`);
      if (style.borderBottomWidth !== '1px' || style.borderBottomStyle !== 'solid') {
        problems.push(`${label}: no 1px hairline under the row`);
      }
      // Rows in one list touch: the hairline is the only separator
      const next = visible[i + 1];
      if (next && next.parentElement === row.parentElement) {
        const gap = next.getBoundingClientRect().top - row.getBoundingClientRect().bottom;
        if (Math.abs(gap) > 0.5) problems.push(`${label}: ${gap.toFixed(1)}px gap to the next row`);
      }
    });
    return visible.length === 0 ? ['no visible rows'] : problems;
  });
}

for (const viewport of viewports) {
  test.describe(`list rows at ${viewport.width}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const list of cases) {
      test(`${list.name} (${list.path})`, async ({ page }) => {
        await page.goto(list.path);
        if (list.count) {
          await expect(page.locator('[data-filter-count]').first()).toHaveText(list.count, { timeout: 60_000 });
        }
        await expect(page.locator(list.rows).first()).toBeVisible({ timeout: 60_000 });
        // Measure at rest: hover paints the row
        await page.mouse.move(0, 0);
        expect(await rowProblems(page, list.rows)).toEqual([]);

        if (list.past) {
          const past = page.locator(list.past);
          const total = Math.min(await past.count(), 10);
          expect(total).toBeGreaterThan(0);
          for (let i = 0; i < total; i++) {
            await expect(past.nth(i).locator('.gx-badge-past')).toHaveText('Past');
          }
        }
      });
    }
  });
}

test('the archive year heading is a ruled heading with a count, not a boxed bar', async ({ page }) => {
  await page.goto('/events/archive/');
  const heading = page.locator('main h2.gx-year-head').first();
  await expect(heading).toBeVisible();
  const style = await heading.evaluate((el) => {
    const s = getComputedStyle(el);
    return { bg: s.backgroundColor, position: s.position, border: `${s.borderBottomWidth} ${s.borderBottomStyle}` };
  });
  expect(style).toEqual({ bg: 'rgba(0, 0, 0, 0)', position: 'static', border: '1px solid' });
  await expect(heading.locator('.gx-year-head__count')).toHaveText(/^\d+ events$/);
});

test.describe('list row links', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const { path, row, ready } of [
    { path: '/events/webinars/', row: 'main section li.gx-lrow' },
    { path: '/events/?status=past', row: '.events-list article', ready: /past events?/ },
    { path: '/news/?year=2020', row: '.news-list article', ready: /in 2020/ },
  ]) {
    test(`${path}: the title link names the row, covers it and shows a focus ring`, async ({ page }) => {
      await page.goto(path);
      // Hydrated lists re-render once the URL filter applies; wait for its count line
      if (ready) await expect(page.locator('[data-filter-count]').first()).toHaveText(ready, { timeout: 60_000 });
      const first = page
        .locator(row)
        .filter({ hasNot: page.locator('[data-external-icon]') })
        .first();
      await expect(first).toBeVisible({ timeout: 60_000 });
      const link = first.getByRole('link');
      await expect(link).toHaveCount(1);
      const title = ((await first.locator('h2, h3').first().textContent()) ?? '').trim();
      await expect(link).toHaveAccessibleName(title);

      // Keyboard focus outlines the whole row
      await link.focus();
      const outline = await first.evaluate((el) => {
        const s = getComputedStyle(el);
        return `${s.outlineStyle} ${s.outlineWidth}`;
      });
      expect(outline).toBe('solid 2px');

      // A click near the row's bottom-right corner, away from the title text, follows the link
      const href = await link.getAttribute('href');
      const box = (await first.boundingBox())!;
      await page.mouse.click(box.x + box.width - 6, box.y + box.height - 6);
      await expect(page).toHaveURL(new RegExp(`${href}$`));
    });
  }
});

test.describe('tiles keep their cards', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('event tiles have no Past badge and keep the 16px grey location icon', async ({ page }) => {
    await page.goto('/events/?view=tiles');
    const tiles = page.locator('.events-list [data-view="tiles"] article');
    await expect(tiles.first()).toBeVisible({ timeout: 60_000 });
    // Past tiles keep the date line alone: no badge, no location
    const pastTiles = page.locator('.events-list section:has(h2:text("Past Events")) [data-view="tiles"] article');
    await expect(pastTiles.first()).toBeVisible();
    await expect(page.locator('.events-list .gx-badge-past')).toHaveCount(0);
    expect(await pastTiles.first().locator('p > span:not(.gx-event-date)').count()).toBe(0);
    await expect(page.locator('.events-list .gx-lrow, .events-list .gx-lrow__icon')).toHaveCount(0);

    const icon = page.locator('.events-list [data-view="tiles"] article p > span:not(.gx-event-date) > svg').first();
    await expect(icon).toBeVisible();
    const { width, colour, meta } = await icon.evaluate((svg) => ({
      width: svg.getBoundingClientRect().width,
      colour: getComputedStyle(svg).color,
      meta: getComputedStyle(svg.closest('p')!).color,
    }));
    expect(width).toBe(16);
    expect(colour).toBe(meta);
  });
});
