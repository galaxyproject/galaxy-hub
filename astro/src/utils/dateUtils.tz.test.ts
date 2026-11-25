import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { formatDate, utcDayOneYearAgo } from './dateUtils';

const zones = ['Pacific/Pago_Pago', 'Pacific/Kiritimati'];
const originalTZ = process.env.TZ;

afterAll(() => {
  if (originalTZ === undefined) delete process.env.TZ;
  else process.env.TZ = originalTZ;
});

describe.each(zones)('in time zone %s', (zone) => {
  beforeAll(() => {
    process.env.TZ = zone;
  });

  it('runs in that zone', () => {
    const offset = new Date(Date.UTC(2026, 9, 18, 22, 0)).getTimezoneOffset();
    expect(offset).toBe(zone === 'Pacific/Pago_Pago' ? 660 : -840);
  });

  it('formats a UTC-midnight date as its UTC day', () => {
    expect(formatDate(new Date('2026-09-22'))).toBe('Sep 22, 2026');
  });

  it('returns UTC midnight one year before the current UTC day', () => {
    const now = new Date('2026-10-18T22:00:00Z');
    expect(utcDayOneYearAgo(now).toISOString()).toBe('2025-10-18T00:00:00.000Z');
  });
});

describe('utcDayOneYearAgo', () => {
  it('rolls 29 February over to 1 March', () => {
    expect(utcDayOneYearAgo(new Date('2028-02-29T12:00:00Z')).toISOString()).toBe('2027-03-01T00:00:00.000Z');
  });
});
