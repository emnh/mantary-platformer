export function Level() {

    function getPlayerSize() {
        return { width: 50, height: 50 };
    }

    function getStartingPosition() {
        const { width, height } = getPlayerSize();
        const { width: levelWidth, height: levelHeight } = getLevelViewBoundingBox();
        return { x: 100, y: levelHeight - height };
    }

    function getLevelViewBoundingBox() {
        return { x: 0, y: 0, width: 500, height: 800 };
    }

    function getWorldBoundingBox() {
        return { x: 0, y: 0, width: 1000, height: 800 };
    }

    function getGravity() {
        return { x: 0, y: 0.001 };
    }

    return {
        getGravity,
        getPlayerSize,
        getStartingPosition,
        getLevelViewBoundingBox,
        getWorldBoundingBox
    };
};