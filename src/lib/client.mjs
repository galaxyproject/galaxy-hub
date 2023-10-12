// Code that must execute in a browser context.

/** Resize any iframes in the document to fit their content.
 * This only resizes iframes with the .resize-y class, to avoid messing with ones that don't need (or want) it.
 * @param {Document} document
 */
export function resizeIFrames(document) {
    //TODO: Also resize horizontally? We might not ever need it; usually `width: 100%` suffices.
    // Listen for the "load" event to make sure the document has finished loading so we don't fire before all the
    // iframes have appeared. BUT this often doesn't fire. I'm assuming the `mounted()` function executes after
    // document load, so it misses it.
    document.addEventListener("load", () => addResizeIFramesListeners(document));
    // So as a backup, add the listeners immediately.
    // If we've missed the "load" event, then we should be good to go immediately.
    addResizeIFramesListeners(document);
    // BUT even that doesn't cover all our bases. It's Vue, so things can appear in the document at any time, even well
    // after the "load" event. This listens for custom events we fire off from pages commonly used as iframes.
    // We also listen for these events inside `addResizeIFramesListeners()`, but those are attached to each iframe
    // individually. If the iframes don't exist yet, that will fail. This waits to hear from the iframes first before
    // going out looking for them. This works because the iframes trigger the event on our own (their parent's) document
    // object. So we can sit and wait for them to come to us.
    document.addEventListener("mounted", (event) => addResizeIFramesListeners(event.target));
}

function addResizeIFramesListeners(document) {
    for (let iframe of document.querySelectorAll("iframe.resize-y")) {
        resizeIFrame(iframe);
        // For some reason this doesn't always catch it when it's actually fully loaded.
        iframe.addEventListener("load", () => resizeIFrame(iframe));
        // As a backup, let's catch our own signal. `contentWindow` is the child `window` object (of the iframe's page).
        // We can't use the intended cross-iframe system `postMessage()` because it's parent-triggered, and the point is
        // that the iframe usually loads *after* the parent, so we'd be back to polling instead of a push-based
        // notification that the iframe has loaded.
        iframe.contentWindow.addEventListener("mounted", () => resizeIFrame(iframe));
    }
}

function resizeIFrame(iframe) {
    let height = iframe.contentWindow.document.body.scrollHeight;
    iframe.height = height;
}

/** Send off events to inform iframe parent that the child has gotten mounted.
 * This should be called from the iframe child.
 */
export function notifyParent(window) {
    // Using the old, deprecated way of creating an Event b/c IE doesn't support the new way.
    let event = window.document.createEvent("Event");
    event.initEvent("mounted", true, true);
    // Send event to ourselves, in case the parent can reach in and catch it.
    window.dispatchEvent(event);
    // Also try to send the event to the parent.
    if (window.parent !== window) {
        window.parent.document.dispatchEvent(event);
    }
}

export function addAltmetricsScript(window) {
    addScript(window, "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js");
}

export function addFlickrScript(window) {
    addScript(window, "https://embedr.flickr.com/assets/client-code.js", { async: true, charset: "utf-8" });
}

/** Add a <script> to the head of the current document. */
export function addScript(window, src, attributes = {}) {
    let script = window.document.createElement("script");
    script.src = src;
    for (let [name, value] of Object.entries(attributes)) {
        script[name] = value;
    }
    window.document.head.appendChild(script);
}
