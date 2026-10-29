import { test, expect, type Locator, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// One page per layout or template. Each page test scans the page without the shared site chrome
// and fails on any serious or critical axe violation that is not listed in knownIssues below.
// The chrome itself is scanned once per viewport on chromePage.
//
// A new news post or event, or the date moving on, does not change what the scans see. The news
// and events listings open a past year that sits in the "Older years" select (?year=2020), so their
// items stay the same (the recent-year chips and their counts still change); the US citations list
// opens the same year.
// Regions that list the latest news, upcoming events or the news and events of a project overview
// (ESG, ESG4Stars) are excluded, and each must match exactly `count` elements, so a renamed hook fails
// instead of letting live content back into the scan. News teasers, tags and dates are covered on the
// news year view, past event items on the events year view. On that view the year filter also empties
// the upcoming list, so its region is the "No upcoming events" notice; upcoming event cards and the
// item lists on the home page, bare feed cards, embed overview and project overviews are not scanned;
// the rest of those pages is. The ESG news page opens a fixed past year like /news/. The ESG past
// events page is scanned whole: the project has ended, so its list (ProjectRows) changes only when an
// ESG event is edited or added. The ESG4Stars news and events pages are not scanned: the project runs,
// so both lists change with each new post or event and as dates pass. They use the same NewsList and
// ProjectRows as the ESG pages; the unmuted date line of upcoming rows (galaxy-dark) is darker than the
// muted one scanned on the ESG past events page. The projects index (/projects/) is scanned whole: its
// cards come from content/projects/, not from news or events.
// Edits to a scanned page or its inserts, and new platforms on /use/ or /projects/, are still checked
// on purpose.
const fixedYear = 2020;
// ESG news started in 2022; 2023 is a full past year of the project
const esgNewsYear = 2023;

type Region = { name: string; count: number; locate: (page: Page) => Locator };
type ScanTarget = { path: string; ready?: (page: Page) => Locator; exclude?: Region[] };

const css = (selector: string) => (page: Page) => page.locator(selector);
// SubsiteOverview: a section is its header row (heading, "View all") followed by the item list
// or its empty-state text
const listAfterHeading = (heading: string) => (page: Page) =>
  page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: heading, exact: true }) })
    .locator(':scope > div.space-y-3, :scope > p');

const pages: ScanTarget[] = [
  {
    path: '/', // HomeLayout
    exclude: [
      { name: 'latest news', count: 1, locate: css('.content-section .news-list') },
      { name: 'upcoming events', count: 1, locate: css('.content-section .events-list') },
    ],
  },
  { path: '/community/' }, // ArticleLayout
  { path: '/news/2025-10-15-egd2025/' }, // news post
  { path: '/events/2025-admin-training-brno/' }, // event page
  { path: '/events/gcc2026/' }, // ConferenceLayout
  {
    path: '/projects/esg/', // project page (BaseLayout, band, facts box)
    exclude: [{ name: 'news and past events lists', count: 2, locate: css('[data-project-list]') }],
  },
  {
    path: `/projects/esg/news/?year=${esgNewsYear}`, // project section page with NewsList
    ready: (page) => page.getByText(new RegExp(`^\\s*\\d+ articles?\\s+in ${esgNewsYear}\\s*$`)),
  },
  { path: '/projects/esg/events/' }, // project section page; scans the ProjectRows past event list
  { path: '/projects/' }, // projects index (cards from content/projects/)
  {
    path: '/projects/esg4stars/', // second project page from the shared components (pillars, partner table)
    exclude: [{ name: 'news and events lists', count: 2, locate: css('[data-project-list]') }],
  },
  { path: '/use/usegalaxy-eu/' }, // PlatformLayout
  {
    path: '/embed/eu/', // EmbedLayout
    exclude: [
      { name: 'upcoming events', count: 1, locate: listAfterHeading('Upcoming Events') },
      { name: 'recent news', count: 1, locate: listAfterHeading('Recent News') },
    ],
  },
  {
    path: '/bare/eu/usegalaxy/main/', // BareArticleLayout
    exclude: [{ name: 'news and events card items', count: 2, locate: css('.latest-feeds .card-body') }],
  },
  {
    path: '/bare/eu/latest/news/', // bare feed widget
    exclude: [{ name: 'news card items', count: 1, locate: css('.card-body') }],
  },
  {
    path: `/news/?year=${fixedYear}`, // NewsList
    ready: (page) => page.getByText(new RegExp(`^\\s*\\d+ articles?\\s+in ${fixedYear}\\s*$`)),
  },
  {
    path: `/events/?year=${fixedYear}`, // EventsList
    ready: (page) => page.getByText(new RegExp(`^\\s*\\d+ events?\\s+in ${fixedYear}\\s*$`)),
    exclude: [
      {
        name: 'upcoming events',
        count: 1,
        locate: (page) =>
          page
            .locator('section')
            .filter({ has: page.getByRole('heading', { name: /^Upcoming Events/ }) })
            .or(page.getByText(/^No upcoming events/)),
      },
    ],
  },
  {
    path: `/us/citations/?year=${fixedYear}`, // CitationList + CitationFilters (server list, filter bar island)
    ready: (page) => page.getByText(new RegExp(`^\\s*\\d+ citations?\\s+in ${fixedYear}\\s*$`)),
  },
  { path: '/use/' },
  { path: '/search/' },
];

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};
type ViewportName = keyof typeof viewports;

