import { test, expect, type Locator, type Page } from '@playwright/test';

// bootstrap-compat.css keeps Bootstrap's `.border` grey (#dee2e6, !important) for legacy content
// (.bs-compat) only. Everywhere else Tailwind's `border` utility keeps the colour class next to it.

test.use({ viewport: { width: 1440, height: 900 } });

const legacyGrey = 'rgb(222, 226, 230)';

// Border colour of `el` versus a probe in the same parent with the same classes minus `border`:
// the probe shows the colour Tailwind's colour class gives, untouched by any `.border` rule.
async function borderColours(el: Locator) {
  return el.evaluate((node) => {
    const probe = document.createElement('div');
    probe.className = Array.from(node.classList)
      .filter((c) => c !== 'border')
      .join(' ');
    probe.style.cssText = 'display:block;border-style:solid;border-width:1px;position:absolute;visibility:hidden';
    node.parentElement!.append(probe);
    const result = { own: getComputedStyle(node).borderTopColor, tailwind: getComputedStyle(probe).borderTopColor };
    probe.remove();
    return result;
  });
}

async function expectTailwindColour(el: Locator) {
  await expect(el).toBeVisible();
  const { own, tailwind } = await borderColours(el);
  expect(tailwind).not.toBe(legacyGrey);
  expect(own).toBe(tailwind);
}

async function injectLegacy(page: Page) {
  await page.evaluate(() => {
    const host = document.createElement('div');
    host.innerHTML =
      '<div class="bs-compat card border" data-probe="marked"></div>' +
      '<div class="bs-compat card"><span class="border border-chicago-400" data-probe="inside"></span></div>';
    document.body.append(host);
  });
}

test.describe('Bootstrap .border scoping', () => {
  test('the view toggle keeps its chicago-400 border', async ({ page }) => {
    await page.goto('/news/');
    await expectTailwindColour(page.locator('.news-list [data-view-toggle]'));
  });

  test('news tiles keep their ebony-clay-100 border', async ({ page }) => {
    await page.goto('/news/?view=tiles');
    await expectTailwindColour(page.locator('.news-list [data-view="tiles"] article').first());
  });

  test('legacy content keeps the Bootstrap grey border', async ({ page }) => {
    await page.goto('/news/2019-11-galaxy-update/');
    await injectLegacy(page);
    for (const probe of ['marked', 'inside']) {
      const colour = await page
        .locator(`[data-probe="${probe}"]`)
        .evaluate((node) => getComputedStyle(node).borderTopColor);
      expect(colour, probe).toBe(legacyGrey);
    }
  });
});
