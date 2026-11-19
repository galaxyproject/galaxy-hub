import { test, expect, type Page } from '@playwright/test';

// ESG4Stars pages: the same shared project components as ESG (band, tabs, facts box, rows, funding),
// with news and events from the esg4stars tag. Event assertions name events, not upcoming or past,
// so they hold after the dates go by.
const pages = [
  { path: '/projects/esg4stars/', tab: 'Overview', title: 'ESG4Stars' },
  { path: '/projects/esg4stars/news/', tab: 'News', title: 'ESG4Stars News' },
  { path: '/projects/esg4stars/events/', tab: 'Events', title: 'ESG4Stars Events' },
];
const kickedOff = 'ESG4Stars project launched';
const events = ['ESG4Stars kick-off meeting', /Sustainable research computing with Galaxy/];

function tabs(page: Page) {
  return page.getByRole('navigation', { name: 'ESG4Stars sections' });
}

test.describe('ESG4Stars project pages', () => {
  for (const { path, tab, title } of pages) {
    test(`${path} shows the project context, tabs and funding`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const sidebar = page.locator('aside.site-sidebar');
      await expect(sidebar.getByRole('button', { name: /Current context:/ }).locator('[data-context-name]')).toHaveText(
        'ESG4Stars'
      );
      // Scoped to the page: under `astro dev` the dev toolbar adds its own h1s in a shadow root
      await expect(page.locator('#main-content h1')).toHaveText(title);
      await expect(tabs(page).getByRole('link')).toHaveText([/^\s*Overview\s*$/, /^\s*News\s+\d+\s*$/, /^\s*Events\s*$/]);
      await expect(tabs(page).locator('[aria-current="page"]')).toContainText(tab);

      const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(crumbs.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects/');

      const funding = page.getByRole('region', { name: 'Funding' });
      await expect(funding).toContainText('This project is funded by the European Union');
      await expect(funding).toContainText('Grant Agreement number 101290798');
      await expect(funding.getByRole('img', { name: 'Funded by the European Union' })).toHaveCount(1);
    });
  }

  test('the overview shows the band and facts from main.md', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/esg4stars/');

    const band = page.locator('.project-band');
    await expect(band).toContainText('Project · Horizon Europe');
    await expect(band.locator('[data-project-status="active"]')).toHaveText('Active');
    expect((await band.boundingBox())!.height).toBeLessThanOrEqual(180);
    // A running project has no ended notice
    await expect(page.getByRole('note')).toHaveCount(0);

    const box = page
      .getByRole('complementary', { name: 'Project facts and contents' })
      .getByRole('region', { name: 'Project facts' });
    await expect(box).toContainText('Active');
    await expect(box).toContainText('Oct 2026 – Sep 2029 (36 months)');
    await expect(box).toContainText('Horizon Europe · HORIZON-INFRA-2025-01-TECH-01');
    await expect(box.getByRole('link', { name: /101290798/ })).toHaveAttribute(
      'href',
      'https://cordis.europa.eu/project/id/101290798'
    );
    await expect(box.getByRole('link', { name: 'EuroScienceGateway' })).toHaveAttribute('href', '/projects/esg/');
    await expect(box.getByRole('img', { name: 'Funded by the European Union' })).toBeVisible();

    // Partner count comes from the partner list
    const rows = page.getByRole('region', { name: 'Project Partners' }).locator('tbody tr');
    await expect(rows).toHaveCount(13);
    await expect(box.getByRole('link', { name: '13 organisations' })).toHaveAttribute('href', '#partners');
    await expect(rows.nth(6)).toContainText('Affiliated entity of partner 6');
    // Every partner leads with a bold name: the short name, or the legal name when there is none
    for (const [index, label] of [
      [0, 'UFR'],
      [4, 'Sci-Scale'],
      [5, 'EURO-BIOIMAGING ERIC'],
    ] as const) {
      const lead = rows.nth(index).locator('td').nth(1).locator('span').first();
      await expect(lead).toHaveText(label);
      await expect(lead).toHaveCSS('font-weight', '700');
    }
    // Sci-Scale has no short name, so its legal name is not printed a second time
    await expect(rows.nth(4).locator('td').nth(1)).toContainText('Sci-Scale');
    await expect(rows.nth(4).locator('.e4s-partners__name')).toHaveCount(0);
    // Countries by name, not ISO code
    await expect(rows.first().locator('td').last()).toHaveText('Germany');
    await expect(rows.last().locator('td').last()).toHaveText('United Kingdom');
  });

  test('partners show their logo and link out to their website', async ({ page }) => {
    await page.goto('/projects/esg4stars/');
    const partners = page.getByRole('region', { name: 'Project Partners' });
    const rows = partners.locator('tbody tr');
    await expect(rows).toHaveCount(13);

    // EMBL is the only partner without a logo; the other twelve each show one, and every file loads
    const logos = partners.locator('tbody img');
    await expect(logos).toHaveCount(12);
    await expect(rows.nth(6).locator('img')).toHaveCount(0);
    // ...and no empty logo box that would leave a gap above its name
    await expect(rows.nth(6).locator('.e4s-partners__logo')).toHaveCount(0);
    for (const logo of await logos.all()) {
      await logo.scrollIntoViewIfNeeded();
      await expect(logo).toHaveAttribute('alt', '');
      await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }

    // Reused site logos and the ones added under /images/projects/esg4stars/partners/
    await expect(rows.nth(0).locator('img')).toHaveAttribute('src', '/images/logos/UFR-vorlage-designsystem-typo-farben-V1.94.png');
    await expect(rows.nth(1).locator('img')).toHaveAttribute('src', '/images/projects/esg/partner-logos/BSC-logo-paths.svg');
    await expect(rows.nth(4).locator('img')).toHaveAttribute('src', '/images/projects/esg4stars/partners/sci-scale.png');
    await expect(rows.nth(5).locator('img')).toHaveAttribute('src', '/images/logos/euro-bioimaging-wide.png');
    await expect(rows.nth(8).locator('img')).toHaveAttribute('src', '/images/logos/cnrs-logo-text-wide.png');

    // Every name links to the partner's website in a new tab
    const links = partners.locator('tbody').getByRole('link');
    await expect(links).toHaveCount(13);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(link).toHaveAttribute('href', /^https:\/\//);
    }
    await expect(rows.nth(0).getByRole('link', { name: /^UFR/ })).toHaveAttribute('href', 'https://www.uni-freiburg.de/');
    await expect(rows.nth(4).getByRole('link', { name: /^Sci-Scale/ })).toHaveAttribute('href', 'https://sci-scale.net/');
    await expect(rows.nth(6).getByRole('link', { name: /^EMBL/ })).toHaveAttribute('href', 'https://www.embl.org/');
  });

  test('the overview lists the five pillars as text', async ({ page }) => {
    await page.goto('/projects/esg4stars/');
    const pillars = page.getByRole('region', { name: 'Five pillars' });
    await expect(pillars.getByRole('listitem')).toHaveCount(5);
    await expect(pillars.getByRole('heading', { level: 3 })).toHaveText([
      'Track smarter',
      'Transfer less',
      'Store less',
      'Compute less',
      'Drive change',
    ]);
    await expect(pillars.getByRole('listitem').first()).toContainText('Make energy use visible, measurable and FAIR');
    await expect(pillars.getByRole('img')).toHaveCount(0);
    await expect(page.getByRole('region', { name: /Project architecture/ }).getByRole('listitem')).toHaveCount(4);
  });

  test('news and events come from the esg4stars tag', async ({ page }) => {
    // The overview shows the latest 6 news and 5 events; named items are checked on the full lists
    await page.goto('/projects/esg4stars/');
    for (const [kind, max] of [
      ['news', 6],
      ['events', 5],
    ] as const) {
      const rows = await page.locator(`[data-project-list="${kind}"] > li`).count();
      expect(rows, kind).toBeGreaterThan(0);
      expect(rows, kind).toBeLessThanOrEqual(max);
    }

    await page.goto('/projects/esg4stars/news/');
    await expect(page.getByRole('link', { name: kickedOff })).toBeVisible();

    await page.goto('/projects/esg4stars/events/');
    for (const name of events) await expect(page.getByRole('link', { name })).toBeVisible();
  });

  test('the events page groups upcoming events (soonest first) before past ones (newest first)', async ({ page }) => {
    // The project runs until September 2029, so both groups are there; their contents move with the dates
    await page.goto('/projects/esg4stars/events/');
    const main = page.locator('#main-content');
    await expect(main.getByRole('heading', { level: 2, name: /events$/ })).toHaveText(['Upcoming events', 'Past events']);
    for (const [name, order] of [
      ['Upcoming events', 1],
      ['Past events', -1],
    ] as const) {
      const starts = await page
        .getByRole('region', { name })
        .locator('[data-project-list] > li')
        .evaluateAll((els) => els.map((el) => el.querySelector('time')?.getAttribute('datetime') ?? ''));
      const sorted = [...starts].sort((a, b) => order * a.localeCompare(b));
      expect(starts, name).toEqual(sorted);
    }
  });

  test('the news page applies the year from the URL', async ({ page }) => {
    // The project started in 2026, so that year always has news
    await page.goto('/projects/esg4stars/news/?year=2026');
    await expect(page.locator('[data-filter-count]')).toHaveText(/^\s*\d+ articles?\s+in 2026\s*$/);
  });

  test('ESG links back to ESG4Stars', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/esg/');
    const box = page
      .getByRole('complementary', { name: 'Project facts and contents' })
      .getByRole('region', { name: 'Project facts' });
    await expect(box.getByRole('link', { name: 'ESG4Stars' })).toHaveAttribute('href', '/projects/esg4stars/');
  });

  for (const { path } of pages) {
    test(`${path} fits a 390px phone without horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const overflowing = await page.evaluate(() => {
        const limit = document.documentElement.clientWidth + 1;
        return [...document.querySelectorAll<HTMLElement>('#main-content *')]
          .filter((el) => el.getClientRects().length > 0 && !el.closest('.sr-only'))
          .filter((el) => el.getBoundingClientRect().right > limit)
          .filter((el) => !el.closest('.project-tabs ul'))
          .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80));
      });
      expect(overflowing).toEqual([]);
    });
  }
});
