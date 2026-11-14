import { test, expect } from '@playwright/test';

// /projects/ lists the project sections (with status and dates) and the other project pages from
// content/projects/; pages that redirect inside the Hub are left out, BRC links to its own site.
// Entries are grouped: active sections, then plain pages, then external sites, then completed ones.
const internal = [
  '/projects/esg4stars/',
  '/projects/esg/',
  '/projects/covid19/',
  '/projects/mpxv/',
  '/projects/vgp/',
];

test.describe('Projects index', () => {
  test('lists the project pages, grouped with active first and completed last', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto('/projects/');
    expect(response?.status()).toBe(200);
    // Scoped to the page: under `astro dev` the dev toolbar adds its own h1s in a shadow root
    await expect(page.locator('#main-content h1')).toHaveText('Projects');

    const list = page.locator('[data-project-index]');
    const cards = list.locator('li');
    // Known pages are listed; new project pages may join without breaking this
    const hrefs = await list.getByRole('link').evaluateAll((els) => els.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(expect.arrayContaining([...internal, 'https://brc-analytics.org/']));
    expect(hrefs).not.toContain('/projects/singlecell/');
    expect(hrefs).not.toContain('/projects/small-scale-admins/');
    // Moved to its SIG page, so it redirects inside the Hub and drops out of the index
    expect(hrefs).not.toContain('/projects/mass-spectrometry/');

    // The groups follow PROJECT_GROUPS order, and each entry sits in the group its facts put it in
    const groups = page.locator('[data-project-group]');
    const shown = await groups.evaluateAll((els) => els.map((el) => el.getAttribute('data-project-group')));
    expect(shown).toEqual(['active', 'page', 'external', 'ended']);
    await expect(page.locator('[data-project-group="active"] h2')).toHaveText('Active projects');
    const inGroup = (key: string) =>
      page
        .locator(`[data-project-group="${key}"]`)
        .getByRole('link')
        .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
    expect(await inGroup('active')).toContain('/projects/esg4stars/');
    expect(await inGroup('page')).toContain('/projects/vgp/');
    expect(await inGroup('external')).toContain('https://brc-analytics.org/');
    expect(await inGroup('ended')).toContain('/projects/esg/');
    // The count tells Hub pages and external sites apart
    const onHub = hrefs.filter((href) => href?.startsWith('/')).length;
    const external = hrefs.length - onHub;
    await expect(page.locator('[data-project-count]')).toHaveText(
      `${onHub} projects on the Hub, ${external} external site${external === 1 ? '' : 's'}`
    );

    // Status and dates come from the project facts
    const esg4stars = cards.filter({ has: page.getByRole('link', { name: 'ESG4Stars' }) });
    await expect(esg4stars.locator('[data-project-status="active"]')).toHaveText('Active');
    await expect(esg4stars).toContainText('Oct 2026 – Sep 2029');
    const esg = cards.filter({ has: page.getByRole('link', { name: 'EuroScienceGateway' }) });
    await expect(esg.locator('[data-project-status="ended"]')).toHaveText('Ended · Aug 2025');

    // External site: new tab, named as such
    const brc = list.getByRole('link', { name: /BRC Analytics/ });
    await expect(brc).toHaveAttribute('target', '_blank');
    await expect(brc).toHaveAccessibleName(/opens in a new tab/);
  });

  test('every listed project page resolves', async ({ page, request }) => {
    await page.goto('/projects/');
    const hrefs = await page
      .locator('[data-project-index]')
      .getByRole('link')
      .evaluateAll((els) => els.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs.filter((h) => h.startsWith('/'))) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
      expect(await response.text(), href).not.toContain('Redirecting to:');
    }
  });

  test('the whole card opens the project', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/');
    const card = page.locator('[data-project-index] li').filter({ has: page.getByRole('link', { name: 'ESG4Stars' }) });
    const box = (await card.boundingBox())!;
    await page.mouse.click(box.x + box.width - 12, box.y + box.height - 12);
    await expect(page).toHaveURL(/\/projects\/esg4stars\/$/);
  });

  test('the sidebar links the index under Applications and marks it current', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    const link = nav.locator('a[href="/projects/"]');
    await expect(link).toHaveCount(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveText(/^\s*Projects\s*$/);
    await expect(link).toHaveAttribute('aria-current', 'page');
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(1);

    // A project page under it is not the index
    await page.goto('/projects/vgp/');
    await expect(page.getByRole('navigation', { name: 'Main' }).locator('a[href="/projects/"]')).not.toHaveAttribute(
      'aria-current'
    );
  });

  test('fits a 390px phone without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/projects/');
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
  });
});
