import { test, expect } from '@playwright/test';

const SERVERS = [
  { name: 'UseGalaxy.org', href: 'https://usegalaxy.org', details: '/use/usegalaxy-org/' },
  { name: 'UseGalaxy.eu', href: 'https://usegalaxy.eu', details: '/use/usegalaxy-eu/' },
  { name: 'UseGalaxy.org.au', href: 'https://usegalaxy.org.au', details: '/use/usegalaxy-au/' },
  { name: 'UseGalaxy.ca', href: 'https://usegalaxy.ca', details: '/use/usegalaxy-ca/' },
];

test.describe('Use Galaxy page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/use/');
  });

  test('main servers are cards with a start link, a details link and a logo', async ({ page }) => {
    const section = page.locator('section', { has: page.getByRole('heading', { name: 'Main UseGalaxy Servers' }) });
    const cards = section.getByRole('listitem');
    await expect(cards).toHaveCount(SERVERS.length);

    for (const [i, server] of SERVERS.entries()) {
      const card = cards.nth(i);
      await expect(card.getByRole('heading', { name: server.name })).toBeVisible();

      const start = card.getByRole('link', { name: `Start analyzing on ${server.name} (opens in a new tab)` });
      await expect(start).toHaveAttribute('href', server.href);
      await expect(start).toHaveAttribute('target', '_blank');

      const details = card.getByRole('link', { name: /^Server details/ });
      await expect(details).toHaveAttribute('href', server.details);
      await expect(details).toHaveAccessibleName(`Server details for ${server.name}`);
    }

    // Logos load for the two servers that have one; .org.au and .ca show a short mark.
    for (const i of [0, 1]) {
      const logo = cards.nth(i).locator('img');
      await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }
    for (const [i, mark] of [[2, 'AU'], [3, 'CA']] as const) {
      await expect(cards.nth(i).locator('img')).toHaveCount(0);
      await expect(cards.nth(i).getByText(mark, { exact: true })).toBeVisible();
    }
  });

  for (const width of [768, 1024, 1280, 1440]) {
    test(`server cards keep their button inside the card at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/use/');
      const cards = page.locator('section', { has: page.getByRole('heading', { name: 'Main UseGalaxy Servers' }) });
      const items = await cards.getByRole('listitem').all();
      expect(items).toHaveLength(4);
      for (const item of items) {
        const card = await item.boundingBox();
        const button = await item.getByRole('link', { name: /^Start analyzing/ }).boundingBox();
        expect(button && card && button.x + button.width <= card.x + card.width).toBe(true);
        expect(button && card && button.x >= card.x).toBe(true);
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
