export function ImmutableInterface(immutable) {
    function start() {

    }

    function stop() {

    }

    function immutableMap(...args) {
        return immutable.Map(...args);
    }

    return { start, stop, };
}