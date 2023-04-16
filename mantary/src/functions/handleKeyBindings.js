function handleKeyBindings(keyBindings, pressedKeys) {
    for (const key in pressedKeys) {
        if (keyBindings.hasOwnProperty(key)) {
            const func = keyBindings[key];
            func();
        }
    }
}