import { test, expect } from '@playwright/test';

const SERVERS = [
  { name: 'UseGalaxy.org', href: 'https://usegalaxy.org', details: '/use/usegalaxy-org/' },
  { name: 'UseGalaxy.eu', href: 'https://usegalaxy.eu', details: '/use/usegalaxy-eu/' },
  { name: 'UseGalaxy.org.au', href: 'https://usegalaxy.org.au', details: '/use/usegalaxy-au/' },
  { name: 'UseGalaxy.ca', href: 'https://usegalaxy.ca', details: null },
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
      if (server.details) {
        await expect(details).toHaveAttribute('href', server.details);
        await expect(details).toHaveAccessibleName(`Server details for ${server.name}`);
      } else {
        await expect(details).toHaveCount(0);
      }
    }

    // Logos load for the three servers that have one; usegalaxy.ca shows a CA mark.
    for (const i of [0, 1, 2]) {
      const logo = cards.nth(i).locator('img');
      await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }
    await expect(cards.nth(3).locator('img')).toHaveCount(0);
    await expect(cards.nth(3).getByText('CA', { exact: true })).toBeVisible();
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
