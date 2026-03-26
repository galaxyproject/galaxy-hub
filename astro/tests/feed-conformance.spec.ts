import { test, expect } from '@playwright/test';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

type FeedKind = 'rss' | 'atom';

type FeedSpec = {
  path: string;
  kind: FeedKind;
};

const FEEDS: FeedSpec[] = [
  { path: '/news/feed.xml', kind: 'rss' },
  { path: '/events/feed.xml', kind: 'rss' },
  { path: '/eu/feed.atom', kind: 'atom' },
  { path: '/eu/news/feed.atom', kind: 'atom' },
  { path: '/eu/events/feed.atom', kind: 'atom' },
];

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
});

function first<T>(value: T | T[] | undefined): T | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function asText(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (value && typeof value === 'object') {
    const maybeText = (value as Record<string, unknown>)['#text'];
    if (typeof maybeText === 'string') {
      const trimmed = maybeText.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }
  }

  return undefined;
}

function atomLinkHref(value: unknown): string | undefined {
  const link = first(value as Record<string, unknown> | Array<Record<string, unknown>> | undefined);
  if (!link) return undefined;
  if (typeof link === 'string') return asText(link);
  if (typeof link === 'object') {
    const href = (link as Record<string, unknown>).href;
    if (typeof href === 'string' && href.trim().length > 0) {
      return href.trim();
    }
  }
  return undefined;
}

function assertRssConformance(parsed: Record<string, unknown>, path: string): void {
  const rssNode = parsed.rss as Record<string, unknown> | undefined;
  expect(rssNode, `${path} should have an <rss> root element`).toBeTruthy();
  expect(asText(rssNode?.version), `${path} should include RSS version`).toBeTruthy();

  const channelNode = first(rssNode?.channel as Record<string, unknown> | Array<Record<string, unknown>> | undefined);
  expect(channelNode, `${path} should include a <channel> element`).toBeTruthy();

  expect(
    asText(channelNode && (channelNode as Record<string, unknown>).title),
    `${path} channel.title missing`
  ).toBeTruthy();
  expect(
    asText(channelNode && (channelNode as Record<string, unknown>).link),
    `${path} channel.link missing`
  ).toBeTruthy();
  expect(
    asText(channelNode && (channelNode as Record<string, unknown>).description),
    `${path} channel.description missing`
  ).toBeTruthy();

  const itemNode = first(
    channelNode &&
      ((channelNode as Record<string, unknown>).item as Record<string, unknown> | Array<Record<string, unknown>>)
  );
  expect(itemNode, `${path} should contain at least one <item>`).toBeTruthy();
  expect(asText(itemNode && (itemNode as Record<string, unknown>).title), `${path} item.title missing`).toBeTruthy();
  expect(asText(itemNode && (itemNode as Record<string, unknown>).link), `${path} item.link missing`).toBeTruthy();
}

function assertAtomConformance(parsed: Record<string, unknown>, path: string): void {
  const feedNode = parsed.feed as Record<string, unknown> | undefined;
  expect(feedNode, `${path} should have a <feed> root element`).toBeTruthy();
  expect(feedNode?.xmlns, `${path} should use Atom namespace`).toBe('http://www.w3.org/2005/Atom');

  expect(asText(feedNode?.title), `${path} feed.title missing`).toBeTruthy();
  expect(asText(feedNode?.id), `${path} feed.id missing`).toBeTruthy();
  expect(asText(feedNode?.updated), `${path} feed.updated missing`).toBeTruthy();

  const entryNode = first(feedNode?.entry as Record<string, unknown> | Array<Record<string, unknown>> | undefined);
  expect(entryNode, `${path} should contain at least one <entry>`).toBeTruthy();
  expect(asText(entryNode && (entryNode as Record<string, unknown>).title), `${path} entry.title missing`).toBeTruthy();
  expect(asText(entryNode && (entryNode as Record<string, unknown>).id), `${path} entry.id missing`).toBeTruthy();
  expect(
    asText(entryNode && (entryNode as Record<string, unknown>).updated),
    `${path} entry.updated missing`
  ).toBeTruthy();
  expect(
    atomLinkHref(entryNode && (entryNode as Record<string, unknown>).link),
    `${path} entry.link/@href missing`
  ).toBeTruthy();
}

test.describe('Feed Conformance', () => {
  for (const feed of FEEDS) {
    test(`${feed.path} is valid ${feed.kind.toUpperCase()}`, async ({ request }) => {
      const response = await request.get(feed.path);
      expect(response.status()).toBe(200);

      const contentType = response.headers()['content-type'] || '';
      if (feed.kind === 'atom') {
        expect(contentType).toContain('atom');
      } else {
        expect(contentType).toContain('xml');
      }

      const xml = await response.text();
      const validationResult = XMLValidator.validate(xml);
      expect(validationResult, `${feed.path} should be well-formed XML`).toBe(true);

      const parsed = xmlParser.parse(xml) as Record<string, unknown>;
      if (feed.kind === 'atom') {
        assertAtomConformance(parsed, feed.path);
      } else {
        assertRssConformance(parsed, feed.path);
      }
    });
  }
});
