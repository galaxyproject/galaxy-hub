/**
 * English country name for an ISO 3166-1 alpha-2 code (DE -> Germany), resolved at build time with
 * Intl.DisplayNames. Text that is not a two-letter code is kept as written.
 */
const names = new Intl.DisplayNames(['en'], { type: 'region', fallback: 'code' });

export function countryName(code: string): string {
  const value = code.trim();
  if (!/^[a-z]{2}$/i.test(value)) return value;
  return names.of(value.toUpperCase()) ?? value;
}
