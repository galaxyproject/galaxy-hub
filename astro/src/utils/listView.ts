/**
 * Rows/tiles layout of a listing (news, events), kept in the `view` URL param (DESIGN.md "View Toggle").
 */

export const LIST_VIEWS = ['rows', 'tiles'] as const;
export type ListView = (typeof LIST_VIEWS)[number];

export const LIST_VIEW_PARAM = 'view';
/** Rows is the default and is left out of the URL. */
export const LIST_VIEW_DEFAULT: ListView = 'rows';

/** Read a `view` param; missing or unknown values fall back to rows. */
export function parseListView(value: string | null | undefined): ListView {
  return LIST_VIEWS.find((view) => view === value) ?? LIST_VIEW_DEFAULT;
}
