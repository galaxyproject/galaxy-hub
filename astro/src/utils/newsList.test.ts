import { describe, it, expect } from 'vitest';
import { newsListItems, publishedNews } from './newsList';

const entry = (data: Record<string, unknown>, body = '') => ({ data: { slug: 'news/2026/a', ...data }, body });

describe('newsListItems', () => {
  it('maps a news entry to the plain object NewsList renders', () => {
    const [item] = newsListItems([
      entry(
        {
          title: 'Kick-off',
          date: new Date('2026-10-05T00:00:00Z'),
          tease: 'The **project** starts',
          tags: ['esg4stars', 'esg'],
          subsites: ['global'],
          external_url: 'https://example.org/post',
          image: '/images/news/2026/a/lead.png',
        },
        '![x](/images/news/2026/a/body.png)'
      ),
    ]);
    expect(item).toEqual({
      slug: 'news/2026/a',
      title: 'Kick-off',
      date: '2026-10-05T00:00:00.000Z',
      tease: 'The **project** starts',
      teaseHtml: 'The <strong>project</strong> starts',
      tags: ['esg4stars', 'esg'],
      subsites: ['global'],
      externalUrl: 'https://example.org/post',
      image: '/images/news/2026/a/lead.png',
    });
  });

  it('renders the teaser and finds the tile image in the body', () => {
    const [item] = newsListItems([entry({ tease: 'Plain text' }, 'Intro\n\n![x](/images/news/2026/a/body.png)')]);
    expect(item.teaseHtml).toBe('Plain text');
    expect(item.image).toBe('/images/news/2026/a/body.png');
  });

  it('keeps teaser links as text, since the whole row is already a link', () => {
    const [item] = newsListItems([entry({ tease: 'Details via the [EOSC Node](https://eosc.pl/) and `code`, *now*' })]);
    expect(item.teaseHtml).toBe('Details via the EOSC Node and <code>code</code>, <em>now</em>');
  });

  it('passes the image check through, so missing files give no tile image', () => {
    const [item] = newsListItems([entry({ image: '/images/news/2026/a/lead.png' })], () => false);
    expect(item.image).toBeUndefined();
  });

  it('gives empty teaser HTML for a missing teaser and passes null fields through', () => {
    const [item] = newsListItems([entry({ tease: null, external_url: null })]);
    expect(item.teaseHtml).toBe('');
    expect(item.tease).toBeNull();
    expect(item.externalUrl).toBeNull();
  });

  it('fills defaults for a sparse entry', () => {
    const [item] = newsListItems([entry({ date: '2026-01-02', tags: 'single' })]);
    expect(item).toMatchObject({ title: 'Untitled', date: '2026-01-02', teaseHtml: '', tags: ['single'] });
    expect(newsListItems([entry({})])[0].tags).toEqual([]);
  });
});

describe('publishedNews', () => {
  const now = new Date('2026-11-11T12:00:00Z');

  it('hides news dated after today, like /news/', () => {
    const news = [
      entry({ slug: 'news/today', date: '2026-11-11' }),
      entry({ slug: 'news/tomorrow', date: '2026-11-12' }),
      entry({ slug: 'news/past', date: new Date('2026-10-01T00:00:00Z') }),
    ];
    expect(publishedNews(news, now).map((item) => item.data.slug)).toEqual(['news/today', 'news/past']);
  });

  it('keeps undated news', () => {
    expect(publishedNews([entry({ slug: 'news/undated' })], now)).toHaveLength(1);
  });
});
