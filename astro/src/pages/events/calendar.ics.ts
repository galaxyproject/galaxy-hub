import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { normalizeSlug } from '../../utils/slug';

// Format date for iCalendar (YYYYMMDDTHHMMSSZ)
function formatICSDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

// Format date for all-day events (YYYYMMDD)
function formatICSDateOnly(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

// Escape special characters for iCalendar
function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

// Fold long lines (iCal spec: max 75 octets per line)
function foldLine(line: string): string {
  const maxLength = 75;
  let result = '';
  while (line.length > maxLength) {
    result += line.substring(0, maxLength) + '\r\n ';
    line = line.substring(maxLength);
  }
  result += line;
  return result;
}

export async function GET(context: APIContext) {
  const events = await getCollection('events');

  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

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

    // Use end date or default to same day
    const effectiveEnd = endDate || new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    let location = '';
    if (event.data.location) {
      if (typeof event.data.location === 'string') {
        location = event.data.location;
      } else if (event.data.location.name) {
        location = event.data.location.name;
      }
    }

    const normalizedSlug = normalizeSlug(event.data.slug || event.id);
    const uid = `${normalizedSlug}@galaxyproject.org`;
    // slug already includes "events/" prefix, so don't add it again
    const pathSlug = normalizedSlug.startsWith('events/') ? normalizedSlug : `events/${normalizedSlug}`;
    const url = `${siteUrl}/${pathSlug}/`;
    const title = event.data.title || 'Untitled Event';
    const description = event.data.tease || '';

    icsContent.push('BEGIN:VEVENT');
    icsContent.push(foldLine(`UID:${uid}`));
    icsContent.push(foldLine(`DTSTAMP:${formatICSDate(now)}`));
    icsContent.push(foldLine(`DTSTART;VALUE=DATE:${formatICSDateOnly(startDate)}`));
    icsContent.push(foldLine(`DTEND;VALUE=DATE:${formatICSDateOnly(effectiveEnd)}`));
    icsContent.push(foldLine(`SUMMARY:${escapeICS(title)}`));
    if (description) {
      icsContent.push(foldLine(`DESCRIPTION:${escapeICS(description)}`));
    }
    if (location) {
      icsContent.push(foldLine(`LOCATION:${escapeICS(location)}`));
    }
    icsContent.push(foldLine(`URL:${url}`));
    icsContent.push('END:VEVENT');
  }

  icsContent.push('END:VCALENDAR');

  return new Response(icsContent.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="galaxy-events.ics"',
    },
  });
}
