import { test, expect } from '@playwright/test';

// The page is flat white (page role): no light blue grid behind the content, and no white box
// with a shadow around an article or a list. Cards stay cards; they are not boxed again.
const readingPages = [
  '/admin/config/windows/',
  '/news/2025-10-15-egd2025/',
  '/events/2025-admin-training-brno/',
  '/events/gcc2026/',
];
const listingPages = ['/news/', '/events/', '/tags/', '/eu/news/'];
const WHITE = 'rgb(255, 255, 255)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

for (const path of [...readingPages, ...listingPages]) {
  test(`${path} sits on the flat white page`, async ({ page }) => {
    await page.goto(path);
    const main = await page.locator('#main-content').evaluate((el) => {
      const style = getComputedStyle(el);
      return { bg: style.backgroundColor, image: style.backgroundImage };
    });
    expect(main).toEqual({ bg: WHITE, image: 'none' });
  });
}

for (const path of readingPages) {
  test(`${path}: the article has no box of its own`, async ({ page }) => {
    await page.goto(path);
    const article = await page.locator('#main-content > article').evaluate((el) => {
      const style = getComputedStyle(el);
      return { bg: style.backgroundColor, shadow: style.boxShadow };
    });
    expect(article).toEqual({ bg: TRANSPARENT, shadow: 'none' });
  });
}

for (const path of listingPages) {
  test(`${path}: the list under the header is not boxed`, async ({ page }) => {
    await page.goto(path);
    const wrapper = page.locator('header.page-header ~ div').first();
    await expect(wrapper).toBeVisible();
    const style = await wrapper.evaluate((el) => {
      const own = getComputedStyle(el);
      return { bg: own.backgroundColor, shadow: own.boxShadow, radius: own.borderBottomLeftRadius };
    });
    expect(style).toEqual({ bg: TRANSPARENT, shadow: 'none', radius: '0px' });
  });
}

test('supporters sit flat around their cards', async ({ page }) => {
  await page.goto('/events/2025-admin-training-brno/');
  const section = page.locator('section.supporter-section');
  await expect(section).toBeVisible();
  const style = await section.evaluate((el) => {
    const own = getComputedStyle(el);
    return {
      image: own.backgroundImage,
      bg: own.backgroundColor,
      left: own.borderLeftWidth,
      radius: own.borderTopLeftRadius,
    };
  });
  expect(style).toEqual({ image: 'none', bg: TRANSPARENT, left: '0px', radius: '0px' });
  await expect(section.locator('[data-supporter-card]').first()).toBeVisible();
});

for (const path of ['/projects/esg/', '/projects/esg/news/', '/projects/esg/events/']) {
  test(`${path}: the project page is not boxed`, async ({ page }) => {
    await page.goto(path);
    const panel = page.locator('#main-content > div').first();
    const style = await panel.evaluate((el) => {
      const own = getComputedStyle(el);
      return { bg: own.backgroundColor, shadow: own.boxShadow };
    });
    expect(style).toEqual({ bg: TRANSPARENT, shadow: 'none' });
  });
}
