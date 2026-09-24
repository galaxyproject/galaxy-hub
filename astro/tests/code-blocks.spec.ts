import { test, expect } from '@playwright/test';

test('code comments use the contrast-safe colour', async ({ page }) => {
  await page.goto('/tools/orbit/');
  const colors = await page
    .locator('pre.astro-code span[style]')
    .evaluateAll((spans) => spans.map((s) => getComputedStyle(s).color));
  expect(colors).toContain('rgb(149, 157, 165)');
  expect(colors).not.toContain('rgb(106, 115, 125)');
});
