/**
 * Link target defaults for bare pages.
 *
 * Bare pages are embedded as iframes by the Galaxy servers they describe:
 * usegalaxy.eu loads /bare/eu/usegalaxy/main/ inside its welcome frame. A link
 * without a target navigates that iframe, so the Hub — sidebar, navbar and all —
 * ends up rendered inside the server, and a link back to the server renders a
 * Galaxy inside Galaxy. Neither is ever wanted from an embed, so every link that
 * leaves the current page opens in a new tab unless the author set a target.
 */

/** Links that stay on the page (in-page anchors) or hand off to another app. */
const KEEPS_CURRENT_PAGE = /^(#|mailto:|tel:|sms:|javascript:)/i;

/**
 * True when a bare-page link should be forced into a new tab.
 * Exported for unit tests; callers use `setupBareLinkTargets`.
 */
export function shouldOpenInNewTab(href: string | null | undefined): boolean {
  const trimmed = href?.trim();
  if (!trimmed) {
    return false;
  }
  return !KEEPS_CURRENT_PAGE.test(trimmed);
}

function applyTarget(anchor: HTMLAnchorElement): void {
  if (anchor.hasAttribute('target') || !shouldOpenInNewTab(anchor.getAttribute('href'))) {
    return;
  }

  anchor.setAttribute('target', '_blank');

  const rel = anchor.getAttribute('rel');
  if (!rel) {
    anchor.setAttribute('rel', 'noopener');
  } else if (!rel.split(/\s+/).includes('noopener')) {
    anchor.setAttribute('rel', `${rel} noopener`);
  }
}

function applyToTree(root: ParentNode): void {
  for (const anchor of root.querySelectorAll<HTMLAnchorElement>('a[href]:not([target])')) {
    applyTarget(anchor);
  }
}

/**
 * Give every untargeted link on a bare page `target="_blank"`, now and for
 * anything rendered later (Vue islands, carousel slides).
 * Call this from BareArticleLayout only.
 */
export function setupBareLinkTargets(): void {
  applyToTree(document);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) {
          continue;
        }
        if (node.matches('a[href]')) {
          applyTarget(node as HTMLAnchorElement);
        }
        applyToTree(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
