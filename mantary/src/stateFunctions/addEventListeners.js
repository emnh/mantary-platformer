function addEventListeners(keysPressed) {
    document.addEventListener('keydown', function (event) {
        keysPressed[event.key] = true;
        // console.log(event.key);
    });

    document.addEventListener('keyup', function (event) {
        delete keysPressed[event.key];
    });
}