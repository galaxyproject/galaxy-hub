import { test, expect, type Locator, type Page } from '@playwright/test';

// One global :focus-visible rule (styles/global.css): a 2px outline at a 2px offset and a 2px inner
// ring (box-shadow) that fills the gap. Light theme: galaxy-dark outline, white ring. Dark theme:
// white outline, chrome ring. Dark surfaces (sidebar, footer, dark bands) carry the focus-scope-dark
// class, which swaps the pair in the light theme: white outline, galaxy-dark gap ring. Every surface
// is reached with real Tab presses, so :focus-visible matches the way it does for a keyboard user.
const DARK = 'rgb(44, 49, 67)';
const WHITE = 'rgb(255, 255, 255)';
const CHROME = 'rgb(28, 32, 48)';
const LIGHT_PAIR = { outer: DARK, inner: WHITE };
const DARK_PAIR = { outer: WHITE, inner: CHROME };
const ON_DARK_PAIR = { outer: WHITE, inner: DARK };

async function tabTo(page: Page, target: Locator, max = 250) {
  const el = target.first();
  await expect(el).toBeVisible();
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    if (await el.evaluate((node) => node === document.activeElement)) return;
  }
  throw new Error(`Tab never reached the target within ${max} presses`);
}

const ring = (locator: Locator) =>
  locator.first().evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      style: s.outlineStyle,
      width: s.outlineWidth,
      color: s.outlineColor,
      offset: s.outlineOffset,
      shadow: s.boxShadow,
    };
  });

async function expectRing(locator: Locator, { outer, inner } = LIGHT_PAIR) {
  await expect.poll(() => ring(locator).then((r) => `${r.style} ${r.width} ${r.color} ${r.offset}`)).toBe(
    `solid 2px ${outer} 2px`
  );
  // Poll: some controls transition box-shadow, so the first frame is mid-animation
  await expect.poll(() => ring(locator).then((r) => r.shadow)).toContain(`${inner} 0px 0px 0px 2px`);
}

async function settled(page: Page, islandHost: string) {
  await expect(page.locator(`${islandHost} astro-island[ssr]`)).toHaveCount(0, { timeout: 60_000 });
}

