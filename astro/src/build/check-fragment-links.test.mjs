import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  findFragmentLinks,
  idsFromHtml,
  pageIds,
  shouldSkipFragment,
  escapeId,
  closestIds,
  checkPage,
  checkFile,
  mayHaveFragmentLinks,
  markComponentTags,
  loadBypass,
  bypassKey,
  collectProblems,
  formatReport,
} from './check-fragment-links.mjs';

function tempContentDir(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fragment-links-'));
  for (const [rel, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), text);
  }
  return dir;
}

describe('fragment-link lint helpers', () => {
  describe('findFragmentLinks', () => {
    it('finds inline links, definitions and inline-HTML hrefs with their lines', () => {
      const body = [
        '- [Tools](#tools)',
        '',
        'See [the table][t].',
        '',
        '[t]: #tables',
        '',
        '<p>Back to <a href="#intro">intro</a></p>',
      ].join('\n');
      expect(findFragmentLinks(body)).toEqual([
        { line: 1, fragment: 'tools' },
        { line: 5, fragment: 'tables' },
        { line: 7, fragment: 'intro' },
      ]);
    });

    it('reports the line of an href inside a multi-line HTML block', () => {
      const body = '<div>\n<p>\n<a href="#later">x</a>\n</p>\n</div>';
      expect(findFragmentLinks(body)).toEqual([{ line: 3, fragment: 'later' }]);
    });

    it('ignores code, HTML comments and external links', () => {
      const body = [
        '`[x](#inline-code)`',
        '',
        '```',
        '[x](#fenced)',
        '```',
        '',
        '<!-- <a href="#commented">x</a> -->',
        '',
        '[x](https://example.org/#external) [y](/other/#page)',
      ].join('\n');
      expect(findFragmentLinks(body)).toEqual([]);
    });

    it('finds unquoted, upper-case and spaced hrefs and angle-bracket definitions', () => {
      const body = [
        '<a href=#bare>x</a>',
        '<A HREF="#upper">x</A>',
        '<a href = "#spaced">x</a>',
        '<a data-href="#data">x</a>',
        '',
        '[a]: <#angle>',
      ].join('\n');
      expect(findFragmentLinks(body)).toEqual([
        { line: 1, fragment: 'bare' },
        { line: 2, fragment: 'upper' },
        { line: 3, fragment: 'spaced' },
        { line: 6, fragment: 'angle' },
      ]);
    });

    it('ignores links inside JSX comments that preprocess strips', () => {
      expect(findFragmentLinks('{/* [x](#gone) */}\n\n[y](#kept)')).toEqual([{ line: 3, fragment: 'kept' }]);
    });
  });

  describe('mayHaveFragmentLinks', () => {
    it('lets through every link form the check reads', () => {
      expect(mayHaveFragmentLinks('[x](#a)')).toBe(true);
      expect(mayHaveFragmentLinks('<a href=#a>x</a>')).toBe(true);
      expect(mayHaveFragmentLinks('<A HREF="#a">x</A>')).toBe(true);
      expect(mayHaveFragmentLinks('<a href = "#a">x</a>')).toBe(true);
      expect(mayHaveFragmentLinks('text\n[a]: <#a>')).toBe(true);
    });

    it('skips pages with only cross-page links', () => {
      expect(mayHaveFragmentLinks('[x](https://example.org/#a) [y](/page/#b)')).toBe(false);
    });
  });

  describe('idsFromHtml', () => {
    it('ignores data-id and data-name attributes', () => {
      const html = '<div data-id="d1" id="real"></div><a data-name="d2" href="#x"></a>';
      expect([...idsFromHtml(html)]).toEqual(['real']);
    });

    it('collects id on any element and name only on anchors', () => {
      const html = '<h2 id="a&#x26;b">x</h2><a name="old"></a><input name="field"><div id="box"></div>';
      expect([...idsFromHtml(html)].sort()).toEqual(['a&b', 'box', 'old']);
    });
  });

  describe('pageIds', () => {
    it('keeps the invisible variation selector that emoji headings leave in the slug', async () => {
      const ids = await pageIds('# \u{1F6E0}\uFE0F Tools\n\n# \u{1F4C5} Events\n', {});
      expect(ids.has('\uFE0F-tools')).toBe(true);
      expect(ids.has('-tools')).toBe(false);
      expect(ids.has('-events')).toBe(true);
    });

    it('keeps a leading letter-class symbol in the slug', async () => {
      const ids = await pageIds('# \u1BD3\u27A4 Join us\n', {});
      expect(ids.has('\u1BD3-join-us')).toBe(true);
    });

    it('numbers duplicate headings and resets the slugger for each page', async () => {
      const first = await pageIds('## Intro\n\n## Intro\n', {});
      const second = await pageIds('## Intro\n', {});
      expect([...first].sort()).toEqual(['intro', 'intro-1']);
      expect([...second]).toEqual(['intro']);
    });

    it('applies smartypants before slugging, as the site does', async () => {
      const ids = await pageIds("## Don't -- stop\n", {});
      expect([...ids]).toEqual(['dont--stop']);
    });

    it('adds explicit ids and anchor names from inline HTML', async () => {
      const ids = await pageIds('<a name="legacy"></a>\n\n<div id="box">x</div>\n', {});
      expect(ids.has('legacy')).toBe(true);
      expect(ids.has('box')).toBe(true);
    });

    it('does not count component props as ids on components pages', async () => {
      const body = '<HarnessGuide id="claude-code" name="x">\n\n#### Install\n\n</HarnessGuide>\n';
      expect([...(await pageIds(body, { components: true }))]).toEqual(['install']);
      expect((await pageIds(body, {})).has('claude-code')).toBe(true);
    });

    it('leaves component names in code untouched on components pages', async () => {
      const ids = await pageIds('## The `<Button>` component\n', { components: true });
      expect([...ids]).toEqual(['the-button-component']);
    });

    it('includes the heading that autotoc inserts', async () => {
      const ids = await pageIds('## Usage\n', { autotoc: true });
      expect([...ids].sort()).toEqual(['table-of-contents', 'usage']);
      expect([...(await pageIds('## Usage\n', {}))]).toEqual(['usage']);
    });

    describe('with slot inserts', () => {
      let dir;
      beforeAll(() => {
        dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fragment-links-'));
        fs.mkdirSync(path.join(dir, 'parts'));
        fs.writeFileSync(path.join(dir, 'parts', 'notice.md'), '---\n---\n\n## Notice\n');
      });
      afterAll(() => {
        fs.rmSync(dir, { recursive: true, force: true });
      });

      it('includes headings from inlined inserts', async () => {
        const ids = await pageIds('<slot name="/parts/notice" />\n\n## Notice\n', {}, dir);
        expect([...ids].sort()).toEqual(['notice', 'notice-1']);
      });
    });
  });

  describe('shouldSkipFragment', () => {
    it('skips empty, top and script-state fragments', () => {
      expect(shouldSkipFragment('')).toBe(true);
      expect(shouldSkipFragment('top')).toBe(true);
      expect(shouldSkipFragment('scope=all')).toBe(true);
      expect(shouldSkipFragment('/tab/2')).toBe(true);
      expect(shouldSkipFragment('tools')).toBe(false);
    });
  });

  describe('escapeId', () => {
    it('shows non-ASCII code points as escapes', () => {
      expect(escapeId('\uFE0F-tools')).toBe('\\uFE0F-tools');
      expect(escapeId('\u1BD3-join')).toBe('\\u1BD3-join');
      expect(escapeId('\u{1F6E0}')).toBe('\\u{1F6E0}');
      expect(escapeId('plain-id')).toBe('plain-id');
    });
  });

  describe('closestIds', () => {
    it('prefers ids that only differ by invisible characters', () => {
      expect(closestIds('-tools', ['tutorials', '\uFE0F-tools', 'tools-1'])).toEqual(['\uFE0F-tools']);
    });

    it('falls back to the two nearest ids by edit distance', () => {
      expect(closestIds('tag', ['tags', 'tables', 'zzzzzzzz'])).toEqual(['tags', 'tables']);
    });

    it('returns nothing when the page has no ids', () => {
      expect(closestIds('x', [])).toEqual([]);
    });
  });

  describe('checkPage', () => {
    it('reports broken fragments with the closest real id and skips allowed ones', async () => {
      const raw = [
        '---',
        'title: T',
        '---',
        '',
        '- [Tools](#-tools)',
        '- [Top](#top)',
        '- [Events](#-events)',
        '- [Filter](#scope=all)',
        '',
        '# \u{1F6E0}\uFE0F Tools',
        '',
        '# \u{1F4C5} Events',
      ].join('\n');
      const problems = await checkPage(raw);
      expect(problems).toEqual([{ rel: 'index.md', line: 5, fragment: '-tools', closest: ['\uFE0F-tools'] }]);
    });

    it('skips pages that redirect instead of rendering', async () => {
      expect(await checkPage('---\nredirect: /learn\n---\n\n[x](#missing)\n')).toEqual([]);
    });

    it('matches percent-encoded fragments against decoded ids', async () => {
      expect(await checkPage('[x](#caf%C3%A9)\n\n## Caf\u00E9\n')).toEqual([]);
    });
  });

  describe('markComponentTags', () => {
    it('renames component tags in HTML but not in code', () => {
      const md = '<Tabs id="t">\n\n`<Tabs>` and\n\n```\n<Tabs>\n```\n\n</Tabs>\n';
      expect(markComponentTags(md)).toBe(
        '<x-component-Tabs id="t">\n\n`<Tabs>` and\n\n```\n<Tabs>\n```\n\n</x-component-Tabs>\n'
      );
    });
  });

  describe('loadBypass', () => {
    it('returns an empty set when there is no bypass file', () => {
      const dir = tempContentDir({});
      expect(loadBypass(dir)).toEqual(new Set());
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('reads a JSON array of keys', () => {
      const dir = tempContentDir({ '.fragment-link-bypass': '["a/index.md#x"]' });
      expect(loadBypass(dir)).toEqual(new Set(['a/index.md#x']));
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('fails on malformed JSON or a non-array', () => {
      const bad = tempContentDir({ '.fragment-link-bypass': '["a/index.md#x",' });
      const obj = tempContentDir({ '.fragment-link-bypass': '{"a": 1}' });
      expect(() => loadBypass(bad)).toThrow(/\.fragment-link-bypass/);
      expect(() => loadBypass(obj)).toThrow(/array of strings/);
      fs.rmSync(bad, { recursive: true, force: true });
      fs.rmSync(obj, { recursive: true, force: true });
    });
  });

  describe('bypassKey', () => {
    it('is ASCII JSON that parses back to the exact key', () => {
      const key = bypassKey('bare/eu/index.md', '\uFE0F-tools\u{1F6E0}');
      expect(key).toMatch(/^[\x20-\x7e]+$/);
      expect(JSON.parse(key)).toBe('bare/eu/index.md#\uFE0F-tools\u{1F6E0}');
    });
  });

  describe('checkFile', () => {
    let dir;
    beforeAll(() => {
      dir = tempContentDir({
        'page/index.md': '---\ntitle: P\n---\n\n<slot name="/parts/links" />\n\n## Here\n',
        'parts/links.md': '---\n---\n\n[ok](#here)\n[bad](#gone)\n',
        'broken/index.md/keep': '',
      });
    });
    afterAll(() => {
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('checks links in inserts against the page that includes them', async () => {
      expect(await checkFile('page/index.md', dir)).toEqual([
        { rel: 'parts/links.md', page: 'page/index.md', line: 5, fragment: 'gone', closest: ['here'] },
      ]);
    });

    it('names the page when it cannot be checked', async () => {
      await expect(checkFile('broken/index.md', dir)).rejects.toThrow('content/broken/index.md');
    });
  });

  describe('inserts nested along several paths', () => {
    let dir;
    beforeAll(() => {
      dir = tempContentDir({
        'page/index.md': '<slot name="/parts/a" />\n\n<slot name="/parts/b" />\n\n## Here\n',
        'parts/a.md': '<slot name="/parts/b" />\n',
        'parts/b.md': '<slot name="/parts/c" />\n',
        'parts/c.md': '<slot name="/parts/d" />\n',
        'parts/d.md': '[bad](#gone)\n',
      });
    });
    afterAll(() => {
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('follows an insert reached again at a shallower depth, as preprocess does', async () => {
      expect(await checkFile('page/index.md', dir)).toEqual([
        { rel: 'parts/d.md', page: 'page/index.md', line: 1, fragment: 'gone', closest: ['here'] },
      ]);
    });
  });

  describe('collectProblems and formatReport', () => {
    let dir;
    beforeAll(() => {
      dir = tempContentDir({
        'one/index.md': '<slot name="/parts/shared" />\n\n## One\n',
        'two/index.md': '<slot name="/parts/shared" />\n\n## Two\n',
        'parts/shared.md': '[bad](#gone)\n',
        'ok/index.md': '[x](#fine)\n\n## Fine\n',
      });
    });
    afterAll(() => {
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('reports an insert once for each page that includes it', async () => {
      const problems = await collectProblems(['two/index.md', 'one/index.md', 'ok/index.md'], dir, new Set());
      expect(problems.map(({ rel, page }) => [rel, page])).toEqual([
        ['parts/shared.md', 'one/index.md'],
        ['parts/shared.md', 'two/index.md'],
      ]);
    });

    it('drops links listed in the bypass set', async () => {
      const bypassed = new Set(['parts/shared.md#gone']);
      expect(await collectProblems(['one/index.md', 'two/index.md'], dir, bypassed)).toEqual([]);
    });

    it('exits 0 when every link resolves and 1 with a row per problem otherwise', async () => {
      expect(formatReport([]).exitCode).toBe(0);
      const report = formatReport(await collectProblems(['one/index.md'], dir, new Set()));
      expect(report.exitCode).toBe(1);
      expect(report.text).toContain('content/parts/shared.md:1  #gone on content/one/index.md');
      expect(report.text).toContain('bypass key: "parts/shared.md#gone"');
    });
  });
});
