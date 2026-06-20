/**
 * Shared config for the GCC2026 CoFest live board.
 *
 * Project data is fetched client-side from a published Google Sheet CSV so
 * organizers can edit it live during the event without a redeploy. To repoint
 * the board at a different sheet:
 *   1. Open the Google Sheet
 *   2. File > Share > Publish to web
 *   3. Pick the sheet tab and choose "Comma-separated values (.csv)"
 *   4. Publish, copy the URL, and paste it below
 *
 * Both the inline board (CofestBoard.astro) and the kiosk page
 * (pages/events/gcc2026/cofest/board.astro) import from here, so the URL and
 * event details only need to be updated in one place.
 */
export const COFEST_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQLur85FWBMU7Kq9hAnH5sbNJOZ51LlUrYKDatOtSsugu0F-k9w-uqD0Lh15QJR9IhJA8_Wx9IMByIC/pub?gid=1847317213&single=true&output=csv';

export const COFEST_DATE = 'June 25–26, 2026';
export const COFEST_LOCATION = 'Clermont-Ferrand, France';
export const COFEST_EVENT_NAME = 'GCC 2026';
