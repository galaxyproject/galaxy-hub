import { test, expect, type Page } from '@playwright/test';

// EuroScienceGateway pages in the main shell: project context in the sidebar, breadcrumbs,
// project band, section tabs, ended notice and the facts box.
const pages = [
  { path: '/projects/esg/', tab: 'Overview', crumb: 'EuroScienceGateway', title: 'EuroScienceGateway' },
  { path: '/projects/esg/news/', tab: 'News', crumb: 'News', title: 'EuroScienceGateway News' },
  {
    path: '/projects/esg/events/',
    tab: 'Past events',
    crumb: 'Past events',
    title: 'EuroScienceGateway past events',
  },
];

function contextButton(page: Page) {
  return page.locator('aside.site-sidebar').getByRole('button', { name: /Current context:/ });
}

function tabs(page: Page) {
  return page.getByRole('navigation', { name: 'EuroScienceGateway sections' });
}

// Elements inside the content area that reach past the viewport's right edge
async function overflowingElements(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const limit = document.documentElement.clientWidth + 1;
    return [...document.querySelectorAll<HTMLElement>('#main-content *')]
      .filter((el) => el.getClientRects().length > 0 && !el.closest('.sr-only'))
      .filter((el) => el.getBoundingClientRect().right > limit)
      .filter((el) => !el.closest('.project-tabs ul'))
      .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80));
  });
}

test.describe('ESG project pages', () => {
  for (const { path, tab, crumb, title } of pages) {
    test(`${path} shows the project context, breadcrumbs and tabs`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      // Main shell with the project context, not the old standalone ESG header
      await expect(contextButton(page).locator('[data-context-name]')).toHaveText('EuroScienceGateway');
      const projectGroup = page
        .locator('aside.site-sidebar')
        .getByRole('group', { name: 'EuroScienceGateway', exact: true });
      await expect(projectGroup.getByRole('link', { name: tab, exact: true })).toHaveAttribute('aria-current', 'page');

      // Scoped to the page: under `astro dev` the dev toolbar adds its own h1s in a shadow root
      const h1 = page.locator('#main-content h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(title);

      const crumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(crumbs.locator('ol > li')).toHaveCount(path === '/projects/esg/' ? 3 : 4);
      await expect(crumbs.getByRole('link', { name: 'Galaxy Project' })).toHaveAttribute('href', '/');
      await expect(crumbs.locator('[aria-current="page"]')).toHaveText(crumb);
      await expect(crumbs.locator('[aria-current="page"]')).not.toHaveAttribute('href');

      // Section tabs are links; only the current one carries aria-current
      const links = tabs(page).getByRole('link');
      await expect(links).toHaveText([/^\s*Overview\s*$/, /^\s*News\s+\d+\s*$/, /^\s*Past events\s*$/]);
      await expect(tabs(page).locator('[aria-current="page"]')).toHaveCount(1);
      await expect(tabs(page).locator('[aria-current="page"]')).toContainText(tab);
      await expect(page.getByRole('tablist')).toHaveCount(0);

      // Sidebar project group and tabs share one link list
      const sidebarHrefs = await projectGroup
        .getByRole('link')
        .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
      const tabHrefs = await links.evaluateAll((els) => els.map((a) => a.getAttribute('href')));
      expect(tabHrefs).toEqual(sidebarHrefs);
    });
  }

  test('the overview shows the band, ended notice and facts from main.md', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/esg/');

    const band = page.locator('.project-band');
    await expect(band).toContainText('Project · EOSC · Horizon Europe');
    await expect(band.locator('[data-project-status="ended"]')).toHaveText('Ended · Aug 2025');
    expect((await band.boundingBox())!.height).toBeLessThanOrEqual(180);

    const notice = page.getByRole('note');
    await expect(notice).toContainText('This project has ended');
    await expect(notice).toContainText('EuroScienceGateway ran from September 2022 to August 2025.');

    const facts = page.getByRole('complementary', { name: 'Project facts and contents' });
    const box = facts.getByRole('region', { name: 'Project facts' });
    await expect(box).toBeVisible();
    await expect(box).toContainText('Ended');
    await expect(box).toContainText('Sep 2022 – Aug 2025 (36 months)');
    await expect(box).toContainText('Horizon Europe · HORIZON-INFRA-2021-EOSC-01-04');
    await expect(box.getByRole('link', { name: /101057388/ })).toHaveAttribute(
      'href',
      'https://cordis.europa.eu/project/id/101057388'
    );
    await expect(box.getByRole('link', { name: /10038963/ })).toHaveAttribute(
      'href',
      'https://gtr.ukri.org/projects?ref=10038963'
    );
    const partnerCount = await page.locator('section:has(#partners) ul > li').count();
    await expect(box.getByRole('link', { name: `${partnerCount} organisations` })).toHaveAttribute('href', '#partners');
    // A link to the partner list, not a partner count (the list also names a funder)
    await expect(box.locator('dt', { hasText: /^Partner list$/ })).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Project Partners', exact: true, level: 2 })).toBeVisible();
    await expect(box.getByRole('img', { name: 'Funded by the European Union' })).toBeVisible();

    // Facts sit above "On this page" in the right column
    const toc = facts.getByRole('navigation', { name: 'On this page' });
    await expect(toc).toBeVisible();
    expect((await box.boundingBox())!.y).toBeLessThan((await toc.boundingBox())!.y);

    // News tab count matches the "All N news" link
    const count = await tabs(page).getByRole('link', { name: /^News/ }).locator('span').textContent();
    await expect(
      page.locator('section:has(#news)').getByRole('link', { name: new RegExp(`^All ${count} news`) })
    ).toBeVisible();
  });

  test('section pages keep the status next to the project name', async ({ page }) => {
    await page.goto('/projects/esg/events/');
    await expect(page.locator('.project-head [data-project-status="ended"]')).toHaveText('Ended · Aug 2025');
    await expect(page.locator('.project-head').getByRole('link', { name: 'EuroScienceGateway' })).toHaveAttribute(
      'href',
      '/projects/esg/'
    );
  });

  for (const path of pages.map((p) => p.path)) {
    test(`${path} ends with the EU funding acknowledgement`, async ({ page }) => {
      await page.goto(path);
      const funding = page.getByRole('region', { name: 'Funding' });
      await expect(funding).toContainText('grant agreement number 101057388');
      await expect(funding.getByRole('img', { name: 'Funded by the European Union' })).toHaveCount(1);
    });
  }

  test('the news page lists ESG news with the shared filters', async ({ page }) => {
    await page.goto('/projects/esg/news/');
    const count = Number(await tabs(page).getByRole('link', { name: /^News/ }).locator('span').textContent());
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('[data-filter-count]')).toHaveText(`${count} articles`);
  });

  test('the news page applies the year from the URL', async ({ page }) => {
    await page.goto('/projects/esg/news/?year=2023');
    await expect(page.locator('[data-filter-count]')).toHaveText(/^\s*\d+ articles?\s+in 2023\s*$/);
    await expect(page).toHaveURL(/\/projects\/esg\/news\/\?year=2023$/);
  });

  for (const path of pages.map((p) => p.path)) {
    test(`${path} fits a 390px phone without horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(await overflowingElements(page)).toEqual([]);
      if (path === '/projects/esg/') {
        // Facts show inline under the notice; the desktop rail is hidden
        await expect(page.getByRole('region', { name: 'Project facts' })).toHaveCount(1);
        await expect(page.locator('.project-band__logo')).toBeHidden();
      }
    });
  }
});
