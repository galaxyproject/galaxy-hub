import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { escapeICS, foldLine, formatICSDate, formatICSDateOnly, formatICSURI, getICSEndDate } from '../../utils/ics';
import { utcDayOneYearAgo } from '../../utils/dateUtils';

export async function GET(context: APIContext) {
  const events = await getCollection('events');

  const now = new Date();
  const oneYearAgo = utcDayOneYearAgo(now);

  // Get events from the past year and all future events
  const relevantEvents = events
    .filter((e) => {
      const eventDate = e.data.date instanceof Date ? e.data.date : new Date(e.data.date || '');
      return eventDate >= oneYearAgo;
    })
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime(); // Future events first
    });

  const siteUrl = (context.site?.toString() || 'https://galaxyproject.org').replace(/\/$/, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Galaxy Project//Galaxy Events Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Galaxy Events',
    'X-WR-CALDESC:Events from the Galaxy Project community',
  ];

  for (const event of relevantEvents) {
    const startDate = event.data.date instanceof Date ? event.data.date : new Date(event.data.date || 0);
    const endDate = event.data.end instanceof Date ? event.data.end : event.data.end ? new Date(event.data.end) : null;

    let location = '';
    if (event.data.location) {
      if (typeof event.data.location === 'string') {
        location = event.data.location;
      } else if (event.data.location.name) {
        location = event.data.location.name;
      }
    }

    const uid = `${event.data.slug}@galaxyproject.org`;
    // slug already includes "events/" prefix, so don't add it again
    const slug = event.data.slug || event.id;
    const pathSlug = slug.startsWith('events/') ? slug : `events/${slug}`;
    const url = `${siteUrl}/${pathSlug}/`;
    const title = event.data.title || 'Untitled Event';
    const description = event.data.tease || '';

    icsContent.push('BEGIN:VEVENT');
    icsContent.push(foldLine(`UID:${escapeICS(uid)}`));
    icsContent.push(foldLine(`DTSTAMP:${formatICSDate(now)}`));
    icsContent.push(foldLine(`DTSTART;VALUE=DATE:${formatICSDateOnly(startDate)}`));
    icsContent.push(foldLine(`DTEND;VALUE=DATE:${formatICSDateOnly(getICSEndDate(startDate, endDate))}`));
    icsContent.push(foldLine(`SUMMARY:${escapeICS(title)}`));
    if (description) {
      icsContent.push(foldLine(`DESCRIPTION:${escapeICS(description)}`));
    }
    if (location) {
      icsContent.push(foldLine(`LOCATION:${escapeICS(location)}`));
    }
    icsContent.push(foldLine(`URL:${formatICSURI(url)}`));
    icsContent.push('END:VEVENT');
  }

  icsContent.push('END:VCALENDAR');

  return new Response(icsContent.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="galaxy-events.ics"',
    },
  });
}
