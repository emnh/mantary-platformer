export function docInterface(doc) {

    function start() {
        doc.innerHTML = '';
    }

    function stop() {
        doc.innerHTML = '';
    }

    function serialize() {
        return doc.innerHTML;
    }

    function appendChild(element) {
        doc.body.appendChild(element);
    }

    return {
        start, stop, serialize, appendChild,
        addEventListener: (...args) => doc.addEventListener(...args),
        createElement: (...args) => doc.createElement(...args),
        getElementById: (...args) => doc.getElementById(...args),
        setTimeout: (...args) => setTimeout(...args),
        getDocumentReadyState: () => doc.readyState,
    };
}