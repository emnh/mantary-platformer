export function testContext() {
    let state = {};

    function start() {
        state = {};
    }

    function stop() {
        state = {};
    }

    function setContainer(container) {
        state.container = container;
    }

    function contextAppendChild(element) {
        state.container.appendChild(element);
    }

    return { start, stop, setContainer, contextAppendChild };
}