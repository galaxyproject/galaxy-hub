import { describe, it, expect } from 'vitest';
import { normalizeRedirectTarget, hasFileExtension } from './generate-redirects.mjs';

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
});
