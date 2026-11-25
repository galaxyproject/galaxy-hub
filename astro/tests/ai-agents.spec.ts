import { test, expect } from '@playwright/test';

/**
 * Legacy /agents/plugins/ URL redirects cleanly to /agents/ (preserving
 * #guide-<id> hashes), and shared CodeCopy coverage stays intact.
 */
test.describe('Legacy /agents/plugins/ redirect and code copy', () => {
  test('/agents/plugins/ redirects to /agents/ and preserves #guide-<id> hash', async ({ page }) => {
    await page.goto('/agents/plugins/#guide-codex');
    await expect(page).toHaveURL(/\/agents\/#guide-codex$/);
    await expect(page.locator('[data-harness-guides]')).toHaveAttribute('data-mounted', '1');
    await expect(page.locator('[data-harness-guides] [data-guide-panel]:not([hidden])')).toHaveAttribute(
      'data-guide-panel',
      'codex'
    );
  });

  test('event pages with code blocks get the copy button too', async ({ page }) => {
    await page.goto('/events/2023-admin-training/');
    const pre = page.locator('.prose pre');
    if ((await pre.count()) === 0) test.skip(true, 'page has no code blocks');
    await expect(page.locator('.prose .code-block .code-copy').first()).toBeVisible();
  });
});
