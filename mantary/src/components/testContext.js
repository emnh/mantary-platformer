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

    function appendChild(element) {
        state.container.appendChild(element);
    }

    return { start, stop, setContainer, appendChild };
}