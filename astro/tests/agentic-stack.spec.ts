import { test, expect, type Page } from '@playwright/test';

/**
 * /tools/agentic-stack/ — "The Galaxy agentic stack": a dark hero with the
 * two-pane run window (AgenticStack) followed by the Get started cards and
 * the plain sections.
 */

const URL = '/tools/agentic-stack/';

const root = (page: Page) => page.locator('[data-agentic-stack]');
const agentPane = (page: Page) => page.locator('[data-pane="agent"]');
const galaxyPane = (page: Page) => page.locator('[data-pane="galaxy"]');
const rows = (page: Page) => page.locator('[data-hist] .gx-row');

/** Scroll the window into view and wait until the client player has started typing. */
async function waitForReplay(page: Page) {
  const stack = root(page);
  await expect(stack).toHaveAttribute('data-mounted', '1');
  await stack.locator('[data-window]').scrollIntoViewIfNeeded();
  await expect(stack.locator('[data-agent-body] .is-typing, [data-agent-body] .is-streaming').first()).toBeAttached({
    timeout: 15_000,
  });
  return stack;
}

test.describe('Agentic stack page', () => {
  test('renders the hero, both panes, the seed history and every required link', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto(URL);
    expect(response?.status()).toBe(200);

    // The hero supplies the only h1; the layout PageHeader is suppressed.
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('agentic stack');
    await expect(page.locator('.page-header')).toHaveCount(0);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /galaxy_logo/);

    const stack = root(page);
    await expect(stack).toHaveAttribute('data-mounted', '1');
    await expect(agentPane(page)).toBeVisible();
    await expect(galaxyPane(page)).toBeVisible();
    await expect(agentPane(page)).toHaveAttribute('role', 'region');
    await expect(galaxyPane(page)).toHaveAttribute('aria-label', 'Galaxy history');

    // The history starts with the three seed datasets.
    for (const name of ['reads.bam', 'genes.gff3', 'chrom_map.tsv']) {
      await expect(galaxyPane(page)).toContainText(name);
    }

    // Every destination the page promises, each linked at least once.
    for (const href of [
      '#get-started',
      'https://udt-signup.galaxyproject.org/',
      '/tools/user-defined-tools/',
      '/tools/ai-agents/',
      '/tools/orbit/',
      'https://galaxyproject.github.io/loom/',
      'https://github.com/galaxyproject/galaxy/pull/23365',
    ]) {
      expect(await page.locator(`a[href="${href}"]`).count(), href).toBeGreaterThan(0);
    }

    // The stack strip points at the three cards, and those ids exist.
    const strip = stack.getByRole('list', { name: 'The stack' });
    for (const id of ['an-agent', 'user-defined-tools', 'galaxy']) {
      await expect(strip.locator(`a[href="#${id}"]`)).toHaveCount(1);
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator('#get-started')).toBeAttached();

    expect(errors).toEqual([]);
  });

  test('the replay runs once, updates the history live and stops on the provenance card', async ({ page }) => {
    test.slow();
    await page.goto(URL);
    const stack = await waitForReplay(page);
    const progress = stack.locator('[data-progress]');

    await expect.poll(async () => (await progress.boundingBox())?.width ?? 0).toBeGreaterThan(0);
    await expect(rows(page)).toHaveCount(3);

    // The UDT job appears, runs in its container and finishes.
    const udtRow = page.locator('[data-hist] [data-hid="4"]');
    await expect(udtRow).toHaveAttribute('data-state', 'running', { timeout: 30_000 });
    await expect(udtRow).toContainText('python:3.11-slim');
    await expect(udtRow).toHaveAttribute('data-state', 'ok', { timeout: 15_000 });

    // Then featureCounts, and the run ends on the Job information card.
    await expect(rows(page)).toHaveCount(6, { timeout: 30_000 });
    await expect(udtRow.locator('dl')).toContainText('python:3.11-slim', { timeout: 30_000 });
    await expect(udtRow.locator('dl')).toContainText('Exit code');
    await expect(stack.locator('[data-actions]')).toHaveClass(/is-live/, { timeout: 20_000 });
    await expect(stack).toHaveAttribute('data-state', 'done', { timeout: 60_000 });
    await expect(progress).toHaveCSS('width', /px/);
    const full = await progress.evaluate((el) => el.getBoundingClientRect().width / el.parentElement!.clientWidth);
    expect(full).toBeGreaterThan(0.99);

    // It stays there: no loop, no further changes.
    const snapshot = await stack.locator('[data-window]').innerHTML();
    await page.waitForTimeout(3000);
    expect(await stack.locator('[data-window]').innerHTML()).toBe(snapshot);
    await expect(stack).toHaveAttribute('data-state', 'done');
    await expect(stack.locator('[data-play]')).toBeHidden();
    await expect(stack.locator('[data-replay]')).toBeVisible();
  });

  test('pause freezes both panes, play resumes, replay rewinds', async ({ page }) => {
    test.slow();
    await page.goto(URL);
    const stack = await waitForReplay(page);
    const agent = stack.locator('[data-agent-body]');
    const galaxy = stack.locator('[data-pane="galaxy"]');
    const play = stack.locator('[data-play]');

    // The accessible name alone carries the state: Pause while running, Play while paused.
    await expect(play).toContainText('Pause');
    await expect(play).not.toHaveAttribute('aria-pressed');
    await play.click();
    await expect(stack).toHaveClass(/is-paused/);
    await expect(play).toContainText('Play');
    await expect(play).not.toHaveAttribute('aria-pressed');
    const agentFrozen = await agent.textContent();
    const galaxyFrozen = await galaxy.textContent();
    await page.waitForTimeout(1500);
    expect(await agent.textContent()).toBe(agentFrozen);
    expect(await galaxy.textContent()).toBe(galaxyFrozen);

    await play.click();
    await expect(stack).not.toHaveClass(/is-paused/);
    await expect(play).toContainText('Pause');
    await expect.poll(() => agent.textContent(), { timeout: 10_000 }).not.toBe(agentFrozen);

    // Let a history row land, then rewind.
    await expect(rows(page)).toHaveCount(4, { timeout: 40_000 });
    await stack.locator('[data-replay]').click();
    await expect(rows(page)).toHaveCount(3);
    await expect(agent.locator('.ln-tool')).toHaveCount(0);
    await expect(stack.locator('[data-tools]')).toContainText('none');
    await expect(stack).toHaveAttribute('data-state', 'playing');
  });

  test('reduced motion shows the finished run statically', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(URL);
    const stack = root(page);
    await expect(stack).toHaveClass(/is-static/);
    await stack.locator('[data-window]').scrollIntoViewIfNeeded();
    const agent = stack.locator('[data-agent-body]');
    await expect(agent).toContainText('create_user_tool');
    await expect(page.locator('[data-hist] [data-hid="4"] dl')).toContainText('Exit code');
    await expect(rows(page)).toHaveCount(6);
    await expect(stack.locator('[data-actions]')).toHaveClass(/is-live/);
    await expect(agent.locator('.is-typing')).toHaveCount(0);
    const snapshot = await stack.locator('[data-window]').innerHTML();
    await page.waitForTimeout(2500);
    expect(await stack.locator('[data-window]').innerHTML()).toBe(snapshot);
    await expect(stack.locator('[data-play]')).toBeHidden();
    await expect(stack.locator('[data-replay]')).toBeHidden();
  });

  test('stacks the panes on a phone without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(URL);
    await expect(root(page)).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    await root(page).locator('[data-window]').scrollIntoViewIfNeeded();
    const a = await agentPane(page).boundingBox();
    const g = await galaxyPane(page).boundingBox();
    expect(a && g && a.y + a.height <= g.y + 1).toBe(true);
    await expect(agentPane(page)).toBeVisible();
    await expect(galaxyPane(page)).toBeVisible();
  });

  test('the tools hub and the UDT page both link to it', async ({ page }) => {
    for (const from of ['/tools/', '/tools/user-defined-tools/']) {
      const response = await page.goto(from);
      expect(response?.status(), from).toBe(200);
      await expect(page.locator(`a[href="${URL}"]`).first(), from).toBeVisible();
    }
  });

  test('the disclosure holds the full tool and both fenced blocks get Copy buttons', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(URL);

    const details = page.locator('details', { hasText: 'The tool the agent wrote' });
    await expect(details).toHaveCount(1);
    await expect(details.locator('pre')).toBeHidden();
    await details.locator('summary').click();
    await expect(details.locator('pre')).toBeVisible();
    await expect(details.locator('pre')).toContainText('class: GalaxyUserTool');
    await expect(details.locator('pre')).toContainText('from_work_dir: renamed.gff3');
    await expect(details.locator('.code-copy')).toBeVisible();

    const first = page.locator('.code-block', { hasText: 'Write a user-defined tool' });
    await expect(first).toHaveCount(1);
    await expect(first.locator('.code-copy')).toBeVisible();
    await first.locator('.code-copy').click();
    await expect(first.locator('.code-copy')).toContainText('Copied');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard.split('\n')[0]).toBe(
      "Write a user-defined tool that counts the lines in a dataset, run it on a dataset in my current history, and show me the job's command and container."
    );
  });
});
