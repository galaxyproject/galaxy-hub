/**
 * Iframe resize utilities for bare pages embedded in Galaxy server interfaces.
 * Handles communication between parent pages and embedded iframe children.
 */

/**
 * Notify the parent window that this iframe content has mounted.
 * Call this from pages that will be embedded as iframes (e.g. latest/* feeds).
 */
export function notifyParent(): void {
  const event = new Event('mounted', { bubbles: true, cancelable: true });
  window.dispatchEvent(event);
  if (window.parent !== window) {
    window.parent.document.dispatchEvent(event);
  }
}

function resizeIFrame(iframe: HTMLIFrameElement): void {
  try {
    const height = iframe.contentWindow?.document.body.scrollHeight;
    if (height) {
      iframe.height = String(height);
    }
  } catch {
    // Cross-origin iframes will throw; silently ignore
  }
}

function addResizeListeners(root: Document | EventTarget): void {
  const doc = root instanceof Document ? root : document;
  for (const iframe of doc.querySelectorAll<HTMLIFrameElement>('iframe.resize-y')) {
    resizeIFrame(iframe);
    iframe.addEventListener('load', () => resizeIFrame(iframe));
    try {
      iframe.contentWindow?.addEventListener('mounted', () => resizeIFrame(iframe));
    } catch {
      // Cross-origin; ignore
    }
  }
}

/**
 * Set up automatic resizing for iframes with class="resize-y".
 * Call this from the parent page that contains the iframes (e.g. BareArticleLayout).
 */
export function setupIframeResize(): void {
  document.addEventListener('load', () => addResizeListeners(document));
  addResizeListeners(document);
  document.addEventListener('mounted', (event) => addResizeListeners(event.target as Document));
}
