export function docReady(fn, { addEventListener, getDocumentReadyState, setTimeout }) {
    // see if DOM is already available
    const readyState = getDocumentReadyState();
    if (readyState === "complete" || readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 0);
    } else {
        addEventListener("DOMContentLoaded", fn);
    }
};