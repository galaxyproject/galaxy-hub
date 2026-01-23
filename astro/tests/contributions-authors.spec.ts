import { test, expect } from '@playwright/test';

test.describe('Contributions authors precedence', () => {
  test('news page uses contributions.authorship over authors', async ({ page }) => {
    await page.goto('/news/2026-01-07-hf-integration/');

    // Structured data should include only the contribution author
    const schemaHandle = await page.locator('script[type="application/ld+json"]').first();
    const schemaRaw = await schemaHandle.textContent();
    expect(schemaRaw).toBeTruthy();
    const schema = JSON.parse(schemaRaw || '{}');
    const authorNames = Array.isArray(schema.author) ? schema.author.map((a: any) => a.name) : [];
    expect(authorNames).toContain('Anup Kumar');
    expect(authorNames).not.toContain('anuprulez');

    // UI should link to hall-of-fame using contributor id and display mapped contributor name
    await expect(page.locator('a[href="/hall-of-fame/anuprulez/"]')).toContainText('Anup Kumar');

    // Hall of fame page should also resolve the display name
    await page.goto('/hall-of-fame/anuprulez/');
    await expect(page.getByRole('heading', { level: 1, name: 'Anup Kumar' })).toBeVisible();
  });
});
