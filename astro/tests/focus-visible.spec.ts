import { test, expect, type Locator, type Page } from '@playwright/test';

// Keyboard focus (DESIGN.md "Focus"): every control shows a solid 2px outline in the focus role,
// gold (focus-on-chrome) on dark chrome and dark page sections, and the outline keeps 3:1 against
// the colour it is drawn on (WCAG 2.1 SC 1.4.11), every stop of a gradient background included.
// Values come from computed styles, so fonts do not matter.

type Case = {
  name: string;
  path: string;
  role: '--gx-focus' | '--gx-focus-on-chrome';
  locate: (page: Page) => Locator;
  prepare?: (page: Page) => Promise<void>;
};

const cases: Case[] = [
  {
    name: 'content link',
    path: '/get-started/',
    role: '--gx-focus',
    locate: (page) => page.locator('main .prose p a[href]').first(),
  },
  {
    name: 'button',
    path: '/news/',
    role: '--gx-focus',
    locate: (page) => page.getByRole('button', { name: 'Load more' }),
  },
  {
    name: 'ui button',
    path: '/news/',
    role: '--gx-focus',
    // "Clear filters" (ui/button, outline variant) only shows while a filter is active
    prepare: async (page) => {
      await expect(page.locator('astro-island:has(.news-list)')).not.toHaveAttribute('ssr', { timeout: 60_000 });
      await page.locator('main').getByRole('searchbox').first().fill('galaxy');
    },
    locate: (page) => page.getByRole('button', { name: 'Clear filters' }),
  },
  {
    name: 'text input',
    path: '/news/',
    role: '--gx-focus',
    locate: (page) => page.locator('main').getByRole('searchbox').first(),
  },
  {
    name: 'toggle chip',
    path: '/news/',
    role: '--gx-focus',
    locate: (page) => page.locator('main [role="group"] button[aria-pressed="false"]').first(),
  },
  {
    name: 'sidebar link',
    path: '/news/',
    role: '--gx-focus-on-chrome',
    locate: (page) => page.locator('.site-sidebar nav a[href]').first(),
  },
  {
    name: 'sidebar search',
    path: '/news/',
    role: '--gx-focus-on-chrome',
    locate: (page) => page.locator('.site-sidebar input').first(),
  },
  {
    name: 'home hero button',
    path: '/',
    role: '--gx-focus-on-chrome',
    locate: (page) => page.locator('.hero-actions a').first(),
  },
  {
    name: 'welcome hero link',
    path: '/usegalaxy/welcome/',
    role: '--gx-focus-on-chrome',
    locate: (page) => page.locator('.welcome-hero a[href]').first(),
  },
  {
    name: 'hall of fame header link',
    path: '/hall-of-fame/',
    role: '--gx-focus-on-chrome',
    // Any entry: the header is the same template on every profile page
    prepare: async (page) => {
      const entry = page.locator('main a[href^="/hall-of-fame/"]:not([href="/hall-of-fame/"])').first();
      await page.goto((await entry.getAttribute('href'))!);
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
    },
    locate: (page) => page.locator('header.page-header a[href]').first(),
  },
];

test.use({ viewport: { width: 1440, height: 900 } });

for (const c of cases) {
  test(`${c.name} shows the ${c.role.slice(5)} outline with 3:1 contrast`, async ({ page }) => {
    await page.goto(c.path);
    // transition-colors also eases outline-color; read the end state, not a frame of the fade
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
    await c.prepare?.(page);
    const control = c.locate(page);
    await control.scrollIntoViewIfNeeded();
    // A key press first, so programmatic focus counts as keyboard focus
    await page.keyboard.press('Shift');
    await control.focus();

    const result = await control.evaluate((el, role) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      const rgba = (colour: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        return [r, g, b, a / 255];
      };
      const probe = document.createElement('span');
      probe.style.color = `var(${role})`;
      document.body.append(probe);
      const expected = rgba(getComputedStyle(probe).color);
      probe.remove();

      const style = getComputedStyle(el);
      const outline = rgba(style.outlineColor);
      // The outline sits outside the box (positive offset) or inside it (negative offset);
      // stack the backgrounds from there up until one is opaque. An opaque gradient ends the
      // stack too, once per colour stop, and the worst stop counts.
      const layers: number[][] = [];
      let bottoms: number[][] = [[255, 255, 255, 1]];
      let node: Element | null = parseFloat(style.outlineOffset) < 0 ? el : el.parentElement;
      while (node) {
        const cs = getComputedStyle(node);
        const stops = /gradient/.test(cs.backgroundImage)
          ? (cs.backgroundImage.match(/(rgba?|oklch|oklab)\([^()]*\)|#[0-9a-f]{3,8}\b/gi) ?? []).map(rgba)
          : [];
        if (stops.length && stops.every((c) => c[3] === 1)) {
          bottoms = stops;
          break;
        }
        const bg = rgba(cs.backgroundColor);
        if (bg[3] > 0) layers.push(bg);
        if (bg[3] === 1) {
          bottoms = [layers.pop()!];
          break;
        }
        node = node.parentElement;
      }
      const composite = (bottom: number[], top: number[][]) => {
        let base = bottom.slice(0, 3);
        for (const [r, g, b, a] of [...top].reverse()) base = [r, g, b].map((v, i) => v * a + base[i] * (1 - a));
        return base;
      };
      const lum = (rgb: number[]) => {
        const [r, g, b] = rgb.map((v) => {
          const s = v / 255;
          return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const ratio = (x: number[], y: number[]) => {
        const [hi, lo] = [lum(x), lum(y)].sort((a, b) => b - a);
        return (hi + 0.05) / (lo + 0.05);
      };
      return {
        focusVisible: el.matches(':focus-visible'),
        style: style.outlineStyle,
        width: style.outlineWidth,
        outline,
        expected,
        contrast: Math.min(...bottoms.map((bottom) => ratio(outline, composite(bottom, layers)))),
      };
    }, c.role);

    expect(result.focusVisible).toBe(true);
    expect(result.style).toBe('solid');
    expect(result.width).toBe('2px');
    expect(result.outline).toEqual(result.expected);
    expect(result.contrast).toBeGreaterThanOrEqual(3);
  });
}
