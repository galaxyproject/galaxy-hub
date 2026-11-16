import { test, expect } from '@playwright/test';

test.describe('Subsite home inserts', () => {
  for (const site of ['eu', 'freiburg', 'genouest']) {
    test(`/${site}/ renders the shared Galaxy intro`, async ({ page }) => {
      await page.goto(`/${site}/`);

      await expect(page.locator('.subsite-inserts #galaxy-europe-intro')).toBeVisible();
      await expect(page.locator('.subsite-inserts euintro')).toHaveCount(0);
    });
  }

  test('/freiburg/ renders the training insert', async ({ page }) => {
    await page.goto('/freiburg/');

    await expect(page.locator('.subsite-inserts a[href="https://training.galaxyproject.org"]')).toBeVisible();
  });

  test.describe('edit on GitHub link', () => {
    const cardSelector = 'main section.rounded-lg.bg-white.p-6.shadow-sm';
    const subsites = ['us', 'eu', 'freiburg', 'belgium', 'pasteur', 'elixir-it', 'ifb', 'cz'];
    const regionsWithCard = ['eu', 'freiburg', 'pasteur', 'elixir-it', 'cz'];

    for (const site of subsites) {
      test(`/${site}/ has one Edit on GitHub link to its content folder`, async ({ page }) => {
        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        const edit = page.getByRole('main').getByRole('link', { name: 'Edit on GitHub' });
        await expect(edit).toHaveCount(1);
        await expect(edit).toHaveAttribute(
          'href',
          `https://github.com/galaxyproject/galaxy-hub/tree/main/content/${site}`
        );
        await expect(edit).toHaveAttribute('target', '_blank');
        await expect(edit).toHaveAttribute('rel', 'noopener noreferrer');
        await expect(edit).toHaveClass(/text-chicago-500/);
        await expect(edit.locator('svg')).toHaveCount(1);
      });
    }

    for (const site of regionsWithCard) {
      test(`/${site}/ edit link sits below the contact card, outside it, on the right`, async ({ page }) => {
        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        const card = page.locator(cardSelector).last();
        await expect(card.getByRole('link', { name: /edit/i })).toHaveCount(0);

        const edit = page.getByRole('main').getByRole('link', { name: 'Edit on GitHub' });
        const cardBox = (await card.boundingBox())!;
        const editBox = (await edit.boundingBox())!;
        expect(editBox.y).toBeGreaterThanOrEqual(cardBox.y + cardBox.height);
        expect(editBox.y - (cardBox.y + cardBox.height)).toBeLessThan(40);
        expect(editBox.x + editBox.width).toBeGreaterThan(cardBox.x + cardBox.width - 8);
      });
    }
  });

  for (const width of [1024, 1440]) {
    test(`/freiburg/ training screenshot stays above Upcoming Events at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/freiburg/');

      const image = page.locator('.subsite-inserts img[src*="training-home"]');
      await expect(image).toBeVisible();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
        .toBe(true);

      const imageBox = await image.boundingBox();
      const headingBox = await page.getByRole('heading', { name: 'Upcoming Events' }).boundingBox();
      expect(imageBox).not.toBeNull();
      expect(headingBox).not.toBeNull();
      expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(headingBox!.y);
    });
  }
});
