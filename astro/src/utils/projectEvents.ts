/**
 * Order of events on project pages: upcoming events soonest first (the next one leads), then past
 * events newest first. An event counts as upcoming through its last day.
 */
import { isUpcomingEvent } from './dateUtils';

type EventLike = { data: { date?: Date | string | null; end?: Date | string | null } };

function time(value?: Date | string | null): number {
  const parsed = value ? new Date(value).getTime() : NaN;
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function splitProjectEvents<T extends EventLike>(events: T[], now: Date): { upcoming: T[]; past: T[] } {
  const upcoming: T[] = [];
  const past: T[] = [];
  for (const event of events) {
    (isUpcomingEvent(event.data.date, event.data.end, now) ? upcoming : past).push(event);
  }
  upcoming.sort((a, b) => time(a.data.date) - time(b.data.date));
  past.sort((a, b) => time(b.data.date) - time(a.data.date));
  return { upcoming, past };
}
