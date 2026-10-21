import { test, expect } from '@playwright/test';

test.describe('ESG project page', () => {
  test('/projects/esg/ renders the dataset-driven sections', async ({ page }) => {
    const response = await page.goto('/projects/esg/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);

    await expect(page.locator('h2#objectives')).toHaveText('Objectives');
    await expect(page.locator('#objectives + div h3')).toHaveCount(4);

    await expect(page.locator('h2#projects')).toHaveText('Projects Part of ESG');
    await expect(page.locator('#projects + div a[href="https://pulsar-network.readthedocs.io/"]')).toBeVisible();

    await expect(page.locator('h2#results')).toHaveText('Expected Results');
    await expect(page.locator('#results + div h3')).toHaveCount(4);

    await expect(page.locator('h2#partners')).toHaveText('Project Partners');
    await expect(page.locator('#partners + div a[href="https://vib.be/"]')).toBeVisible();
  });

  test('/projects/esg/ loads the project link and partner logos', async ({ page }) => {
    await page.goto('/projects/esg/');

    for (const [selector, count] of [
      ['#projects + div img', 3],
      ['#partners + div img', 19],
    ] as const) {
      const images = page.locator(selector);
      await expect(images).toHaveCount(count);
      await images.last().scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          images.evaluateAll((imgs: HTMLImageElement[]) => imgs.every((i) => i.complete && i.naturalWidth > 0))
        )
        .toBe(true);
    }
  });

  test('/projects/esg/events/ lists only past events', async ({ page }) => {
    const response = await page.goto('/projects/esg/events/');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: /upcoming/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Past Events' })).toBeVisible();
    // eu-only events are not ESG events
    await expect(page.locator('a[href="/events/2026-05-29-dariah/"]')).toHaveCount(0);
    // no cap: the oldest event is listed
    await expect(page.locator('a[href="/events/2022-08-16-eurosciencegateway-kickoff-meeting/"]')).toHaveCount(1);
  });

  test('/projects/esg/ events box lists past events newest first', async ({ page }) => {
    await page.goto('/projects/esg/');

    const box = page.locator('h2:has(a[href="/projects/esg/events/"])').locator('xpath=..');
    const items = box.locator('li');
    await expect(items.first()).toBeVisible();

    // date text is "Mon D, YYYY", "Mon D - D, YYYY" or "Mon D, YYYY - Mon D, YYYY": the start date is parsed
    const texts = await items.locator('.gx-event-date__range').allTextContents();
    const starts = texts.map((t) => {
      const m = t.trim().match(/^([A-Z][a-z]{2}) (\d{1,2}).*?(\d{4})/);
      return m ? Date.parse(`${m[1]} ${m[2]}, ${m[3]} UTC`) : NaN;
    });
    expect(starts.length).toBeGreaterThan(0);
    for (const start of starts) {
      expect(start).not.toBeNaN();
      expect(start).toBeLessThan(Date.now());
    }
    expect([...starts].sort((x, y) => y - x)).toEqual(starts);
  });
});
