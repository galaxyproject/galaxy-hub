import { test, expect, type Page } from '@playwright/test';

// Filter bar on the event listings (DESIGN.md "Filters"): q, year, tag, status, kept in the URL
// in that order, with the rows/tiles view last.

// EventsList is client:only, so it is ready once it renders (the toggle is hidden on phones)
async function openEvents(page: Page, path = '/events/') {
  await page.goto(path);
  await expect(page.locator('.events-list [data-view-toggle]')).toBeAttached({ timeout: 60_000 });
}

const count = (page: Page) => page.locator('.events-list [data-filter-count]');
const search = (page: Page) => page.getByRole('searchbox', { name: 'Search events' });
const years = (page: Page) => page.getByRole('group', { name: 'Filter events by year' });
const statusGroup = (page: Page) => page.getByRole('group', { name: 'Show', exact: true });
const statusButton = (page: Page, name: 'All events' | 'Upcoming' | 'Past') =>
  statusGroup(page).getByRole('button', { name, exact: true });
const upcomingSection = (page: Page) =>
  page.locator('.events-list section').filter({ has: page.getByRole('heading', { name: /^Upcoming Events/ }) });
const pastSection = (page: Page) =>
  page.locator('.events-list section').filter({ has: page.getByRole('heading', { name: /^Past Events/ }) });

async function resultTotal(page: Page): Promise<number> {
  const text = (await count(page).textContent()) || '';
  return Number(text.match(/^\s*(\d+)/)?.[1] ?? NaN);
}

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the filters
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

