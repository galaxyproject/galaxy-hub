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
        els.filter((el) => !el.classList.contains('hidden') && (el.textContent || '').includes(targetYear as string)).length,
      year,
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
});
