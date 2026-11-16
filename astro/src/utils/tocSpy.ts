/**
 * Scroll-spy for the "On this page" table of contents (TableOfContents.astro).
 *
 * A section is current once its heading has scrolled up to the spy line near the top of
 * the viewport. An IntersectionObserver band around that line triggers the update, so
 * nothing runs on every scroll event.
 */

/** Distance of the spy line from the viewport top: 30% of a short viewport, at most 160px. */
export function spyLine(viewportHeight: number): number {
  return Math.min(160, Math.round(viewportHeight * 0.3));
}

/**
 * Index of the current section: the last heading whose top is at or above `line`.
 * `tops` holds each heading's viewport top, or null when it is missing or hidden.
 * At the end of the page the last heading wins, so short final sections can be current.
 * Returns -1 while no heading has reached the line.
 */
export function pickActive(tops: Array<number | null>, line: number, atEnd: boolean): number {
  let active = -1;
  for (let i = 0; i < tops.length; i++) {
    const top = tops[i];
    if (top === null) continue;
    if (atEnd || top <= line) active = i;
  }
  return active;
}

const CURRENT = 'location';

/**
 * Wire every `.toc-link` on the page (the mobile block and the rail share hrefs) to the
 * headings they point at. Returns a teardown for astro:before-swap.
 */
export function initTocSpy(doc: Document = document): () => void {
  const links = [...doc.querySelectorAll<HTMLAnchorElement>('a.toc-link[href^="#"]')];
  const ids = [...new Set(links.map((link) => decodeURIComponent(link.hash.slice(1))))];
  const headings = ids.map((id) => doc.getElementById(id));
  const view = doc.defaultView;
  if (!view || !('IntersectionObserver' in view) || headings.every((h) => h === null)) return () => {};

  let current = '';
  const update = () => {
    const tops = headings.map((h) => (h && h.offsetParent !== null ? h.getBoundingClientRect().top : null));
    const root = doc.documentElement;
    const atEnd = view.innerHeight + view.scrollY >= root.scrollHeight - 4;
    const index = pickActive(tops, spyLine(view.innerHeight), atEnd);
    const id = index >= 0 ? ids[index] : '';
    if (id === current) return;
    current = id;
    for (const link of links) {
      if (id && decodeURIComponent(link.hash.slice(1)) === id) {
        link.setAttribute('aria-current', CURRENT);
        keepInRail(link);
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  // Rebuilt on resize so the band follows the spy line; any heading entering or leaving
  // it (and the end-of-page sentinel coming into view) re-runs the update.
  let observer: IntersectionObserver | null = null;
  const observe = () => {
    observer?.disconnect();
    const line = spyLine(view.innerHeight);
    const bottom = view.innerHeight - line - 1;
    observer = new view.IntersectionObserver(update, { rootMargin: `0px 0px -${bottom}px 0px` });
    for (const heading of headings) if (heading) observer.observe(heading);
  };
  const end = new view.IntersectionObserver(update);
  const footer = doc.querySelector('.site-footer');
  if (footer) end.observe(footer);

  observe();
  update();
  view.addEventListener('resize', observe);
  // A jump that carries a heading across the whole band in one step fires no
  // intersection change; scrollend catches it.
  view.addEventListener('scrollend', update);
  return () => {
    observer?.disconnect();
    end.disconnect();
    view.removeEventListener('resize', observe);
    view.removeEventListener('scrollend', update);
  };
}

/** Scroll the rail itself (it scrolls when the list is taller than the viewport). */
function keepInRail(link: HTMLElement) {
  const rail = link.closest<HTMLElement>('[data-toc-rail]');
  if (!rail || rail.scrollHeight <= rail.clientHeight) return;
  const linkBox = link.getBoundingClientRect();
  const railBox = rail.getBoundingClientRect();
  if (linkBox.top < railBox.top + 40 || linkBox.bottom > railBox.bottom - 40) {
    rail.scrollTop += linkBox.top - railBox.top - railBox.height / 3;
  }
}
