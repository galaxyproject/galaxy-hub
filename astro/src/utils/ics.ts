// Format date for all-day events (YYYYMMDD)
export function formatICSDateOnly(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

// DTEND of an all-day event is exclusive: the day after the last day (the start date for one-day events)
export function getICSEndDate(start: Date, end: Date | null): Date {
  return new Date((end || start).getTime() + 24 * 60 * 60 * 1000);
}
