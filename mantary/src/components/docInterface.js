function start(state) {
    state.document.body.innerHTML = '';
}

function stop(state) {
    state.document.body.innerHTML = '';
}

function appendChild(state, element) {
    state.document.appendChild(element);
}

export function player() {
    return { start, stop, appendChild };
}