export interface YearOption {
  year: number;
  count: number;
}

/** A selected year, `'unknown'` for entries without a year, or `null` for all years. */
export type YearValue = number | 'unknown' | null;

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}
