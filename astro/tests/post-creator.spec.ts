import { test, expect, type Page } from '@playwright/test';

async function openCreator(page: Page) {
  await page.goto('/hub/contributing/new/');
  // Wait for the Vue island to hydrate before typing
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
}

test('post creator builds an event and a GitHub link for it', async ({ page }) => {
  await openCreator(page);
  await page.getByRole('button', { name: 'Event' }).click();
  await page.getByLabel('Title (required)').fill('Galaxy Day: "hands-on"');
  await page.getByLabel('Start date (required)').fill('2026-12-01');
  await page.getByLabel('Last day').fill('2026-12-02');
  await page.getByRole('combobox', { name: 'Tags' }).fill('training');
  await page.getByRole('combobox', { name: 'Tags' }).press('Enter');
  await page.getByRole('checkbox', { name: /All European subsites/ }).check();
  await page.getByRole('combobox', { name: 'Organisers' }).fill('bgruening');
  await page.getByRole('combobox', { name: 'Organisers' }).press('Enter');

  await expect(page.getByText('content/events/2026-12-01-galaxy-day-hands-on/index.md')).toBeVisible();
  const preview = page.locator('pre');
  await expect(preview).toContainText(`title: 'Galaxy Day: "hands-on"'`);
  await expect(preview).toContainText("end: '2026-12-02'");
  await expect(preview).toContainText("tags: ['training']");
  await expect(preview).toContainText("subsites: ['all-eu']");
  await expect(preview).toContainText("organisers:\n    - 'bgruening'");

  const href = await page.getByRole('link', { name: 'Open on GitHub' }).getAttribute('href');
  const url = new URL(href!);
  expect(url.searchParams.get('filename')).toBe('content/events/2026-12-01-galaxy-day-hands-on/index.md');
  expect(url.searchParams.get('value')).toBe(await preview.textContent());
});

test('post creator blocks the link until the form is valid', async ({ page }) => {
  await openCreator(page);
  await expect(page.getByText('Add a title.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open on GitHub' })).toBeDisabled();
});

test('post creator keeps new names and says where to add them', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('First post');
  const tags = page.getByRole('combobox', { name: 'Tags' });
  await tags.fill('brand-new-tag');
  await tags.press('Enter');
  const authors = page.getByRole('combobox', { name: 'Authors' });
  await authors.fill('first-time-author');
  await authors.press('Enter');

  await expect(page.getByText('brand-new-tag (new)')).toBeVisible();
  await expect(page.locator('pre').first()).toContainText("authorship:\n    - 'first-time-author'");
  const box = page.locator('[data-new-entries]');
  await expect(box).toContainText('- brand-new-tag');
  await expect(box).toContainText('first-time-author:\n  name: Your Name');
  await expect(box.getByRole('link', { name: /training-material/ })).toHaveAttribute(
    'href',
    'https://github.com/galaxyproject/training-material/edit/main/CONTRIBUTORS.yaml'
  );
  await expect(page.getByRole('link', { name: 'Open on GitHub' })).toBeVisible();
});
