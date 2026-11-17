import { test, expect, type Page } from '@playwright/test';

/**
 * /agents/ -- unified, zero-distraction setup page: compact header, 5 harness
 * tabs immediately above the fold (Claude Code, Codex CLI, Antigravity,
 * Claude Desktop, Pi / Cursor / Other), each rendering a self-contained
 * Step A -> Step B -> Step C checklist, followed by the plugin summary and
 * modest footer cards (/agents/stack/, /tools/user-defined-tools/, /agents/orbit/).
 */

const HARNESSES = ['claude-code', 'codex', 'antigravity', 'claude-desktop', 'other'];

const guidesMounted = (page: Page) =>
  expect(page.locator('[data-harness-guides]')).toHaveAttribute('data-mounted', '1');
const selectedGuide = (page: Page) => page.locator('[data-harness-guides] [data-guide-tab][aria-selected="true"]');
const visiblePanels = (page: Page) => page.locator('[data-harness-guides] [data-guide-panel]:not([hidden])');

test.describe('Agents setup page (/agents/)', () => {
  test('renders compact header, 5 harness tabs above the fold, self-contained A/B/C steps, and footer links', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto('/agents/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('AI agent');
    await expect(page.locator('.page-header')).toHaveCount(0);
    await expect(page.locator('[data-agent-shells]')).toHaveCount(0);
    await expect(page.locator('#table-of-contents')).toHaveCount(0);

    const guides = page.locator('[data-harness-guides]');
    await expect(guides).toBeVisible();
    await expect(guides.getByRole('tab')).toHaveCount(HARNESSES.length);
    await expect(guides.locator('[data-guide-panel]')).toHaveCount(HARNESSES.length);
    await expect(visiblePanels(page)).toHaveCount(1);
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'claude-code');

    // Active panel has self-contained Step A (including UDT signup), Step B, Step C.
    const claudePanel = page.locator('#guide-claude-code');
    await expect(claudePanel).toContainText('Step A');
    await expect(claudePanel).toContainText('Step B');
    await expect(claudePanel).toContainText('Step C');
    await expect(claudePanel.locator('a[href="https://udt-signup.galaxyproject.org/"]')).toBeVisible();

    // Footer links to stack, UDT docs, and Orbit.
    for (const href of ['/agents/stack/', '/tools/user-defined-tools/', '/agents/orbit/']) {
      await expect(page.locator(`a[href="${href}"]`).first(), href).toBeVisible();
    }
    await expect(page.getByRole('heading', { name: 'Get help' })).toBeVisible();
    await expect(
      page.locator('a[href="https://github.com/galaxyproject/galaxy/discussions/categories/agents-udts"]')
    ).toBeVisible();
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /galaxy_logo/);

    expect(errors).toEqual([]);
  });

  test('tabs switch panels, update URL hash, and support keyboard navigation', async ({ page }) => {
    await page.goto('/agents/');
    await guidesMounted(page);

    const codexTab = page.locator('[data-guide-tab="codex"]');
    await codexTab.click();
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'codex');
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'codex');
    expect(new URL(page.url()).hash).toBe('#guide-codex');
    await expect(page.locator('#guide-codex')).toContainText('codex plugin marketplace add');

    await codexTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'antigravity');
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'antigravity');
    await expect(page.locator('#guide-antigravity')).toContainText('agy plugin install');
  });

  test('deep links open exact panel and alias #guide-pi / #guide-cursor to the Other panel', async ({ page }) => {
    await page.goto('/agents/#guide-claude-desktop');
    await guidesMounted(page);
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'claude-desktop');
    await expect(page.locator('#guide-claude-desktop')).toContainText('galaxy-mcp.mcpb');

    await page.goto('/agents/#guide-pi');
    await guidesMounted(page);
    await expect(visiblePanels(page)).toHaveAttribute('data-guide-panel', 'other');
    await expect(selectedGuide(page)).toHaveAttribute('data-guide-tab', 'other');
    await expect(page.locator('#guide-other #pi')).toBeVisible();
  });

  test('install and verify blocks have working Copy buttons', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/agents/#guide-claude-code');
    const panel = page.locator('#guide-claude-code');

    await expect(panel.locator('.hguide__source a')).toHaveAttribute(
      'href',
      /agentic-plugins\/blob\/main\/docs\/claude-code\.md/
    );
    await expect(panel.locator('pre', { hasText: 'Connect to Galaxy and tell me who I am.' })).toHaveCount(1);

    const first = panel.locator('.code-block').first();
    await expect(first.locator('pre')).toContainText('/plugin marketplace add galaxyproject/agentic-plugins');
    const btn = first.locator('.code-copy');
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(btn).toContainText('Copied');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(
      [
        '/plugin marketplace add galaxyproject/agentic-plugins',
        '/plugin install galaxy-mcp@galaxyproject',
        '/plugin install galaxy-skills@galaxyproject',
      ].join('\n')
    );
  });

  test('fits a phone viewport without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto('/agents/');
    await expect(page.locator('[data-harness-guides]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
