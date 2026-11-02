import { test, expect, type Locator, type Page } from '@playwright/test';

const waitForCitations = (page: Page) =>
  expect(page.locator('astro-island:has(.citation-filters)')).not.toHaveAttribute('ssr', { timeout: 60_000 });

// The first year chip after "All years"
const firstYearChip = (page: Page, noun: string) =>
  page
    .getByRole('group', { name: `Filter ${noun} by year` })
    .getByRole('button', { name: /^\d{4}/ })
    .first();

const chipYear = async (chip: Locator) => ((await chip.textContent()) || '').match(/\d{4}/)?.[0] ?? '';

const shownYears = async (page: Page) =>
  [
    ...new Set(
      await page
        .locator('article[data-citation-year]:not(.hidden)')
        .evaluateAll((els) => els.map((el) => el.getAttribute('data-citation-year')))
    ),
  ].sort();

test.describe('Subsite citations', () => {
  test('eu citations render entries', async ({ page }) => {
    const response = await page.goto('/eu/citations/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: /citations/i })).toBeVisible();
    const cards = page.locator('article');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('year filter narrows visible citations', async ({ page }) => {
    await page.goto('/eu/citations/');
    await waitForCitations(page);
    const yearButton = firstYearChip(page, 'citations');
    const year = await chipYear(yearButton);

    expect(year).toBeTruthy();
    await yearButton.click();

    await expect.poll(() => shownYears(page)).toEqual([year]);
  });

  test('year filter works after a client-side visit to another citations page', async ({ page }) => {
    await page.goto('/eu/citations/');
    await waitForCitations(page);
    // A real anchor click goes through the ClientRouter, which runs the page script only once
    await page.evaluate(() => {
      const link = document.createElement('a');
      link.href = '/elixir-it/citations/';
      link.textContent = 'ELIXIR-IT citations';
      link.id = 'test-citations-link';
      link.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483647;background:#fff';
      document.body.append(link);
    });
    await page.locator('#test-citations-link').click();
    await expect(page.locator('h1')).toHaveText('ELIXIR-IT Citations');
    await waitForCitations(page);

    const yearButton = firstYearChip(page, 'citations');
    const year = await chipYear(yearButton);
    await yearButton.click();
    await expect(page).toHaveURL(new RegExp(`/elixir-it/citations/\\?year=${year}$`));
    await expect(yearButton).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => shownYears(page)).toEqual([year]);
  });

  test('elixir-it citations render entries', async ({ page }) => {
    const response = await page.goto('/elixir-it/citations/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveText('ELIXIR-IT Citations');
    await expect(page.locator('article').first()).toBeVisible();
  });

  const serverCitations = [
    { subsite: 'us', title: 'US Citations', server: 'usegalaxy.org Galaxy server' },
    { subsite: 'belgium', title: 'VIB (Belgium) Citations', server: 'usegalaxy.be Galaxy server' },
    { subsite: 'pasteur', title: 'Pasteur Citations', server: 'galaxy.pasteur.fr Galaxy server' },
    {
      subsite: 'genouest',
      title: 'GenOuest Citations',
      server: 'galaxy.genouest.org Galaxy server, now replaced by usegalaxy.fr',
    },
  ];

  for (const { subsite, title, server } of serverCitations) {
    test(`${subsite} citations name the server and render entries`, async ({ page }) => {
      const response = await page.goto(`/${subsite}/citations/`);
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveText(title);
      await expect(page.getByText(`Scientific publications that cited the ${server}.`).first()).toBeVisible();
      await expect(page.locator('article').first()).toBeVisible();
    });
  }

  test('subsites without citations have no citations page', async ({ page }) => {
    const response = await page.goto('/ifb/citations/');
    expect(response?.status()).toBe(404);
  });

  test('eu citations keep the server citation title and description', async ({ page }) => {
    await page.goto('/eu/citations/');

    await expect(page).toHaveTitle('Galaxy Europe Citations | Galaxy Hub');
    await expect(page.locator('h1')).toHaveText('Citations');
    await expect(
      page.getByText('Scientific publications that cited the European Galaxy server.').first()
    ).toBeVisible();
  });
});

test.describe('Freiburg publications', () => {
  const title = 'Publications by the Freiburg Galaxy Team';

  test('lists the team publications under their own title', async ({ page }) => {
    const response = await page.goto('/freiburg/publications/');
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(`${title} | Galaxy Hub`);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(
      page.getByText('These are the publications by current or former members of the Freiburg Galaxy Team.').first()
    ).toBeVisible();
    await expect(page.getByText(/cited the Freiburg/i)).toHaveCount(0);
    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.locator('[data-filter-count]')).toHaveText(/^\d+ publications$/);
  });

  test('old citations url redirects to publications', async ({ page }) => {
    await page.goto('/freiburg/citations/');

    await expect(page).toHaveURL(/\/freiburg\/publications\/$/);
    await expect(page.locator('h1')).toHaveText(title);
  });

  test('freiburg menu links to publications', async ({ page }) => {
    await page.goto('/freiburg/');

    const sidebar = page.locator('aside');
    await expect(sidebar.locator('astro-island[ssr]')).toHaveCount(0);
    await sidebar.getByRole('button', { name: 'About' }).click();
    await expect(sidebar.getByRole('link', { name: 'Publications' })).toHaveAttribute(
      'href',
      '/freiburg/publications/'
    );
  });
});
