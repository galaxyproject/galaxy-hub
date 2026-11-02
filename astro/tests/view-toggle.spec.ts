import { test, expect, type Locator, type Page } from '@playwright/test';

// Rows/tiles toggle on the news and events listings (DESIGN.md "View Toggle")

async function openNews(page: Page, path = '/news/') {
  await page.goto(path);
  await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
}

// EventsList is client:only, so it is ready once it renders (the toggle is hidden on phones)
async function openEvents(page: Page, path = '/events/') {
  await page.goto(path);
  await expect(page.locator('.events-list [data-view-toggle]')).toBeAttached({ timeout: 60_000 });
}

const toggle = (page: Page, name: string) => page.getByRole('group', { name });
const button = (page: Page, group: string, label: 'Rows' | 'Tiles') =>
  toggle(page, group).getByRole('button', { name: label });

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the layout
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

async function expectView(page: Page, group: string, list: Locator, view: 'rows' | 'tiles') {
  await expect(button(page, group, 'Rows')).toHaveAttribute('aria-pressed', String(view === 'rows'));
  await expect(button(page, group, 'Tiles')).toHaveAttribute('aria-pressed', String(view === 'tiles'));
  await expect(list).toHaveAttribute('data-view', view);
}

const newsList = (page: Page) => page.locator('.news-list [data-view]:not(button)');
const pastList = (page: Page) => page.locator('.events-list section:has-text("Past Events") [data-view]:not(button)');

// The toggle shares a row with another element (the result count or a section heading)
async function expectSameRow(a: Locator, b: Locator) {
  const [boxA, boxB] = [await a.boundingBox(), await b.boundingBox()];
  expect(boxA && boxB).toBeTruthy();
  const centre = boxB!.y + boxB!.height / 2;
  expect(centre).toBeGreaterThan(boxA!.y);
  expect(centre).toBeLessThan(boxA!.y + boxA!.height);
  expect(boxB!.x).toBeGreaterThan(boxA!.x);
}

