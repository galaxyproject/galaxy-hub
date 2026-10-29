import { test, expect, type Page } from '@playwright/test';

// Theme switch (DESIGN.md "Dark mode"): System by default, Light or Dark stored in localStorage
// and shown as data-theme on <html>. Assertions use computed colours, never pixels or fonts.

const PAGE = '/community/'; // ArticleLayout
const KEY = 'hub-theme';

/** Perceived luminance of an rgb()/rgba() colour, 0 (black) to 255 (white). */
function luminance(color: string): number {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return NaN;
  const [r, g, b] = m[1].split(',').map((v) => parseFloat(v));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const theme = (page: Page) => page.evaluate(() => document.documentElement.getAttribute('data-theme'));
const stored = (page: Page, key = KEY) => page.evaluate((k) => localStorage.getItem(k), key);
const contentBackground = async (page: Page) =>
  luminance(await page.locator('main.site-content').evaluate((el) => getComputedStyle(el).backgroundColor));
const sidebarSwitch = (page: Page) => page.locator('aside.site-sidebar [data-theme-switch]');
/** The switch is a client:load island; a click before hydration would not reach its handler. */
const hydrated = (page: Page) =>
  expect(page.locator('aside.site-sidebar astro-island:has([data-theme-switch])')).not.toHaveAttribute('ssr');
const pick = async (page: Page, label: 'System' | 'Light' | 'Dark') => {
  await hydrated(page);
  await sidebarSwitch(page).locator('label').filter({ hasText: label }).click();
};

test.describe('Theme switch', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('System is the default and follows the system setting', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(PAGE);
    await expect(sidebarSwitch(page).getByRole('radio', { name: 'System' })).toBeChecked();
    expect(await theme(page)).toBeNull();
    expect(await contentBackground(page)).toBeLessThan(80);

    await page.emulateMedia({ colorScheme: 'light' });
    expect(await contentBackground(page)).toBeGreaterThan(200);
  });

  test('Dark and Light persist across reloads and soft navigation; System clears the choice', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(PAGE);
    await pick(page, 'Dark');
    await expect.poll(() => theme(page)).toBe('dark');
    expect(await stored(page)).toBe('dark');
    expect(await contentBackground(page)).toBeLessThan(80);

    await page.reload();
    expect(await theme(page)).toBe('dark');
    await expect(sidebarSwitch(page).getByRole('radio', { name: 'Dark' })).toBeChecked();

    // View-transition navigation swaps the <html> attributes; the choice must come back
    await page.locator('aside.site-sidebar').getByRole('link', { name: 'News', exact: true }).first().click();
    await expect(page).toHaveURL(/\/news\/$/);
    await expect.poll(() => theme(page)).toBe('dark');
    await expect(sidebarSwitch(page).getByRole('radio', { name: 'Dark' })).toBeChecked();

    await page.emulateMedia({ colorScheme: 'dark' });
    await pick(page, 'Light');
    await expect.poll(() => theme(page)).toBe('light');
    expect(await contentBackground(page)).toBeGreaterThan(200);

    await pick(page, 'System');
    await expect.poll(() => theme(page)).toBeNull();
    expect(await stored(page)).toBeNull();
    expect(await contentBackground(page)).toBeLessThan(80);
  });

  test('the stored theme is on <html> before first paint', async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.setItem(key, 'dark');
      document.addEventListener('DOMContentLoaded', () => {
        (window as unknown as { themeAtReady: string | null }).themeAtReady =
          document.documentElement.getAttribute('data-theme');
      });
    }, KEY);
    await page.goto(PAGE);
    expect(await page.evaluate(() => (window as unknown as { themeAtReady: string | null }).themeAtReady)).toBe('dark');

    // The inline script runs before any stylesheet in <head> can paint
    const order = await page.evaluate(() => {
      const nodes = [...document.head.querySelectorAll('script, link[rel="stylesheet"], style')];
      const script = nodes.findIndex((n) => n.tagName === 'SCRIPT' && n.textContent?.includes('data-theme'));
      const firstStyle = nodes.findIndex((n) => n.tagName !== 'SCRIPT');
      return { script, firstStyle };
    });
    expect(order.script).toBeGreaterThanOrEqual(0);
    expect(order.script).toBeLessThan(order.firstStyle);
  });

  test('the switch is a keyboard radio group with a visible focus ring', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(PAGE);
    const group = sidebarSwitch(page);
    await expect(group).toHaveAttribute('role', 'radiogroup');
    await expect(group).toHaveAccessibleName('Theme');

    await hydrated(page);
    await group.getByRole('radio', { name: 'System' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(group.getByRole('radio', { name: 'Light' })).toBeChecked();
    await expect(group.getByRole('radio', { name: 'Light' })).toBeFocused();
    await expect.poll(() => theme(page)).toBe('light');
    await page.keyboard.press('ArrowRight');
    await expect(group.getByRole('radio', { name: 'Dark' })).toBeChecked();
    await expect.poll(() => theme(page)).toBe('dark');

    const ring = await group
      .locator('label')
      .filter({ hasText: 'Dark' })
      .evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(ring).not.toBe('none');
  });

  test('the mobile menu has its own switch that follows the same choice', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(PAGE);
    // MobileMenu is a client:load island: open it only once hydrated, then wait for the sheet's
    // switch to mount (it checks System on mount) before choosing
    await expect(page.locator('header.site-mobile-header astro-island').first()).not.toHaveAttribute('ssr');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const menu = page.locator('[data-testid="mobile-menu"][data-state="open"]');
    await expect(menu).toBeVisible();
    const group = menu.locator('[data-theme-switch]');
    await expect(group.getByRole('radio', { name: 'System' })).toBeChecked();
    await group.locator('label').filter({ hasText: 'Dark' }).click();
    await expect.poll(() => theme(page)).toBe('dark');
    await expect(group.getByRole('radio', { name: 'Dark' })).toBeChecked();
    // A separate radio group: the (hidden) sidebar switch keeps its own name and follows the change
    await expect(sidebarSwitch(page).locator('input[value="dark"]')).toBeChecked();
    expect(await stored(page)).toBe('dark');
  });

  test('native controls follow the theme: color-scheme is dark for Dark and for a dark system', async ({ page }) => {
    const scheme = () =>
      page.evaluate(() => {
        const input = document.createElement('input');
        input.type = 'date';
        document.querySelector('main')?.append(input);
        const value = [getComputedStyle(document.documentElement).colorScheme, getComputedStyle(input).colorScheme];
        input.remove();
        return value;
      });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(PAGE);
    await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute('content', 'light dark');
    expect(await theme(page)).toBeNull();
    expect(await scheme()).toEqual(['dark', 'dark']);

    await pick(page, 'Light');
    expect(await scheme()).toEqual(['light', 'light']);

    await page.emulateMedia({ colorScheme: 'light' });
    await pick(page, 'Dark');
    expect(await theme(page)).toBe('dark');
    expect(await scheme()).toEqual(['dark', 'dark']);
  });

  test('the switch is reachable at 390px on home, in its mobile menu', async ({ page }) => {
    // Content pages: covered by the mobile menu test above
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    const group = page.locator('#mobile-menu [data-theme-switch]');
    await expect(page.locator('#mobile-menu astro-island:has([data-theme-switch])')).not.toHaveAttribute('ssr');
    await group.scrollIntoViewIfNeeded();
    await expect(group).toBeInViewport();
    await group.locator('label').filter({ hasText: 'Dark' }).click();
    await expect.poll(() => theme(page)).toBe('dark');
    expect(await stored(page)).toBe('dark');
  });

  test('print stays light with Dark chosen', async ({ page }) => {
    await page.addInitScript((key) => localStorage.setItem(key, 'dark'), KEY);
    await page.goto(PAGE);
    const prose = page.locator('article .prose p').first();
    expect(luminance(await prose.evaluate((el) => getComputedStyle(el).color))).toBeGreaterThan(128);

    await page.emulateMedia({ media: 'print' });
    expect(luminance(await prose.evaluate((el) => getComputedStyle(el).color))).toBeLessThan(128);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe('light');
  });
});
