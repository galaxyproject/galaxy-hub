import { test, expect, type Page } from '@playwright/test';

/**
 * /tools/ai-agents/ — "Galaxy for AI Coding Agents" landing page with the
 * animated harness shells (AgentShells component), plus the generated guides.
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

test.describe('AI agents landing page', () => {
  test('renders hero, harness tabs and the agent grid', async ({ page }) => {
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

    const grid = page.locator('#pick-your-agent');
    await expect(grid).toBeVisible();
    for (const id of HARNESSES) {
      await expect(grid.locator(`a[href="/tools/ai-agents/${id}/"]`)).toHaveCount(1);
    }

    // Prose sections below the component still render, and the social image is set.
    await expect(page.getByRole('heading', { name: 'Before you start' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Get help' })).toBeVisible();
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /galaxy_logo/);

    expect(errors).toEqual([]);
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

    // Resume from the first tab and wait for the loop to advance on its own.
    await shells.getByRole('tab', { name: /Claude Code/ }).click();
    await play.click();
    await expect(play).toContainText('Pause');
    await expect(shells.getByRole('tab', { name: /Codex/ })).toHaveAttribute('aria-selected', 'true', {
      timeout: 60_000,
    });
    await expect(shells.locator('[data-window]')).toHaveAttribute('aria-labelledby', 'ash-tab-codex');
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
    await expect(shells.locator('[data-setup]')).toHaveAttribute('href', '/tools/ai-agents/antigravity/');

    const desktopTab = shells.getByRole('tab', { name: /Claude Desktop/ });
    await desktopTab.click();
    await expect(win).toHaveAttribute('data-kind', 'desktop');
    await expect(shells.locator('[data-setup]')).toHaveAttribute('href', '/tools/ai-agents/claude-desktop/');
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

  test('generated guides keep their intro and point edits upstream', async ({ page }) => {
    await page.goto('/tools/ai-agents/api-key/');
    await expect(page.locator('.prose')).toContainText('Manage API Key');
    await expect(page.locator('#table-of-contents')).toHaveCount(0);
    await expect(page.locator('a', { hasText: 'Edit the source on GitHub' })).toHaveAttribute(
      'href',
      /agentic-plugins\/blob\/main\/docs\/galaxy-api-key\.md/
    );

    await page.goto('/tools/ai-agents/claude-code/');
    await expect(page.locator('.prose')).toContainText('This page sets up');
    await expect(page.locator('.prose')).toContainText('galaxy-dev-skills');
  });

  test('guide code blocks get a copy button that copies the install commands', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/ai-agents/claude-code/');
    const blocks = page.locator('.prose .code-block');
    expect(await blocks.count()).toBeGreaterThan(3);
    await expect(page.locator('.prose pre')).toHaveCount(await blocks.count());

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
    expect(clipboard).toContain('/plugin install galaxy-mcp@galaxyproject');
    expect(clipboard.endsWith('\n')).toBe(false);
  });

  test('event pages with code blocks get the copy button too', async ({ page }) => {
    await page.goto('/events/2023-admin-training/');
    const pre = page.locator('.prose pre');
    if ((await pre.count()) === 0) test.skip(true, 'page has no code blocks');
    await expect(page.locator('.prose .code-block .code-copy').first()).toBeVisible();
  });
});
