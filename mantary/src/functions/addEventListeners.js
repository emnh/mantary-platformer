function addEventListeners(keysPressed, { addEventListener }) {
    addEventListener('keydown', function (event) {
        keysPressed[event.key] = true;
        // console.log(event.key);
    });

    addEventListener('keyup', function (event) {
        delete keysPressed[event.key];
    });
}