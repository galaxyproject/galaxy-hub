import { test, expect, type Locator, type Page } from '@playwright/test';

// Reading grid: 72ch text column with a sticky "On this page" rail from 1280px, the
// measure on running text, centred blocks left at full width, no sideways page scroll.
// Widths are compared with 72ch resolved in the page itself, so the font does not matter.

const TOC_PAGE = '/get-started/';
const TABLE_PAGE = '/news/2025-10-10-llm-hub/';
const NO_TOC_PAGE = '/galaxy-team/';
const CENTRED_EVENT = '/events/gcc2026/';

/** Width of `72ch` (the --measure token) at the font size of the given element. */
async function measureAt(locator: Locator): Promise<number> {
  return locator.evaluate((el) => {
    const probe = document.createElement('span');
    probe.style.cssText = 'display:block;position:absolute;visibility:hidden;width:var(--measure)';
    el.appendChild(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width;
  });
}

/** First direct-child paragraph of the prose column with at least `min` characters of text. */
function longParagraph(prose: Locator, min = 200): Locator {
  return prose.locator(':scope > p').filter({ hasText: new RegExp(`[\\s\\S]{${min},}`) }).first();
}

async function expectNoSidewaysScroll(page: Page) {
  const scroll = await page.evaluate(() => {
    window.scrollTo({ left: 10000, top: 0, behavior: 'instant' });
    const root = document.documentElement;
    return { x: window.scrollX, scrollWidth: root.scrollWidth, clientWidth: root.clientWidth };
  });
  expect(scroll.x, 'page does not scroll sideways').toBe(0);
  expect(scroll.scrollWidth, 'no content past the right edge').toBeLessThanOrEqual(scroll.clientWidth);
}

test.describe('Reading grid at 1440px', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('the "On this page" rail stays in view while the page scrolls', async ({ page }) => {
    await page.goto(TOC_PAGE);
    const rail = page.locator('.toc-sidebar nav');
    await expect(rail).toBeVisible();
    await expect(page.locator('.toc-mobile')).toBeHidden();

    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' }));
    const box = (await rail.boundingBox())!;
    expect(box.y, 'rail top is on screen').toBeGreaterThanOrEqual(0);
    expect(box.y, 'rail top is on screen').toBeLessThan(900);
    await expect(page.locator('.toc-sidebar a[href="#main-content"]')).toBeVisible();
  });

  test('scrolling marks the current section in the rail', async ({ page }) => {
    await page.goto(TOC_PAGE);
    const links = page.locator('.toc-sidebar a.toc-link');
    expect(await links.count()).toBeGreaterThan(4);

    for (const index of [3, 1]) {
      const href = (await links.nth(index).getAttribute('href'))!;
      await page.locator(href).evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await expect(links.nth(index)).toHaveAttribute('aria-current', 'location');
      await expect(page.locator('.toc-sidebar a[aria-current]')).toHaveCount(1);
    }
  });

  test('running text stops at 72ch beside the rail', async ({ page }) => {
    await page.goto(TOC_PAGE);
    const prose = page.locator('.prose-galaxy').first();
    const paragraph = longParagraph(prose);
    const measure = await measureAt(paragraph);
    expect((await prose.boundingBox())!.width, 'text column').toBeLessThanOrEqual(measure + 1);
    expect((await paragraph.boundingBox())!.width).toBeLessThanOrEqual(measure + 1);

    // As in prototype A: text on the left edge of the frame, rail on the right edge.
    const frame = await page.locator('.content-with-toc').evaluate((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return { left: r.left + parseFloat(s.paddingLeft), right: r.right - parseFloat(s.paddingRight) };
    });
    const railBox = (await page.locator('.toc-sidebar').boundingBox())!;
    expect(Math.abs((await prose.boundingBox())!.x - frame.left), 'text starts at the frame edge').toBeLessThan(1);
    expect(Math.abs(railBox.x + railBox.width - frame.right), 'rail ends at the frame edge').toBeLessThan(1);

    // Prototype A's frame: 40px in from the main area on both sides below its 1120px cap,
    // which gives the same text-to-rail gap.
    const main = (await page.locator('main').boundingBox())!;
    expect(Math.abs(frame.left - main.x - 40), 'frame 40px from the main area').toBeLessThan(1);
    expect(Math.abs(main.x + main.width - frame.right - 40), 'frame 40px from the main area').toBeLessThan(1);
  });

  test('tables keep the full column, text keeps the measure', async ({ page }) => {
    await page.goto(TABLE_PAGE);
    const prose = page.locator('.prose-galaxy').first();
    const table = prose.locator('.table-wrapper').first();
    await expect(table).toBeVisible();
    const proseWidth = (await prose.boundingBox())!.width;
    expect((await table.boundingBox())!.width).toBeGreaterThan(proseWidth - 2);
    const paragraph = longParagraph(prose, 120);
    expect((await paragraph.boundingBox())!.width).toBeLessThanOrEqual((await measureAt(paragraph)) + 1);
  });

  test('without a rail, text blocks are 72ch and centred, the column keeps its full width', async ({ page }) => {
    await page.goto(NO_TOC_PAGE);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const proseBox = (await prose.boundingBox())!;
    const paragraph = longParagraph(prose);
    const measure = await measureAt(paragraph);
    expect(proseBox.width, 'the column is wider than the measure').toBeGreaterThan(measure + 40);

    const textBox = (await paragraph.boundingBox())!;
    expect(textBox.width, 'paragraph capped at 72ch').toBeLessThanOrEqual(measure + 1);
    expect(textBox.width, 'paragraph reaches the measure').toBeGreaterThan(measure - 1);
    const centre = proseBox.x + proseBox.width / 2;
    expect(Math.abs(textBox.x + textBox.width / 2 - centre), 'paragraph is centred').toBeLessThan(2);

    const floatBox = await prose.locator(':scope > img.float-right').first().boundingBox();
    expect(floatBox, `${NO_TOC_PAGE} needs a right-floated image as a direct child`).not.toBeNull();
    expect(floatBox!.x + floatBox!.width, 'a right float sits at the text edge').toBeLessThanOrEqual(
      textBox.x + textBox.width + 1
    );

    const centred = prose.locator(':scope > p[style*="text-align"]').first();
    const centredBox = await centred.boundingBox();
    expect(centredBox, `${NO_TOC_PAGE} needs a centred paragraph as a direct child`).not.toBeNull();
    expect(centredBox!.width, 'centred paragraph uses the full column').toBeGreaterThan(proseBox.width - 2);
    expect(Math.abs(centredBox!.x + centredBox!.width / 2 - centre)).toBeLessThan(2);
  });

  test('without a rail, tile grids keep the full column and text lines up with them', async ({ page }) => {
    await page.goto(CENTRED_EVENT);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const grid = prose.locator('.gx-tile-grid').first();
    const gridBox = await grid.boundingBox();
    expect(gridBox, `${CENTRED_EVENT} needs a tile grid`).not.toBeNull();
    const measure = await measureAt(prose);
    expect(gridBox!.width, 'tile grid wider than the measure').toBeGreaterThan(measure + 40);
    // With wide content in the column, text stays left-aligned with it (not centred).
    const heading = grid.locator('xpath=preceding-sibling::*[1][self::h2]');
    const headingBox = await heading.boundingBox();
    expect(headingBox, `${CENTRED_EVENT} needs an h2 right before the tile grid`).not.toBeNull();
    expect(headingBox!.width, 'section heading capped at 72ch').toBeLessThanOrEqual(measure + 1);
    expect(Math.abs(headingBox!.x - gridBox!.x), 'heading starts where the grid starts').toBeLessThan(1);
  });

  test('without a rail, text lines up with an embed wrapped in a div', async ({ page }) => {
    await page.goto('/events/2021-05-27-dev-roundtable/');
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const iframe = prose.locator(':scope > div > iframe').first();
    const iframeBox = await iframe.boundingBox();
    expect(iframeBox, 'the page needs a wrapped iframe').not.toBeNull();
    const textBox = (await longParagraph(prose, 80).boundingBox())!;
    expect(Math.abs(textBox.x - iframeBox!.x), 'text starts where the embed starts').toBeLessThan(1);
  });

  test('without a rail, text lines up with a centred box', async ({ page }) => {
    await page.goto('/community/steering/');
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const alertBox = await prose.locator(':scope > .alert').first().boundingBox();
    expect(alertBox, 'the page needs an alert box as a direct child').not.toBeNull();
    // The page's text is its heading; a 72ch block, so its box shows the text edge.
    const textBox = (await prose.locator(':scope > :is(h1, h2)').first().boundingBox())!;
    expect(Math.abs(textBox.x - alertBox!.x), 'text starts where the box starts').toBeLessThan(1);
  });

  test('a centred conference intro stays centred in the content column', async ({ page }) => {
    await page.goto(CENTRED_EVENT);
    const prose = page.locator('.prose-galaxy').first();
    const proseBox = (await prose.boundingBox())!;
    const heading = prose.locator('.text-center h1').first();
    await expect(heading).toBeVisible();
    const line = await heading.evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      return { left: r.left, right: r.right };
    });
    const centre = proseBox.x + proseBox.width / 2;
    expect(Math.abs((line.left + line.right) / 2 - centre), 'heading text is centred').toBeLessThan(4);
  });

  test('no sideways page scroll', async ({ page }) => {
    for (const path of [TOC_PAGE, TABLE_PAGE]) {
      await page.goto(path);
      await expectNoSidewaysScroll(page);
    }
  });
});

