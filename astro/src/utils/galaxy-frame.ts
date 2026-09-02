/**
 * Client-side routing for bare-page links that point back at the Galaxy server
 * embedding them.
 *
 * usegalaxy.eu serves the Hub's bare pages from its own origin (/welcome
 * redirects to /static/welcome.html/), so a page rendered in the welcome frame
 * can reach the Galaxy client running in the parent window. Galaxy keeps its
 * Vue router on `window.Galaxy.router`, and pushing a route there swaps the
 * center panel in place. Navigating with the link instead loads a new document
 * and boots the whole client again — masthead, history panel, config.
 *
 * Links opt in with `data-galaxy-route="/tools/list"` and keep an ordinary href
 * for every case the handoff cannot cover: the page opened outside Galaxy, a
 * cross-origin embed, or a client that does not publish its router.
 */

interface GalaxyRouter {
  push(location: string): unknown;
}

interface GalaxyWindow {
  Galaxy?: { router?: unknown };
}

/**
 * The embedding Galaxy client's router, or null when there is nothing to hand
 * off to: not embedded, embedded cross-origin, or no router published.
 * Exported for unit tests; callers use `routeInEmbeddingGalaxy`.
 */
export function resolveGalaxyRouter(parent: unknown, self: unknown): GalaxyRouter | null {
  if (!parent || parent === self) {
    return null;
  }

  try {
    const router = (parent as GalaxyWindow).Galaxy?.router as GalaxyRouter | undefined;
    return typeof router?.push === 'function' ? router : null;
  } catch {
    // Cross-origin parent: reading it throws, and there is no handoff to make.
    return null;
  }
}

/** A click the browser would handle as plain navigation of the current tab. */
export function isPlainNavigationClick(event: MouseEvent): boolean {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

/** Route the embedding Galaxy client to `path`. False when it could not be done. */
export function routeInEmbeddingGalaxy(path: string): boolean {
  const router = resolveGalaxyRouter(window.parent, window);
  if (!router) {
    return false;
  }

  try {
    // vue-router rejects a redundant navigation; the route still ends up where
    // we asked for, so swallow it rather than falling back to a page load.
    void Promise.resolve(router.push(path)).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

/**
 * Let `a[data-galaxy-route]` links route the embedding Galaxy client instead of
 * reloading it. Call this from BareArticleLayout only.
 */
export function setupGalaxyRouteLinks(): void {
  document.addEventListener('click', (event) => {
    if (!isPlainNavigationClick(event)) {
      return;
    }

    const anchor = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[data-galaxy-route]');
    const path = anchor?.dataset.galaxyRoute;
    if (!path) {
      return;
    }

    if (routeInEmbeddingGalaxy(path)) {
      event.preventDefault();
    }
  });
}
