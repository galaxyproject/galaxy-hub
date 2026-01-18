import { test, expect } from '@playwright/test';

async function loadLdJson(page) {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const docs: any[] = [];
  for (const text of scripts) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        docs.push(...parsed);
      } else {
        docs.push(parsed);
      }
    } catch {
      // skip invalid json
    }
  }
  return docs;
}

test.describe('Schema.org JSON-LD', () => {
  test('news page exposes NewsArticle schema', async ({ page }) => {
    const response = await page.goto('/news/2025-10-15-egd2025/');
    expect(response?.status()).toBe(200);

    const docs = await loadLdJson(page);
    const news = docs.find((d) => d?.['@type'] === 'NewsArticle');
    expect(news).toBeTruthy();
    expect(news.headline).toBeTruthy();
    expect(news.datePublished).toBeTruthy();
    expect(news.url).toMatch(/^https?:\/\//);
  });

  test('event page exposes Event schema', async ({ page }) => {
    const response = await page.goto('/events/2025-admin-training-brno/');
    expect(response?.status()).toBe(200);

    const docs = await loadLdJson(page);
    const event = docs.find((d) => d?.['@type'] === 'Event');
    expect(event).toBeTruthy();
    expect(event.name).toBeTruthy();
    expect(event.startDate).toBeTruthy();
    expect(event.url).toMatch(/^https?:\/\//);
  });
});
