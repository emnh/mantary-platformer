export function Fireballs(f) {

    const {
        performanceNow,
    } = f;

    const fireballMoveSpeed = 10;
    const fireballRange = 500;
    const width = 50;
    const height = 50;
    const rechargeTime = 250;
    let fireballIdCounter = 0;
    let fireballs = [];
    let shootCallbacks = [];
    let hitCallbacks = [];
    let lastFire = null;

    function registerShootCallback(callback) {
        shootCallbacks.push(callback);
    }

    function registerHitCallback(callback) {
        hitCallbacks.push(callback);
    }

    function canShootFireball() {
        return lastFire === null || performanceNow() - lastFire > rechargeTime;
    }

    function shootFireball(xIn, yIn, facing, playerWidth, playerHeight) {
        if (!canShootFireball()) {
            return;
        }
        const xOffset = facing === 'left' ? -width : playerWidth;
        const x = xIn + xOffset;
        const y = yIn + 0.5 * (playerHeight - height);
        const vx = facing === 'left' ? -fireballMoveSpeed : fireballMoveSpeed;
        const vy = 0;
        const fireball = { id: fireballIdCounter, sx: x, sy: y, x, y, vx, vy, width, height };
        fireballIdCounter += 1;
        for (const callback of shootCallbacks) {
            callback();
        }
        fireballs.push(fireball);
        lastFire = performanceNow();
    }

    function collisionCheck(platforms) {
        for (let i = 0; i < fireballs.length; i++) {
            const fireball = fireballs[i];
            const distTravelledX = Math.abs(fireball.x - fireball.sx);
            const distTravelledY = Math.abs(fireball.y - fireball.sy);
            if (distTravelledX >= fireballRange || distTravelledY >= fireballRange) {
                fireballs.splice(i, 1);
                i--;
                for (const callback of hitCallbacks) {
                    callback();
                }
                continue;
            }
        }
    }

    function update(platforms) {
        for (let i = 0; i < fireballs.length; i++) {
            const fireball = fireballs[i];
            fireball.x += fireball.vx;
            fireball.y += fireball.vy;
        }
        collisionCheck(platforms);
    }

    function getFireballs() {
        return fireballs;
    }

    return {
        shootFireball,
        dynamicLevelUpdate: update,
        registerShootCallback,
        registerHitCallback,
        getFireballs
    };
}