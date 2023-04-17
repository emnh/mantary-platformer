export function getDefaultKeyBindings(f) {
    const { moveLeft, moveRight, moveUp, moveDown, swipeLeft, swipeRight, tap } = f;
    const keyBindings = {
        'a': moveLeft,
        'd': moveRight,
        'w': moveUp,
        's': moveDown,
        'A': moveLeft,
        'D': moveRight,
        'W': moveUp,
        'S': moveDown,
        'ArrowLeft': moveLeft,
        'ArrowRight': moveRight,
        'ArrowUp': moveUp,
        'ArrowDown': moveDown,
        'swipeLeft': swipeLeft,
        'swipeRight': swipeRight,
        'tap': tap

    };
    return keyBindings;
};