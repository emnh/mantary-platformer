export function DocInterface(window, doc, setTimeout) {

    function start() {
        doc.innerHTML = '';
    }

    function stop() {
        doc.innerHTML = '';
    }

    function serialize() {
        return doc.innerHTML;
    }

    function bodyAppendChild(element) {
        doc.body.appendChild(element);
    }

    function initBodyStyle() {
        doc.body.style.margin = "0px";
        doc.body.style.padding = "0px";
        doc.body.style.overflow = "hidden";
    }

    return {
        start, stop, serialize, bodyAppendChild, initBodyStyle,
        addEventListener: (...args) => window.addEventListener(...args),
        createElement: (...args) => doc.createElement(...args),
        getElementById: (...args) => doc.getElementById(...args),
        setTimeout: (...args) => setTimeout(...args),
        getDocumentReadyState: () => doc.readyState,
        getWindowInnerWidth: () => window.innerWidth,
        getWindowInnerHeight: () => window.innerHeight,
    };
}