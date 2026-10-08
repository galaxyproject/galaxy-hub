const TWEET_HOSTS = new Set([
  'twitter.com',
  'www.twitter.com',
  'mobile.twitter.com',
  'x.com',
  'www.x.com',
  'mobile.x.com',
]);

export interface TweetUrl {
  href: string;
  id?: string;
  user?: string;
}

// Content props reach the rendered href, so only https links on twitter.com or x.com are kept
export function parseTweetUrl(input: string | undefined): TweetUrl | undefined {
  if (!input) return undefined;
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return undefined;
  }
  if (url.protocol !== 'https:' || url.port || !TWEET_HOSTS.has(url.hostname)) return undefined;

  const match = url.pathname.match(/^\/([^/]+)\/status(?:es)?\/(\d+)/);
  const user = match && match[1] !== 'i' ? match[1] : undefined;
  return { href: url.href, id: match?.[2], user };
}
