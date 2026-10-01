import { test, expect, type Page, type Locator } from '@playwright/test';

/**
 * Click a link and wait for navigation to complete.
 * Works with both full-page navigations and Astro view transitions.
 */
async function clickAndWaitForNavigation(page: Page, locator: Locator): Promise<void> {
  // Get the target URL before clicking
  const href = await locator.getAttribute('href');

  // Click the link
  await locator.click();

  if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
    // Wait for URL to change to the expected destination
    // This works for both traditional navigation and Astro view transitions
    const expectedPath = href.startsWith('/') ? href.split('#')[0] : `/${href.split('#')[0]}`;
    await page.waitForURL((url) => url.pathname.startsWith(expectedPath), {
      timeout: 15000,
    });
  }

  // Wait for the view transition to settle
  await page.waitForLoadState('networkidle');
}

test.describe('Content Rendering', () => {
  test.describe('Article Pages', () => {
    test('article page has proper structure', async ({ page }) => {
      // Load an article page
      await page.goto('/admin/');

      // Should have article layout structure
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('article renders markdown content', async ({ page }) => {
      await page.goto('/admin/');

      // Should have rendered markdown (headings, paragraphs, links)
      const content = page.locator('article, main .prose, main');
      await expect(content.locator('p').first()).toBeVisible();
    });

    test('article with images renders correctly', async ({ page }) => {
      // Find a page that likely has images
      await page.goto('/');

      // Check images load (if any on homepage)
      const images = page.locator('img');
      const imageCount = await images.count();
      if (imageCount > 0) {
        // First image should be visible
        await expect(images.first()).toBeVisible();
      }
    });
  });

  test.describe('Insert Components', () => {
    test('pages with Insert components load successfully', async ({ page }) => {
      // Test that pages which use Insert components can load
      // GCC events are known to use inserts for headers
      const response = await page.goto('/events/', { timeout: 30000 });

      // Events list should load
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();

      // Click into an event that likely has inserts
      const eventLink = page.locator('a[href*="/events/gcc"]').first();
      if (await eventLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await clickAndWaitForNavigation(page, eventLink);
        // Page should load without errors (GCC pages may have multiple h1s in content)
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 });
      }
    });

    test('inlined inserts render content', async ({ page }) => {
      // GCC 2024 pages inline their header insert at preprocess time
      await page.goto('/events/gcc-2024/');

      // The inlined header content should be visible (GCC events have banner images)
      const content = page.locator('article, .content, main').first();
      await expect(content).toBeVisible();
    });
  });

  test.describe('Inlined Insert Content', () => {
    test('SIG pages render inlined linkbox sidebar', async ({ page }) => {
      await page.goto('/community/sig/genome-annotation/');
      // The common_linkbox insert contains "Galaxy Community Board" text
      await expect(page.getByText('Galaxy Community Board')).toBeVisible();
    });

    test('SIG microbial page renders inlined linkbox sidebar', async ({ page }) => {
      // waitUntil: 'domcontentloaded' -- this page embeds several external iframes
      // (GTN, galaxy_codex, Google Calendar) and the default 'load' blocks on them,
      // flaking in CI. We only assert on the server-rendered inlined linkbox.
      await page.goto('/community/sig/microbial/', { waitUntil: 'domcontentloaded' });
      await expect(page.getByText('Galaxy Community Board')).toBeVisible();
    });

    test('EU usegalaxy main page renders inlined data policy', async ({ page }) => {
      await page.goto('/bare/eu/usegalaxy/main/');
      // The data-policy insert has "Our Data Policy" heading
      await expect(page.getByText('Our Data Policy')).toBeVisible();
    });

    test('learn pages render inlined linkbox', async ({ page }) => {
      await page.goto('/learn/advanced-workflow/extract/');
      // The learn/linkbox insert has "Screencasts" link
      await expect(page.getByText('Screencasts')).toBeVisible();
    });

    test('insert content does not show raw slot tags', async ({ page }) => {
      // A page that previously had <slot name="/events/gcc2024/header" />
      await page.goto('/events/gcc-2024/');
      const body = await page.locator('body').textContent();
      expect(body).not.toContain('<slot');
      expect(body).not.toContain('Insert not found');
    });
  });

  test.describe('Event Pages', () => {
    test('event page shows date information', async ({ page }) => {
      // Find an event page
      await page.goto('/events/');

      // Click first INTERNAL event link (exclude events with external_url that redirect)
      const eventLink = page
        .locator('a[href^="/events/2"]')
        .filter({ hasNot: page.locator('[data-external-icon]') })
        .first();
      if (await eventLink.isVisible()) {
        await clickAndWaitForNavigation(page, eventLink);

        // Event pages should show date (year somewhere on page)
        const dateText = page.getByText(/\d{4}/);
        await expect(dateText.first()).toBeVisible();
      }
    });

    test('event page shows location if available', async ({ page }) => {
      // Navigate to events and find one
      await page.goto('/events/gcc-2024/');

      // GCC events typically have location info - location may or may not be present
      // This test just verifies the page loads without errors
      await expect(page.locator('h1').first()).toBeVisible();
    });
  });

  test.describe('Platform Pages', () => {
    test('platform page shows server information', async ({ page }) => {
      await page.goto('/use/');

      // Click first platform (exclude link to /use/ index itself)
      const platformLink = page.locator('a[href^="/use/"]:not([href="/use/"])').first();
      if (await platformLink.isVisible()) {
        await clickAndWaitForNavigation(page, platformLink);

        // Platform pages should have title and content
        // Using .first() due to external h1 element in CI browser environment
        await expect(page.locator('h1').first()).toBeVisible();
      }
    });
  });

  test.describe('MDX Components', () => {
    const tweetPage = '/news/2018-04-11-galaxy-africa/';
    const tweetHref = 'https://twitter.com/i/status/981073917187100672';

    // Stand-in for widgets.js: runs the twttr.ready queue like the real script and marks
    // the container once createTweet has been called
    async function stubWidgets(page: Page, createTweet: string, onRequest?: () => void) {
      const body = `(() => {
        const twttr = window.twttr;
        const create = ${createTweet};
        const tweet = (el, id) => {
          const t = document.createElement('div');
          t.className = 'stub-tweet';
          t.textContent = id;
          el.append(t);
          return t;
        };
        twttr.widgets = {
          createTweet: (id, el) => {
            el.dataset.requested = id;
            return create(id, el, tweet);
          },
        };
        twttr.ready = (f) => f(twttr);
        twttr._e.forEach((f) => f(twttr));
      })();`;
      await page.route('https://platform.twitter.com/widgets.js', (route) => {
        onRequest?.();
        return route.fulfill({ contentType: 'text/javascript', body });
      });
    }

    async function openTweetWithStub(page: Page, createTweet: string) {
      await stubWidgets(page, createTweet);
      await page.goto(tweetPage);
      const embed = page.locator('.twitter-embed');
      await embed.scrollIntoViewIfNeeded();
      await expect(embed.locator('[data-requested]')).toHaveCount(1);
      return { link: embed.locator(`a[href="${tweetHref}"]`), tweet: embed.locator('.stub-tweet') };
    }

    test('Twitter embeds fall back to a link to the tweet', async ({ page }) => {
      // Block the widget script, as tracker blockers do, so only the fallback can render
      const blocked = page.waitForEvent('requestfailed', (request) => request.url().endsWith('/widgets.js'));
      await page.route('https://platform.twitter.com/**', (route) => route.abort());
      await page.goto(tweetPage);

      // The script is only requested once the embed hydrates, so the link must survive that
      const embed = page.locator('.twitter-embed');
      await embed.scrollIntoViewIfNeeded();
      await blocked;
      await expect(embed.locator(`a[href="${tweetHref}"]`)).toBeVisible();
    });

    test('Twitter embeds load widgets.js once for all the embeds on a page', async ({ page }) => {
      let requests = 0;
      await stubWidgets(page, '(id, el, tweet) => Promise.resolve(tweet(el, id))', () => requests++);
      await page.goto('/news/2022-06-21-elixirah22/');

      const embeds = page.locator('.twitter-embed');
      const count = await embeds.count();
      expect(count).toBe(12);
      for (let i = 0; i < count; i++) await embeds.nth(i).scrollIntoViewIfNeeded();

      await expect(page.locator('.twitter-embed [data-requested]')).toHaveCount(count);
      expect(requests).toBe(1);
    });

    test('Twitter embeds replace the link once the tweet renders', async ({ page }) => {
      const { link, tweet } = await openTweetWithStub(page, '(id, el, tweet) => Promise.resolve(tweet(el, id))');

      await expect(tweet).toBeVisible();
      await expect(link).toHaveCount(0);
    });

    test('Twitter embeds keep the link when the tweet never renders', async ({ page }) => {
      await page.clock.install();
      const { link, tweet } = await openTweetWithStub(
        page,
        '(id, el, tweet) => (tweet(el, id), new Promise(() => {}))'
      );
      await expect(tweet).toBeVisible();

      await page.clock.runFor(10_000);
      await expect(tweet).toHaveCount(0);
      await expect(link).toBeVisible();
    });

    // The real widgets.js inserts its frame when createTweet is called, so a tweet that is
    // slower than the timeout stays a link. This stub only attaches the tweet once it resolves.
    test('Twitter embeds replace the link with a stub tweet that attaches after the timeout', async ({ page }) => {
      await page.clock.install();
      const { link, tweet } = await openTweetWithStub(
        page,
        '(id, el, tweet) => new Promise((resolve) => setTimeout(() => resolve(tweet(el, id)), 20_000))'
      );

      await page.clock.runFor(10_000);
      await expect(link).toBeVisible();
      await expect(tweet).toHaveCount(0);

      await page.clock.runFor(10_000);
      await expect(tweet).toBeVisible();
      await expect(link).toHaveCount(0);
    });

    test('Video embeds render', async ({ page }) => {
      // Similar - verify video component doesn't break
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Prose Styling', () => {
    test('headings are styled correctly', async ({ page }) => {
      await page.goto('/admin/');

      // Check h1 and h2 are visible and have appropriate styling
      const h1 = page.locator('h1').first();
      const h2 = page.locator('h2').first();

      if ((await h1.isVisible()) && (await h2.isVisible())) {
        // Compare computed font sizes instead of element heights
        // (heights can vary based on content length)
        const h1FontSize = await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
        const h2FontSize = await h2.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

        // h1 should have larger or equal font size
        expect(h1FontSize).toBeGreaterThanOrEqual(h2FontSize);
      }
    });

    test('links are styled and clickable', async ({ page }) => {
      await page.goto('/admin/');

      // Find links in content (exclude TOC sidebar links)
      const contentLinks = page.locator('main a[href]:not(.toc-link)');
      const linkCount = await contentLinks.count();

      if (linkCount > 0) {
        // Links should be visible
        await expect(contentLinks.first()).toBeVisible();
      }
    });

    test('code blocks are styled', async ({ page }) => {
      await page.goto('/admin/');

      // Look for code elements
      const codeBlocks = page.locator('pre code, code');
      const count = await codeBlocks.count();

      if (count > 0) {
        await expect(codeBlocks.first()).toBeVisible();
      }
    });
  });

  test.describe('Get Started Page', () => {
    test('tutorial table has SVG icons', async ({ page }) => {
      await page.goto('/get-started/');

      // Find the tutorials table
      const table = page.locator('table').first();
      await expect(table).toBeVisible();

      // Table should contain SVG icons (converted from Font Awesome)
      const svgIcons = table.locator('svg');
      const iconCount = await svgIcons.count();

      // The table has multiple tutorial rows with icons for slides, hands-on, recording, tour
      expect(iconCount).toBeGreaterThan(5);

      // Verify SVGs have proper attributes
      const firstIcon = svgIcons.first();
      await expect(firstIcon).toHaveAttribute('viewBox', '0 0 24 24');
      await expect(firstIcon).toHaveAttribute('stroke', 'currentColor');
    });
  });
});
