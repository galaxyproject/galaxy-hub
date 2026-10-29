import { test, expect, type Page } from '@playwright/test';

// Reading pages (articles, news posts, events) use the compact page header: title on the
// page surface, a hairline underneath with a 48px gold segment, no gradient. Listing and landing
// pages keep the gradient hero.
const compactPages = [
  { name: 'content page', path: '/community/' },
  { name: 'news post', path: '/news/2025-10-15-egd2025/' },
  { name: 'event page', path: '/events/2025-admin-training-brno/' },
];

const heroPages = [
  { name: 'news listing', path: '/news/' },
  { name: 'FAIR page (principle cards sit on the hero)', path: '/fair/' },
];

const GOLD = 'rgb(255, 215, 0)';

function header(page: Page) {
  return page.locator('header.page-header');
}

for (const { name, path } of compactPages) {
  test.describe(`compact page header: ${name}`, () => {
    test('has the h1, a hairline with a 48px gold segment, and no gradient', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const head = header(page);
      await expect(head).toHaveCount(1);
      await expect(head).toHaveClass(/\bpage-header--compact\b/);
      await expect(head.locator('h1')).toHaveCount(1);
      await expect(head.locator('h1')).toBeVisible();

      const style = await head.evaluate((el) => {
        const own = getComputedStyle(el);
        const grid = getComputedStyle(el, '::before');
        const segment = getComputedStyle(el, '::after');
        return {
          backgroundImage: own.backgroundImage,
          borderBottomWidth: own.borderBottomWidth,
          gridContent: grid.content,
          segmentWidth: segment.width,
          segmentHeight: segment.height,
          segmentColor: segment.backgroundColor,
        };
      });
      expect(style.backgroundImage).toBe('none');
      expect(style.borderBottomWidth).toBe('1px');
      expect(style.gridContent).toBe('none');
      expect(style.segmentWidth).toBe('48px');
      expect(style.segmentHeight).toBe('3px');
      expect(style.segmentColor).toBe(GOLD);
    });

    test('title is dark text on a light surface', async ({ page }) => {
      await page.goto(path);
      const colors = await header(page)
        .locator('h1')
        .evaluate((el) => ({ fg: getComputedStyle(el).color }));
      // galaxy-dark #2c3143
      expect(colors.fg).toBe('rgb(44, 49, 67)');
    });
  });
}

test.describe('compact page header: event details', () => {
  test('event page keeps date, duration and location in the header', async ({ page }) => {
    await page.goto('/events/2025-admin-training-brno/');
    const head = header(page);
    await expect(head.getByText('Date', { exact: true })).toBeVisible();
    await expect(head.locator('.gx-event-date time').first()).toHaveAttribute('datetime', '2025-11-24');
    await expect(head.locator('.gx-event-date__dur')).toHaveText('5 days');
    await expect(head.getByText('Location', { exact: true })).toBeVisible();
    await expect(head.getByText('Brno, Czechia, Europe')).toBeVisible();
  });
});

for (const { name, path } of heroPages) {
  test(`hero page header stays on the ${name}`, async ({ page }) => {
    await page.goto(path);
    const head = header(page).first();
    await expect(head).not.toHaveClass(/\bpage-header--compact\b/);
    const backgroundImage = await head.evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(backgroundImage).toContain('linear-gradient');
  });
}

test('compact header author links are galaxy-primary, not white', async ({ page }) => {
  await page.goto('/news/2025-10-15-egd2025/');
  const author = header(page).locator('a[href^="/hall-of-fame/"]').first();
  await expect(author).toBeVisible();
  expect(await author.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(37, 83, 123)');
});
