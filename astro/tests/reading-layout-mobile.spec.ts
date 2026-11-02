import { test, expect } from '@playwright/test';

// Reading pages at phone width (390px): floated content images, the author line in the
// page header and anchored headings under the fixed mobile header.
test.describe('Reading layout at 390px', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('a floated image stacks instead of squeezing the text beside it', async ({ page }) => {
    await page.goto('/get-started/');
    const prose = page.locator('.prose-galaxy').first();
    const heading = prose.locator('h1', { hasText: 'Welcome!' });
    await expect(heading).toBeVisible();

    const { height, lineHeight } = await heading.evaluate((el) => ({
      height: el.getBoundingClientRect().height,
      lineHeight: parseFloat(getComputedStyle(el).lineHeight),
    }));
    expect(height, 'the heading fits on one line').toBeLessThan(lineHeight * 1.5);

    const proseWidth = (await prose.boundingBox())!.width;
    const textWidth = (await heading.locator('xpath=following-sibling::p[1]').boundingBox())!.width;
    expect(textWidth, 'the paragraph uses the full column').toBeGreaterThan(proseWidth - 2);
  });

  test('the author icon sits on the line of the first author', async ({ page }) => {
    await page.goto('/events/2026-10-07-tool-dev-workshop/');
    const header = page.locator('main header').first();
    const firstAuthor = header.locator('a[href^="/hall-of-fame/"]').first();
    await expect(firstAuthor).toBeVisible();
    const icon = firstAuthor.locator('xpath=ancestor::div[*[local-name()="svg"]][1]/*[local-name()="svg"]');

    const iconBox = (await icon.boundingBox())!;
    // First rendered line of the first name: font-independent, the name itself may wrap.
    const line = await firstAuthor.evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getClientRects()[0];
      return { left: r.left, top: r.top, bottom: r.bottom };
    });
    expect(iconBox.x + iconBox.width, 'icon is left of the name').toBeLessThanOrEqual(line.left);
    expect(iconBox.y, 'icon overlaps the first line').toBeLessThan(line.bottom);
    expect(iconBox.y + iconBox.height, 'icon overlaps the first line').toBeGreaterThan(line.top);
  });

  test('an anchored heading clears the fixed mobile header', async ({ page }) => {
    await page.goto('/news/2025-10-10-llm-hub/#available-models');
    const heading = page.locator('#available-models');
    await expect(heading).toBeVisible();
    // Re-run the anchor jump once the page has settled (late images can move it).
    await page.waitForLoadState('networkidle');
    await heading.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
    const header = (await page.locator('header.site-mobile-header').boundingBox())!;
    const top = (await heading.boundingBox())!.y;
    expect(top, 'gap under the fixed header').toBeGreaterThanOrEqual(header.y + header.height + 16);
  });
});
