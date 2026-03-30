import { describe, it, expect } from 'vitest';
import { isPublishedDate } from './dateUtils';

describe('isPublishedDate', () => {
  const now = new Date('2025-06-15T12:00:00Z');

  it('returns true for undefined date', () => {
    expect(isPublishedDate(undefined, now)).toBe(true);
  });

  it('returns true for date in the past', () => {
    expect(isPublishedDate(new Date('2025-06-01'), now)).toBe(true);
    expect(isPublishedDate('2025-06-01', now)).toBe(true);
  });

  it('returns true for date equal to now', () => {
    expect(isPublishedDate(now, now)).toBe(true);
  });

  it('returns false for date in the future', () => {
    expect(isPublishedDate(new Date('2025-06-20'), now)).toBe(false);
    expect(isPublishedDate('2025-06-20', now)).toBe(false);
  });

  it('handles string dates correctly', () => {
    expect(isPublishedDate('2025-01-01', now)).toBe(true);
    expect(isPublishedDate('2025-12-31', now)).toBe(false);
  });

  it('handles ISO date strings', () => {
    expect(isPublishedDate('2025-06-14T23:59:59Z', now)).toBe(true);
    expect(isPublishedDate('2025-06-15T12:00:01Z', now)).toBe(false);
  });
});
