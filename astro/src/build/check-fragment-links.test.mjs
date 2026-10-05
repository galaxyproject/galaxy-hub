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
} from './check-fragment-links.mjs';

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

    it('ignores links inside JSX comments that preprocess strips', () => {
      expect(findFragmentLinks('{/* [x](#gone) */}\n\n[y](#kept)')).toEqual([{ line: 3, fragment: 'kept' }]);
    });
  });

  describe('idsFromHtml', () => {
    it('collects id on any element and name only on anchors', () => {
      const html = '<h2 id="a&#x26;b">x</h2><a name="old"></a><input name="field"><div id="box"></div>';
      expect([...idsFromHtml(html)].sort()).toEqual(['a&b', 'box', 'old']);
    });
  });

  describe('pageIds', () => {
    it('keeps the invisible variation selector that emoji headings leave in the slug', async () => {
      const ids = await pageIds('# 🛠️ Tools\n\n# 📅 Events\n', {});
      expect(ids.has('️-tools')).toBe(true);
      expect(ids.has('-tools')).toBe(false);
      expect(ids.has('-events')).toBe(true);
    });

    it('keeps a leading letter-class symbol in the slug', async () => {
      const ids = await pageIds('# ᯓ➤ Join us\n', {});
      expect(ids.has('ᯓ-join-us')).toBe(true);
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
      expect(escapeId('️-tools')).toBe('\\uFE0F-tools');
      expect(escapeId('ᯓ-join')).toBe('\\u1BD3-join');
      expect(escapeId('\u{1F6E0}')).toBe('\\u{1F6E0}');
      expect(escapeId('plain-id')).toBe('plain-id');
    });
  });

  describe('closestIds', () => {
    it('prefers ids that only differ by invisible characters', () => {
      expect(closestIds('-tools', ['tutorials', '️-tools', 'tools-1'])).toEqual(['️-tools']);
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
        '# 🛠️ Tools',
        '',
        '# 📅 Events',
      ].join('\n');
      const problems = await checkPage(raw);
      expect(problems).toEqual([{ line: 5, fragment: '-tools', closest: ['️-tools'] }]);
    });

    it('skips pages that redirect instead of rendering', async () => {
      expect(await checkPage('---\nredirect: /learn\n---\n\n[x](#missing)\n')).toEqual([]);
    });

    it('matches percent-encoded fragments against decoded ids', async () => {
      expect(await checkPage('[x](#caf%C3%A9)\n\n## Café\n')).toEqual([]);
    });
  });
});
