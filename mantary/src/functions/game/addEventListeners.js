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

    addEventListener('touchstart', handleTouchStart);
    addEventListener('touchend', handleTouchEnd);

    // Define touch event handler functions
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchEnd(event) {
        if (touchStartX && touchEndX) {
            const touchDiffX = touchEndX - touchStartX;
            if (touchDiffX > 0) {
                // Swipe right
                keysPressed["swipeRight"] = true;
                updateCallback(true);

                setTimeout(() => {
                    delete keysPressed["swipeRight"];
                    updateCallback(false);
                }, 100);
            } else if (touchDiffX < 0) {
                // Swipe left
                keysPressed["swipeLeft"] = true;
                updateCallback(true);

                setTimeout(() => {
                    delete keysPressed["swipeLeft"];
                    updateCallback(false);
                }, 100);
            }
            // Reset touch variables
            touchStartX = null;
            touchEndX = null;
        } else {
            // Single tap (jump)
            keysPressed["tap"] = true;
            updateCallback(true);
            setTimeout(() => {
                delete keysPressed["tap"];
                updateCallback(false);
            }, 100);
        }
    }
}