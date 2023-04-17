export function addEventListeners(keysPressed, updateCallback, { addEventListener }) {
    addEventListener('keydown', function (event) {
        keysPressed[event.key] = true;
        // console.log("Key", event.key);
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

    // Define variables for touch controls
    let touchStartX = null;
    let touchEndX = null;
    let touchStartY = null;
    let touchEndY = null;

    addEventListener('touchstart', handleTouchStart);
    addEventListener('touchmove', handleTouchMove);
    addEventListener('touchend', handleTouchEnd);

    // Define touch event handler functions
    function handleTouchStart(event) {
        event.preventDefault();
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

    function swipeLeft() {
        // Swipe left
        keysPressed["swipeLeft"] = true;
        updateCallback(true);

        setTimeout(() => {
            delete keysPressed["swipeLeft"];
            updateCallback(false);
        }, 500);
    }

    function swipeRight() {
        // Swipe right
        keysPressed["swipeRight"] = true;
        updateCallback(true);

        setTimeout(() => {
            delete keysPressed["swipeRight"];
            updateCallback(false);
        }, 500);
    }

    function jump() {
        keysPressed["tap"] = true;
        updateCallback(true);
        setTimeout(() => {
            delete keysPressed["tap"];
            updateCallback(false);
        }, 100);
    };

    function handleHold() {
        const x = touchEndX || touchStartX;
        const y = touchEndY || touchStartY;
        
        if (x !== null) {
            if (x < window.innerWidth / 3) {
                swipeLeft();
            } else if (x > 2 * window.innerWidth / 3) {
                swipeRight();
            }
        }

        if (y !== null) {
            if (y < window.innerHeight / 3) {
                jump();
            }
        }
    };

    function handleTouchMove(event) {
        if (event !== undefined) {
            event.preventDefault();
            touchEndX = event.touches[0].clientX;
            touchEndY = event.touches[0].clientY;
        }

        const moveThreshold = window.innerWidth * 0.1;

        if (touchStartX && touchEndX) {
            const touchDiffX = touchEndX - touchStartX;
            if (touchDiffX > moveThreshold) {
                swipeRight();
            } else if (touchDiffX < -moveThreshold) {
                swipeLeft();
            }
        }

        if (touchStartY && touchEndY) {
            const touchDiffY = touchEndY - touchStartY;
            if (touchDiffY < -moveThreshold) {
                jump();
            }
        }
    }

    function handleTouchEnd(event) {
        event.preventDefault();
        
        if (event !== undefined) {
            event.preventDefault();
            touchEndX = event.touches[0].clientX;
            touchEndY = event.touches[0].clientY;
        }

        if (touchStartX && touchEndX) {
            const touchDiffX = touchEndX - touchStartX;
            if (touchDiffX > 0) {
                swipeRight();
            } else if (touchDiffX < 0) {
                swipeLeft();
            }
            // Reset touch variables
        } else {
            //jump();
        }
        // if (touchStartY && touchEndY) {
        touchStartX = null;
        touchEndX = null;
        touchStartY = null;
        touchEndY = null;
        // }
    }

    function handleTouchHold() {
        handleHold();
        // handleTouchMove();
    }

    setInterval(handleTouchHold, 10);
}