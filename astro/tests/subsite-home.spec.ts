import { test, expect } from '@playwright/test';

test.describe('Subsite home inserts', () => {
  for (const site of ['eu', 'freiburg', 'genouest']) {
    test(`/${site}/ renders the shared Galaxy intro`, async ({ page }) => {
      await page.goto(`/${site}/`);

      await expect(page.locator('.subsite-inserts #galaxy-europe-intro')).toBeVisible();
      await expect(page.locator('.subsite-inserts euintro')).toHaveCount(0);
    });
  }

  test('/freiburg/ renders the training insert', async ({ page }) => {
    await page.goto('/freiburg/');

    await expect(page.locator('.subsite-inserts a[href="https://training.galaxyproject.org"]')).toBeVisible();
  });

  test.describe('site footer card', () => {
    const cardSelector = 'main section.rounded-lg.bg-white.p-6.shadow-sm';

    // Chips (label, href) per region, in display order.
    const regionChips: Record<string, { label: string; href: string }[]> = {
      freiburg: [
        { label: 'contact@usegalaxy.eu', href: 'mailto:contact@usegalaxy.eu' },
        { label: 'GitHub', href: 'https://github.com/usegalaxy-eu' },
        { label: 'Matrix', href: 'https://matrix.to/#/#usegalaxy.eu:matrix.org' },
        { label: 'Mastodon', href: 'https://xn--baw-joa.social/@galaxyfreiburg' },
        { label: 'Feed', href: '/eu/feed.atom' },
      ],
      eu: [
        { label: 'contact@usegalaxy.eu', href: 'mailto:contact@usegalaxy.eu' },
        { label: 'GitHub', href: 'https://github.com/usegalaxy-eu' },
        { label: 'Matrix', href: 'https://matrix.to/#/#usegalaxy.eu:matrix.org' },
        { label: 'Mastodon', href: 'https://xn--baw-joa.social/@galaxyfreiburg' },
        { label: 'Feed', href: '/eu/feed.atom' },
      ],
      cz: [
        { label: 'galaxy@cesnet.cz', href: 'mailto:galaxy@cesnet.cz' },
        { label: 'Help Forum', href: 'https://help.galaxyproject.org/' },
        { label: 'GitHub', href: 'https://github.com/cesnet' },
      ],
      'elixir-it': [
        { label: 'UseGalaxy-it', href: 'https://github.com/usegalaxy-it/' },
        { label: 'Laniakea', href: 'https://github.com/Laniakea-elixir-it' },
        { label: 'UseGalaxy.eu feed', href: '/eu/feed.atom' },
      ],
      pasteur: [{ label: 'UseGalaxy.eu feed', href: '/eu/feed.atom' }],
    };

    const cardStyle = (page: import('@playwright/test').Page, site: string) =>
      page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' }).then(() =>
        page
          .locator(cardSelector)
          .last()
          .evaluate((el) => {
            const s = getComputedStyle(el);
            return {
              background: s.backgroundColor,
              radius: s.borderTopLeftRadius,
              padding: s.paddingTop,
              border: `${s.borderTopWidth} ${s.borderTopColor}`,
              shadow: s.boxShadow,
              align: s.textAlign,
            };
          })
      );

    const readChipStyles = (chips: import('@playwright/test').Locator) =>
      chips.evaluateAll((els) =>
        els.map((el) => {
          const s = getComputedStyle(el);
          return {
            color: s.color,
            decoration: s.textDecorationLine,
            border: `${s.borderTopWidth} ${s.borderTopColor}`,
            radius: s.borderTopLeftRadius,
            padding: `${s.paddingTop} ${s.paddingLeft}`,
            fontSize: s.fontSize,
          };
        })
      );

    for (const site of Object.keys(regionChips)) {
      test(`/${site}/ footer card matches /freiburg/ and lists its chips`, async ({ page }) => {
        const reference = await cardStyle(page, 'freiburg');
        expect(reference.background).toBe('rgb(255, 255, 255)');
        expect(reference.shadow).not.toBe('none');

        const style = await cardStyle(page, site);
        expect(style).toEqual(reference);

        const card = page.locator(cardSelector).last();
        const chips = card.locator('ul > li > a');
        await expect(chips).toHaveText(regionChips[site].map((chip) => chip.label));
        for (const [index, chip] of regionChips[site].entries()) {
          await expect(chips.nth(index)).toHaveAttribute('href', chip.href);
          await expect(chips.nth(index).locator('svg')).toHaveCount(1);
        }

        const quickLinks = await page.getByRole('heading', { name: 'Quick Links' }).boundingBox();
        const cardBox = await card.boundingBox();
        expect(quickLinks).not.toBeNull();
        expect(cardBox).not.toBeNull();
        expect(cardBox!.y).toBeGreaterThan(quickLinks!.y);
      });

      test(`/${site}/ footer chips look the same as on /freiburg/`, async ({ page }) => {
        await page.goto('/freiburg/', { waitUntil: 'domcontentloaded' });
        const reference = (await readChipStyles(page.locator(cardSelector).last().locator('ul > li > a')))[0];
        expect(reference.decoration).toBe('none');
        expect(reference.color).toBe('rgb(37, 83, 123)');
        // bootstrap-compat's `.border` is !important and paints #dee2e6 over any border colour, so the chip uses border-1.
        expect(reference.border).toMatch(/^1px .*\/ 0\.6\)$/);

        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        for (const style of await readChipStyles(page.locator(cardSelector).last().locator('ul > li > a'))) {
          expect(style).toEqual(reference);
        }
      });

      test(`/${site}/ footer chips stay whole and inside the card at phone width`, async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        const card = page.locator(cardSelector).last();
        const cardBox = (await card.boundingBox())!;

        const chips = card.locator('ul > li > a');
        const boxes = await chips.evaluateAll((els) =>
          els.map((el) => {
            const rect = el.getBoundingClientRect();
            const icon = el.querySelector('svg')!.getBoundingClientRect();
            return {
              left: rect.left,
              right: rect.right,
              height: rect.height,
              iconMiddle: icon.top + icon.height / 2,
              top: rect.top,
              bottom: rect.bottom,
            };
          })
        );

        expect(boxes).toHaveLength(regionChips[site].length);
        for (const box of boxes) {
          expect(box.left).toBeGreaterThanOrEqual(cardBox.x);
          expect(box.right).toBeLessThanOrEqual(cardBox.x + cardBox.width);
          // One text line plus padding: a wrapped label would be about twice as tall.
          expect(box.height).toBeLessThan(40);
          expect(box.iconMiddle).toBeGreaterThan(box.top);
          expect(box.iconMiddle).toBeLessThan(box.bottom);
        }
      });
    }

    test('/elixir-it/ footer text links match the Freiburg text link, including hover', async ({ page }) => {
      const linkStyle = (el: Element) => {
        const s = getComputedStyle(el);
        return {
          color: s.color,
          decoration: s.textDecorationLine,
          lineColor: s.textDecorationColor,
          thickness: s.textDecorationThickness,
        };
      };

      await page.goto('/freiburg/', { waitUntil: 'domcontentloaded' });
      const reference = page.getByRole('link', { name: 'Freiburg Galaxy Team' });
      const referenceRest = await reference.evaluate(linkStyle);
      await reference.hover();
      await expect.poll(() => reference.evaluate(linkStyle)).toMatchObject({ color: 'rgb(31, 68, 101)' });
      const referenceHover = await reference.evaluate(linkStyle);

      await page.goto('/elixir-it/', { waitUntil: 'domcontentloaded' });
      const link = page.locator(cardSelector).last().getByRole('link', { name: 'EuroScienceGateway' });
      expect(await link.evaluate(linkStyle)).toEqual(referenceRest);
      expect(referenceRest.color).toBe('rgb(37, 83, 123)');
      expect(referenceRest.decoration).toBe('underline');

      await link.hover();
      await expect.poll(() => link.evaluate(linkStyle)).toEqual(referenceHover);
      expect(referenceHover.thickness).toBe('2px');
    });

    test('/elixir-it/ footer card has the logos and both funding paragraphs above the chips', async ({ page }) => {
      await page.goto('/elixir-it/', { waitUntil: 'domcontentloaded' });
      const card = page.locator(cardSelector).last();

      await expect(card.locator('img[alt="ELIXIR Italy"]')).toHaveCount(1);
      await expect(card.locator('img[alt="CINECA"]')).toHaveCount(0);
      await expect(card.getByRole('link', { name: 'CINECA', exact: true })).toBeVisible();
      await expect(card.locator('p')).toHaveCount(2);

      const logoBox = (await card.locator('img[alt="ELIXIR Italy"]').boundingBox())!;
      const lastParagraphBox = (await card.locator('p').last().boundingBox())!;
      const chipBox = (await card.locator('ul > li > a').first().boundingBox())!;
      expect(logoBox.y).toBeLessThan(lastParagraphBox.y);
      expect(lastParagraphBox.y + lastParagraphBox.height).toBeLessThanOrEqual(chipBox.y);
      // bootstrap-compat's `.mt-5` is 3rem !important, so the chip row uses an arbitrary 1.25rem margin.
      expect(chipBox.y - (lastParagraphBox.y + lastParagraphBox.height)).toBeLessThan(32);
    });

    test('/pasteur/ footer card has no leading gap above the chips', async ({ page }) => {
      await page.goto('/pasteur/', { waitUntil: 'domcontentloaded' });
      const card = page.locator(cardSelector).last();
      const cardBox = (await card.boundingBox())!;
      const chipBox = (await card.locator('ul > li > a').first().boundingBox())!;
      // Card padding is 24px; any extra spacer would push the chips lower.
      expect(chipBox.y - cardBox.y).toBeLessThanOrEqual(26);
    });

    test('/freiburg/, /eu/ and /cz/ keep a single footer card', async ({ page }) => {
      for (const site of ['freiburg', 'eu', 'cz']) {
        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('main section.rounded-lg.bg-white.p-6.shadow-sm.mt-12')).toHaveCount(1);
      }
    });
  });

  test.describe('edit on GitHub link', () => {
    const cardSelector = 'main section.rounded-lg.bg-white.p-6.shadow-sm';
    const subsites = ['us', 'eu', 'freiburg', 'belgium', 'pasteur', 'elixir-it', 'ifb', 'cz'];
    const regionsWithCard = ['eu', 'freiburg', 'pasteur', 'elixir-it', 'cz'];

    for (const site of subsites) {
      test(`/${site}/ has one Edit on GitHub link to its content folder`, async ({ page }) => {
        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        const edit = page.getByRole('main').getByRole('link', { name: 'Edit on GitHub' });
        await expect(edit).toHaveCount(1);
        await expect(edit).toHaveAttribute(
          'href',
          `https://github.com/galaxyproject/galaxy-hub/tree/main/content/${site}`
        );
        await expect(edit).toHaveAttribute('target', '_blank');
        await expect(edit).toHaveAttribute('rel', 'noopener noreferrer');
        await expect(edit).toHaveClass(/text-chicago-500/);
        await expect(edit.locator('svg')).toHaveCount(1);
      });
    }

    for (const site of regionsWithCard) {
      test(`/${site}/ edit link sits below the contact card, outside it, on the right`, async ({ page }) => {
        await page.goto(`/${site}/`, { waitUntil: 'domcontentloaded' });
        const card = page.locator(cardSelector).last();
        await expect(card.getByRole('link', { name: /edit/i })).toHaveCount(0);

        const edit = page.getByRole('main').getByRole('link', { name: 'Edit on GitHub' });
        const cardBox = (await card.boundingBox())!;
        const editBox = (await edit.boundingBox())!;
        expect(editBox.y).toBeGreaterThanOrEqual(cardBox.y + cardBox.height);
        expect(editBox.y - (cardBox.y + cardBox.height)).toBeLessThan(40);
        expect(editBox.x + editBox.width).toBeGreaterThan(cardBox.x + cardBox.width - 8);
      });
    }
  });

  for (const width of [1024, 1440]) {
    test(`/freiburg/ training screenshot stays above Upcoming Events at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/freiburg/');

      const image = page.locator('.subsite-inserts img[src*="training-home"]');
      await expect(image).toBeVisible();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
        .toBe(true);

      const imageBox = await image.boundingBox();
      const headingBox = await page.getByRole('heading', { name: 'Upcoming Events' }).boundingBox();
      expect(imageBox).not.toBeNull();
      expect(headingBox).not.toBeNull();
      expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(headingBox!.y);
    });
  }
});
