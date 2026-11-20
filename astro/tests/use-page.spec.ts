import { test, expect } from '@playwright/test';

const SERVERS = [
  { name: 'UseGalaxy.org', href: 'https://usegalaxy.org' },
  { name: 'UseGalaxy.eu', href: 'https://usegalaxy.eu' },
  { name: 'UseGalaxy.org.au', href: 'https://usegalaxy.org.au' },
  { name: 'UseGalaxy.ca', href: 'https://usegalaxy.ca' },
];

const mainServers = (page: import('@playwright/test').Page) =>
  page.locator('section', { has: page.getByRole('heading', { name: 'Main UseGalaxy Servers' }) });

test.describe('Use Galaxy page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/use/');
  });

  test('main servers are four boxes that open the server, with no logos', async ({ page }) => {
    const boxes = mainServers(page).locator('a[target="_blank"]');
    await expect(boxes).toHaveCount(SERVERS.length);

    for (const [i, server] of SERVERS.entries()) {
      const box = boxes.nth(i);
      await expect(box).toHaveAttribute('href', server.href);
      await expect(box.getByRole('heading', { name: server.name })).toBeVisible();
      await expect(box.getByText('Start analyzing')).toBeVisible();
    }

    // Logos wait until every instance has one.
    await expect(mainServers(page).locator('img')).toHaveCount(0);
  });

  for (const width of [768, 1024, 1280, 1440]) {
    test(`server boxes keep their start link on one line inside the box at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/use/');
      const boxes = await mainServers(page).locator('a[target="_blank"]').all();
      expect(boxes).toHaveLength(4);
      for (const box of boxes) {
        const outer = await box.boundingBox();
        const label = await box.getByText('Start analyzing').boundingBox();
        expect(label && outer && label.x + label.width <= outer.x + outer.width).toBe(true);
        expect(label && outer && label.x >= outer.x).toBe(true);
        // One line of text-sm is 20px tall; a wrapped label is taller.
        expect(label && label.height <= 20).toBe(true);
      }
    });
  }

  test('platform map toggle is a keyboard-operable disclosure button', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Show Platform Map' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.focus();
    await page.keyboard.press('Enter');
    const hide = page.getByRole('button', { name: 'Hide Platform Map' });
    await expect(hide).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#platform-map')).toBeVisible();

    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Show Platform Map' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('directory cards do not nest links inside links', async ({ page }) => {
    await expect(page.getByRole('combobox', { name: 'Type' })).toBeVisible();
    await expect(page.locator('a a')).toHaveCount(0);
  });

  test('other ways to use Galaxy are link tiles', async ({ page }) => {
    const section = page.locator('section', { has: page.getByRole('heading', { name: 'Other Ways to Use Galaxy' }) });
    await expect(section.getByRole('link', { name: /^Run Your Own/ })).toHaveAttribute('href', '/admin/');
    await expect(section.getByRole('link', { name: /^Cloud Deployments/ })).toHaveAttribute('href', '/cloud/');

    const training = section.getByRole('link', { name: /^Galaxy Training/ });
    await expect(training).toHaveAttribute('href', 'https://training.galaxyproject.org/');
    await expect(training).toHaveAttribute('target', '_blank');
    await expect(training).toHaveAccessibleName(/^Galaxy Training \(opens in a new tab\)/);
  });
});
