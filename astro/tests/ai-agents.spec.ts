import { test, expect, type Page } from '@playwright/test';

/**
 * /tools/ai-agents/ — "Galaxy for AI Coding Agents": one page with the
 * animated harness shells (AgentShells) and the tabbed setup guides
 * (HarnessGuides), generated from the agentic-plugins docs.
 */

const HARNESSES = ['claude-code', 'codex', 'antigravity', 'pi', 'claude-desktop'];

/** Scroll the window into view and wait until the client player has started a replay. */
async function waitForReplay(page: Page) {
  const shells = page.locator('[data-agent-shells]');
  await shells.locator('[data-window]').scrollIntoViewIfNeeded();
  await expect(shells).toHaveAttribute('data-mounted', '1');
  // A typing caret only exists while the player is animating a line.
  await expect(shells.locator('[data-body] .is-typing, [data-body] .is-streaming').first()).toBeAttached({
    timeout: 15_000,
  });
  return shells;
}

const selectedHero = (page: Page) => page.locator('[data-agent-shells] [data-tab][aria-selected="true"]');
const guidesMounted = (page: Page) =>
  expect(page.locator('[data-harness-guides]')).toHaveAttribute('data-mounted', '1');
const panelTop = (page: Page, id: string) =>
  page.locator(`#guide-${id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top));
const selectedGuide = (page: Page) => page.locator('[data-harness-guides] [data-guide-tab][aria-selected="true"]');
const visiblePanels = (page: Page) => page.locator('[data-harness-guides] [data-guide-panel]:not([hidden])');

test.describe('AI agents landing page', () => {
  test('renders hero, harness tabs, the agent grid and the guide panels', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto('/tools/ai-agents/');
    expect(response?.status()).toBe(200);

    // The hero supplies the only h1; the layout PageHeader is suppressed.
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('AI coding agents');
    await expect(page.locator('.page-header')).toHaveCount(0);

    const shells = page.locator('[data-agent-shells]');
    await expect(shells).toBeVisible();
    await expect(shells.getByRole('tab')).toHaveCount(HARNESSES.length);
    await expect(shells.getByRole('tab', { name: /Cursor/ })).toHaveCount(0);

    // Heading outline: h1, then the pillars kicker h2 before the card h3s.
    const levels = await page.locator('main :is(h1, h2, h3)').evaluateAll((els) => els.map((e) => e.tagName));
    expect(levels.slice(0, 5)).toEqual(['H1', 'H2', 'H3', 'H3', 'H3']);

    // Cards and chips link to the guide panels on this page.
    const grid = page.locator('#pick-your-agent');
    await expect(grid).toBeVisible();
    for (const id of HARNESSES) {
      await expect(grid.locator(`a[href="#guide-${id}"]`)).toHaveCount(1);
    }

    // One guide tab and one panel per harness; only the first panel is shown.
    const guides = page.locator('[data-harness-guides]');
    await expect(guides.getByRole('tab')).toHaveCount(HARNESSES.length);
    await expect(guides.locator('[data-guide-panel]')).toHaveCount(HARNESSES.length);
    await expect(visiblePanels(page)).toHaveCount(1);
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'claude-code');

    // Shared sections around the guides, and the social image.
    await expect(page.getByRole('heading', { name: 'Get a Galaxy API key' })).toBeVisible();
    await expect(page.locator('#get-a-galaxy-api-key')).toBeAttached();
    await expect(page.locator('.prose')).toContainText('Manage API Key');
    await expect(page.getByRole('heading', { name: 'Set up your agent' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Get help' })).toBeVisible();
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /galaxy_logo/);

    expect(errors).toEqual([]);
  });

  test('guide tabs, hero tabs and the URL hash stay in sync', async ({ page }) => {
    await page.goto('/tools/ai-agents/');
    await guidesMounted(page);

    // Guide tab -> panel, hash and hero follow.
    const codexGuide = page.locator('[data-guide-tab="codex"]');
    await codexGuide.scrollIntoViewIfNeeded();
    await codexGuide.click();
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'codex');
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'codex');
    await expect(selectedHero(page)).toHaveAttribute('data-tab', 'codex');
    expect(new URL(page.url()).hash).toBe('#guide-codex');
    await expect(page.locator('#guide-codex')).toContainText('codex plugin marketplace add');

    // Hero tab -> guide follows without scrolling the page away from the hero.
    const heroPi = page.locator('[data-agent-shells] [data-tab="pi"]');
    await heroPi.scrollIntoViewIfNeeded();
    const before = await page.evaluate(() => window.scrollY);
    await heroPi.click();
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'pi');
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'pi');
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(5);

    // "Set up" link in the hero controls opens and scrolls to that panel.
    await page.locator('[data-agent-shells] [data-setup]').click();
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'pi');
    await expect.poll(() => panelTop(page, 'pi')).toBeGreaterThanOrEqual(0);
    await expect.poll(() => panelTop(page, 'pi')).toBeLessThan(200);

    // Keyboard on the guide tabs.
    await page.locator('[data-guide-tab="pi"]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'claude-desktop');
    await expect(selectedHero(page)).toHaveAttribute('data-tab', 'claude-desktop');
  });

  test('a deep link opens that guide in both places', async ({ page }) => {
    await page.goto('/tools/ai-agents/#guide-antigravity');
    await guidesMounted(page);
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'antigravity');
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'antigravity');
    await expect(selectedHero(page)).toHaveAttribute('data-tab', 'antigravity');
    await expect(page.locator('[data-agent-shells] [data-title]')).toContainText('agy');
    await expect.poll(() => panelTop(page, 'antigravity')).toBeGreaterThanOrEqual(0);
    await expect.poll(() => panelTop(page, 'antigravity')).toBeLessThan(200);
  });

  test('the replay animates, advances to the next harness, and can be paused', async ({ page }) => {
    test.slow();
    await page.goto('/tools/ai-agents/');
    const shells = await waitForReplay(page);
    const body = shells.locator('[data-body]');
    const progress = shells.locator('[data-progress]');

    // Progress bar moves and the transcript grows while playing.
    await expect.poll(async () => (await progress.boundingBox())?.width ?? 0).toBeGreaterThan(0);
    const before = await body.locator('.ln').count();
    await expect.poll(() => body.locator('.ln').count(), { timeout: 15_000 }).toBeGreaterThan(before);

    // Pause freezes the transcript and marks the root.
    const play = shells.locator('[data-play]');
    await expect(play).toContainText('Pause');
    await play.click();
    await expect(shells).toHaveClass(/is-paused/);
    await expect(play).toContainText('Play');
    const frozen = await body.textContent();
    await page.waitForTimeout(1500);
    expect(await body.textContent()).toBe(frozen);

    // Switching tabs while paused shows that harness's final state without playing.
    await shells.getByRole('tab', { name: /Codex/ }).click();
    await expect(shells).toHaveClass(/is-paused/);
    await expect(play).toContainText('Play');
    await expect(body).toContainText('codex mcp list');

    // Resume from the first tab and wait for the loop to advance on its own;
    // auto-advance must not change the guide the reader has open.
    await shells.getByRole('tab', { name: /Claude Code/ }).click();
    await play.click();
    await expect(play).toContainText('Pause');
    await expect(shells.getByRole('tab', { name: /Codex/ })).toHaveAttribute('aria-selected', 'true', {
      timeout: 60_000,
    });
    await expect(shells.locator('[data-window]')).toHaveAttribute('aria-labelledby', 'ash-tab-codex');
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'claude-code');
  });

  test('tabs switch the window and the setup link, including by keyboard', async ({ page }) => {
    await page.goto('/tools/ai-agents/');
    const shells = page.locator('[data-agent-shells]');
    const win = shells.locator('[data-window]');

    await expect(win).toHaveAttribute('data-kind', 'terminal');

    const agyTab = shells.getByRole('tab', { name: /Antigravity/ });
    await agyTab.click();
    await expect(agyTab).toHaveAttribute('aria-selected', 'true');
    await expect(win).toHaveAttribute('data-kind', 'terminal');
    await expect(win).toHaveAttribute('aria-labelledby', 'ash-tab-antigravity');
    await expect(shells.locator('[data-title]')).toContainText('agy');
    await expect(shells.locator('[data-setup]')).toHaveAttribute('href', '#guide-antigravity');

    const desktopTab = shells.getByRole('tab', { name: /Claude Desktop/ });
    await desktopTab.click();
    await expect(win).toHaveAttribute('data-kind', 'desktop');
    await expect(shells.locator('[data-setup]')).toHaveAttribute('href', '#guide-claude-desktop');
    await expect(shells.locator('[data-copy]')).toContainText('Copy install steps');

    // Arrow keys move between tabs.
    await desktopTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(shells.getByRole('tab', { name: /Claude Code/ })).toHaveAttribute('aria-selected', 'true');
    await expect(win).toHaveAttribute('data-kind', 'terminal');
    await expect(shells.locator('[data-copy]')).toContainText('Copy install commands');
  });

  test('copy reports success, and reports failure when the clipboard is unavailable', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/ai-agents/');
    const shells = page.locator('[data-agent-shells]');
    await shells.locator('[data-window]').scrollIntoViewIfNeeded();

    const copy = shells.locator('[data-copy]');
    await copy.click();
    await expect(copy).toContainText('Copied');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('/plugin marketplace add galaxyproject/agentic-plugins');

    // Break both the async API and the execCommand fallback.
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: () => Promise.reject(new Error('blocked')) },
      });
      document.execCommand = () => false;
    });
    await expect(copy).toContainText('Copy install commands', { timeout: 5_000 });
    await copy.click();
    await expect(copy).toContainText('Copy failed');
    await expect(copy).not.toHaveClass(/is-copied/);
  });

  test('reduced motion renders the final state statically and never animates', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/tools/ai-agents/');
    const shells = page.locator('[data-agent-shells]');
    await expect(shells).toHaveClass(/is-static/);
    await shells.locator('[data-window]').scrollIntoViewIfNeeded();
    const body = shells.locator('[data-body]');
    expect(await body.locator('.ln').count()).toBeGreaterThan(5);
    await expect(body).toContainText('get_user');
    const snapshot = await body.textContent();
    await page.waitForTimeout(2500);
    expect(await body.textContent()).toBe(snapshot);
    await expect(body.locator('.is-typing')).toHaveCount(0);
  });

  test('fits a phone viewport without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto('/tools/ai-agents/');
    await expect(page.locator('[data-agent-shells]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('guide panels keep their intro, link upstream, and have copyable blocks', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/ai-agents/#guide-claude-code');
    const panel = page.locator('#guide-claude-code');
    await expect(panel).toContainText('This page sets up');
    await expect(panel).toContainText('galaxy-dev-skills');
    await expect(panel.locator('.hguide__source a')).toHaveAttribute(
      'href',
      /agentic-plugins\/blob\/main\/docs\/claude-code\.md/
    );
    // The injected TOC heading must not exist anywhere on the page.
    await expect(page.locator('#table-of-contents')).toHaveCount(0);

    // Verify prompt and install block are fenced, with working Copy buttons.
    const blocks = panel.locator('.code-block');
    expect(await blocks.count()).toBeGreaterThan(3);
    await expect(panel.locator('pre', { hasText: 'Connect to Galaxy and tell me who I am.' })).toHaveCount(1);
    const first = blocks.first();
    await expect(first.locator('pre')).toContainText('/plugin marketplace add galaxyproject/agentic-plugins');
    const btn = first.locator('.code-copy');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('aria-label', 'Copy code to clipboard');
    await btn.click();
    await expect(btn).toContainText('Copied');
    await expect(btn).toHaveAttribute('aria-label', 'Copied code to clipboard');
    await expect(page.locator('.code-copy-status')).toContainText('Copied to clipboard');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard.split('\n')[0]).toBe('/plugin marketplace add galaxyproject/agentic-plugins');
    expect(clipboard.endsWith('\n')).toBe(false);
  });

  test('event pages with code blocks get the copy button too', async ({ page }) => {
    await page.goto('/events/2023-admin-training/');
    const pre = page.locator('.prose pre');
    if ((await pre.count()) === 0) test.skip(true, 'page has no code blocks');
    await expect(page.locator('.prose .code-block .code-copy').first()).toBeVisible();
  });
});
