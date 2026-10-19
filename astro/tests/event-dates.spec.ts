import { test, expect, type Locator } from '@playwright/test';

// GBCC 2025: Jun 23 - 26, 2025 (4 days); EGD 2025: Oct 1, 2025 (one day). Both tagged conference.
const multiDay = '2025-06-23-gbcc2025/';
const singleDay = '2025-10-01-egd2025/';

async function expectMultiDay(row: Locator) {
  const date = row.locator('.gx-event-date');
  await expect(date.locator('.gx-event-date__range')).toHaveText('Jun 23 - 26, 2025');
  await expect(date.locator('.gx-event-date__dur')).toHaveText('4 days');
  const times = date.locator('time');
  await expect(times).toHaveCount(2);
  await expect(times.nth(0)).toHaveAttribute('datetime', '2025-06-23');
  await expect(times.nth(1)).toHaveAttribute('datetime', '2025-06-26');
  await expect(date.locator('.gx-event-date__icon')).toHaveAttribute('aria-hidden', 'true');
}

async function expectSingleDay(row: Locator) {
  const date = row.locator('.gx-event-date');
  await expect(date.locator('.gx-event-date__range')).toHaveText('Oct 1, 2025');
  await expect(date.locator('.gx-event-date__dur')).toHaveCount(0);
  await expect(date.locator('time')).toHaveCount(1);
  await expect(date.locator('time')).toHaveAttribute('datetime', '2025-10-01');
}

test.describe('Event date line', () => {
  test('tag pages show the range, duration pill and machine-readable dates', async ({ page }) => {
    await page.goto('/tags/conference/');

    await expectMultiDay(page.locator(`a[href="/events/${multiDay}"]`));
    await expectSingleDay(page.locator(`a[href="/events/${singleDay}"]`));
  });

  test('tag pages mute past events', async ({ page }) => {
    await page.goto('/tags/conference/');

    await expect(page.locator(`a[href="/events/${multiDay}"] .gx-event-date`)).toHaveClass(/gx-event-date--past/);
  });

  test('the Vue date line separates the range from the duration pill with a space', async ({ page }) => {
    await page.goto('/events/');

    const date = page.locator('.gx-event-date:has(.gx-event-date__dur)').first();
    await expect(date).toBeVisible();
    expect(await date.textContent()).toMatch(/\d{4} \d+ days/);
  });

  test('the events list shows the same date line for past events', async ({ page }) => {
    await page.goto('/events/?year=2025');

    await expectMultiDay(page.locator(`article:has(a[href$="/events/${multiDay}"])`));
    await expectSingleDay(page.locator(`article:has(a[href$="/events/${singleDay}"])`));
  });

  test.describe('at 320px', () => {
    test.use({ viewport: { width: 320, height: 800 } });

    const pastLists = [
      '/events/webinars/',
      '/events/cofests/',
      '/events/cofests/papercuts/',
      '/community/community-calls/',
      '/community/devroundtable/',
    ];

    for (const path of pastLists) {
      test(`${path} past rows keep titles inside the card and clear of the date`, async ({ page }) => {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);

        const rows = page.locator('a:has(.gx-event-date)');
        expect(await rows.count()).toBeGreaterThan(0);
        const problems = await rows.evaluateAll((els) => {
          const meets = (a: DOMRect, b: DOMRect) =>
            a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5;
          return els.flatMap((row) => {
            const href = row.getAttribute('href');
            const title = row.lastElementChild!.getBoundingClientRect();
            const found: string[] = [];
            if (title.right > row.getBoundingClientRect().right + 0.5) found.push(`${href} title overflows row`);
            for (const part of row.querySelectorAll('.gx-event-date time, .gx-event-date__dur, .gx-event-date__icon')) {
              if (meets(part.getBoundingClientRect(), title)) found.push(`${href} ${part.className || part.tagName} overlaps title`);
            }
            return found;
          });
        });
        expect(problems).toEqual([]);
      });
    }

    for (const path of ['/events/', '/events/cofests/']) {
      test(`${path} keeps the calendar icon beside the date range`, async ({ page }) => {
        await page.goto(path);

        await expect(page.locator('.gx-event-date').first()).toBeVisible();
        const stacked = await page.locator('.gx-event-date').evaluateAll((els) =>
          els
            .filter((date) => {
              const icon = date.querySelector('.gx-event-date__icon')!.getBoundingClientRect();
              const range = date.querySelector('.gx-event-date__range')!.getBoundingClientRect();
              return range.top >= icon.bottom;
            })
            .map((date) => date.textContent?.trim()),
        );
        expect(stacked).toEqual([]);
      });
    }

    test('/projects/esg/ Events card lists each title before its date line', async ({ page }) => {
      await page.goto('/projects/esg/');

      const items = page.locator('li:has(.gx-event-date)');
      expect(await items.count()).toBeGreaterThan(0);
      const misordered = await items.evaluateAll((els) =>
        els
          .filter((li) => {
            const title = li.querySelector('a')!;
            const date = li.querySelector('.gx-event-date')!;
            const follows = title.compareDocumentPosition(date) & Node.DOCUMENT_POSITION_FOLLOWING;
            return !follows || date.getBoundingClientRect().top < title.getBoundingClientRect().top;
          })
          .map((li) => li.textContent?.trim()),
      );
      expect(misordered).toEqual([]);
    });
  });
});
