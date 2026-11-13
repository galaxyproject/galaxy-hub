import { describe, it, expect } from 'vitest';
import { eventsCountLine, splitProjectEvents } from './projectEvents';

describe('eventsCountLine', () => {
  it('names the count and the order', () => {
    expect(eventsCountLine(1, 'upcoming event', 'soonest first')).toBe('1 upcoming event, soonest first');
    expect(eventsCountLine(2, 'past event', 'newest first')).toBe('2 past events, newest first');
  });

  it('gives no line for an empty group, so the empty note stands alone', () => {
    expect(eventsCountLine(0, 'upcoming event', 'soonest first')).toBe('');
  });
});

const event = (slug: string, date?: string, end?: string) => ({ data: { slug, date, end } });
const slugs = (events: { data: { slug: string } }[]) => events.map((item) => item.data.slug);

describe('splitProjectEvents', () => {
  const now = new Date('2026-11-11T12:00:00Z');
  const events = [
    event('kickoff', '2026-10-05', '2026-10-06'),
    event('far', '2027-06-01'),
    event('workshop', '2026-11-19', '2026-11-20'),
    event('old', '2025-03-01'),
    event('running', '2026-11-10', '2026-11-12'),
    event('next-month', '2026-12-03'),
  ];

  it('puts the soonest upcoming event first', () => {
    expect(slugs(splitProjectEvents(events, now).upcoming)).toEqual(['running', 'workshop', 'next-month', 'far']);
  });

  it('puts the newest past event first', () => {
    expect(slugs(splitProjectEvents(events, now).past)).toEqual(['kickoff', 'old']);
  });

  it('counts an event as upcoming through its last day', () => {
    const { upcoming, past } = splitProjectEvents([event('today', '2026-11-11')], now);
    expect(slugs(upcoming)).toEqual(['today']);
    expect(past).toEqual([]);
  });

  it('lists undated events last among past ones', () => {
    expect(slugs(splitProjectEvents([event('undated'), event('old', '2025-03-01')], now).past)).toEqual([
      'old',
      'undated',
    ]);
  });
});
