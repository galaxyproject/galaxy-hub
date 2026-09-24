import { test, expect } from '@playwright/test';

test.describe('ESG project page', () => {
  test('/projects/esg/ renders the dataset-driven sections', async ({ page }) => {
    const response = await page.goto('/projects/esg/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);

    await expect(page.locator('h2#objectives')).toHaveText('Objectives');
    await expect(page.locator('#objectives + div h3')).toHaveCount(4);

    await expect(page.locator('h2#projects')).toHaveText('Projects Part of ESG');
    await expect(page.locator('#projects + div a[href="https://pulsar-network.readthedocs.io/"]')).toBeVisible();

    await expect(page.locator('h2#results')).toHaveText('Expected Results');
    await expect(page.locator('#results + div h3')).toHaveCount(4);

    await expect(page.locator('h2#partners')).toHaveText('Project Partners');
    await expect(page.locator('#partners + div a[href="https://vib.be/"]')).toBeVisible();
  });

  test('/projects/esg/ loads the project link and partner logos', async ({ page }) => {
    await page.goto('/projects/esg/');

    for (const [selector, count] of [
      ['#projects + div img', 3],
      ['#partners + div img', 19],
    ] as const) {
      const images = page.locator(selector);
      await expect(images).toHaveCount(count);
      await images.last().scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          images.evaluateAll((imgs: HTMLImageElement[]) => imgs.every((i) => i.complete && i.naturalWidth > 0))
        )
        .toBe(true);
    }
  });
});
