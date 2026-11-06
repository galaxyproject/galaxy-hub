import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import {
  MAX_URL_LENGTH,
  OFFERED_SUBSITES,
  buildPost,
  githubLink,
  mainSubsiteChoices,
  newEntries,
  postPath,
  postProblems,
  slugFromTitle,
  type PostForm,
} from './post-creator';

function form(overrides: Partial<PostForm> = {}): PostForm {
  return {
    kind: 'news',
    title: 'Galaxy: "new" release',
    slug: '',
    date: '2026-11-05',
    end: '',
    tease: "It's out",
    tags: ['tools', 'ice cream', 'area/API', 'Bielefeld'],
    subsites: ['global', 'eu'],
    mainSubsite: 'eu',
    authors: ['arash77'],
    funding: ['deNBI'],
    externalUrl: '',
    continent: '',
    location: '',
    contact: '',
    body: 'Hello.',
    ...overrides,
  };
}

function frontmatter(text: string) {
  return parse(text.split('---\n')[1]);
}

describe('buildPost', () => {
  it('writes frontmatter that parses back to the same values', () => {
    const data = frontmatter(buildPost(form()));
    expect(data).toEqual({
      title: 'Galaxy: "new" release',
      date: '2026-11-05',
      tease: "It's out",
      tags: ['tools', 'ice cream', 'area/API', 'Bielefeld'],
      subsites: ['global', 'eu'],
      main_subsite: 'eu',
      contributions: { authorship: ['arash77'], funding: ['deNBI'] },
    });
  });

  it('quotes dates so YAML 1.1 readers keep them as strings', () => {
    const text = buildPost(form({ kind: 'event', end: '2026-11-06' }));
    expect(text).toContain("date: '2026-11-05'\n");
    expect(text).toContain("end: '2026-11-06'\n");
  });

  it('leaves out empty fields', () => {
    const text = buildPost(form({ tease: ' ', tags: [], subsites: [], mainSubsite: '', authors: [], funding: [] }));
    expect(text).not.toMatch(/tease|tags|subsites|contributions/);
  });

  it('writes event fields and organisers', () => {
    const data = frontmatter(
      buildPost(
        form({ kind: 'event', end: '2026-11-07', continent: 'EU', location: 'Freiburg, Germany', contact: 'Jo' })
      )
    );
    expect(data).toMatchObject({
      end: '2026-11-07',
      continent: 'EU',
      location: { name: 'Freiburg, Germany' },
      contact: 'Jo',
      contributions: { organisers: ['arash77'], funding: ['deNBI'] },
    });
  });

  it('keeps one-line fields on one line', () => {
    expect(frontmatter(buildPost(form({ tease: 'a\n  b' }))).tease).toBe('a b');
  });
});

describe('postPath', () => {
  it('puts news in a year folder', () => {
    expect(postPath(form())).toBe('content/news/2026/2026-11-05-galaxy-new-release/index.md');
  });

  it('puts events in the events folder', () => {
    expect(postPath(form({ kind: 'event', slug: 'my-event' }))).toBe('content/events/2026-11-05-my-event/index.md');
  });

  it('makes lowercase, hyphen-only folder names', () => {
    expect(slugFromTitle('Ünïcode_and CamelCase: a very long title with many words')).toBe(
      'uenicode-and-camel-case-a-very-long'
    );
  });
});

describe('githubLink', () => {
  it('sends the whole file when it fits', () => {
    const link = githubLink(form());
    expect(link.complete).toBe(true);
    const url = new URL(link.url);
    expect(url.pathname).toBe('/galaxyproject/galaxy-hub/new/main');
    expect(url.searchParams.get('filename')).toBe(postPath(form()));
    expect(url.searchParams.get('value')).toBe(buildPost(form()));
  });

  it('drops the body when the link would be too long', () => {
    const link = githubLink(form({ body: 'ü '.repeat(3000) }));
    expect(link.complete).toBe(false);
    expect(link.url.length).toBeLessThanOrEqual(MAX_URL_LENGTH);
    expect(new URL(link.url).searchParams.get('value')).not.toContain('ü');
  });
});

describe('mainSubsiteChoices', () => {
  it('expands groups and skips group names', () => {
    expect(mainSubsiteChoices(['all-eu', 'us'])).toEqual([
      'us',
      'eu',
      'freiburg',
      'belgium',
      'pasteur',
      'elixir-it',
      'ifb',
    ]);
    expect(mainSubsiteChoices(['all'])).not.toContain('all');
    expect(mainSubsiteChoices(['all'])).toContain('genouest');
  });
});

describe('newEntries', () => {
  it('lists values that are not in the Hub lists yet', () => {
    const known = { tags: ['tools'], people: ['bgruening'], funders: ['deNBI'] };
    expect(newEntries(form({ authors: ['bgruening', 'new-person'] }), known)).toEqual({
      tags: ['ice cream', 'area/API', 'Bielefeld'],
      people: ['new-person'],
      funders: [],
    });
  });
});

describe('postProblems', () => {
  it('accepts a complete form', () => {
    expect(postProblems(form())).toEqual([]);
  });

  it('reports missing title, bad dates and a stray main subsite', () => {
    const problems = postProblems(
      form({ kind: 'event', title: '', date: '2026-11-05', end: '2026-11-01', mainSubsite: 'us' })
    );
    expect(problems).toHaveLength(3);
  });
});

it('keeps quotes in the GitHub link encoded so its length is the real one', () => {
  expect(githubLink(form()).url).not.toContain("'");
});

it('only offers subsites the metadata check accepts', () => {
  const valid = parse(readFileSync(new URL('../../../content/SUBSITES.yaml', import.meta.url), 'utf8'));
  for (const subsite of OFFERED_SUBSITES) expect(valid).toContain(subsite.id);
});