test.describe('Events filter bar', () => {
  test.setTimeout(90_000);

  test('text search matches every word against title, summary and place', async ({ page }) => {
    await openEvents(page);
    const total = await resultTotal(page);

    await search(page).fill('freiburg');
    await expect(page).toHaveURL(/\/events\/\?q=freiburg$/);
    await expect(count(page)).toContainText('matching “freiburg”');
    const matches = await resultTotal(page);
    expect(matches).toBeGreaterThan(0);
    expect(matches).toBeLessThan(total);

    // Every word must match, so an extra unknown word leaves nothing
    await search(page).fill('freiburg zzqxv');
    await expect(count(page)).toHaveText(/^\s*0 events matching “freiburg zzqxv”\s*$/);
    await expect(page.getByText('No past events match these filters.')).toBeVisible();
  });

  test('year chips filter upcoming and past events', async ({ page }) => {
    await openEvents(page);
    const chip = years(page)
      .getByRole('button', { name: /^\d{4}/ })
      .nth(1);
    const year = ((await chip.textContent()) || '').match(/\d{4}/)?.[0] as string;

    await chip.click();
    await expect(page).toHaveURL(new RegExp(`/events/\\?year=${year}$`));
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page)).toContainText(`in ${year}`);
    // The first <time> of each item is its start date
    const starts = await page
      .locator('.events-list article')
      .evaluateAll((els) => els.map((el) => el.querySelector('time')?.getAttribute('datetime') || ''));
    expect(starts.length).toBeGreaterThan(0);
    for (const start of starts) expect(start.slice(0, 4)).toBe(year);

    await years(page).getByRole('button', { name: 'All years' }).click();
    await expect(page).toHaveURL(/\/events\/$/);
  });

  test('older years come from the select', async ({ page }) => {
    await openEvents(page);
    await years(page).getByRole('combobox', { name: 'Older years' }).click();
    await page.getByRole('option', { name: /^2019\b/ }).click();
    await expect(page).toHaveURL(/\/events\/\?year=2019$/);
    await expect(pastSection(page).locator('article time').first()).toHaveAttribute('datetime', /^2019-/);
  });

  test('tag select keeps events with that tag', async ({ page }) => {
    await openEvents(page);
    await page.getByRole('combobox', { name: 'Tag' }).click();
    await page.getByRole('option', { name: /^webinar \(\d+\)$/ }).click();
    await expect(page).toHaveURL(/\/events\/\?tag=webinar$/);
    await expect(count(page)).toContainText('tagged “webinar”');
    expect(await resultTotal(page)).toBeGreaterThan(0);

    // A tag no event has is dropped, so the select and the list agree (the URL follows on the next change, as on news)
    await openEvents(page, '/events/?tag=no-such-tag');
    await expect(page.getByRole('combobox', { name: 'Tag' })).toContainText('All tags');
    await expect(count(page)).not.toContainText('tagged');
    await statusButton(page, 'Past').click();
    await expect(page).toHaveURL(/\/events\/\?status=past$/);
  });

  test('status shows upcoming or past events only', async ({ page }) => {
    await openEvents(page);
    await expect(statusButton(page, 'All events')).toHaveAttribute('aria-pressed', 'true');
    await expect(pastSection(page)).toBeVisible();

    await statusButton(page, 'Past').click();
    await expect(page).toHaveURL(/\/events\/\?status=past$/);
    await expect(statusButton(page, 'Past')).toHaveAttribute('aria-pressed', 'true');
    await expect(pastSection(page)).toBeVisible();
    await expect(upcomingSection(page)).toHaveCount(0);
    await expect(page.getByText(/^No upcoming events/)).toHaveCount(0);
    await expect(count(page)).toHaveText(/^\s*\d+ past events?\s*$/);

    await statusButton(page, 'Upcoming').click();
    await expect(page).toHaveURL(/\/events\/\?status=upcoming$/);
    await expect(pastSection(page)).toHaveCount(0);
    await expect(count(page)).toHaveText(/^\s*\d+ upcoming events?\s*$/);

    await statusButton(page, 'All events').click();
    await expect(page).toHaveURL(/\/events\/$/);
    await expect(pastSection(page)).toBeVisible();
  });

  test('params are written in the order q, year, tag, status, view', async ({ page }) => {
    await openEvents(page, '/events/?view=tiles&tag=training&year=2019&q=galaxy');
    await expect(search(page)).toHaveValue('galaxy');
    await statusButton(page, 'Past').click();
    await expect(page).toHaveURL(/\/events\/\?q=galaxy&year=2019&tag=training&status=past&view=tiles$/);
    await expect(pastSection(page).locator('[data-view]:not(button)')).toHaveAttribute('data-view', 'tiles');
    await expect(count(page)).toContainText('past events in 2019 tagged “training” matching “galaxy”');
  });

  test('reload keeps the filters', async ({ page }) => {
    await openEvents(page);
    await search(page).fill('training');
    await statusButton(page, 'Past').click();
    await expect(page).toHaveURL(/\/events\/\?q=training&status=past$/);

    await page.reload();
    await expect(page.locator('.events-list [data-view-toggle]')).toBeAttached({ timeout: 60_000 });
    await expect(search(page)).toHaveValue('training');
    await expect(statusButton(page, 'Past')).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page)).toContainText('past events matching “training”');
  });

  test('back and forward through an event restore the filters', async ({ page }) => {
    await openEvents(page, '/events/?q=training&status=past');
    const link = pastSection(page).locator('article a:not(:has([data-external-icon]))').first();
    const href = (await link.getAttribute('href')) as string;
    await link.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack();
    await expect(page).toHaveURL(/\/events\/\?q=training&status=past$/);
    await expect(page.locator('.events-list [data-view-toggle]')).toBeAttached({ timeout: 60_000 });
    await expect(search(page)).toHaveValue('training');
    await expect(statusButton(page, 'Past')).toHaveAttribute('aria-pressed', 'true');

    await page.goForward();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);
    await page.goBack();
    await expect(page).toHaveURL(/\/events\/\?q=training&status=past$/);
    await expect(search(page)).toHaveValue('training');
  });

  test('popstate restores the filters', async ({ page }) => {
    await openEvents(page);
    await popTo(page, '/events/?q=cofest&year=2019&status=past');
    await expect(search(page)).toHaveValue('cofest');
    await expect(count(page)).toContainText('past events in 2019 matching “cofest”');
    await popTo(page, '/events/');
    await expect(search(page)).toHaveValue('');
    await expect(statusButton(page, 'All events')).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page)).toHaveText(/^\s*\d+ events\s*$/);
  });

  test('clear filters keeps the view and moves focus to the search', async ({ page }) => {
    await openEvents(page, '/events/?q=galaxy&year=2019&tag=training&status=past&view=tiles');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page).toHaveURL(/\/events\/\?view=tiles$/);
    await expect(search(page)).toBeFocused();
    await expect(search(page)).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toHaveCount(0);
    await expect(statusButton(page, 'All events')).toHaveAttribute('aria-pressed', 'true');
  });

  test('subsite events filter within the subsite', async ({ page }) => {
    await openEvents(page, '/eu/events/');
    await expect(statusGroup(page)).toBeVisible();
    await search(page).fill('training');
    await statusButton(page, 'Past').click();
    await expect(page).toHaveURL(/\/eu\/events\/\?q=training&status=past$/);
    expect(await resultTotal(page)).toBeGreaterThan(0);
  });

  test('the archive lists past events without a status filter', async ({ page }) => {
    await openEvents(page, '/eu/events/archive/?status=upcoming');
    await expect(statusGroup(page)).toHaveCount(0);
    await expect(upcomingSection(page)).toHaveCount(0);
    await expect(pastSection(page)).toBeVisible();

    // status is not an archive filter, so the next write leaves it out
    await years(page)
      .getByRole('button', { name: /^\d{4}/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/eu\/events\/archive\/\?year=\d{4}$/);
    await search(page).fill('galaxy');
    await expect(page).toHaveURL(/\/eu\/events\/archive\/\?q=galaxy&year=\d{4}$/);
  });

  for (const width of [768, 1024]) {
    test(`${width}px: the search keeps its width and the bar wraps instead of overflowing`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await openEvents(page, '/events/?q=training');
      await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
      const box = await search(page).boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(160);
      // Without wrapping the row squeezes the tag select (w-56, 224px) instead
      const tagBox = await page.getByRole('combobox', { name: 'Tag' }).boundingBox();
      expect(tagBox?.width).toBeGreaterThanOrEqual(220);
      // Every control stays inside the bar
      const overflow = await search(page).evaluate((input) => {
        const bar = input.closest('.filter-bar') as HTMLElement;
        const right = bar.getBoundingClientRect().right;
        const controls = bar.querySelectorAll('input, button, [role="combobox"]');
        return Math.max(...Array.from(controls, (el) => el.getBoundingClientRect().right - right));
      });
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  for (const width of [1024, 1440]) {
    test(`${width}px: news keeps search, tag and clear on one line`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/news/?q=galaxy');
      await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
      const tops = await Promise.all(
        [
          page.getByRole('searchbox', { name: 'Search news' }),
          page.getByRole('combobox', { name: 'Tag' }),
          page.getByRole('button', { name: 'Clear filters' }),
        ].map(async (locator) => (await locator.boundingBox())?.y ?? NaN)
      );
      expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1);
    });
  }

  test('390px phone: the bar stacks without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openEvents(page, '/events/?q=training&status=past&view=tiles');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    for (const name of ['All events', 'Upcoming', 'Past'] as const) {
      const box = await statusButton(page, name).boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(24);
    }
  });
});
