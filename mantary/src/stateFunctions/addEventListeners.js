function addEventListeners(docInterface, keysPressed) {
    docInterface.addEventListener('keydown', function (event) {
        keysPressed[event.key] = true;
        // console.log(event.key);
    });

    docInterface.addEventListener('keyup', function (event) {
        delete keysPressed[event.key];
    });
}