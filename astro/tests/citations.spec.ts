import { test, expect } from '@playwright/test';

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
    const yearButton = page.locator('[data-year-button]').nth(1); // first actual year after "All"
    const year = await yearButton.getAttribute('data-year');

    expect(year).toBeTruthy();
    await yearButton.click();

    await expect
      .poll(async () => {
        const visibleYears = await page.$$eval('article', (els) =>
          els.filter((el) => !el.classList.contains('hidden')).map((el) => el.getAttribute('data-citation-year'))
        );
        return [...new Set(visibleYears)].sort();
      })
      .toEqual([year]);
  });

  test('us citations show hint when missing', async ({ page }) => {
    const response = await page.goto('/us/citations/');
    expect(response?.status()).toBe(200);

    await expect(page.getByText(/No citations found for us/i)).toBeVisible();
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
    await expect(page.locator('[data-filter-count]')).toHaveText(/^Showing \d+ publications$/);
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
