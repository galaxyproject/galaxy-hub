import { test, expect } from '@playwright/test';

/**
 * /tools/ai-agents/ — "Galaxy for AI Coding Agents" landing page with the
 * animated harness shells (AgentShells component).
 */
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
    await expect(shells.getByRole('tab')).toHaveCount(5);

    const grid = page.locator('#pick-your-agent');
    await expect(grid).toBeVisible();
    for (const id of ['claude-code', 'codex', 'antigravity', 'pi', 'claude-desktop']) {
      await expect(grid.locator(`a[href="/tools/ai-agents/${id}/"]`)).toHaveCount(1);
    }

    // Prose sections below the component still render.
    await expect(page.getByRole('heading', { name: 'Before you start' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Get help' })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('tabs switch the window and the setup link', async ({ page }) => {
    await page.goto('/tools/ai-agents/');
    const shells = page.locator('[data-agent-shells]');
    const win = shells.locator('[data-window]');

    await expect(win).toHaveAttribute('data-kind', 'terminal');

    const agyTab = shells.getByRole('tab', { name: /Antigravity/ });
    await agyTab.click();
    await expect(agyTab).toHaveAttribute('aria-selected', 'true');
    await expect(win).toHaveAttribute('data-kind', 'terminal');
    await expect(shells.locator('[data-title]')).toContainText('agy');
    await expect(shells.locator('[data-setup]')).toHaveAttribute('href', '/tools/ai-agents/antigravity/');

    const desktopTab = shells.getByRole('tab', { name: /Claude Desktop/ });
    await desktopTab.click();
    await expect(win).toHaveAttribute('data-kind', 'desktop');
    await expect(shells.locator('[data-setup]')).toHaveAttribute('href', '/tools/ai-agents/claude-desktop/');

    // Arrow keys move between tabs.
    await desktopTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(shells.getByRole('tab', { name: /Claude Code/ })).toHaveAttribute('aria-selected', 'true');
    await expect(win).toHaveAttribute('data-kind', 'terminal');
  });

  test('controls: pause toggles and copy reports success', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tools/ai-agents/');
    const shells = page.locator('[data-agent-shells]');
    await shells.locator('[data-window]').scrollIntoViewIfNeeded();

    const play = shells.locator('[data-play]');
    await expect(play).toContainText('Pause');
    await play.click();
    await expect(play).toContainText('Play');
    await expect(play).toHaveAttribute('aria-pressed', 'true');
    await play.click();
    await expect(play).toContainText('Pause');

    const copy = shells.locator('[data-copy]');
    await copy.click();
    await expect(copy).toContainText('Copied');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('/plugin marketplace add galaxyproject/agentic-plugins');
  });

  test('reduced motion renders the final state statically', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/tools/ai-agents/');
    const shells = page.locator('[data-agent-shells]');
    await expect(shells).toHaveClass(/is-static/);
    const lines = shells.locator('[data-body] .ln');
    expect(await lines.count()).toBeGreaterThan(5);
    await expect(shells.locator('[data-body]')).toContainText('get_user');
  });

  test('fits a phone viewport without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto('/tools/ai-agents/');
    await expect(page.locator('[data-agent-shells]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
