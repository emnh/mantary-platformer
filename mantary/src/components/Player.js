import { checkCollisionRectsXYWH } from "../imports";

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
        getStartingPosition,
        getPlayerSize,
        getGravity,
        getPlatforms,
        getCoins,
        consumeCoin,
    } = f;

    let state = {
        tickCount: 0,
        coinCount: 0,
        gameSpeedInMSPerTick: 10,
        moveSpeed: 0.4,
        jumpSpeed: 0.008,
        velocity: { x: 0, y: 0, },
        worldPosition: getStartingPosition(),
        size: getPlayerSize(),
        worldBoundingBox: getWorldBoundingBox(),
        gravity: getGravity(),
        isOnGround: false,
        facing: 'right',
        jumpStart: null,
        platforms: getPlatforms()
    };
    // TODO: Interpolate?
    let prevState = state;

    let raf = null;
    let rafCallbacks = {};
    let engineCallbacks = {};
    let lastRafTime = null;
    let lastEngineTime = null;
    let running = false;
    let keysPressed = {};
    let lastKeysPressed = {};
    let jumpCallbacks = [];

    function registerJumpCallback(fn) {
        jumpCallbacks.push(fn);
    }

    function checkBounds() {
        const { worldPosition, worldBoundingBox } = state;
        const { x, y } = worldPosition;
        const { x: x2, y: y2, width, height } = worldBoundingBox;
        if (x <= x2) {
            worldPosition.x = x2;
            state.velocity.x = 0;
        }
        if (y <= y2) {
            worldPosition.y = y2;
            state.velocity.y = 0;
        }
        if (x + state.size.width >= width) {
            worldPosition.x = width - state.size.width;
            state.velocity.x = 0;
        }
        if (y + state.size.height >= height) {
            worldPosition.y = height - state.size.height;
            if (!isJumping()) {
                state.isOnGround = true;
                state.velocity.y = 0;
            }
        } else {
            state.isOnGround = false;
        }
    }

    function checkCollisions() {
        // Check for collisions
        const { platforms } = state;
        for (let i = 0; i < platforms.length; i++) {
            const platform = platforms[i];
            const {x, y} = state.worldPosition;
            const { width, height } = state.size;
            const player = { x, y, width, height };
            const threshold = 0.1 * platform.height;
            const upperPlatform = { x: platform.x, y: platform.y - threshold, width: platform.width, height: threshold };
            const lowerPlatform = { x: platform.x, y: platform.y + platform.height - threshold, width: platform.width, height: threshold };
            if (checkCollisionRectsXYWH(player, upperPlatform, f)) {
                // console.log("Collision");
                state.worldPosition.y = upperPlatform.y - state.size.height;
                state.isOnGround = true;
                state.velocity.y = 0;
                state.jumpStart = null;
                break;
            } else if (checkCollisionRectsXYWH(player, lowerPlatform, f)) {
                state.velocity.y = 0;
                state.jumpStart = null;
                break;
            }
        }
    }

    function checkCoinCollisions() {
        const coins = getCoins();

        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            const {x, y} = state.worldPosition;
            const { width, height } = state.size;
            const player = { x, y, width, height };
            if (checkCollisionRectsXYWH(player, coin, f)) {
                state.coinCount++;
                f.log("Coin count: ", state.coinCount);
                consumeCoin(i);
                break;
            }
        }
    }

    function isJumping() {
        return state.jumpStart !== null && state.tickCount - state.jumpStart < 20;
    }

    function update(elapsed) {
        const { velocity, moveSpeed, worldPosition } = state;
        if (isJumping()) {
            velocity.y -= state.jumpSpeed * elapsed;
        } else {
            state.jumpStart = null;
        }
        const { x: gx, y: gy } = state.gravity;
        velocity.x += gx * elapsed;
        if (!state.isOnGround && !isJumping()) {
            // console.log("Gravity");
            velocity.y += gy * elapsed;
        }
        worldPosition.x += velocity.x * elapsed;
        worldPosition.y += velocity.y * elapsed;

        checkBounds();
        checkCollisions();
        checkCoinCollisions();
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
            moveDown,
            swipeLeft,
            swipeRight,
            tap
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
            // const elapsed = performanceNow() - lastEngineTime;
            const elapsed = state.gameSpeedInMSPerTick;
            lastEngineTime = performanceNow();
            for (const engineName in engineCallbacks) {
                const engineFunction = engineCallbacks[engineName];
                // TODO: Add try catch here for robustness?
                engineFunction(elapsed);
            }
            state.tickCount += 1;
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
    function swipeLeft(keyPressed) {
        moveLeft(keyPressed);
        // setTimeout(() => moveLeft(false), 100);
    }

    function swipeRight(keyPressed) {
        moveRight(keyPressed);
        // setTimeout(() => moveRight(false), 100);
    }

    function tap(keyPressed) {
        moveUp(keysPressed);
        // setTimeout(() => moveUp(false), 100);
    }

    function moveLeft(keyPressed) {
        state.velocity.x = keyPressed ? -state.moveSpeed : 0;
        state.facing = 'left';
        // state.movementVector.y = 0;
    }

    function moveRight(keyPressed) {
        state.velocity.x = keyPressed ? state.moveSpeed : 0;
        state.facing = 'right';
        // state.movementVector.y = 0;
    }

    function moveUp(keyPressed) {
        // state.movementVector.x = 0;
        if (state.isOnGround && keyPressed) {
            state.isOnGround = false;
            state.jumpStart = state.tickCount;
            for (const jumpCallback in jumpCallbacks) {
                jumpCallbacks[jumpCallback]();
            }
        }       
    }

    function moveDown(keyPressed) {
        // state.movementVector.x = 0;
        // state.velocity.y = keyPressed ? 1 : 0;
    }

    return { 
        start, stop, registerRaf, moveLeft, moveRight, moveUp, moveDown,
        registerJumpCallback,
        getWorldX: () => state.worldPosition.x,
        getWorldY: () => state.worldPosition.y,
        getWorldHeight: () => state.worldBoundingBox.height,
        getWorldWidth: () => state.worldBoundingBox.width,
        getPlayerWidth: () => state.size.width,
        getPlayerHeight: () => state.size.height,
        getFacing: () => state.facing,
        isOnGround: () => state.isOnGround,
        getVelocityX: () => state.velocity.x,
        getVelocityY: () => state.velocity.y,
        getCoinCount: () => state.coinCount,
    };
}