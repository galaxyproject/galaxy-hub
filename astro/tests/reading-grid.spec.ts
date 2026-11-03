import { test, expect, type Locator, type Page } from '@playwright/test';

// Reading grid: from 1280px a text column of up to 80ch with a sticky "On this page" rail
// 48px beside it; without a rail, centred 72ch text on text-only pages and full-width text
// (as on main) on pages with more than text; centred blocks at full width; no sideways scroll.
// Widths are compared with `ch` resolved in the page itself, so the font does not matter.

const TOC_PAGE = '/get-started/';
const TABLE_PAGE = '/news/2025-10-10-llm-hub/';
const NO_TOC_PAGE = '/galaxy-team/';
const CENTRED_EVENT = '/events/gcc2026/';
const EVENT_TOC_PAGE = '/events/2023-02-02-foodborne-pathogen-detection-workshop/';
const TILES_PAGE = '/events/gcc2026/highlights/';
const TEXT_ONLY_NEWS = '/news/2014-questionnaire/';

/** Width of `<ch>ch` at the font size of the given element (72 = measure, 80 = beside the rail). */
async function measureAt(locator: Locator, ch = 72): Promise<number> {
  return locator.evaluate((el, n) => {
    const probe = document.createElement('span');
    probe.style.cssText = `display:block;position:absolute;visibility:hidden;width:${n}ch`;
    el.appendChild(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width;
  }, ch);
}

/** Text column, rail and frame edges of the reading grid. */
async function gridEdges(page: Page) {
  const frame = await page.locator('.content-with-toc').evaluate((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return { left: r.left + parseFloat(s.paddingLeft), right: r.right - parseFloat(s.paddingRight) };
  });
  const prose = (await page.locator('.prose-galaxy').first().boundingBox())!;
  const rail = (await page.locator('.toc-sidebar').boundingBox())!;
  return { frame, prose, rail };
}

/** Left and right edges of the white content card that holds the reading grid. */
async function cardEdges(page: Page) {
  return page.locator('.content-with-toc').evaluate((el) => {
    const r = el.closest('article')!.getBoundingClientRect();
    return { left: r.left, right: r.right };
  });
}

/** Text inset from the white card edges (`sm:px-8`), with or without the rail. */
const CARD_INSET = 32;

/** First direct-child paragraph of the prose column with at least `min` characters of text. */
function longParagraph(prose: Locator, min = 200): Locator {
  return prose.locator(':scope > p').filter({ hasText: new RegExp(`[\\s\\S]{${min},}`) }).first();
}

/** The block spans the prose column (no measure), as running text does on main. */
async function expectFullColumn(prose: Locator, block: Locator) {
  const proseBox = (await prose.boundingBox())!;
  const box = (await block.boundingBox())!;
  // The measure resolves at the column's font size, so headings compare with it too.
  expect(box.width, 'text is wider than the 72ch measure').toBeGreaterThan((await measureAt(prose)) + 40);
  expect(Math.abs(box.x - proseBox.x), 'text starts at the column edge').toBeLessThan(1);
  expect(Math.abs(box.width - proseBox.width), 'text spans the full column').toBeLessThan(1);
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

  for (const path of [TOC_PAGE, EVENT_TOC_PAGE]) {
    test(`running text takes up to 80ch with the rail 48px beside it on ${path}`, async ({ page }) => {
      await page.goto(path);
      const paragraph = longParagraph(page.locator('.prose-galaxy').first());
      const wide = await measureAt(paragraph, 80);
      const { frame, prose, rail } = await gridEdges(page);
      expect(prose.width, 'text column').toBeLessThanOrEqual(wide + 1);
      const textWidth = (await paragraph.boundingBox())!.width;
      expect(textWidth, 'paragraph capped at 80ch').toBeLessThanOrEqual(wide + 1);
      expect(textWidth, 'paragraph wider than the 72ch used without a rail').toBeGreaterThan(
        (await measureAt(paragraph)) + 1
      );
      expect(textWidth, 'paragraph fills the room the frame leaves').toBeGreaterThan(
        Math.min(wide, frame.right - frame.left - 48 - rail.width) - 1
      );

      expect(Math.abs(prose.x - frame.left), 'text starts at the frame edge').toBeLessThan(1);
      expect(Math.abs(rail.x - (prose.x + prose.width) - 48), 'rail 48px beside the text').toBeLessThan(1);
      expect(rail.x + rail.width, 'rail inside the frame').toBeLessThanOrEqual(frame.right + 1);

      const card = await cardEdges(page);
      expect(Math.abs(prose.x - card.left - CARD_INSET), 'text 32px in from the card').toBeLessThan(1);
      expect(Math.abs(card.right - rail.x - rail.width - CARD_INSET), 'rail 32px in from the card').toBeLessThan(1);
    });
  }

  test('tables keep the full column, text keeps the measure', async ({ page }) => {
    await page.goto(TABLE_PAGE);
    const prose = page.locator('.prose-galaxy').first();
    const table = prose.locator('.table-wrapper').first();
    await expect(table).toBeVisible();
    const proseWidth = (await prose.boundingBox())!.width;
    expect((await table.boundingBox())!.width).toBeGreaterThan(proseWidth - 2);
    const paragraph = longParagraph(prose, 120);
    expect((await paragraph.boundingBox())!.width).toBeLessThanOrEqual((await measureAt(paragraph, 80)) + 1);
  });

  test('without a rail, text blocks are 72ch and centred, the column keeps its full width', async ({ page }) => {
    await page.goto(NO_TOC_PAGE);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const proseBox = (await prose.boundingBox())!;
    const paragraph = longParagraph(prose);
    const measure = await measureAt(paragraph);
    expect(proseBox.width, 'the column is wider than the measure').toBeGreaterThan(measure + 40);
    const card = await cardEdges(page);
    expect(Math.abs(proseBox.x - card.left - CARD_INSET), 'column 32px in from the card').toBeLessThan(1);
    const rightInset = card.right - proseBox.x - proseBox.width;
    expect(Math.abs(rightInset - CARD_INSET), 'column 32px in from the card').toBeLessThan(1);

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

  test('without a rail, a text-only page with a script child still centres its 72ch text', async ({ page }) => {
    // News pages end their column with a JSON-LD script; it renders nothing, so it does not count.
    await page.goto(TEXT_ONLY_NEWS);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    await expect(prose.locator(':scope > script')).toHaveCount(1);
    const proseBox = (await prose.boundingBox())!;
    const paragraph = longParagraph(prose);
    const measure = await measureAt(paragraph);
    const textBox = (await paragraph.boundingBox())!;
    expect(textBox.width, 'paragraph capped at 72ch').toBeLessThanOrEqual(measure + 1);
    expect(textBox.width, 'paragraph reaches the measure').toBeGreaterThan(measure - 1);
    const centre = proseBox.x + proseBox.width / 2;
    expect(Math.abs(textBox.x + textBox.width / 2 - centre), 'paragraph is centred').toBeLessThan(2);
  });

  // Pages without a rail that hold more than text render their text as on main: full column.
  test('without a rail, text above a tile grid uses the full column', async ({ page }) => {
    await page.goto(TILES_PAGE);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    await expect(prose.locator(':scope > div img').first(), `${TILES_PAGE} needs talk tiles`).toBeVisible();
    await expectFullColumn(prose, longParagraph(prose));
  });

  test('without a rail, a heading over a tile grid spans the grid', async ({ page }) => {
    await page.goto(CENTRED_EVENT);
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const grid = prose.locator('.gx-tile-grid').first();
    const gridBox = await grid.boundingBox();
    expect(gridBox, `${CENTRED_EVENT} needs a tile grid`).not.toBeNull();
    expect(gridBox!.width, 'tile grid wider than the measure').toBeGreaterThan((await measureAt(prose)) + 40);
    const heading = grid.locator('xpath=preceding-sibling::*[1][self::h2]');
    await expect(heading, `${CENTRED_EVENT} needs an h2 right before the tile grid`).toHaveCount(1);
    await expectFullColumn(prose, heading);
    const headingBox = (await heading.boundingBox())!;
    expect(Math.abs(headingBox.x - gridBox!.x), 'heading starts where the grid starts').toBeLessThan(1);
  });

  test('without a rail, text beside an embed wrapped in a div uses the full column', async ({ page }) => {
    await page.goto('/events/2021-05-27-dev-roundtable/');
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const iframeBox = await prose.locator(':scope > div > iframe').first().boundingBox();
    expect(iframeBox, 'the page needs a wrapped iframe').not.toBeNull();
    const paragraph = longParagraph(prose, 80);
    await expectFullColumn(prose, paragraph);
    const textBox = (await paragraph.boundingBox())!;
    expect(Math.abs(textBox.x - iframeBox!.x), 'text starts where the embed starts').toBeLessThan(1);
  });

  test('without a rail, text beside a centred box uses the full column', async ({ page }) => {
    await page.goto('/community/steering/');
    await expect(page.locator('.toc-sidebar')).toHaveCount(0);
    const prose = page.locator('.prose-galaxy').first();
    const alertBox = await prose.locator(':scope > .alert').first().boundingBox();
    expect(alertBox, 'the page needs an alert box as a direct child').not.toBeNull();
    const heading = prose.locator(':scope > :is(h1, h2)').first();
    await expectFullColumn(prose, heading);
    const textBox = (await heading.boundingBox())!;
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

test.describe('Reading grid from 1280px to 1920px', () => {
  for (const width of [1280, 1366, 1439, 1920]) {
    test(`text takes up to 80ch inside the 32px card inset, rail 48px beside it at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(TOC_PAGE);
      await expect(page.locator('.toc-sidebar nav')).toBeVisible();
      const paragraph = longParagraph(page.locator('.prose-galaxy').first());
      const { frame, prose, rail } = await gridEdges(page);
      const expected = Math.min(await measureAt(paragraph, 80), frame.right - frame.left - 48 - rail.width);
      expect(Math.abs(prose.width - expected), 'text takes the room left, up to 80ch').toBeLessThan(1);
      expect(Math.abs(rail.x - (prose.x + prose.width) - 48), 'rail 48px beside the text').toBeLessThan(1);
      expect(rail.x + rail.width, 'rail inside the frame').toBeLessThanOrEqual(frame.right + 1);
      const card = await cardEdges(page);
      expect(Math.abs(prose.x - card.left - CARD_INSET), 'text 32px in from the card').toBeLessThan(1);
      expect(Math.abs(card.right - rail.x - rail.width - CARD_INSET), 'rail 32px in from the card').toBeLessThan(1);
      const text = (await paragraph.boundingBox())!;
      expect(text.x + text.width, 'text stays in its column').toBeLessThanOrEqual(prose.x + prose.width + 1);
      await expectNoSidewaysScroll(page);
    });
  }
});

test.describe('Reading grid at 390px', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('"On this page" is a collapsible block, the rail is hidden', async ({ page }) => {
    await page.goto(TOC_PAGE);
    await expect(page.locator('details.toc-mobile')).toBeVisible();
    await expect(page.locator('.toc-sidebar')).toBeHidden();
    const prose = (await page.locator('.prose-galaxy').first().boundingBox())!;
    const card = await cardEdges(page);
    expect(Math.abs(prose.x - card.left - 24), 'text 24px in from the card').toBeLessThan(1);
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
