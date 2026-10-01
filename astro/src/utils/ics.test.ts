import { describe, expect, it } from 'vitest';
import { formatICSDateOnly, getICSEndDate } from './ics';

function icsEnd(start: string, end: string | null): string {
  return formatICSDateOnly(getICSEndDate(new Date(start), end ? new Date(end) : null));
}

describe('getICSEndDate', () => {
  it('ends one-day events on the day after the start', () => {
    expect(icsEnd('2026-10-12', null)).toBe('20261013');
    expect(icsEnd('2026-10-12', '2026-10-12')).toBe('20261013');
  });

  it('ends multi-day events on the day after the last day', () => {
    expect(icsEnd('2026-10-12', '2026-10-16')).toBe('20261017');
  });

  it('rolls over months, years and leap days', () => {
    expect(icsEnd('2026-12-28', '2026-12-31')).toBe('20270101');
    expect(icsEnd('2028-02-26', '2028-02-28')).toBe('20280229');
  });
});
