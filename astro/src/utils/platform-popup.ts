import { escapeHtml } from './search-highlight';
import { safeHref } from './url';

export interface PlatformPopupFields {
  title: unknown;
  /** Logo URL; empty for no logo. */
  imageSrc: unknown;
  /** Summary as plain text; empty for no summary. */
  summaryText: unknown;
  location: { city?: unknown; region?: unknown; country_name?: unknown };
  path: unknown;
}

// The popup is assigned to innerHTML, so every interpolated value is escaped.
const esc = (value: unknown) => escapeHtml(String(value));

/** HTML for a platform map popup. */
export function platformPopupHtml({ title, imageSrc, summaryText, location, path }: PlatformPopupFields): string {
  return `
                <div class="popup-header">
                    ${imageSrc ? `<img src="${esc(imageSrc)}" alt="${esc(title)}" class="popup-logo" />` : ''}
                    <h6>${esc(title)}</h6>
                </div>
                ${summaryText ? `<p class="popup-summary">${esc(summaryText)}</p>` : ''}
                <div class="popup-location">
                    <strong>Location:</strong> ${esc(location.city)}, ${esc(location.region)}, ${esc(location.country_name)}
                </div>
                <a href="${esc(safeHref(path) ?? '#')}" class="inline-block px-4 py-2 text-sm font-medium rounded-md transition-colors bg-galaxy-primary text-white hover:bg-galaxy-primary/90 mt-2" target="_new">View Details</a>
                <button class="popup-close" aria-label="Close popup">&times;</button>
            `;
}
