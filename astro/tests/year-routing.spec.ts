import { test, expect } from '@playwright/test';

test.describe('Year filters are routable', () => {
  test('news year filter updates URL and results', async ({ page }) => {
    await page.goto('/news/');

    const yearButton = page.getByRole('button', { name: /\d{4}/ }).first();
    const label = (await yearButton.textContent()) || '';
    const match = label.match(/(\d{4})/);
    expect(match).not.toBeNull();
    const year = match?.[1] as string;

    await page.goto(`/news/?year=${year}`);
    await page.waitForSelector('article time');
    await expect(page).toHaveURL(new RegExp(`\\/news\\/\\?year=${year}`));

    const articlesWithYear = await page.$$eval(
      'article',
      (els, targetYear) =>
        els.filter((el) => !el.classList.contains('hidden') && (el.textContent || '').includes(targetYear as string))
          .length,
      year
    );

    expect(articlesWithYear).toBeGreaterThan(0);
  });

  test('events past year filter updates URL and results', async ({ page }) => {
    await page.goto('/events/');

    const pastYearButton = page.locator('section:has-text("Past Events") button', { hasText: /\d{4}/ }).first();
    const label = (await pastYearButton.textContent()) || '';
    const match = label.match(/(\d{4})/);
    expect(match).not.toBeNull();
    const year = match?.[1] as string;

    await page.goto(`/events/?year=${year}`);
    const pastSection = page.locator('section', { hasText: 'Past Events' });
    await pastSection.waitFor({ state: 'visible' });
    await expect(page).toHaveURL(new RegExp(`\\/events\\/\\?year=${year}`));

    await expect(pastSection.locator('article').first()).toBeVisible();
    await expect(pastSection.locator('time', { hasText: year }).first()).toBeVisible();
  });

  test('news year survives back and forward through an article', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/news/');
    const island = page.locator('astro-island:has(.news-list)');
    await expect(island).not.toHaveAttribute('ssr', { timeout: 60_000 });
    const yearButton = page.getByRole('button', { name: /^\d{4}/ }).nth(1);
    const year = ((await yearButton.textContent()) || '').match(/\d{4}/)?.[0] as string;
    const count = page.locator('.news-list [data-filter-count]');

    await yearButton.click();
    await expect(page).toHaveURL(new RegExp(`/news/\\?year=${year}$`));
    await page.locator('.news-list article a').first().click();
    await expect(page).not.toHaveURL(/\/news\/(\?|$)/);

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/news/\\?year=${year}$`));
    await expect(island).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(count).toContainText(`in ${year}`);
    await expect(page.getByRole('button', { name: new RegExp(`^${year}`) })).toHaveClass(/bg-galaxy-primary/);

    await page.goForward();
    await expect(page).not.toHaveURL(/\/news\/(\?|$)/);
    await page.goBack();
    await expect(count).toContainText(`in ${year}`);
  });

  test('direct load highlights the year from the URL', async ({ page }) => {
    await page.goto('/news/');
    const yearButton = page.getByRole('button', { name: /^\d{4}/ }).nth(1);
    const year = ((await yearButton.textContent()) || '').match(/\d{4}/)?.[0] as string;

    await page.goto(`/news/?year=${year}`);
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(page.getByRole('button', { name: new RegExp(`^${year}`) })).toHaveClass(/bg-galaxy-primary/);
  });

  test('news year survives back from a client-side visit to a citations page', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/news/');
    const island = page.locator('astro-island:has(.news-list)');
    await expect(island).not.toHaveAttribute('ssr', { timeout: 60_000 });
    const yearButton = page.getByRole('button', { name: /^\d{4}/ }).nth(1);
    const year = ((await yearButton.textContent()) || '').match(/\d{4}/)?.[0] as string;
    await yearButton.click();
    await expect(page).toHaveURL(new RegExp(`/news/\\?year=${year}$`));

    // No news page links to citations; a real anchor click still goes through the ClientRouter
    await page.evaluate(() => {
      const link = document.createElement('a');
      link.href = '/elixir-it/citations/';
      link.textContent = 'Citations';
      link.id = 'test-citations-link';
      link.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483647;background:#fff';
      document.body.append(link);
    });
    await page.locator('#test-citations-link').click();
    await expect(page).toHaveURL(/\/elixir-it\/citations\/$/);
    const citationYears = await page
      .locator('[data-year-button]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('data-year')));
    // A year the citations page also lists would be written back unchanged and hide the bug
    expect(citationYears).not.toContain(year);

    await page.goBack();
    await expect(island).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(page).toHaveURL(new RegExp(`/news/\\?year=${year}$`));
    await expect(page.getByRole('button', { name: new RegExp(`^${year}`) })).toHaveClass(/bg-galaxy-primary/);
  });
});
