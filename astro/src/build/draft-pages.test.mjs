import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { collectDraftPaths, isDraftPageUrl } from './draft-pages.mjs';

describe('collectDraftPaths', () => {
  let contentDir;

  const write = (relPath, frontmatter) => {
    const filePath = path.join(contentDir, relPath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, `---\n${frontmatter}\n---\nBody\n`);
  };

  beforeEach(() => {
    contentDir = fs.mkdtempSync(path.join(os.tmpdir(), 'draft-pages-test-'));
  });

  afterEach(() => {
    fs.rmSync(contentDir, { recursive: true, force: true });
  });

  it('returns the URL path of every draft page', () => {
    write('news/news--draft.md', 'slug: news/2020-01-draft\ndraft: true');
    write('events/events--draft.mdx', 'slug: events/2099-01-01-draft\ndraft: true');
    write('articles/draft.md', 'slug: some/draft\ndraft: true');
    expect(collectDraftPaths(contentDir)).toEqual(
      new Set(['/news/2020-01-draft/', '/events/2099-01-01-draft/', '/some/draft/'])
    );
  });

  it('skips pages that are not drafts and inserts', () => {
    write('news/news--live.md', 'slug: news/2020-01-live');
    write('news/news--ready.md', 'slug: news/2020-01-ready\ndraft: false');
    write('inserts/draft-insert.md', 'slug: some/insert\ndraft: true');
    expect(collectDraftPaths(contentDir)).toEqual(new Set());
  });

  it('returns an empty set when the content dir does not exist', () => {
    expect(collectDraftPaths(path.join(contentDir, 'missing'))).toEqual(new Set());
  });
});

describe('isDraftPageUrl', () => {
  const draftPaths = new Set(['/events/2099-01-01-draft/']);

  it('matches the sitemap URL of a draft page', () => {
    expect(isDraftPageUrl('https://galaxyproject.org/events/2099-01-01-draft/', draftPaths)).toBe(true);
  });

  it('matches without the trailing slash', () => {
    expect(isDraftPageUrl('https://galaxyproject.org/events/2099-01-01-draft', draftPaths)).toBe(true);
  });

  it('does not match other pages', () => {
    expect(isDraftPageUrl('https://galaxyproject.org/events/', draftPaths)).toBe(false);
    expect(isDraftPageUrl('https://galaxyproject.org/events/2099-01-01-draft/sub/', draftPaths)).toBe(false);
  });
});
