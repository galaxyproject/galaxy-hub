import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { groupCitationsByYear, loadCitations } from './citations';

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
