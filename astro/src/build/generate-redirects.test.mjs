import { describe, it, expect, vi } from 'vitest';
import { normalizeRedirectTarget, hasFileExtension, contentRedirect } from './generate-redirects.mjs';

describe('redirect normalization helpers', () => {
  describe('hasFileExtension', () => {
    it('returns true for paths with file extensions', () => {
      expect(hasFileExtension('/eu/events/calendar.ics')).toBe(true);
      expect(hasFileExtension('/events-ical.html')).toBe(true);
      expect(hasFileExtension('/some/path/file.txt')).toBe(true);
    });

    it('returns false for paths without file extensions', () => {
      expect(hasFileExtension('/eu/events/')).toBe(false);
      expect(hasFileExtension('/eu/events')).toBe(false);
    });
  });

  describe('normalizeRedirectTarget', () => {
    it('appends a trailing slash to ordinary internal page targets', () => {
      expect(normalizeRedirectTarget('/eu/events')).toBe('/eu/events/');
      expect(normalizeRedirectTarget('/news')).toBe('/news/');
    });

    it('preserves external URLs', () => {
      expect(normalizeRedirectTarget('https://usegalaxy.org/bushman')).toBe('https://usegalaxy.org/bushman');
      expect(normalizeRedirectTarget('http://gcc2015.tsl.ac.uk/')).toBe('http://gcc2015.tsl.ac.uk/');
    });

    it('preserves trailing-slash targets', () => {
      expect(normalizeRedirectTarget('/eu/events/')).toBe('/eu/events/');
      expect(normalizeRedirectTarget('/')).toBe('/');
    });

    it('preserves file-extension targets', () => {
      expect(normalizeRedirectTarget('/eu/events/calendar.ics')).toBe('/eu/events/calendar.ics');
      expect(normalizeRedirectTarget('/events-ical.html')).toBe('/events-ical.html');
    });
  });

  describe('contentRedirect', () => {
    it('maps internal redirect paths', () => {
      expect(contentRedirect('va/ash', '/use/')).toEqual({ from: '/va/ash/', to: '/use/' });
      expect(contentRedirect('package-recipes', 'toolshed/package-recipes')).toEqual({
        from: '/package-recipes/',
        to: '/toolshed/package-recipes/',
      });
    });

    it('keeps external redirect URLs', () => {
      expect(
        contentRedirect('admin/training', 'https://training.galaxyproject.org/training-material/topics/admin/')
      ).toEqual({
        from: '/admin/training/',
        to: 'https://training.galaxyproject.org/training-material/topics/admin/',
      });
    });

    it('turns same-site URLs into paths', () => {
      expect(contentRedirect('old/page', 'https://galaxyproject.org/new/page/')).toEqual({
        from: '/old/page/',
        to: '/new/page/',
      });
    });

    it('drops redirects that point back to the page itself', () => {
      expect(
        contentRedirect('events/gcc2021/training', 'https://galaxyproject.org/events/gcc2021/training/')
      ).toBeNull();
      expect(contentRedirect('use', '/use')).toBeNull();
    });

    it('treats a path with a url in its query as a path', () => {
      expect(contentRedirect('login', '/auth?next=https://galaxyproject.org/')).toEqual({
        from: '/login/',
        to: '/auth?next=https://galaxyproject.org/',
      });
    });

    it('skips invalid absolute urls instead of throwing', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      expect(contentRedirect('old/page', 'https://')).toBeNull();
      expect(contentRedirect('old/page', 'ftp://example.org/file')).toBeNull();
      expect(warn).toHaveBeenCalledTimes(2);
      warn.mockRestore();
    });
  });
});
