import { test, expect, type Page } from '@playwright/test';

const PATH = '/us/citations/';

async function openCitations(page: Page, path = PATH) {
  await page.goto(path);
  await expect(page.locator('astro-island:has(.citation-filters)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
}

const count = (page: Page) => page.locator('.citation-list [data-filter-count]');
const countNumber = async (page: Page) => Number(((await count(page).textContent()) || '').match(/\d+/)?.[0]);
const search = (page: Page) => page.getByLabel('Search citations');
const yearGroup = (page: Page) => page.getByRole('group', { name: 'Filter citations by year' });
const articles = (page: Page) => page.locator('.citation-list article:not(.hidden)');

// A popstate without router state (Astro's ClientRouter ignores those) must still restore the filters
const popTo = (page: Page, url: string) =>
  page.evaluate((target) => {
    window.history.replaceState(window.history.state, '', target);
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, url);

test.describe('Citations filter bar', () => {
  test.setTimeout(90_000);

  test('every word of the query must match the title or authors, and q follows', async ({ page }) => {
    await openCitations(page);
    const total = await countNumber(page);
    expect(await articles(page).count()).toBe(total);

    // One word from the first title, one from its authors: only both together must match
    const first = articles(page).first();
    const titleWord = ((await first.locator('h2').textContent()) || '').toLowerCase().match(/[a-z]{6,}/)?.[0] ?? '';
    const authorWord = ((await first.locator('p').textContent()) || '').toLowerCase().match(/[a-z]{4,}/)?.[0] ?? '';
    expect(titleWord).not.toBe('');
    expect(authorWord).not.toBe('');

    await search(page).fill(`${authorWord} ${titleWord}`);
    await expect(page).toHaveURL(new RegExp(`/us/citations/\\?q=${authorWord}\\+${titleWord}$`));
    await expect(count(page)).toContainText(`matching “${authorWord} ${titleWord}”`);
    const shown = await countNumber(page);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
    expect(await articles(page).count()).toBe(shown);
    for (const text of await articles(page).allTextContents()) {
      expect(text.toLowerCase()).toContain(titleWord);
      expect(text.toLowerCase()).toContain(authorWord);
    }
  });

  test('year and q combine in a stable order and survive a reload', async ({ page }) => {
    await openCitations(page);
    const chip = yearGroup(page)
      .getByRole('button', { name: /^\d{4}/ })
      .first();
    const year = ((await chip.textContent()) || '').match(/\d{4}/)?.[0] as string;
    await chip.click();
    await expect(page).toHaveURL(new RegExp(`/us/citations/\\?year=${year}$`));

    // A word from a title of that year, so the combined filter keeps at least one entry
    const term = ((await articles(page).first().locator('h2').textContent()) || '')
      .toLowerCase()
      .match(/[a-z]{6,}/)?.[0] as string;
    await search(page).fill(term);
    await expect(page).toHaveURL(new RegExp(`/us/citations/\\?q=${term}&year=${year}$`));
    await expect(count(page)).toContainText(`in ${year} matching “${term}”`);
    const shown = await countNumber(page);
    expect(shown).toBeGreaterThan(0);

    await page.reload();
    await expect(page.locator('astro-island:has(.citation-filters)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(search(page)).toHaveValue(term);
    await expect(yearGroup(page).getByRole('button', { name: new RegExp(`^${year}`) })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(count(page)).toContainText(`in ${year} matching “${term}”`);
    expect(await countNumber(page)).toBe(shown);
    const years = await articles(page).evaluateAll((els) => els.map((el) => el.getAttribute('data-citation-year')));
    expect(new Set(years)).toEqual(new Set([year]));
  });

  test('Clear filters resets the list and the URL', async ({ page }) => {
    await openCitations(page, `${PATH}?q=galaxy`);
    await expect(count(page)).toContainText('matching “galaxy”');
    const filtered = await countNumber(page);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page).toHaveURL(/\/us\/citations\/$/);
    await expect(search(page)).toHaveValue('');
    await expect(search(page)).toBeFocused();
    await expect(count(page)).toHaveText(/^\d+ citations$/);
    expect(await countNumber(page)).toBeGreaterThan(filtered);
    expect(await articles(page).count()).toBe(await countNumber(page));
  });

  test('a query without matches hides every entry and says so', async ({ page }) => {
    await openCitations(page, `${PATH}?q=zzqxjv`);
    await expect(count(page)).toHaveText('0 citations matching “zzqxjv”');
    await expect(articles(page)).toHaveCount(0);
    await expect(page.getByText('No citations found.')).toBeVisible();

    await search(page).fill('');
    await expect(page.getByText('No citations found.')).toBeHidden();
  });

  test('a year the list does not have falls back to all years', async ({ page }) => {
    await openCitations(page, `${PATH}?year=1900`);
    await expect(page).toHaveURL(/\/us\/citations\/$/);
    await expect(yearGroup(page).getByRole('button', { name: 'All years' })).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page)).toHaveText(/^\d+ citations$/);
  });

  test('the Unknown year chip lists entries without a year and keeps ?year=unknown', async ({ page }) => {
    await openCitations(page);
    const chip = yearGroup(page).getByRole('button', { name: /^Unknown year/ });
    const chipCount = ((await chip.textContent()) || '').match(/\((\d+)\)/)?.[1] as string;
    expect(Number(chipCount)).toBeGreaterThan(0);

    await chip.click();
    await expect(page).toHaveURL(/\/us\/citations\/\?year=unknown$/);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page)).toHaveText(new RegExp(`^${chipCount} citations? with no year$`));
    const years = await articles(page).evaluateAll((els) => els.map((el) => el.getAttribute('data-citation-year')));
    expect(years.length).toBe(Number(chipCount));
    expect(new Set(years)).toEqual(new Set(['unknown']));

    // Old ?year=unknown links keep working
    await openCitations(page, `${PATH}?year=unknown`);
    await expect(yearGroup(page).getByRole('button', { name: /^Unknown year/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page).toHaveURL(/\/us\/citations\/\?year=unknown$/);
  });

  test('a list where every entry has a year has no Unknown year chip', async ({ page }) => {
    await openCitations(page, '/freiburg/publications/?year=unknown');
    await expect(page.getByRole('group', { name: 'Filter publications by year' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Unknown year/ })).toHaveCount(0);
    await expect(page).toHaveURL(/\/freiburg\/publications\/$/);
  });

  test('back and forward restore q and year', async ({ page }) => {
    await openCitations(page);
    await search(page).fill('galaxy');
    await expect(page).toHaveURL(/\/us\/citations\/\?q=galaxy$/);
    const firstChip = yearGroup(page)
      .getByRole('button', { name: /^\d{4}/ })
      .first();
    const year = ((await firstChip.textContent()) || '').match(/\d{4}/)?.[0] as string;
    await yearGroup(page)
      .getByRole('button', { name: new RegExp(`^${year}`) })
      .click();
    await expect(page).toHaveURL(new RegExp(`/us/citations/\\?q=galaxy&year=${year}$`));

    // Leave through the ClientRouter, then come back
    await page.evaluate(() => {
      const link = document.createElement('a');
      link.href = '/news/';
      link.id = 'test-news-link';
      link.textContent = 'News';
      link.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483647;background:#fff';
      document.body.append(link);
    });
    await page.locator('#test-news-link').click();
    await expect(page).toHaveURL(/\/news\/$/);

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/us/citations/\\?q=galaxy&year=${year}$`));
    await expect(page.locator('astro-island:has(.citation-filters)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
    await expect(search(page)).toHaveValue('galaxy');
    await expect(count(page)).toContainText(`in ${year} matching “galaxy”`);

    await page.goForward();
    await expect(page).toHaveURL(/\/news\/$/);
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/us/citations/\\?q=galaxy&year=${year}$`));
    await expect(search(page)).toHaveValue('galaxy');
    await expect(count(page)).toContainText(`in ${year} matching “galaxy”`);
  });

  test('popstate restores q and year', async ({ page }) => {
    await openCitations(page);
    await popTo(page, `${PATH}?q=galaxy`);
    await expect(search(page)).toHaveValue('galaxy');
    await expect(count(page)).toContainText('matching “galaxy”');

    await popTo(page, PATH);
    await expect(search(page)).toHaveValue('');
    await expect(count(page)).toHaveText(/^\d+ citations$/);
  });

  test('Freiburg publications use their own noun', async ({ page }) => {
    await openCitations(page, '/freiburg/publications/?q=galaxy');
    await expect(page.getByLabel('Search publications')).toHaveValue('galaxy');
    await expect(page.locator('.citation-list [data-filter-count]')).toHaveText(
      /^\d+ publications? matching “galaxy”$/
    );
  });

  test('fits a 390px phone without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openCitations(page, `${PATH}?q=galaxy`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
