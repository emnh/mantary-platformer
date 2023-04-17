export function Player(f) {
    const {
        performanceNow,
        requestAnimationFrame,
        cancelAnimationFrame,
        addEventListener,
        addEventListeners,
        getDefaultKeyBindings,
        handleKeyBindings,
        getWorldBoundingBox,
    } = f;

    let state = {
        gameSpeedInMSPerTick: 10,
        moveSpeed: 0.4,
        movementVector: { x: 0, y: 0, },
        worldPosition: { x: 0, y: 0, },
        size: { width: 50, height: 50, },
        worldBoundingBox: getWorldBoundingBox(),
    };
    let prevState = state;

    let raf = null;
    let rafCallbacks = {};
    let engineCallbacks = {};
    let lastRafTime = null;
    let lastEngineTime = null;
    let running = false;
    let keysPressed = {};
    let lastKeysPressed = {};

    function checkBounds() {
        const { worldPosition, worldBoundingBox } = state;
        const { x, y } = worldPosition;
        const { x: x2, y: y2, width, height } = worldBoundingBox;
        if (x < x2) {
            worldPosition.x = x2;
        }
        if (y < y2) {
            worldPosition.y = y2;
        }
        if (x > width) {
            worldPosition.x = width;
        }
        if (y > height) {
            worldPosition.y = height;
        }
    }

    function update(elapsed) {
        const { movementVector, moveSpeed, worldPosition } = state;
        const { x, y } = movementVector;
        worldPosition.x += x * moveSpeed * elapsed;
        worldPosition.y += y * moveSpeed * elapsed;
        checkBounds();
        // f.log("Player", worldPosition.x, worldPosition.y);
    }

    function registerRaf(name, raf) {
        if (rafCallbacks.hasOwnProperty(name)) {
            throw new Error(`Raf callback with name '${name}' already exists.`);
        }
        rafCallbacks[name] = raf;
    }

    function registerEngineUpdate(name, updateFunction) {
        if (engineCallbacks.hasOwnProperty(name)) {
            throw new Error(`Engine callback with name '${name}' already exists.`);
        }
        engineCallbacks[name] = updateFunction;
    }

    function unregisterRaf(name) {
        delete rafCallbacks[name];
    }

    function setupRAF() {
        // registerRaf("playerUpdate", update);
        const rafLoop = function() {
            if (running) {
                raf = requestAnimationFrame(rafLoop);
            }
            if (lastRafTime === null) {
                lastRafTime = performanceNow();
            }
            const elapsed = performanceNow() - lastRafTime;
            lastRafTime = performanceNow();
            for (const rafName in rafCallbacks) {
                const raf = rafCallbacks[rafName];
                raf(elapsed);
            }
        };
        raf = requestAnimationFrame(rafLoop);
    }

    function setupInput() {
        const keyBindings = getDefaultKeyBindings({
            moveLeft,
            moveRight,
            moveUp,
            moveDown
        });
        const inputHandler = function(keyPressedOrReleased) {
            handleKeyBindings(keyBindings, keysPressed, lastKeysPressed);
            lastKeysPressed = { ...keysPressed};
        };
        addEventListeners(keysPressed, inputHandler, { addEventListener });
    };

    function setupEngine() {
        registerEngineUpdate("playerUpdate", update);
        const engineLoop = function(keyAddedOrRemoved) {
            if (running) {
                setTimeout(engineLoop, state.gameSpeedInMSPerTick);
            }
            if (lastEngineTime === null) {
                lastEngineTime = performanceNow();
            }
            const elapsed = performanceNow() - lastEngineTime;
            lastEngineTime = performanceNow();
            for (const engineName in engineCallbacks) {
                const engineFunction = engineCallbacks[engineName];
                engineFunction(elapsed);
            }
        };
        setTimeout(engineLoop, state.gameSpeedInMSPerTick);
    }

    function start() {
        running = true;
        setupRAF();
        setupInput();
        setupEngine();
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
        raf = null;
    }

    // TODO: refactor
    function moveLeft(keyPressed) {
        state.movementVector.x = keyPressed ? -1 : 0;
        // state.movementVector.y = 0;
    }

    function moveRight(keyPressed) {
        state.movementVector.x = keyPressed ? 1 : 0;
        // state.movementVector.y = 0;
    }

    function moveUp(keyPressed) {
        // state.movementVector.x = 0;
        state.movementVector.y = keyPressed ? -1 : 0;
    }

    function moveDown(keyPressed) {
        // state.movementVector.x = 0;
        state.movementVector.y = keyPressed ? 1 : 0;
    }

    return { 
        start, stop, registerRaf, moveLeft, moveRight, moveUp, moveDown,
        getWorldX: () => state.worldPosition.x,
        getWorldY: () => state.worldPosition.y,
        getWorldHeight: () => state.worldBoundingBox.height,
        getWorldWidth: () => state.worldBoundingBox.width,
        getPlayerWidth: () => state.size.width,
        getPlayerHeight: () => state.size.height,
    };
}