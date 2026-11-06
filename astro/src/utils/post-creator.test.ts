import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { normalizeBody } from '../build/normalize-transforms.mjs';
import { normalizeSlugSegment } from '../build/slug-utils.mjs';
import {
  MAX_URL_LENGTH,
  OFFERED_SUBSITES,
  buildPost,
  githubLink,
  mainSubsiteChoices,
  mdxProblems,
  OUTLINES,
  embedFor,
  mediaKind,
  mediaMarkdown,
  mediaName,
  newEntries,
  postPath,
  placeholderLinks,
  postProblems,
  slugFromTitle,
  socialPost,
  uploadPageUrl,
  usesComponents,
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
      'uenicode-and-camelcase-a-very-long-title'
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

  it('asks events for an organiser or funder, as the metadata check does', () => {
    const event = form({ kind: 'event', authors: [], funding: [] });
    expect(postProblems(event)).toEqual(['Add at least one organiser or funder: the checks require them for events.']);
    expect(postProblems({ ...event, funding: ['deNBI'] })).toEqual([]);
    expect(postProblems({ ...event, date: '2026-01-10' })).toEqual([]);
    expect(postProblems(form({ authors: [], funding: [] }))).toEqual([]);
  });

  it('reports missing title, bad dates and a stray main subsite', () => {
    const problems = postProblems(
      form({ kind: 'event', title: '', date: '2026-11-05', end: '2026-11-01', mainSubsite: 'us' })
    );
    expect(problems).toHaveLength(3);
  });
});

describe('components', () => {
  it('adds components: true when the text uses one', () => {
    expect(buildPost(form({ body: 'Hi <Icon name="laptop" />' }))).toContain('\ncomponents: true\n');
    expect(buildPost(form({ body: 'a <b>bold</b> text' }))).not.toContain('components');
    expect(usesComponents('<VideoPlayer src="./a.mp4" />')).toBe(true);
    // Same rule as content:lint: HTML in capitals and components inside code blocks do not count
    expect(usesComponents('Line<BR>break')).toBe(false);
    expect(usesComponents('```\n<Icon name="x" />\n```')).toBe(false);
  });

  it('sends text that content:lint accepts as is', () => {
    const text = buildPost(form({ body: 'a<br>b <https://galaxyproject.org> <td rowspan=3>' }));
    expect(text).toContain('a<br />b [https://galaxyproject.org](https://galaxyproject.org) <td rowspan="3">');
  });

  it('checks text with components with the MDX parser', async () => {
    const icon = '<Icon name="laptop" />\n\n';
    expect(await mdxProblems(icon + 'Fine text with {/* a note */}.')).toEqual([]);
    expect(await mdxProblems('<!-- a note --> without components is fine')).toEqual([]);
    expect(await mdxProblems(icon + '<!-- note -->')).toEqual([expect.stringMatching(/^Line 3: HTML comments/)]);
    expect(await mdxProblems(icon + 'Under <500 reads')).toEqual([expect.stringMatching(/^Line 3: A “<” here/)]);
    expect(await mdxProblems(icon + 'A <> b')).toEqual([expect.stringMatching(/^Line 3: “<>”/)]);
    expect(await mdxProblems(icon + '<div>open')).toEqual([
      expect.stringMatching(/^Line 3: <div> needs a closing tag/),
    ]);
    expect(await mdxProblems(icon + 'Use {sample} here')).toEqual([expect.stringMatching(/^Line 3: Curly braces/)]);
    expect(await mdxProblems(icon + '<Icom name="x" />')).toEqual([
      expect.stringMatching(/^Line 3: <Icom> is not a Hub component/),
    ]);
    // The content:lint transforms fix these before MDX sees them
    expect(await mdxProblems(icon + 'Line<BR>break and <https://galaxyproject.org>')).toEqual([]);
  });

  it('never sends an HTML comment as the paste placeholder', () => {
    const link = githubLink(form({ body: '<Icon name="x" /> ' + 'ü '.repeat(3000) }));
    expect(new URL(link.url).searchParams.get('value')).not.toContain('<!--');
  });
});

describe('media', () => {
  it('makes lowercase names that do not clash', () => {
    expect(mediaName('Group Photo.JPG', [])).toBe('group-photo.jpg');
    expect(mediaName('Group Photo.JPG', ['group-photo.jpg'])).toBe('group-photo-2.jpg');
    expect(mediaName('.hidden', [])).toBe('hidden');
  });

  it('writes the right Markdown for each kind', () => {
    expect(mediaMarkdown('a.png', { alt: 'A [group] photo' })).toBe('![A group photo](./a.png)');
    // A <video>, whose src the build rewrites (VideoPlayer's it does not)
    expect(mediaMarkdown('talk.mp4')).toBe('<video controls src="./talk.mp4"></video>');
    expect(mediaMarkdown('slides.pdf')).toBe('[slides.pdf](./slides.pdf)');
  });

  it('writes sized and captioned images as a figure that needs no fixing', () => {
    const snippet = mediaMarkdown('a.png', { alt: 'The "team"', caption: 'Day {1} & 2', size: 'medium' });
    expect(snippet).toBe(
      '<figure>\n  <img src="./a.png" alt="The &quot;team&quot;" width="600" />\n  <figcaption>Day &#123;1&#125; &amp; 2</figcaption>\n</figure>'
    );
    expect(normalizeBody(snippet)).toBe(snippet);
  });
});

