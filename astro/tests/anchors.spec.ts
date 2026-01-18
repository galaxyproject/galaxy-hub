import { test, expect } from '@playwright/test';

test.describe('Heading anchors', () => {
  test('/publication-library/ subheaders are linkable', async ({ page }) => {
    const response = await page.goto('/publication-library/');
    expect(response?.status()).toBe(200);

    const heading = page.locator('h2').first();
    await expect(heading).toBeVisible();

    const id = await heading.getAttribute('id');
    expect(id).toBeTruthy();

    const anchor = heading.locator('.heading-anchor');
    await expect(anchor).toBeVisible();
    await expect(anchor).toHaveAttribute('href', `#${id}`);

    await anchor.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
  });

  test('/community/wg/ subheaders are linkable', async ({ page }) => {
    const response = await page.goto('/community/wg/');
    expect(response?.status()).toBe(200);

    const heading = page.locator('h2').first();
    await expect(heading).toBeVisible();

    const id = await heading.getAttribute('id');
    expect(id).toBeTruthy();

    const anchor = heading.locator('.heading-anchor');
    await expect(anchor).toBeVisible();
    await expect(anchor).toHaveAttribute('href', `#${id}`);

    await anchor.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
  });
});
