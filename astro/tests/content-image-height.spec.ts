import { test, expect } from '@playwright/test';

// The EU storage page asks for 100px illustrations with `<img height="100">`.
const PAGE = '/eu/storage/';

for (const width of [375, 1280]) {
  test.describe(`Content image height at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test('images never render taller than the height they ask for', async ({ page }) => {
      await page.goto(PAGE);
      const images = page.locator('.prose img[height="100"]');
      await expect
        .poll(() => images.evaluateAll((imgs) => (imgs as HTMLImageElement[]).every((i) => i.complete)))
        .toBe(true);
      const heights = await images.evaluateAll((imgs) => imgs.map((img) => img.getBoundingClientRect().height));
      expect(heights.length).toBeGreaterThan(0);
      for (const height of heights) expect(height).toBeLessThanOrEqual(100.5);
    });

    test('images keep their aspect ratio', async ({ page }) => {
      await page.goto(PAGE);
      const images = page.locator('.prose img[height="100"]');
      await expect
        .poll(() => images.evaluateAll((imgs) => (imgs as HTMLImageElement[]).every((i) => i.complete)))
        .toBe(true);
      const distortion = await images.evaluateAll((imgs) =>
        (imgs as HTMLImageElement[])
          .filter((img) => img.naturalWidth > 0 && img.getBoundingClientRect().width > 0)
          .map((img) => {
            const box = img.getBoundingClientRect();
            return Math.abs(box.width / box.height / (img.naturalWidth / img.naturalHeight) - 1);
          })
      );
      expect(distortion.length).toBeGreaterThan(0);
      for (const d of distortion) expect(d).toBeLessThan(0.03);
    });
  });
}
