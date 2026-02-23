import { test, expect } from '@playwright/test';

test.describe('Platform group filter', () => {
  test('?platform_group=public-servers filters to public servers', async ({ page }) => {
    await page.goto('/use/?platform_group=public-servers');

    await expect(page).toHaveURL(/\/use\/\?platform_group=public-servers/);

    // The Platform dropdown should reflect the selection
    const platformSelect = page.locator('select').nth(2);
    await expect(platformSelect).toHaveValue('public-server');

    // Should show fewer results than total
    const countText = page.locator('text=/Showing \\d+ of \\d+/');
    await expect(countText).toBeVisible();
    const text = await countText.textContent();
    const match = text?.match(/Showing (\d+) of (\d+)/);
    expect(match).not.toBeNull();
    const shown = Number(match?.[1]);
    const total = Number(match?.[2]);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
  });

  test('singular form also works: ?platform_group=public-server', async ({ page }) => {
    await page.goto('/use/?platform_group=public-server');

    const platformSelect = page.locator('select').nth(2);
    await expect(platformSelect).toHaveValue('public-server');
  });

  test('invalid platform_group defaults to showing all', async ({ page }) => {
    await page.goto('/use/?platform_group=bogus');

    // Dropdown should remain on "all"
    const platformSelect = page.locator('select').nth(2);
    await expect(platformSelect).toHaveValue('all');

    const countText = page.locator('text=/Showing \\d+ of \\d+/');
    const text = await countText.textContent();
    const match = text?.match(/Showing (\d+) of (\d+)/);
    expect(match).not.toBeNull();
    expect(Number(match?.[1])).toBe(Number(match?.[2]));
  });

  test('selecting from dropdown updates URL', async ({ page }) => {
    await page.goto('/use/');

    const platformSelect = page.locator('select').nth(2);
    await platformSelect.selectOption('public-server');

    await expect(page).toHaveURL(/platform_group=public-servers/);
  });

  test('clear button removes platform_group filter and param', async ({ page }) => {
    await page.goto('/use/?platform_group=public-servers');

    const platformSelect = page.locator('select').nth(2);
    await expect(platformSelect).toHaveValue('public-server');

    await page.getByRole('button', { name: 'Clear' }).first().click();

    await expect(platformSelect).toHaveValue('all');
    await expect(page).not.toHaveURL(/platform_group/);
  });
});
