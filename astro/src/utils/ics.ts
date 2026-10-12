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

// Escape a TEXT value (RFC 5545 3.3.11); CRLF and bare CR become one escaped newline
export function escapeICS(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

// URI values (RFC 5545 3.3.13) take no backslash escaping; drop CR and LF so they cannot end the property
export function formatICSURI(uri: string): string {
  return uri.replace(/[\r\n]/g, '');
}

// Fold long lines (iCal spec: max 75 octets per line)
export function foldLine(line: string): string {
  const maxLength = 75;
  let result = '';
  while (line.length > maxLength) {
    result += line.substring(0, maxLength) + '\r\n ';
    line = line.substring(maxLength);
  }
  result += line;
  return result;
}
