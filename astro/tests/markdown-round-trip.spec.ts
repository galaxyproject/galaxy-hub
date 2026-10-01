import { test, expect } from '@playwright/test';

test.describe('Markdown round trip', () => {
  test('underscores in bare URLs are not escaped in the link', async ({ page }) => {
    await page.goto('/toolshed/contributions/2014-12/');
    await expect(page.locator('a[href="https://github.com/galaxy-iuc/tool_shed/"]').first()).toHaveText(
      'https://github.com/galaxy-iuc/tool_shed/'
    );
    await expect(page.locator('a[href*="%5C"]')).toHaveCount(0);
  });

  test('tool shed URLs link without backslashes', async ({ page }) => {
    await page.goto('/toolshed/contributions/2015-05/');
    await expect(page.locator('a[href="https://bitbucket.org/lance_parsons/cutadapt_galaxy_wrapper"]')).toHaveCount(1);
    await expect(page.locator('a[href*="%5C"]')).toHaveCount(0);
  });

  test('tables without leading pipes render as tables', async ({ page }) => {
    await page.goto('/news/2018-04-26-outage/');
    await expect(page.locator('article table')).toHaveCount(1);
    await expect(page.locator('article')).not.toContainText('\\---');
  });

  test('footnotes render as footnotes', async ({ page }) => {
    await page.goto('/news/2023-05-08-tpv-switch/');
    await expect(page.locator('a[data-footnote-ref]')).toHaveCount(1);
    await expect(page.locator('section[data-footnotes] li')).toHaveCount(1);
    await expect(page.locator('article')).not.toContainText('[^naming]');
  });
});
