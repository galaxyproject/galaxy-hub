import { test, expect } from '@playwright/test';

// Region homes open with one brand band (dark to primary gradient, 24px grid, 3px gold rule,
// at most 180px tall at desktop width) instead of the hero page header, then flat rows.
const regions = [
  { path: '/eu/', title: 'Galaxy Europe' },
  { path: '/genouest/', title: 'Galaxy GenOuest' },
  { path: '/embed/eu/', title: 'Galaxy Europe' },
];
const GOLD = 'rgb(255, 215, 0)';

for (const { path, title } of regions) {
  test(`${path} opens with the region band`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);

    const band = page.locator('section.region-band');
    await expect(band).toHaveCount(1);
    await expect(band.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(band).toHaveAttribute('aria-labelledby', 'page-title');
    await expect(band.locator('h1')).toHaveAttribute('id', 'page-title');
    await expect(band).toContainText('Regional community');
    await expect(page.locator('header.page-header')).toHaveCount(0);

    const style = await band.evaluate((el) => {
      const own = getComputedStyle(el);
      return {
        image: own.backgroundImage,
        rule: own.borderBottomWidth,
        ruleColor: own.borderBottomColor,
        height: el.getBoundingClientRect().height,
      };
    });
    expect(style.image).toContain('linear-gradient');
    expect(style.rule).toBe('3px');
    expect(style.ruleColor).toBe(GOLD);
    expect(style.height).toBeLessThanOrEqual(180);
  });
}

test('region home lists are flat rows under a hairline section head', async ({ page }) => {
  await page.goto('/eu/');
  for (const heading of ['Upcoming Events', 'Recent News']) {
    const section = page.locator('section').filter({ has: page.getByRole('heading', { name: heading, exact: true }) });
    await expect(section).toHaveCount(1);
    await expect(section.getByRole('link', { name: /View all/ })).toBeVisible();
    const rows = section.locator('ol.region-rows > li');
    // Upcoming events can run out; recent news never does
    if (heading === 'Upcoming Events' && (await section.getByText('No upcoming events.').count()) > 0) continue;
    await expect(rows.first()).toBeVisible();
    const row = rows.first();
    await expect(row.getByRole('heading', { level: 3 }).getByRole('link')).toHaveCount(1);
    const box = await row.evaluate((el) => {
      const style = getComputedStyle(el);
      return { shadow: style.boxShadow, line: style.borderBottomWidth, radius: style.borderTopLeftRadius };
    });
    expect(box).toEqual({ shadow: 'none', line: '1px', radius: '0px' });
  }
});

test('region band fits a phone without sideways scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/eu/');
  await expect(page.locator('section.region-band h1')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
