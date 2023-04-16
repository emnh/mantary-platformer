export function immutableInterface(immutable) {
    function start() {

    }

    function stop() {

    }

    function immutableMap(...args) {
        return immutable.Map(...args);
    }

    return { start, stop, };
}