test.describe('Global focus ring', () => {
  test.setTimeout(90_000);

  test('sidebar link: white outline and a dark gap ring on the dark sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/community/');
    await settled(page, 'aside');
    const link = page.locator('aside').getByRole('navigation', { name: 'Main' }).getByRole('link').first();
    await tabTo(page, link);
    await expectRing(link, ON_DARK_PAIR);
  });

  test('footer link: white outline and a dark gap ring on the dark footer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/community/');
    const link = page.locator('footer.site-footer a[href]').first();
    await tabTo(page, link, 400);
    await expectRing(link, ON_DARK_PAIR);
  });

  test('page header link: white outline and a dark gap ring on the dark header', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/freiburg/publications/');
    const link = page.locator('header.page-header a[href="/freiburg/"]');
    await tabTo(page, link, 400);
    await expectRing(link, ON_DARK_PAIR);
  });

  test('sidebar search input and region switcher', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/community/');
    await settled(page, 'aside');
    const search = page.locator('aside input[type="search"]');
    await tabTo(page, search);
    await expectRing(search, ON_DARK_PAIR);

    const context = page.locator('aside').getByRole('button', { name: /Current context:/ });
    await page.keyboard.press('Shift+Tab');
    await expect(context).toBeFocused();
    await expectRing(context, ON_DARK_PAIR);
  });

  test('prose link', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/community/');
    const link = page.locator('main .prose a[href]').first();
    await tabTo(page, link);
    await expectRing(link);
  });

  test('use page: server box, map button and filter input', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/use/');
    await settled(page, 'main');

    const box = page
      .locator('section', { has: page.getByRole('heading', { name: 'Main UseGalaxy Servers' }) })
      .locator('a[target="_blank"]')
      .first();
    await tabTo(page, box);
    await expectRing(box);

    const mapButton = page.getByRole('button', { name: 'Show Platform Map' });
    await tabTo(page, mapButton);
    await expectRing(mapButton);

    const filter = page.locator('#platform-filter-search');
    await tabTo(page, filter);
    await expectRing(filter);
  });

  test('home search input', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const toggle = page.locator('#search-toggle');
    await tabTo(page, toggle);
    await page.keyboard.press('Enter');
    const input = page.locator('#search-input');
    await expect(input).toBeFocused();
    await expectRing(input, ON_DARK_PAIR);
  });

  test('content link tile with its own shadow keeps the inner ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/events/gcc2026/');
    const tile = page.locator('main a.gx-tile--link').first();
    await tabTo(page, tile);
    await expectRing(tile);
  });

  test('subsite overview card (shadow-sm swapped for an arbitrary shadow) keeps the inner ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/freiburg/');
    const card = page.locator('main a.group.relative').first();
    await tabTo(page, card);
    await expectRing(card);
  });

  test('news tile carries the ring on the card, not on the clipped link', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/news/?view=tiles');
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    const link = page.locator('.news-list article a:not(:has([data-external-icon]))').first();
    const card = link.locator('xpath=ancestor::article[1]');
    await tabTo(page, link, 400);
    await expectRing(card);
    expect((await ring(link)).style).toBe('none');
  });

  test('region menu items use an inset white outline on the dark menu, with no inner ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/freiburg/');
    await settled(page, 'aside');
    const button = page.locator('aside').getByRole('button', { name: /Current context:/ });
    await button.focus();
    await page.keyboard.press('Enter');
    const item = page.locator('#sb-region-menu a[aria-current="true"]');
    await expect(item).toBeFocused();
    await expect
      .poll(() => ring(item).then((r) => `${r.style} ${r.width} ${r.color} ${r.offset} ${r.shadow}`))
      .toBe(`solid 2px ${WHITE} -2px none`);
  });

  test('dark agent band in the light theme: white outline, dark gap ring on the gold CTA and the ghost button', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/agents/stack/');
    const gold = page.locator('.stk-cta .stk-btn:not(.stk-btn--ghost)');
    await tabTo(page, gold, 400);
    await expectRing(gold, ON_DARK_PAIR);

    const ghost = page.locator('.stk-cta .stk-btn--ghost');
    await tabTo(page, ghost, 400);
    await expectRing(ghost, ON_DARK_PAIR);
  });

  test('stack panes use an inset outline in the tone that clears their own surface', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/agents/stack/');
    const inset = (locator: Locator) =>
      ring(locator).then((r) => `${r.style} ${r.width} ${r.color} ${r.offset} ${r.shadow}`);

    const agent = page.locator('.stk-pane--agent');
    await tabTo(page, agent, 400);
    await expect.poll(() => inset(agent)).toBe(`solid 2px ${WHITE} -2px none`);

    const galaxy = page.locator('.stk-pane--galaxy');
    await tabTo(page, galaxy, 400);
    await expect.poll(() => inset(galaxy)).toBe(`solid 2px ${DARK} -2px none`);
  });

  test('agent band details summary uses an inset dark outline on its white box', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/agents/');
    const summary = page.locator('.ag-band details > summary').first();
    await tabTo(page, summary, 400);
    await expect
      .poll(() => ring(summary).then((r) => `${r.style} ${r.width} ${r.color} ${r.offset} ${r.shadow}`))
      .toBe(`solid 2px ${DARK} -2px none`);
  });

  test('white button on a dark section mirrors the pair: white outline, dark inner ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/usegalaxy/welcome/');
    const donate = page.getByRole('link', { name: 'Donate', exact: true });
    await tabTo(page, donate, 400);
    await expectRing(donate, { outer: WHITE, inner: DARK });
  });

  test('project tabs use an inset dark outline, since the scrolling strip clips a ring', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/projects/esg/');
    const tab = page.locator('.project-tabs a').first();
    await tabTo(page, tab, 400);
    await expect
      .poll(() => ring(tab).then((r) => `${r.style} ${r.width} ${r.color} ${r.offset} ${r.shadow}`))
      .toBe(`solid 2px ${DARK} -2px none`);
  });

  test('mobile region chip', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/freiburg/');
    const header = page.locator('.site-mobile-header');
    await settled(page, '.site-mobile-header');
    const chip = header.locator('[data-context-chip]');
    await tabTo(page, chip);
    await expectRing(chip, ON_DARK_PAIR);
  });

  test('the dark theme swaps the pair: white outline, chrome inner ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/use/');
    await settled(page, 'main');
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    const mapButton = page.getByRole('button', { name: 'Show Platform Map' });
    await tabTo(page, mapButton);
    await expectRing(mapButton, DARK_PAIR);
  });

  test('the dark theme keeps its pair inside a dark scope: white outline, chrome inner ring', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/community/');
    await settled(page, 'aside');
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    const link = page.locator('aside').getByRole('navigation', { name: 'Main' }).getByRole('link').first();
    await tabTo(page, link);
    await expectRing(link, DARK_PAIR);
  });

  test('#main-content keeps no ring after the skip link', async ({ page }) => {
    await page.goto('/community/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expectRing(skip);
    await page.keyboard.press('Enter');
    const main = page.locator('#main-content');
    await expect(main).toBeFocused();
    const style = await main.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.outlineStyle} ${s.boxShadow}`;
    });
    expect(style).toBe('none none');
  });

  test('Cofest presenter: white outline on its header in both views, the global pair on its light footer', async ({
    page,
  }) => {
    await page.route('https://docs.google.com/**', (route) => route.fulfill({ status: 200, body: '' }));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/events/gcc2026/cofest/board/');
    const toggle = page.getByRole('button', { name: 'Switch to light mode' });
    await tabTo(page, toggle);
    await expectRing(toggle, ON_DARK_PAIR);

    // The light view keeps the dark blue header, so its controls keep the white outline
    await page.keyboard.press('Enter');
    const back = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(back).toBeFocused();
    await expectRing(back, ON_DARK_PAIR);

    // The light view footer is light grey: the global pair
    const previous = page.getByRole('button', { name: 'Previous slide' });
    await tabTo(page, previous);
    await expectRing(previous);
  });
});
