export function addEventListeners(keysPressed, updateCallback, { addEventListener }) {
    addEventListener('keydown', function (event) {
        keysPressed[event.key] = true;
        updateCallback(true);
        // console.log(event.key);
    });

    addEventListener('keyup', function (event) {
        // console.log("keyup", event.key);
        delete keysPressed[event.key];
        updateCallback(false);
    });
}