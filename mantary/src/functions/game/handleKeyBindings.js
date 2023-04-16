export function handleKeyBindings(keyBindings, pressedKeys, lastPressedKeys) {
    // Deregister keys that are no longer pressed.
    for (const key in lastPressedKeys) {
        if (!pressedKeys.hasOwnProperty(key) && keyBindings.hasOwnProperty(key)) {
            const func = keyBindings[key];
            func(false);
        }
    }
    // Register keys that are pressed.
    for (const key in pressedKeys) {
        if (keyBindings.hasOwnProperty(key)) {
            const func = keyBindings[key];
            func(true);
        }
    }
}