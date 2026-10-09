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
}