describe('embedFor', () => {
  it('embeds YouTube links from any of their forms', () => {
    for (const link of [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://m.youtube.com/shorts/dQw4w9WgXcQ',
    ]) {
      expect(embedFor(link)?.text).toContain('src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"');
    }
  });

  it('embeds Mastodon posts and Google calendars, and nothing else', () => {
    expect(embedFor('https://mstdn.science/@galaxyproject/113000000000000000')?.text).toBe(
      '<Mastodon url="https://mstdn.science/@galaxyproject/113000000000000000" />'
    );
    expect(embedFor('https://calendar.google.com/calendar/embed?src=abc&ctz=Europe%2FBerlin')?.kind).toBe('calendar');
    expect(embedFor('https://galaxyproject.org/news/')).toBeNull();
    expect(embedFor('not a link')).toBeNull();
  });
});

describe('socialPost', () => {
  it('builds the news text the social media bot posts', () => {
    expect(socialPost(form({ tease: 'It is  out.' })).text).toBe(
      'It is out.\nhttps://galaxyproject.org/news/2026-11-05-galaxy-new-release/'
    );
  });

  it('builds the event text, with the external link when there is one', () => {
    const post = socialPost(
      form({
        kind: 'event',
        location: 'Freiburg',
        externalUrl: 'https://example.org/day',
        subsites: [],
        mainSubsite: '',
      })
    );
    expect(post.text).toBe(
      '📣 Galaxy: "new" release\n\nIt\'s out\n\n📍 Freiburg\n📅 5 November 2026\n🔗 More info & registration: https://example.org/day'
    );
    expect(post.posted).toBe(false);
  });
});

describe('rules shared with the build and CI', () => {
  it('keeps quotes in the GitHub link encoded so its length is the real one', () => {
    expect(githubLink(form()).url).not.toContain("'");
  });

  it('only offers subsites the metadata check accepts', () => {
    const valid = parse(readFileSync(new URL('../../../content/SUBSITES.yaml', import.meta.url), 'utf8'));
    for (const subsite of OFFERED_SUBSITES) expect(valid).toContain(subsite.id);
  });

  it('keeps outlines in plain Markdown', () => {
    for (const outline of [...OUTLINES.news, ...OUTLINES.event]) {
      expect(usesComponents(outline.text)).toBe(false);
      expect(normalizeBody(outline.text)).toBe(outline.text);
    }
  });

  it('finds links whose address is still a placeholder', () => {
    expect(
      placeholderLinks('[Slides](https://) and [GTN](https://training.galaxyproject.org/) and [x](http://)')
    ).toEqual(['Slides', 'x']);
  });

  it('links to the upload page for the post folder', () => {
    expect(uploadPageUrl(form())).toBe(
      'https://github.com/galaxyproject/galaxy-hub/upload/main/content/news/2026/2026-11-05-galaxy-new-release'
    );
  });

  it('makes folder names the build keeps as they are', () => {
    // slugify alone splits camelCase ("rn-aseq"); the build's rule does not, and content:lint compares them
    for (const title of ['New RNAseq tutorials', 'miRNA workshop', 'BiaPy now in Galaxy', 'GCC2026 CoFest outcomes']) {
      const slug = slugFromTitle(title);
      expect(normalizeSlugSegment(slug)).toBe(slug);
    }
    expect(slugFromTitle('New RNAseq tutorials')).toBe('new-rnaseq-tutorials');
  });

  it('only takes files the build publishes', () => {
    expect(mediaKind('a.JPG')).toBe('image');
    expect(mediaKind('clip.webm')).toBe('video');
    expect(mediaKind('slides.pdf')).toBe('file');
    for (const name of ['photo.heic', 'photo.avif', 'clip.mov', 'slides.pptx', 'data.csv'])
      expect(mediaKind(name)).toBeNull();
  });

  it('keeps components: true in the metadata-only file sent for long texts', () => {
    const long = form({ body: '<Icon name="x" /> ' + 'ü '.repeat(3000) });
    expect(new URL(githubLink(long).url).searchParams.get('value')).toContain('components: true');
  });

  it('sends text the content:lint transforms leave unchanged', () => {
    const once = normalizeBody(
      'a<br>b <BR> <https://x.org> <td rowspan=3> <i class="fa fa-laptop"></i> <g-link to="/">x</g-link>'
    );
    expect(normalizeBody(once)).toBe(once);
  });
});
