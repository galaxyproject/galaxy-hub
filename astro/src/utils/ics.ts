// Format date for iCalendar (YYYYMMDDTHHMMSSZ)
export function formatICSDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

// Format date for all-day events (YYYYMMDD)
export function formatICSDateOnly(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

// DTEND of an all-day event is exclusive: the day after the last day (the start date for one-day events)
export function getICSEndDate(start: Date, end: Date | null): Date {
  return new Date((end || start).getTime() + 24 * 60 * 60 * 1000);
}

// C0 controls except HTAB and LF (RFC 5545 3.3.11 forbids them in values); run after CR normalisation
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const CONTROL_CHARS = /[\x00-\x08\x0B-\x1F\x7F]/g;

// Escape a TEXT value (RFC 5545 3.3.11); CRLF and bare CR become one escaped newline
export function escapeICS(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL_CHARS, '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

// URI values (RFC 5545 3.3.13) take no backslash escaping; drop CR, LF and other control characters so they cannot end the property
export function formatICSURI(uri: string): string {
  return uri.replace(/[\r\n]/g, '').replace(CONTROL_CHARS, '');
}

const encoder = new TextEncoder();

// Fold long lines at 75 UTF-8 octets (RFC 5545 3.1); the continuation space counts, code points stay whole
export function foldLine(line: string): string {
  const maxOctets = 75;
  let result = '';
  let lineOctets = 0;
  for (const char of line) {
    const charOctets = encoder.encode(char).length;
    if (lineOctets + charOctets > maxOctets) {
      result += '\r\n ';
      lineOctets = 1;
    }
    result += char;
    lineOctets += charOctets;
  }
  return result;
}
