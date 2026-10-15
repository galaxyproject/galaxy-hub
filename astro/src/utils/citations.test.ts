import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { citationTitleHtml, groupCitationsByYear, loadCitations, loadSubsiteCitations } from './citations';

const BIB = `@article{older,
  title = {Older paper},
  author = {Doe, Jane and Roe, Richard},
  year = {2019},
  doi = {10.1000/older}
}

@misc{newer,
  title = {Newer paper},
  author = {Smith, Ann},
  year = {2023},
  url = {https://example.org/newer}
}

@misc{undated,
  title = {Undated paper}
}
`;

const tempDirs: string[] = [];

function makeDir(files: Record<string, string>) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'citations-'));
  tempDirs.push(dir);
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), content);
  }
  return dir;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

describe('loadCitations', () => {
  it('reports a missing directory', async () => {
    expect(await loadCitations(path.join(os.tmpdir(), 'citations-does-not-exist'))).toEqual({
      exists: false,
      citations: [],
    });
  });

  it('ignores non-BibTeX files', async () => {
    const dir = makeDir({ 'README.md': '# notes' });
    expect(await loadCitations(dir)).toEqual({ exists: true, citations: [] });
  });

  it('parses entries newest first with authors and links', async () => {
    const { citations } = await loadCitations(makeDir({ 'refs.bib': BIB }));

    expect(citations.map((c) => [c.title, c.year, c.authors, c.url])).toEqual([
      ['Newer paper', 2023, 'Smith, Ann', 'https://example.org/newer'],
      ['Older paper', 2019, 'Doe, Jane; Roe, Richard', 'https://doi.org/10.1000/older'],
      ['Undated paper', undefined, undefined, undefined],
    ]);
  });

  it('keeps only http, https and mailto links', async () => {
    const bib = `@misc{scripted,
  title = {Scripted link},
  url = {javascript:alert(1)}
}

@misc{data,
  title = {Data link},
  url = {data:text/html;base64,PHNjcmlwdD4=}
}

@misc{ftp,
  title = {FTP link},
  url = {ftp://example.org/file}
}

@misc{tel,
  title = {Phone link},
  url = {tel:+4912345}
}

@misc{plain,
  title = {Plain link},
  url = {http://example.org/plain}
}

@misc{mail,
  title = {Mail link},
  url = {mailto:someone@example.org}
}
`;
    const { citations } = await loadCitations(makeDir({ 'refs.bib': bib }));

    expect(Object.fromEntries(citations.map((c) => [c.title, c.url]))).toEqual({
      'Scripted link': undefined,
      'Data link': undefined,
      'FTP link': undefined,
      'Phone link': undefined,
      'Plain link': 'http://example.org/plain',
      'Mail link': 'mailto:someone@example.org',
    });
  });
});

describe('citationTitleHtml', () => {
  it('keeps inline formatting from BibTeX titles', () => {
    const title = 'Genome of <i>Escherichia coli</i> phage';
    expect(citationTitleHtml(title)).toBe(title);
  });

  it('renders scp as small caps', () => {
    expect(citationTitleHtml('<scp>EOSC</scp>-Life')).toBe('<span style="font-variant:small-caps">EOSC</span>-Life');
  });

  it('removes markup outside the inline allowlist', () => {
    expect(citationTitleHtml('Title<script>alert(1)</script><img src=x onerror=alert(1)>')).toBe('Title');
  });

  it('falls back to Untitled', () => {
    expect(citationTitleHtml(undefined)).toBe('Untitled');
    expect(citationTitleHtml('')).toBe('Untitled');
  });
});

describe('loadSubsiteCitations', () => {
  it('keeps only subsites whose BibTeX files have entries', async () => {
    const root = makeDir({});
    const write = (id: string, files: Record<string, string>) => {
      fs.mkdirSync(path.join(root, id, 'citations'), { recursive: true });
      for (const [name, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(root, id, 'citations', name), content);
      }
    };
    write('eu', { 'refs.bib': BIB });
    write('empty-bib', { 'refs.bib': '' });
    write('no-bib', { 'README.md': '# notes' });

    const result = await loadSubsiteCitations(
      [{ id: 'eu' }, { id: 'empty-bib' }, { id: 'no-bib' }, { id: 'no-dir' }],
      root
    );

    expect(result.map(({ subsite, citations }) => [subsite.id, citations.length])).toEqual([['eu', 3]]);
  });
});

describe('groupCitationsByYear', () => {
  it('counts per year, newest first, unknown last', () => {
    const { yearCounts, years } = groupCitationsByYear([
      { year: 2019, raw: {} },
      { raw: {} },
      { year: 2023, raw: {} },
      { year: 2019, raw: {} },
    ]);

    expect(years).toEqual(['2023', '2019', 'unknown']);
    expect(yearCounts).toEqual({ '2023': 1, '2019': 2, unknown: 1 });
  });
});
