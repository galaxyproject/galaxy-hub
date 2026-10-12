import { test, expect } from '@playwright/test';

const FEEDS = ['/events/calendar.ics', '/eu/events/calendar.ics'];

for (const path of FEEDS) {
  test(`${path} ends every event after it starts`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);

    const ics = (await response.text()).replace(/\r\n /g, '');
    const events = ics.split('BEGIN:VEVENT').slice(1);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      const uid = event.match(/^UID:(.*)$/m)?.[1];
      const start = event.match(/^DTSTART;VALUE=DATE:(\d{8})/m)?.[1];
      const end = event.match(/^DTEND;VALUE=DATE:(\d{8})/m)?.[1];
      expect(start, `${uid} DTSTART`).toBeDefined();
      expect(end, `${uid} DTEND`).toBeDefined();
      expect(Number(end), `${uid} DTEND is exclusive`).toBeGreaterThan(Number(start));
    }
  });

  test(`${path} has CRLF line endings and lines of at most 75 octets`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body.endsWith('\r\n'), 'ends with CRLF').toBe(true);
    expect(body.replace(/\r\n/g, ''), 'no bare CR or LF').not.toMatch(/[\r\n]/);

    const lines = body.split('\r\n').slice(0, -1);
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) {
      expect(Buffer.byteLength(line, 'utf8'), line).toBeLessThanOrEqual(75);
    }
  });
}
