import { test, expect } from '@playwright/test';

// The EU storage page has a deck of four storage-class cards.
const PAGE = '/eu/storage/';
const MIN_CARD_PX = 16 * 16 - 1;

test.describe('Card deck', () => {
  test('cards keep a readable width and wrap onto a second row', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(PAGE);

    const cards = page.locator('.card-deck > .card');
    expect(await cards.count()).toBeGreaterThan(1);

    const boxes = await cards.evaluateAll((els) =>
      els.map((el) => {
        const { top, width } = el.getBoundingClientRect();
        return { top: Math.round(top), width };
      })
    );
    for (const { width } of boxes) expect(width).toBeGreaterThanOrEqual(MIN_CARD_PX);
    expect(new Set(boxes.map((b) => b.top)).size).toBeGreaterThan(1);
  });

  test('cards stay inside the deck on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(PAGE);

    const overflow = await page.locator('.card-deck').evaluate((deck) => {
      const right = deck.getBoundingClientRect().right;
      return [...deck.children].filter((card) => {
        const marginRight = parseFloat(getComputedStyle(card).marginRight);
        return card.getBoundingClientRect().right + marginRight > right + 1;
      }).length;
    });
    expect(overflow).toBe(0);
  });
});
