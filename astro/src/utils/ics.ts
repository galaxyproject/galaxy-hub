// Format date for all-day events (YYYYMMDD)
export function formatICSDateOnly(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

// DTEND of an all-day event: the end date, or the day after the start for one-day events
export function getICSEndDate(start: Date, end: Date | null): Date {
  return end || new Date(start.getTime() + 24 * 60 * 60 * 1000);
}