// BaseLayout chrome: sidebar (main nav, context header), mobile banner header and site footer.
// print.css hides the same three hooks. HomeLayout, EmbedLayout and the bare pages have none of them.
const chromeSelectors = ['aside.site-sidebar', 'header.site-mobile-header', 'footer.site-footer'];
const chromePage = '/community/';
const chromeKey = `chrome:${chromePage}`;

type Violation = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'][number];
type KnownIssue = { reason: string; viewports: ViewportName[] };

const failingImpacts = new Set(['serious', 'critical']);

// Violations present when the guard landed, keyed by page path (or chromeKey), then axe rule id.
// An entry masks its rule only at the viewports it lists. At those viewports it must still fire,
// or the test fails as stale; at any other viewport the rule fails as new. A fix that clears a
// rule at one viewport removes that viewport from the entry, and the entry goes once none is left.
const knownIssues: Record<string, Record<string, KnownIssue>> = {
  [chromeKey]: {
    'color-contrast': {
      reason:
        'sidebar text-chicago-400 on #2c3143 is 3.59:1 (SidebarNav.vue, Sidebar.astro); mobile hides the sidebar',
      viewports: ['desktop'],
    },
  },
};

function indent(text: string, spaces: number): string {
  return text
    .split('\n')
    .map((line) => `${' '.repeat(spaces)}${line}`)
    .join('\n');
}

function describeViolations(violations: Violation[]): string {
  return violations
    .map((v) => {
      const targets = v.nodes
        .flatMap((n) => [indent(n.target.join(' '), 4), ...(n.failureSummary ? [indent(n.failureSummary, 6)] : [])])
        .join('\n');
      return `${v.id} (${v.impact}): ${v.help}\n  ${v.helpUrl}\n${targets}`;
    })
    .join('\n\n');
}

async function openPage(page: Page, path: string, viewportName: ViewportName) {
  await page.setViewportSize(viewports[viewportName]);
  // The home page fades in its stats; scan the settled colours, not a mid-animation frame
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await page.waitForLoadState('networkidle');
}

function newBuilder(page: Page): AxeBuilder {
  return new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).exclude('astro-dev-toolbar');
}

function expectOnlyKnown(key: string, viewportName: ViewportName, violations: Violation[]) {
  const known = Object.entries(knownIssues[key] ?? {})
    .filter(([, issue]) => issue.viewports.includes(viewportName))
    .map(([ruleId]) => ruleId);
  const failing = violations.filter((v) => failingImpacts.has(v.impact ?? ''));
  const unexpected = failing.filter((v) => !known.includes(v.id));
  expect(
    unexpected.map((v) => v.id),
    `New axe violations on ${key} (${viewportName}):\n\n${describeViolations(unexpected)}`
  ).toEqual([]);

  const firing = new Set(failing.map((v) => v.id));
  const stale = known.filter((ruleId) => !firing.has(ruleId));
  expect(
    stale,
    `Known issues no longer reproduce on ${key} (${viewportName}); drop ${viewportName} from their viewports in knownIssues`
  ).toEqual([]);
}

test.describe('Axe accessibility scan', () => {
  test('knownIssues only names scanned pages and known viewports', () => {
    const keys = new Set([...pages.map((target) => target.path), chromeKey]);
    const unknownKeys = Object.keys(knownIssues).filter((key) => !keys.has(key));
    expect.soft(unknownKeys, 'knownIssues keys that no test scans').toEqual([]);
    const listed = Object.values(knownIssues).flatMap((rules) => Object.values(rules).flatMap((i) => i.viewports));
    const unknownViewports = listed.filter((name) => !(name in viewports));
    expect.soft(unknownViewports, 'knownIssues viewports that no test scans').toEqual([]);
    const badLists = Object.entries(knownIssues).flatMap(([key, rules]) =>
      Object.entries(rules)
        .filter(([, i]) => i.viewports.length === 0 || new Set(i.viewports).size !== i.viewports.length)
        .map(([rule]) => `${key} ${rule}`)
    );
    expect.soft(badLists, 'knownIssues entries with empty or repeated viewports').toEqual([]);
  });

  for (const viewportName of Object.keys(viewports) as ViewportName[]) {
    test(`site chrome has no new serious or critical violations (${viewportName})`, async ({ page }) => {
      await openPage(page, chromePage, viewportName);
      let builder = newBuilder(page);
      for (const selector of chromeSelectors) {
        // A renamed hook must fail here, not silently shrink the scan
        expect(await page.locator(selector).count(), `${selector} not found on ${chromePage}`).toBeGreaterThan(0);
        builder = builder.include(selector);
      }
      const results = await builder.analyze();
      expectOnlyKnown(chromeKey, viewportName, results.violations);
    });

    for (const { path, ready, exclude = [] } of pages) {
      test(`${path} has no new serious or critical violations (${viewportName})`, async ({ page }) => {
        await openPage(page, path, viewportName);
        if (ready) await expect(ready(page), `${path} did not render its fixed view`).toBeVisible();
        let builder = newBuilder(page);
        for (const selector of chromeSelectors) builder = builder.exclude(selector);
        for (const region of exclude) {
          const matches = region.locate(page);
          await expect(matches, `${region.name} on ${path}`).toHaveCount(region.count);
          // AxeBuilder.exclude takes CSS only, so mark the located elements for it
          await matches.evaluateAll((elements) => elements.forEach((el) => el.setAttribute('data-axe-skip', '')));
        }
        if (exclude.length > 0) builder = builder.exclude('[data-axe-skip]');
        const results = await builder.analyze();
        expectOnlyKnown(path, viewportName, results.violations);
      });
    }
  }
});
