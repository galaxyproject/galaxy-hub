import { test, expect } from '@playwright/test';

// Control+K works on every platform (Cmd+K is the Apple label), so the tests stay runner-independent.
test.describe('Search keyboard shortcut', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('Ctrl+K focuses the sidebar search on a content page', async ({ page }) => {
    await page.goto('/community/');
    const input = page.locator('aside input[name="q"]');
    const hint = page.locator('aside [data-search-shortcut-hint]');
    await expect(hint).toHaveText(/K$/);
    await expect(hint).toBeVisible();
    await expect(input).toHaveAttribute('aria-keyshortcuts', 'Meta+K Control+K');

    await page.keyboard.press('Control+k');
    await expect(input).toBeFocused();
    await expect(hint).toBeHidden();
  });

  test('Ctrl+K opens the home search overlay and focuses it', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#search-overlay')).toBeHidden();

    await page.keyboard.press('Control+k');
    await expect(page.locator('#search-overlay')).toBeVisible();
    await expect(page.locator('#search-input')).toBeFocused();
  });

  test('Ctrl+K focuses the search box on the search page', async ({ page }) => {
    await page.goto('/search/');
    const pageInput = page.locator('[data-search-shortcut="page"]');
    // The input autofocuses; move focus away so the shortcut has to bring it back.
    await page.locator('h1').first().click();
    await expect(pageInput).not.toBeFocused();

    await page.keyboard.press('Control+k');
    await expect(pageInput).toBeFocused();
  });

  test('Ctrl+K inside the search box keeps focus there and selects the query', async ({ page }) => {
    await page.goto('/search/');
    const pageInput = page.locator('[data-search-shortcut="page"]');
    await pageInput.click();
    await pageInput.pressSequentially('galaxy');

    await page.keyboard.press('Control+k');
    await expect(pageInput).toBeFocused();
    await expect(pageInput).toHaveValue('galaxy');
    expect(await pageInput.evaluate((el: HTMLInputElement) => [el.selectionStart, el.selectionEnd])).toEqual([0, 6]);
  });

  test('the shortcut and hint work after a view transition from the home page', async ({ page }) => {
    await page.goto('/');
    await page.locator('.masthead-nav a[href="/news/"]').click();
    await expect(page).toHaveURL(/\/news\/$/);

    const hint = page.locator('aside [data-search-shortcut-hint]');
    await expect(hint).toBeVisible();
    await expect(hint).toHaveText(/K$/);

    await page.keyboard.press('Control+k');
    await expect(page.locator('aside input[name="q"]')).toBeFocused();
  });

  test('Ctrl+K does not steal focus from a field the user is typing in', async ({ page }) => {
    await page.goto('/use/');
    const filter = page.getByPlaceholder('Search, tool:name, or reference:genome');
    await filter.click();
    await filter.pressSequentially('europe');

    await page.keyboard.press('Control+k');
    await expect(filter).toBeFocused();
    await expect(page.locator('aside input[name="q"]')).not.toBeFocused();
  });
});
