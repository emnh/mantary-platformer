export function docInterface(doc) {

    function start(state) {
        doc.innerHTML = '';
    }

    function stop(state) {
        doc.innerHTML = '';
    }

    function serialize(state) {
        return doc.innerHTML;
    }

    function appendChild(state, element) {
        doc.body.appendChild(element);
    }

    return {
        start, stop, serialize, appendChild,
        addEventListener: (...args) => doc.addEventListener(...args)
    };
}