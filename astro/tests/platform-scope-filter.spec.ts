import { test, expect, type Page } from '@playwright/test';

/** The scope filter is labelled "Type" in the UI. */
async function getScopeSelect(page: Page) {
  const select = page.locator('#platform-filter-type');
  await expect(select).toBeVisible();
  return select;
}

async function getCounts(page: Page) {
  const countText = page.locator('text=/Showing \\d+ of \\d+/');
  await expect(countText).toBeVisible();
  const text = await countText.textContent();
  const match = text?.match(/Showing (\d+) of (\d+)/);
  expect(match).not.toBeNull();
  return { shown: Number(match?.[1]), total: Number(match?.[2]) };
}

test.describe('Platform scope filter', () => {
  test('?scope=tool-publishing preselects the scope and filters the list', async ({ page }) => {
    await page.goto('/use/?scope=tool-publishing');

    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('tool-publishing');
    await expect(page).toHaveURL(/\/use\/\?scope=tool-publishing/);

    const { shown, total } = await getCounts(page);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);

    // Every card carries the scope badge of the selected scope
    const badges = page.locator('.platform-directory .grid a span.rounded-full');
    await expect(badges).toHaveCount(shown);
    const badgeTexts = (await badges.allTextContents()).map((t) => t.trim());
    expect(new Set(badgeTexts)).toEqual(new Set(['tool-publishing']));
  });

  test('invalid scope defaults to showing all', async ({ page }) => {
    await page.goto('/use/?scope=bogus');

    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('all');

    const { shown, total } = await getCounts(page);
    expect(shown).toBe(total);
  });

  test('selecting a scope updates the URL', async ({ page }) => {
    await page.goto('/use/');

    const scopeSelect = await getScopeSelect(page);
    await scopeSelect.selectOption('domain');
    await expect(page).toHaveURL(/\/use\/\?scope=domain$/);

    await scopeSelect.selectOption('all');
    await expect(page).not.toHaveURL(/scope=/);
  });

  test('URL sync keeps the router history state and an unrelated hash', async ({ page }) => {
    await page.goto('/use/#not-a-scope');

    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('all');
    // Astro's ClientRouter keeps its navigation index in history.state
    const indexBefore = await page.evaluate(() => window.history.state?.index);
    expect(typeof indexBefore).toBe('number');

    await scopeSelect.selectOption('domain');
    await expect(page).toHaveURL(/\/use\/\?scope=domain#not-a-scope$/);
    const indexAfter = await page.evaluate(() => window.history.state?.index);
    expect(indexAfter).toBe(indexBefore);
  });

  test('legacy /use/#<anchor> links select the matching scope', async ({ page }) => {
    // Anchors from the old Gridsome directory; #genomics maps to the "general" scope
    await page.goto('/use/#genomics');

    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('general');
    await expect(page).toHaveURL(/\/use\/\?scope=general$/);

    await page.goto('/use/#tool-publishing');
    await expect(scopeSelect).toHaveValue('tool-publishing');
    await expect(page).toHaveURL(/\/use\/\?scope=tool-publishing$/);
  });

  test('?scope= wins over a legacy hash', async ({ page }) => {
    await page.goto('/use/?scope=domain#genomics');

    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('domain');
  });

  test('scope and platform_group coexist and clear together', async ({ page }) => {
    await page.goto('/use/?scope=domain&platform_group=public-servers');

    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('domain');
    await expect(page.locator('#platform-filter-platform')).toHaveValue('public-server');
    await expect(page).toHaveURL(/scope=domain/);
    await expect(page).toHaveURL(/platform_group=public-servers/);

    await page.getByRole('button', { name: 'Clear' }).first().click();

    await expect(scopeSelect).toHaveValue('all');
    await expect(page).not.toHaveURL(/scope=/);
    await expect(page).not.toHaveURL(/platform_group/);
  });

  test('platform page scope link opens the directory filtered by that scope', async ({ page }) => {
    await page.goto('/use/biodivine/');

    const scopeLink = page.locator('th:text-is("Scope:") + td a');
    await expect(scopeLink).toHaveAttribute('href', '/use/?scope=tool-publishing');

    await scopeLink.click();
    await expect(page).toHaveURL(/\/use\/\?scope=tool-publishing/);
    const scopeSelect = await getScopeSelect(page);
    await expect(scopeSelect).toHaveValue('tool-publishing');
  });
});
