import { test, expect, type Locator, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Breadcrumb trail above the title on reading pages (articles, news posts, events, conferences):
// the trail per layout, the one-row phone layout with the current page as the last crumb, the
// fold menu on phones, the BreadcrumbList JSON-LD and a scan of the trail with axe.
// Geometry checks compare boxes and overflow, never exact widths: font metrics differ per platform.

const PHONE = { width: 390, height: 844 };
const NARROW = { width: 320, height: 640 };

const DEEP = '/community/sig/digital-humanities/';
const NEWS = '/news/2026-11-18-biohackathon-2026/';
const EVENT = '/events/2026-10-14-microgalaxy-hackathon/';
const CONFERENCE = '/events/gcc2026/';
const SHORT = '/community/';

const nav = (page: Page) => page.getByRole('navigation', { name: 'Breadcrumb' });

interface Crumb {
  text: string;
  href: string | null;
  box: { x: number; y: number; width: number; height: number };
}

// The crumbs that are rendered (the fold menu item is not on desktop, the folded levels are not on phones)
async function visibleCrumbs(page: Page): Promise<Crumb[]> {
  return nav(page)
    .locator(':scope > ol > li')
    .evaluateAll((items) =>
      items
        .filter((li) => li.getClientRects().length > 0)
        .map((li) => {
          const box = li.getBoundingClientRect();
          const link = li.querySelector(':scope > a');
          return {
            text: (li.querySelector('.breadcrumbs__current') ?? li.querySelector('.breadcrumbs__home-label') ?? li)
              .textContent!.replace(/\s+/g, ' ')
              .trim(),
            href: link?.getAttribute('href') ?? null,
            box: { x: box.x, y: box.y, width: box.width, height: box.height },
          };
        })
    );
}

const overflowsHorizontally = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

// True when the text of the element is cut (needs overflow: hidden plus a wider scroll than client box)
const isCut = (locator: Locator) => locator.evaluate((el) => el.scrollWidth > el.clientWidth);

test.describe('Breadcrumbs on reading pages', () => {
  test.describe('trail per layout (desktop)', () => {
    test('a content page shows Home, each folder, then the page', async ({ page }) => {
      await page.goto(DEEP);
      const crumbs = await visibleCrumbs(page);
      expect(crumbs).toHaveLength(4);
      expect(crumbs[0].text).toBe('Home');
      expect(crumbs[0].href).toBe('/');
      expect(crumbs.slice(1, 3).map((c) => c.href)).toEqual(['/community/', '/community/sig/']);
      expect(crumbs[2].text).toContain('Special Interest Groups');
      await expect(page.locator('main h1').first()).toHaveText(crumbs[3].text);
      expect(crumbs[3].href, 'the current page is not a link').toBeNull();
    });

    test('a news post shows Home, News, then the title', async ({ page }) => {
      await page.goto(NEWS);
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.text).slice(0, 2)).toEqual(['Home', 'News']);
      expect(crumbs.map((c) => c.href)).toEqual(['/', '/news/', null]);
      await expect(page.locator('main h1').first()).toHaveText(crumbs[2].text);
    });

    for (const [name, path] of [
      ['an event', EVENT],
      ['a conference page', CONFERENCE],
    ] as const) {
      test(`${name} shows Home, Events, then the title`, async ({ page }) => {
        await page.goto(path);
        const crumbs = await visibleCrumbs(page);
        expect(crumbs.map((c) => c.text).slice(0, 2)).toEqual(['Home', 'Events']);
        expect(crumbs.map((c) => c.href)).toEqual(['/', '/events/', null]);
        expect(crumbs[2].text.length).toBeGreaterThan(0);
      });
    }

    test('a sub-page of a conference sits under that conference and ends with its own title', async ({ page }) => {
      await page.goto('/events/gcc2026/register/');
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.href)).toEqual(['/', '/events/', '/events/gcc2026/', null]);
      expect(crumbs[1].text).toBe('Events');
      expect(crumbs[3].text).toBe('GCC2026 Registration');
      const parent = nav(page).getByRole('link', { name: /Galaxy Community Conference/ });
      await expect(parent).toHaveAttribute('href', '/events/gcc2026/');
      expect(crumbs[2].text).not.toBe(crumbs[3].text);
    });

    test('a conference sub-page without a title of its own is named after its menu label, the parent stays a link', async ({
      page,
    }) => {
      await page.goto('/events/gcc2026/organizers/');
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.href)).toEqual(['/', '/events/', '/events/gcc2026/', null]);
      expect(crumbs[2].text).toContain('Galaxy Community Conference');
      expect(crumbs[3].text).toBe('Organizers');
      await expect(nav(page).locator('[aria-current="page"]')).toHaveText('Organizers');
      const lists = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? '')));
      const list = lists.find((json) => json['@type'] === 'BreadcrumbList');
      const paths = list.itemListElement.map((i: { item: string }) => new URL(i.item).pathname);
      expect(paths).toEqual(['/', '/events/', '/events/gcc2026/', '/events/gcc2026/organizers/']);
    });

    test('a page titled like its parent keeps its own crumb and the parent stays a link', async ({ page }) => {
      await page.goto('/jxtx/bio/');
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.href)).toEqual(['/', '/jxtx/', null]);
      await expect(nav(page).locator('[aria-current="page"]')).toHaveCount(1);
    });

    test('a parent page without a title in its front matter is a link, with a readable name', async ({ page }) => {
      await page.goto('/archive/dev-news-briefs/2012-01-20/');
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.href)).toEqual(['/', '/archive/', null, null]);
      expect(crumbs[1].text).toBe('Wiki Page Archive');
    });

    for (const [path, parent, href] of [
      ['/projects/bge/', 'Projects', '/projects/'],
      ['/eu/about/', 'Galaxy Europe', '/eu/'],
    ] as const) {
      test(`${path} links its parent ${href}, which is routed outside the content files`, async ({ page }) => {
        await page.goto(path);
        const crumbs = await visibleCrumbs(page);
        expect(crumbs[1].text).toBe(parent);
        expect(crumbs[1].href).toBe(href);
      });
    }

    test('the ESG4Stars embed page links its project crumb with the project name, not the folder name', async ({
      page,
    }) => {
      await page.goto('/projects/esg4stars/embed/');
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.text).slice(0, 3)).toEqual(['Home', 'Projects', 'ESG4Stars']);
      expect(crumbs.map((c) => c.href)).toEqual(['/', '/projects/', '/projects/esg4stars/', null]);
    });

    test('the trail sits above the page title', async ({ page }) => {
      await page.goto(NEWS);
      const trail = (await nav(page).boundingBox())!;
      const heading = (await page.locator('main h1').first().boundingBox())!;
      expect(trail.y + trail.height, 'trail ends above the title').toBeLessThanOrEqual(heading.y);
    });

    test('the current page is inline in the trail, bold and plain selectable text', async ({ page }) => {
      await page.goto(DEEP);
      const current = nav(page).locator('[aria-current="page"]');
      await expect(current).toHaveCount(1);
      await expect(current.locator('a')).toHaveCount(0);
      await expect(current).toHaveAttribute('title', (await current.textContent())!.trim());
      const style = await current.evaluate((el) => {
        const css = getComputedStyle(el);
        return { weight: Number(css.fontWeight), select: css.userSelect };
      });
      expect(style.weight).toBeGreaterThanOrEqual(600);
      expect(style.select).not.toBe('none');

      const crumbs = await visibleCrumbs(page);
      const rows = new Set(crumbs.map((c) => Math.round(c.box.y + c.box.height / 2)));
      expect(rows.size, 'the whole trail fits on one row on a desktop width').toBe(1);
      // The current page comes after the parent and a separator
      expect(crumbs[3].box.x).toBeGreaterThan(crumbs[2].box.x + crumbs[2].box.width - 1);
    });

    test('the fold menu is not rendered, the full trail is', async ({ page }) => {
      await page.goto(DEEP);
      await expect(nav(page).locator('summary')).toBeHidden();
      await expect(nav(page).getByRole('link', { name: 'The Galaxy Community' })).toBeVisible();
    });
  });

  test.describe('phone layout', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(PHONE);
    });

    test('the current page is the last crumb on the same row, after a chevron', async ({ page }) => {
      await page.goto(NEWS);
      const crumbs = await visibleCrumbs(page);
      expect(crumbs).toHaveLength(3);
      const centers = crumbs.map((c) => c.box.y + c.box.height / 2);
      for (const center of centers) expect(Math.abs(center - centers[0])).toBeLessThan(6);
      const [home, parent, current] = crumbs;
      expect(parent.box.x).toBeGreaterThan(home.box.x + home.box.width - 1);
      expect(current.box.x).toBeGreaterThan(parent.box.x + parent.box.width - 1);
      // One row of one line: nothing stacks above the title
      expect((await nav(page).boundingBox())!.height).toBeLessThanOrEqual(40);

      const currentItem = nav(page).locator(':scope > ol > li').last();
      await expect(currentItem.locator('.breadcrumbs__sep svg')).toBeVisible();
      await expect(nav(page).locator('[aria-current="page"]')).toHaveCount(1);
    });

    test('Home is the icon only, its name stays for assistive technology', async ({ page }) => {
      await page.goto(NEWS);
      const home = nav(page).getByRole('link', { name: 'Home' });
      await expect(home).toHaveAttribute('href', '/');
      await expect(home.locator('svg')).toBeVisible();
      expect((await home.boundingBox())!.width, 'icon width, the label is visually hidden').toBeLessThan(40);
    });

    test('a long current page is cut to the row with an ellipsis and keeps its full text in the title', async ({
      page,
    }) => {
      await page.setViewportSize(NARROW);
      await page.goto(DEEP);
      const current = nav(page).locator('[aria-current="page"]');
      const fullText = (await current.textContent())!.trim();
      expect(await isCut(current), 'cut at 320px').toBe(true);
      expect(await current.evaluate((el) => getComputedStyle(el).textOverflow)).toBe('ellipsis');
      await expect(current).toHaveAttribute('title', fullText);
      await expect(current).toHaveText(fullText);

      const navBox = (await nav(page).boundingBox())!;
      const currentBox = (await current.boundingBox())!;
      expect(currentBox.x + currentBox.width, 'stays inside the row').toBeLessThanOrEqual(navBox.x + navBox.width + 1);
      expect(currentBox.height, 'one line').toBeLessThan(30);
      expect(currentBox.width, 'room left for a few characters').toBeGreaterThanOrEqual(40);
      expect(await overflowsHorizontally(page)).toBe(false);
    });

    test('a short title is not cut and the parent keeps its full text', async ({ page }) => {
      await page.goto(SHORT);
      const current = nav(page).locator('[aria-current="page"]');
      expect(await isCut(current)).toBe(false);
      const crumbs = await visibleCrumbs(page);
      expect(crumbs.map((c) => c.text).slice(0, 1)).toEqual(['Home']);
      expect(crumbs).toHaveLength(2);

      await page.goto(NEWS);
      expect(await isCut(nav(page).getByRole('link', { name: 'News' }).locator('span'))).toBe(false);
    });

    test('when the row is tight the parent is cut too, the current page keeps some room', async ({ page }) => {
      await page.setViewportSize(NARROW);
      await page.goto(DEEP);
      const parent = nav(page).getByRole('link', { name: /Special Interest Groups/ });
      await expect(parent).toHaveAttribute('title', /Special Interest Groups/);
      expect(await isCut(parent.locator('span').last()), 'parent text is cut at 320px').toBe(true);
      const current = nav(page).locator('[aria-current="page"]');
      expect((await current.boundingBox())!.width).toBeGreaterThanOrEqual(40);
    });

    for (const [name, path] of [
      ['a content page', DEEP],
      ['a news post', NEWS],
      ['an event', EVENT],
      ['a conference page', CONFERENCE],
    ] as const) {
      for (const size of [NARROW, PHONE]) {
        test(`${name} has no horizontal scroll at ${size.width}px, also with the menu open`, async ({ page }) => {
          await page.setViewportSize(size);
          await page.goto(path);
          await expect(nav(page)).toBeVisible();
          expect(await overflowsHorizontally(page)).toBe(false);
          const summary = nav(page).locator('summary');
          if (await summary.isVisible()) {
            await summary.click();
            expect(await overflowsHorizontally(page)).toBe(false);
            const menu = (await nav(page).locator('.breadcrumbs__menu').boundingBox())!;
            expect(menu.x).toBeGreaterThanOrEqual(0);
            expect(menu.x + menu.width, 'menu inside the viewport').toBeLessThanOrEqual(size.width);
          }
        });
      }
    }
  });

  test.describe('fold menu on phones', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.goto(DEEP);
    });

    const summary = (page: Page) => nav(page).locator('summary');
    const details = (page: Page) => nav(page).locator('details');
    const menuLink = (page: Page) => nav(page).locator('.breadcrumbs__menu').getByRole('link', { name: 'The Galaxy Community' });

    test('the fold control is named and starts closed', async ({ page }) => {
      await expect(summary(page)).toBeVisible();
      await expect(summary(page)).toContainText('Show 1 more level');
      // The visible dots and caret are decoration
      await expect(summary(page).locator('[aria-hidden="true"]')).not.toHaveCount(0);
      await expect(details(page)).not.toHaveAttribute('open', '');
      await expect(menuLink(page)).toBeHidden();
      // The folded level is not read twice: the trail copy is not rendered on phones
      await expect(nav(page).locator('.breadcrumbs__fold')).toBeHidden();
    });

    test('a click opens the menu, a second click closes it', async ({ page }) => {
      await summary(page).click();
      await expect(details(page)).toHaveAttribute('open', '');
      await expect(menuLink(page)).toBeVisible();
      await expect(menuLink(page)).toHaveAttribute('href', '/community/');
      await summary(page).click();
      await expect(details(page)).not.toHaveAttribute('open', '');
    });

    test('the keyboard opens it, Escape closes it and focus returns to the control', async ({ page }) => {
      await summary(page).focus();
      await page.keyboard.press('Enter');
      await expect(details(page)).toHaveAttribute('open', '');
      await expect(menuLink(page)).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(menuLink(page)).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(details(page)).not.toHaveAttribute('open', '');
      await expect(summary(page)).toBeFocused();

      await page.keyboard.press('Space');
      await expect(details(page)).toHaveAttribute('open', '');
    });

    test('a click outside closes it', async ({ page }) => {
      await summary(page).click();
      await expect(details(page)).toHaveAttribute('open', '');
      // A point at the bottom edge of the viewport, clear of the menu that hangs below the trail
      const menu = (await nav(page).locator('.breadcrumbs__menu').boundingBox())!;
      const point = { x: PHONE.width - 6, y: PHONE.height - 6 };
      expect(
        point.x >= menu.x && point.x <= menu.x + menu.width && point.y >= menu.y && point.y <= menu.y + menu.height,
        'the click point is outside the menu'
      ).toBe(false);
      await page.mouse.click(point.x, point.y);
      await expect(details(page)).not.toHaveAttribute('open', '');
    });

    test('a menu link goes to its page', async ({ page }) => {
      await summary(page).click();
      await menuLink(page).click();
      await expect(page).toHaveURL(/\/community\/$/);
    });

    test('the menu overlays the page without moving it, and its links are comfortable targets', async ({ page }) => {
      const heading = page.locator('main h1').first();
      const before = (await heading.boundingBox())!.y;
      await summary(page).click();
      const menu = nav(page).locator('.breadcrumbs__menu');
      await expect(menu).toBeVisible();
      expect((await heading.boundingBox())!.y, 'page content does not move').toBe(before);

      const box = (await menu.boundingBox())!;
      const topElementIsMenu = await menu.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return Boolean(hit && el.contains(hit));
      });
      expect(topElementIsMenu, 'menu is on top of the page').toBe(true);
      expect((await menuLink(page).boundingBox())!.height).toBeGreaterThanOrEqual(24);
      // It hangs below the trail row, over the title band
      const row = (await nav(page).locator('ol').boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(row.y + row.height - 1);
    });
  });

  test.describe('BreadcrumbList JSON-LD', () => {
    for (const path of [DEEP, NEWS, EVENT, CONFERENCE, SHORT]) {
      test(`${path} lists the trail in order`, async ({ page }) => {
        await page.goto(path);
        const blocks = await page
          .locator('script[type="application/ld+json"]')
          .evaluateAll((scripts) => scripts.map((s) => s.textContent ?? ''));
        const lists = blocks.map((b) => JSON.parse(b)).filter((json) => json['@type'] === 'BreadcrumbList');
        expect(lists, 'exactly one BreadcrumbList').toHaveLength(1);

        const list = lists[0];
        expect(list['@context']).toBe('https://schema.org');
        const items = list.itemListElement as { '@type': string; position: number; name: string; item: string }[];
        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items.map((i) => i.position)).toEqual(items.map((_, index) => index + 1));
        for (const entry of items) {
          expect(entry['@type']).toBe('ListItem');
          expect(entry.name.length).toBeGreaterThan(0);
          expect(() => new URL(entry.item)).not.toThrow();
        }

        const paths = items.map((i) => new URL(i.item).pathname);
        expect(paths[0]).toBe('/');
        // Each level lies inside the one before it, and the last one is this page
        paths.slice(1).forEach((p, index) => expect(p.startsWith(paths[index]) && p !== paths[index]).toBe(true));
        expect(paths[paths.length - 1]).toBe(new URL(page.url()).pathname);

        // The linked crumbs on the page are the same pages, in the same order
        const visibleLinks = (await visibleCrumbs(page)).map((c) => c.href).filter((href) => href !== null);
        expect(paths.slice(0, -1)).toEqual(visibleLinks);
        expect(items[items.length - 1].name).toBe((await nav(page).locator('[aria-current="page"]').textContent())!.trim());
      });
    }
  });

  test.describe('project pages keep the project trail', () => {
    test('desktop: globe, current page bold, no fold menu, no BreadcrumbList', async ({ page }) => {
      await page.goto('/projects/esg/news/');
      const crumbs = nav(page);
      await expect(crumbs).toHaveAttribute('data-variant', 'project');
      await expect(crumbs.getByRole('link', { name: 'EuroScienceGateway' })).toHaveAttribute('href', '/projects/esg/');
      await expect(crumbs.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(crumbs.locator('details')).toHaveCount(0);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((s) => s.textContent ?? ''));
      expect(blocks.filter((b) => b.includes('BreadcrumbList'))).toHaveLength(0);
    });

    test('phone: the trail still collapses to one back link', async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.goto('/projects/esg/news/');
      await expect(nav(page).locator('ol')).toBeHidden();
      await expect(nav(page).getByRole('link')).toHaveText(/EuroScienceGateway/);
    });
  });

  test.describe('axe scan of the trail', () => {
    const scan = async (page: Page) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .include('nav[aria-label="Breadcrumb"]')
        .analyze();
      expect(
        results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
        'axe violations in the breadcrumb trail'
      ).toEqual([]);
    };

    for (const path of [DEEP, NEWS, EVENT]) {
      test(`${path} on desktop`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        await expect(nav(page)).toBeVisible();
        await scan(page);
      });

      test(`${path} on a phone`, async ({ page }) => {
        await page.setViewportSize(PHONE);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        await expect(nav(page)).toBeVisible();
        await scan(page);
      });
    }

    test('the open fold menu on a phone', async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(DEEP);
      await page.waitForLoadState('networkidle');
      await nav(page).locator('summary').click();
      await expect(nav(page).locator('.breadcrumbs__menu')).toBeVisible();
      await scan(page);
    });
  });
});
