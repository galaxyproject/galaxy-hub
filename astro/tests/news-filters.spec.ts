import { test, expect, type Locator, type Page } from '@playwright/test';

async function openNews(page: Page, path = '/news/') {
  await page.goto(path);
  await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
}

const count = (page: Page) => page.locator('.news-list [data-filter-count]');
const countNumber = async (page: Page) => Number(((await count(page).textContent()) || '').match(/\d+/)?.[0]);
const search = (page: Page) => page.getByLabel('Search news');
const tagSelect = (page: Page) => page.getByRole('combobox', { name: 'Tag' });
const yearGroup = (page: Page) => page.getByRole('group', { name: 'Filter news by year' });

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the filters
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

const outline = (locator: Locator) =>
  locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return `${style.outlineStyle} ${style.outlineWidth}`;
  });

test.describe('News filter bar', () => {
  test.setTimeout(90_000);

  test('text search filters titles and summaries and syncs q', async ({ page }) => {
    await openNews(page);
    const total = await countNumber(page);

    await search(page).fill('training');
    await expect(page).toHaveURL(/\/news\/\?q=training$/);
    await expect(count(page)).toContainText('matching “training”');
    const shown = await countNumber(page);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);

    const titles = await page.locator('.news-list article').first().textContent();
    expect((titles || '').toLowerCase()).toContain('training');
  });

  test('a word found only in the summary still matches', async ({ page }) => {
    await openNews(page);
    const { title, term } = await page.locator('.news-list article').evaluateAll((articles) => {
      for (const article of articles) {
        const heading = (article.querySelector('h2')?.textContent || '').trim();
        const summary = (article.querySelector('p')?.textContent || '').toLowerCase();
        const word = (summary.match(/[a-z]{7,}/g) || []).find((w) => !heading.toLowerCase().includes(w));
        if (word) return { title: heading, term: word };
      }
      return { title: '', term: '' };
    });
    expect(term).not.toBe('');

    await search(page).fill(term);
    await expect(page).toHaveURL(new RegExp(`/news/\\?q=${term}$`));
    await expect(page.locator('.news-list article h2', { hasText: title }).first()).toBeVisible();
  });

  test('every word of a two-word query must match, in any order', async ({ page }) => {
    await openNews(page);
    await search(page).fill('galaxy training');
    await expect(page).toHaveURL(/\/news\/\?q=galaxy\+training$/);
    await expect(count(page)).toContainText('matching “galaxy training”');
    const shown = await countNumber(page);
    expect(shown).toBeGreaterThan(0);
    const texts = await page.locator('.news-list article').allTextContents();
    for (const text of texts) {
      expect(text.toLowerCase()).toContain('galaxy');
      expect(text.toLowerCase()).toContain('training');
    }

    await search(page).fill('training galaxy');
    await expect(count(page)).toContainText('matching “training galaxy”');
    expect(await countNumber(page)).toBe(shown);
  });

  test('the URL follows the search once typing pauses', async ({ page }) => {
    await page.clock.install();
    await openNews(page);
    // Freeze time after hydration so only runFor advances the debounce timer
    await page.clock.pauseAt(new Date(Date.now() + 60_000));
    await page.evaluate(() => {
      const writes: string[] = [];
      (window as unknown as { __filterWrites: string[] }).__filterWrites = writes;
      const replace = window.history.replaceState.bind(window.history);
      window.history.replaceState = (state, unused, url) => {
        if (url) writes.push(String(url));
        return replace(state, unused, url);
      };
    });
    const writes = () =>
      page.evaluate(() =>
        (window as unknown as { __filterWrites: string[] }).__filterWrites.filter((url) => url.includes('q='))
      );

    // The fake clock is paused: nothing is written until it passes the 250ms debounce
    await search(page).pressSequentially('train');
    expect(await writes()).toEqual([]);
    await page.clock.runFor(250);
    expect(await writes()).toEqual(['/news/?q=train']);
    await expect(page).toHaveURL(/\/news\/\?q=train$/);
  });

  test('a trailing space is trimmed from q', async ({ page }) => {
    await openNews(page);
    await search(page).fill('training ');
    await expect(page).toHaveURL(/\/news\/\?q=training$/);
    await expect(count(page)).toContainText('matching “training”');
    await expect(search(page)).toHaveValue('training ');
  });

  test('year and tag combine in a stable param order', async ({ page }) => {
    await openNews(page);
    const yearButton = page.getByRole('button', { name: /^\d{4}/ }).nth(1);
    const year = ((await yearButton.textContent()) || '').match(/\d{4}/)?.[0] as string;
    await yearButton.click();
    await expect(yearButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'All years' })).toHaveAttribute('aria-pressed', 'false');

    await tagSelect(page).click();
    await page.getByRole('option', { name: /^training \(/ }).click();
    await expect(page).toHaveURL(new RegExp(`/news/\\?year=${year}&tag=training$`));
    await expect(count(page)).toContainText(`in ${year} tagged “training”`);

    await search(page).fill('galaxy');
    await expect(page).toHaveURL(new RegExp(`/news/\\?q=galaxy&year=${year}&tag=training$`));

    await tagSelect(page).click();
    await page.getByRole('option', { name: 'All tags' }).click();
    await expect(page).toHaveURL(new RegExp(`/news/\\?q=galaxy&year=${year}$`));
    await expect(tagSelect(page)).toContainText('All tags');
    await expect(count(page)).not.toContainText('tagged');
  });

  test('year chip counts follow the text search', async ({ page }) => {
    await openNews(page, '/news/?q=training');
    await expect(search(page)).toHaveValue('training');
    const chip = yearGroup(page)
      .getByRole('button', { name: /^\d{4}/ })
      .first();
    const [, year, chipCount] = ((await chip.textContent()) || '').match(/(\d{4})\s*\((\d+)\)/) || [];
    expect(year).toBeTruthy();

    await chip.click();
    await expect(count(page)).toHaveText(new RegExp(`^${chipCount} articles? in ${year} matching “training”$`));
  });

  test('URL params preselect the filters and Clear resets them', async ({ page }) => {
    await openNews(page, '/news/?q=galaxy&tag=training');
    await expect(search(page)).toHaveValue('galaxy');
    await expect(tagSelect(page)).toContainText('training');
    await expect(page.getByRole('button', { name: 'All years' })).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page).toHaveURL(/\/news\/$/);
    await expect(search(page)).toHaveValue('');
    await expect(search(page)).toBeFocused();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toHaveCount(0);
  });

  test('an unknown tag in the URL is dropped', async ({ page }) => {
    await openNews(page, '/news/?q=galaxy&tag=no-such-tag');
    await expect(search(page)).toHaveValue('galaxy');
    await expect(page).toHaveURL(/\/news\/\?q=galaxy$/);
    await expect(tagSelect(page)).toContainText('All tags');
    await expect(count(page)).not.toContainText('tagged');
  });

  test('back and forward restore q and tag', async ({ page }) => {
    await openNews(page, '/news/?q=galaxy&tag=training');
    const link = page.locator('.news-list article a').first();
    const href = (await link.getAttribute('href')) as string;
    await link.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack();
    await expect(page).toHaveURL(/\/news\/\?q=galaxy&tag=training$/);
    await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(search(page)).toHaveValue('galaxy');
    await expect(count(page)).toContainText('tagged “training” matching “galaxy”');

    await page.goForward();
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack();
    await expect(page).toHaveURL(/\/news\/\?q=galaxy&tag=training$/);
    await expect(search(page)).toHaveValue('galaxy');
    await expect(tagSelect(page)).toContainText('training');
    await expect(count(page)).toContainText('tagged “training” matching “galaxy”');
  });

  test('popstate restores q and tag', async ({ page }) => {
    await openNews(page);
    await popTo(page, '/news/?q=galaxy&tag=training');
    await expect(search(page)).toHaveValue('galaxy');
    await expect(tagSelect(page)).toContainText('training');
    await expect(count(page)).toContainText('tagged “training” matching “galaxy”');

    await popTo(page, '/news/');
    await expect(search(page)).toHaveValue('');
    await expect(tagSelect(page)).toContainText('All tags');
    await expect(count(page)).not.toContainText('matching');
  });

  test('the Load more line names the applied filters', async ({ page }) => {
    await openNews(page, '/news/?q=galaxy');
    const line = page.locator('.news-list p', { hasText: 'Showing 20 of' });
    await expect(line).toHaveText(/^\s*Showing 20 of \d+ articles matching “galaxy”\s*$/);
  });

  test('the result count is a polite live region', async ({ page }) => {
    await openNews(page);
    await expect(count(page)).toHaveAttribute('aria-live', 'polite');
    await expect(yearGroup(page)).toBeVisible();
  });

  test('keyboard focus shows a solid 2px outline, also in forced colors', async ({ page }) => {
    await openNews(page);
    await search(page).focus();
    await expect.poll(() => outline(search(page))).toBe('solid 2px');

    await page.keyboard.press('Tab');
    await expect(tagSelect(page)).toBeFocused();
    await expect.poll(() => outline(tagSelect(page))).toBe('solid 2px');

    await search(page).focus();
    await page.keyboard.press('Shift+Tab');
    const older = page.getByRole('combobox', { name: 'Older years' });
    await expect(older).toBeFocused();
    await expect.poll(() => outline(older)).toBe('solid 2px');

    await page.keyboard.press('Shift+Tab');
    const chip = yearGroup(page).getByRole('button').last();
    await expect(chip).toBeFocused();
    await expect.poll(() => outline(chip)).toBe('solid 2px');

    await page.emulateMedia({ forcedColors: 'active' });
    await expect.poll(() => outline(chip)).toBe('solid 2px');

    await openNews(page, '/news/?q=galaxy');
    const clear = page.getByRole('button', { name: 'Clear filters' });
    await search(page).focus();
    await page.keyboard.press('Tab');
    await expect(tagSelect(page)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(clear).toBeFocused();
    await expect.poll(() => outline(clear)).toBe('solid 2px');
  });

  test('fits a 390px phone without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openNews(page, '/news/?year=2024&tag=training');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
