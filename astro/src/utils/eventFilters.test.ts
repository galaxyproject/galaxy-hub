import { describe, expect, it } from 'vitest';
import { eventSearchText, eventTags, parseEventStatus } from './eventFilters';

describe('parseEventStatus', () => {
  it('reads upcoming and past', () => {
    expect(parseEventStatus('upcoming')).toBe('upcoming');
    expect(parseEventStatus('past')).toBe('past');
  });

  it('treats missing, empty and unknown values as all events', () => {
    expect(parseEventStatus(null)).toBeNull();
    expect(parseEventStatus(undefined)).toBeNull();
    expect(parseEventStatus('')).toBeNull();
    expect(parseEventStatus('all')).toBeNull();
    expect(parseEventStatus('Upcoming')).toBeNull();
  });
});

describe('eventTags', () => {
  it('accepts a list or a single string', () => {
    expect(eventTags(['training', 'webinar'])).toEqual(['training', 'webinar']);
    expect(eventTags('training')).toEqual(['training']);
  });

  it('trims, drops blanks and duplicates', () => {
    expect(eventTags([' training ', '', 'training', '  ', 'cofest'])).toEqual(['training', 'cofest']);
  });

  it('returns an empty list without tags', () => {
    expect(eventTags(undefined)).toEqual([]);
    expect(eventTags(null)).toEqual([]);
    expect(eventTags('')).toEqual([]);
  });
});

describe('eventSearchText', () => {
  it('joins title, summary and a location string, lower-cased', () => {
    expect(eventSearchText({ title: 'GCC 2026', tease: 'Annual Meeting', location: 'Clermont-Ferrand' })).toBe(
      'gcc 2026 annual meeting clermont-ferrand'
    );
  });

  it('uses the name, city, region and country of a location object', () => {
    const text = eventSearchText({
      title: 'Training',
      location: { name: 'Uni Freiburg', city: 'Freiburg', region: 'BW', country: 'Germany' },
    });
    expect(text).toBe('training uni freiburg freiburg bw germany');
  });

  it('skips missing parts', () => {
    expect(eventSearchText({ title: 'Webinar' })).toBe('webinar');
    expect(eventSearchText({ title: 'Webinar', location: { city: null, country: 'France' } })).toBe('webinar france');
  });
});