test.describe('View toggle on news', () => {
  test.setTimeout(90_000);
  const group = 'News layout';

  test('switches to tiles and back, with the view param only for tiles', async ({ page }) => {
    await openNews(page);
    await expectView(page, group, newsList(page), 'rows');
    await expect(page.locator('.news-list [data-tile-image]')).toHaveCount(0);

    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/news\/\?view=tiles$/);
    await expectView(page, group, newsList(page), 'tiles');
    const columns = await newsList(page).evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBeGreaterThan(1);

    await button(page, group, 'Rows').click();
    await expect(page).toHaveURL(/\/news\/$/);
    await expectView(page, group, newsList(page), 'rows');
  });

  test('tiles put the image at the bottom of the card', async ({ page }) => {
    await openNews(page, '/news/?view=tiles');
    const tile = page.locator('.news-list article:has([data-tile-image])').first();
    await expect(tile).toBeVisible();
    const { imageTop, textBottom, imageBottom, linkBottom } = await tile.evaluate((article) => {
      const link = article.querySelector('a') as HTMLElement;
      const image = article.querySelector('[data-tile-image]') as HTMLElement;
      const text = image.previousElementSibling as HTMLElement;
      return {
        imageTop: image.getBoundingClientRect().top,
        imageBottom: image.getBoundingClientRect().bottom,
        textBottom: text.getBoundingClientRect().bottom,
        linkBottom: link.getBoundingClientRect().bottom,
      };
    });
    expect(imageTop).toBeGreaterThanOrEqual(textBottom - 1);
    expect(Math.abs(linkBottom - imageBottom)).toBeLessThanOrEqual(1);
    await expect(tile.locator('[data-tile-image]')).toHaveAttribute('alt', '');
  });

  test('reload keeps the tiles view', async ({ page }) => {
    await openNews(page);
    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\?view=tiles$/);
    await page.reload();
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expectView(page, group, newsList(page), 'tiles');
  });

  test('view is written after the filter params', async ({ page }) => {
    await openNews(page, '/news/?q=galaxy');
    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/news\/\?q=galaxy&view=tiles$/);

    await page
      .getByRole('group', { name: 'Filter news by year' })
      .getByRole('button', { name: /^\d{4}/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/news\/\?q=galaxy&year=\d{4}&view=tiles$/);
    await expectView(page, group, newsList(page), 'tiles');
  });

  test('back and forward restore the view', async ({ page }) => {
    await openNews(page, '/news/?view=tiles');
    // External items redirect off-site, so follow an on-site article.
    const link = page.locator('.news-list article a:not(:has([data-external-icon]))').first();
    const href = (await link.getAttribute('href')) as string;
    await link.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack();
    await expect(page).toHaveURL(/\/news\/\?view=tiles$/);
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expectView(page, group, newsList(page), 'tiles');

    await page.goForward();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);
    await page.goBack();
    await expect(page).toHaveURL(/\/news\/\?view=tiles$/);
    await expectView(page, group, newsList(page), 'tiles');
  });

  test('popstate restores the view', async ({ page }) => {
    await openNews(page);
    await popTo(page, '/news/?view=tiles');
    await expectView(page, group, newsList(page), 'tiles');
    await popTo(page, '/news/');
    await expectView(page, group, newsList(page), 'rows');
  });

  test('an unknown view falls back to rows', async ({ page }) => {
    await openNews(page, '/news/?view=grid');
    await expectView(page, group, newsList(page), 'rows');
  });

  test('subsite news has the toggle', async ({ page }) => {
    await openNews(page, '/eu/news/');
    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/eu\/news\/\?view=tiles$/);
    await expectView(page, group, newsList(page), 'tiles');
  });

  test('390px phone: toggle hidden, a tiles link still shows tiles, no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openNews(page, '/news/?view=tiles');
    await expect(page.locator('.news-list [data-view-toggle]')).toBeHidden();
    await expect(newsList(page)).toHaveAttribute('data-view', 'tiles');
    await expect(newsList(page)).toHaveCSS('display', 'grid');
    await expect(page).toHaveURL(/\/news\/\?view=tiles$/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('the toggle shows from 640px, where tiles have two columns', async ({ page }) => {
    await page.setViewportSize({ width: 639, height: 900 });
    await openNews(page, '/news/?view=tiles');
    await expect(page.locator('.news-list [data-view-toggle]')).toBeHidden();

    await page.setViewportSize({ width: 640, height: 900 });
    await expect(toggle(page, group)).toBeVisible();
    const columns = await newsList(page).evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(2);
  });

  test('segmented control: pressed is galaxy-primary with white bold text, the group has a 3:1 border', async ({
    page,
  }) => {
    await openNews(page);
    const rows = button(page, group, 'Rows');
    await expect(rows).toHaveCSS('background-color', 'rgb(37, 83, 123)');
    await expect(rows).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(rows).toHaveCSS('font-weight', '700');
    await expect(button(page, group, 'Tiles')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(button(page, group, 'Tiles')).toHaveCSS('color', 'rgb(79, 78, 80)');
    await expect(toggle(page, group)).toHaveCSS('border-top-color', 'rgb(135, 135, 137)');
    await expect(toggle(page, group)).toHaveCSS('border-top-width', '1px');
  });

  test('sits on the result count row', async ({ page }) => {
    await openNews(page);
    await expectSameRow(page.locator('.news-list [data-filter-count]'), toggle(page, group));
    await expect(page.locator('.news-list [data-view-toggle]')).toHaveCount(1);
  });

  test('keyboard focus shows a solid 2px outline', async ({ page }) => {
    await openNews(page);
    const tiles = button(page, group, 'Tiles');
    await button(page, group, 'Rows').focus();
    await page.keyboard.press('Tab');
    await expect(tiles).toBeFocused();
    await expect
      .poll(() => tiles.evaluate((el) => `${getComputedStyle(el).outlineStyle} ${getComputedStyle(el).outlineWidth}`))
      .toBe('solid 2px');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\?view=tiles$/);
  });

  test('bare news widgets have no toggle', async ({ page }) => {
    await page.goto('/bare/eu/latest/news/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('[data-view-toggle]')).toHaveCount(0);
  });
});

test.describe('View toggle on events', () => {
  test.setTimeout(90_000);
  const group = 'Events layout';

  test('switches upcoming and past events to tiles and back', async ({ page }) => {
    await openEvents(page);
    await expectView(page, group, pastList(page), 'rows');

    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/events\/\?(year=\d{4}&)?view=tiles$/);
    await expectView(page, group, pastList(page), 'tiles');
    const upcoming = page.locator('.events-list section:has-text("Upcoming Events") [data-view]:not(button)');
    if (await upcoming.count()) await expect(upcoming).toHaveAttribute('data-view', 'tiles');
    // Tiles keep the D4 date line
    await expect(pastList(page).locator('.gx-event-date').first()).toBeVisible();

    await button(page, group, 'Rows').click();
    await expect(page).not.toHaveURL(/view=/);
    await expectView(page, group, pastList(page), 'rows');
  });

  test('view is written after the year', async ({ page }) => {
    await openEvents(page);
    await page
      .locator('section:has-text("Past Events") button', { hasText: /^\s*\d{4}/ })
      .nth(1)
      .click();
    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/events\/\?year=\d{4}&view=tiles$/);
  });

  test('reload keeps the tiles view', async ({ page }) => {
    await openEvents(page, '/events/?view=tiles');
    await expectView(page, group, pastList(page), 'tiles');
    await page.reload();
    await expect(page.locator('.events-list [data-view-toggle]')).toBeVisible({ timeout: 60_000 });
    await expectView(page, group, pastList(page), 'tiles');
  });

  test('back and forward restore the view', async ({ page }) => {
    await openEvents(page, '/events/?view=tiles');
    const link = pastList(page).locator('article a:not(:has([data-external-icon]))').first();
    const href = (await link.getAttribute('href')) as string;
    await link.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack();
    await expect(page).toHaveURL(/view=tiles$/);
    await expect(page.locator('.events-list [data-view-toggle]')).toBeVisible({ timeout: 60_000 });
    await expectView(page, group, pastList(page), 'tiles');

    await page.goForward();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);
    await page.goBack();
    await expectView(page, group, pastList(page), 'tiles');
  });

  test('popstate restores the view', async ({ page }) => {
    await openEvents(page);
    await popTo(page, '/events/?view=tiles');
    await expectView(page, group, pastList(page), 'tiles');
    await popTo(page, '/events/');
    await expectView(page, group, pastList(page), 'rows');
  });

  test('sits on the first section heading', async ({ page }) => {
    await openEvents(page);
    await expect(page.locator('.events-list [data-view-toggle]')).toHaveCount(1);
    const upcoming = page.getByRole('heading', { name: /^Upcoming Events/ });
    const heading = (await upcoming.count()) ? upcoming : page.getByRole('heading', { name: /^Past Events/ });
    await expectSameRow(heading, toggle(page, group));

    await openEvents(page, '/eu/events/archive/');
    await expect(page.locator('.events-list [data-view-toggle]')).toHaveCount(1);
    await expectSameRow(page.getByRole('heading', { name: /^Past Events/ }), toggle(page, group));
  });

  test('subsite events and the archive have the toggle', async ({ page }) => {
    await openEvents(page, '/eu/events/');
    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/eu\/events\/\?(year=\d{4}&)?view=tiles$/);
    await expectView(page, group, pastList(page), 'tiles');

    await openEvents(page, '/eu/events/archive/');
    await expectView(page, group, pastList(page), 'rows');
    await button(page, group, 'Tiles').click();
    await expect(page).toHaveURL(/\/eu\/events\/archive\/\?view=tiles$/);
    await expectView(page, group, pastList(page), 'tiles');
  });

  test('390px phone: toggle hidden, tiles still shown, no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openEvents(page, '/events/?view=tiles');
    await expect(page.locator('.events-list [data-view-toggle]')).toBeHidden();
    await expect(pastList(page)).toHaveAttribute('data-view', 'tiles');
    await expect(pastList(page)).toHaveCSS('display', 'grid');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
