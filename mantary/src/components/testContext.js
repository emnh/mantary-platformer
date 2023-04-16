export function testContext() {
    let state = {};

    function start() {

    }

    function stop() {

    }

    function setContainer(container) {
        state.container = container;
    }

    function appendChild(element) {
        state.container.appendChild(element);
    }

    return { start, stop, setContainer, appendChild };
}