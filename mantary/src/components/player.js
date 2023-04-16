export function Player(f) {
    const {
        performanceNow,
        requestAnimationFrame,
        cancelAnimationFrame,
        addEventListener,
        addEventListeners,
        getDefaultKeyBindings,
        handleKeyBindings,
    } = f;

    let state = {
        gameSpeedInMSPerTick: 100,
        moveSpeed: 0.001,
        movementVector: { x: 0, y: 0, },
        worldPosition: { x: 0, y: 0, },
        screenPosition: { x: 0, y: 0, },
    };

    let raf = null;
    let rafCallbacks = {};
    let lastTime = null;
    let running = false;
    let keysPressed = {};
    let lastKeysPressed = {};

    function update(elapsed) {
        const { movementVector, moveSpeed, worldPosition } = state;
        const { x, y } = movementVector;
        worldPosition.x += x * moveSpeed * elapsed;
        worldPosition.y += y * moveSpeed * elapsed;
        f.log("Player", worldPosition.x, worldPosition.y);
    }

    function registerRaf(name, raf) {
        if (rafCallbacks.hasOwnProperty(name)) {
            throw new Error(`Raf callback with name '${name}' already exists.`);
        }
        rafCallbacks[name] = raf;
    }

    function unregisterRaf(name) {
        delete rafCallbacks[name];
    }

    function setupRAF() {
        registerRaf("playerUpdate", update);
        const rafLoop = function() {
            if (lastTime === null) {
                lastTime = performanceNow();
            }
            const elapsed = performanceNow() - lastTime;
            for (const rafName in rafCallbacks) {
                const raf = rafCallbacks[rafName];
                raf(elapsed);
            }
            if (running) {
                raf = requestAnimationFrame(rafLoop);
            }
        };
        raf = requestAnimationFrame(rafLoop);
    }

    function setupInput() {
        addEventListeners(keysPressed, { addEventListener });
        const keyBindings = getDefaultKeyBindings({
            moveLeft,
            moveRight,
            moveUp,
            moveDown
        });
        const inputLoop = function() {
            handleKeyBindings(keyBindings, keysPressed, lastKeysPressed);
            lastKeysPressed = { ...keysPressed};
            if (running) {
                setTimeout(inputLoop, state.gameSpeedInMSPerTick);
            }
        };
        setTimeout(inputLoop, state.gameSpeedInMSPerTick);
    };

    function start() {
        running = true;
        setupRAF();
        setupInput();
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
        raf = null;
    }

    // TODO: refactor
    function moveLeft(keyPressed) {
        state.movementVector.x = keyPressed ? -1 : 0;
    }

    function moveRight(keyPressed) {
        state.movementVector.x = keyPressed ? 1 : 0;
    }

    function moveUp(keyPressed) {
        state.movementVector.y = keyPressed ? -1 : 0;
    }

    function moveDown(keyPressed) {
        state.movementVector.y = keyPressed ? 1 : 0;
    }

    function getScreenX() {
        return state.screenPosition.x + state.worldPosition.x;
    }

    function getScreenY() {
        return state.screenPosition.y + state.worldPosition.y;
    }

    return { start, stop, registerRaf, moveLeft, moveRight, moveUp, moveDown, getScreenX, getScreenY };
}