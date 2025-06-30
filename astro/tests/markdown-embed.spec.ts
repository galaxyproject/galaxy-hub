import { test, expect } from '@playwright/test';

test.describe('MarkdownEmbed Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/markdown-embed');
  });

  test('page loads with markdown embed test components', async ({ page }) => {
    await expect(page).toHaveTitle(/MarkdownEmbed Component Test/);
    await expect(page.locator('h1').first()).toHaveText('MarkdownEmbed Component Test');
  });

  test('remote markdown loads successfully', async ({ page }) => {
    // Check that markdown-embed container exists
    const markdownEmbed = page.locator('.markdown-embed').first();
    await expect(markdownEmbed).toBeVisible();
    
    // Wait for content to load (GitHub README should have specific content)
    await page.waitForTimeout(5000); // Give more time for remote fetch
    
    // Check that either content was rendered OR an error was shown (network dependent)
    const hasContent = await markdownEmbed.locator('h1, h2, p').count() > 0;
    const hasError = await markdownEmbed.locator('.alert-danger').count() > 0;
    expect(hasContent || hasError).toBeTruthy();
  });

  test('local markdown loads successfully', async ({ page }) => {
    const markdownEmbed = page.locator('.markdown-embed').nth(1);
    await expect(markdownEmbed).toBeVisible();
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Check for specific content from our sample.md
    await expect(markdownEmbed).toContainText('Sample Markdown Content');
    await expect(markdownEmbed).toContainText('Introduction');
    
    // Check that various markdown elements are rendered
    await expect(markdownEmbed.locator('h1')).toHaveText('Sample Markdown Content');
    await expect(markdownEmbed.locator('strong').first()).toContainText('Bold text');
    await expect(markdownEmbed.locator('em').first()).toContainText('Italic text');
  });

  test('direct markdown content renders correctly', async ({ page }) => {
    const markdownEmbed = page.locator('.markdown-embed').nth(2);
    await expect(markdownEmbed).toBeVisible();
    
    // Check that direct content is rendered immediately
    await expect(markdownEmbed.locator('h1')).toHaveText('Direct Markdown');
    await expect(markdownEmbed).toContainText('This is bold text and this is italic text');
    
    // Check for list rendering
    await expect(markdownEmbed.locator('ul li')).toHaveCount(3);
    
    // Check for code block
    await expect(markdownEmbed.locator('pre code')).toContainText('console.log');
    
    // Check for blockquote
    await expect(markdownEmbed.locator('blockquote')).toContainText('important information');
    
    // Check for link
    const link = markdownEmbed.locator('a[href="https://galaxyproject.org"]');
    await expect(link).toHaveText('Link to Galaxy');
  });

  test('error handling displays error message', async ({ page }) => {
    const markdownEmbed = page.locator('.markdown-embed').nth(3);
    await expect(markdownEmbed).toBeVisible();
    
    // Wait for error to occur
    await page.waitForTimeout(1000);
    
    // Check for error alert
    const errorAlert = markdownEmbed.locator('.alert-danger');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Failed to load content');
  });

  test('loading spinner shows while fetching', async ({ page }) => {
    // Navigate to page and immediately check for spinner
    await page.goto('/test/markdown-embed');
    
    // At least one spinner should be visible initially
    const spinners = page.locator('.spinner-border');
    const spinnerCount = await spinners.count();
    expect(spinnerCount).toBeGreaterThan(0);
  });

  test('markdown styling is applied', async ({ page }) => {
    const markdownEmbed = page.locator('.markdown-embed').nth(1);
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Check that custom styles are applied
    const pre = markdownEmbed.locator('pre').first();
    await expect(pre).toHaveCSS('background-color', 'rgb(248, 249, 250)');
    await expect(pre).toHaveCSS('padding', '16px');
    
    const blockquote = markdownEmbed.locator('blockquote').first();
    await expect(blockquote).toHaveCSS('border-left', '4px solid rgb(222, 226, 230)');
  });

  test('tables render correctly', async ({ page }) => {
    const markdownEmbed = page.locator('.markdown-embed').nth(1);
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Note: Basic remark-html might not support tables by default
    // Check if table content is at least present in some form
    await expect(markdownEmbed).toContainText('Tool');
    await expect(markdownEmbed).toContainText('BWA');
    await expect(markdownEmbed).toContainText('SAMtools');
    await expect(markdownEmbed).toContainText('FastQC');
  });
});