test.describe('Reading grid at 390px', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('"On this page" is a collapsible block, the rail is hidden', async ({ page }) => {
    await page.goto(TOC_PAGE);
    await expect(page.locator('details.toc-mobile')).toBeVisible();
    await expect(page.locator('.toc-sidebar')).toBeHidden();
  });

  test('no sideways page scroll', async ({ page }) => {
    for (const path of [TOC_PAGE, TABLE_PAGE]) {
      await page.goto(path);
      await expectNoSidewaysScroll(page);
    }
  });
});

test.describe('Event pages and the On this page rail at 1440px', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('an event with headings gets the rail by default', async ({ page }) => {
    await page.goto('/events/2023-02-02-foodborne-pathogen-detection-workshop/');
    await expect(page.locator('.toc-sidebar nav')).toBeVisible();
  });

  test('an event with autotoc: false keeps no rail', async ({ page }) => {
    await page.goto('/events/2021-10-sars-cov-2-training/');
    await expect(page.locator('.prose-galaxy').first()).toBeVisible();
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
  });

  test('conference pages are unchanged', async ({ page }) => {
    await page.goto('/events/2018-europe-dev/abstracts/');
    await expect(page.locator('.conference-subnav')).toHaveCount(1);
    await expect(page.locator('.toc-sidebar nav')).toBeVisible();
    await page.goto(CENTRED_EVENT);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
  });
});
