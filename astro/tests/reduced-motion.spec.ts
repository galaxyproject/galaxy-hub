import { test, expect, type Page } from '@playwright/test';

async function activeSlide(page: Page) {
  return page.locator('#welcome-carousel .carousel-slide.opacity-100').getAttribute('data-index');
}

test.describe('Reduced motion', () => {
  test('smooth scrolling is only on without a reduced motion preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/tags/');
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('smooth');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  });

  test('home page animations stop under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const running = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((a) => a.playState === 'running' && a.effect?.getComputedTiming().iterations === Infinity).length
    );
    expect(running).toBe(0);
    await expect(page.locator('.btn-primary').first()).toHaveCSS('animation-name', 'none');
  });

  test.describe('welcome carousel', () => {
    test('does not auto-advance under reduced motion and can be started', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/usegalaxy/welcome/');

      const toggle = page.locator('#carousel-toggle');
      await expect(toggle).toHaveAttribute('aria-label', 'Play slide show');
      await page.waitForTimeout(3500);
      expect(await activeSlide(page)).toBe('0');

      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-label', 'Pause slide show');
      await page.mouse.move(0, 0);
      await expect.poll(() => activeSlide(page), { timeout: 5000 }).not.toBe('0');
    });

    test('pause button stops auto-advance', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/usegalaxy/welcome/');

      const toggle = page.locator('#carousel-toggle');
      await expect(toggle).toHaveAttribute('aria-label', 'Pause slide show');
      await toggle.focus();
      await page.keyboard.press('Enter');
      await expect(toggle).toHaveAttribute('aria-label', 'Play slide show');

      const before = await activeSlide(page);
      await page.waitForTimeout(3500);
      expect(await activeSlide(page)).toBe(before);
    });
  });

  test.describe('content carousel', () => {
    async function hydratedCarousel(page: Page) {
      await page.goto('/bare/eu/usegalaxy/main/');
      await expect(page.locator('astro-island:has(.carousel)')).not.toHaveAttribute('ssr');
      return page.locator('.carousel').first();
    }

    test('is rendered as playing before hydration', async ({ request }) => {
      const html = await (await request.get('/bare/eu/usegalaxy/main/')).text();
      expect(html).toContain('aria-label="Pause slide show"');
    });

    test('stays paused under reduced motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const carousel = await hydratedCarousel(page);

      await expect(carousel.getByRole('button', { name: 'Play slide show' })).toBeVisible();
      const src = await carousel.locator('img').first().getAttribute('src');
      await page.waitForTimeout(6000);
      expect(await carousel.locator('img').first().getAttribute('src')).toBe(src);
    });

    test('can be paused', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const carousel = await hydratedCarousel(page);

      await carousel.getByRole('button', { name: 'Pause slide show' }).click();
      await expect(carousel.getByRole('button', { name: 'Play slide show' })).toBeVisible();
    });
  });
});
