export function addEventListeners(keysPressed, updateCallback, { addEventListener }) {
    addEventListener('keydown', function (event) {
        keysPressed[event.key] = true;
        updateCallback(true);
    });

    addEventListener('keyup', function (event) {
        delete keysPressed[event.key];
        updateCallback(false);
    });

    // addEventListener('focusout', function (event) {
    //     for (const key in keysPressed) {
    //         delete keysPressed[key];
    //     }
    //     updateCallback(false);
    // });
}