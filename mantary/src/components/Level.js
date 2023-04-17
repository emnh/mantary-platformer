export function Level() {

    let platforms = [
        { x: 300, y: 800, width: 200, height: 50 },
        { x: 600, y: 800, width: 100, height: 50 },
        { x: 800, y: 600, width: 200, height: 50 },
    ];

    function getPlatforms() {
        return platforms;
    }

    function getPlayerSize() {
        // Image is 396, 579
        
        const ratio = 396 / 579;
        const height = 120;
        const width = height * ratio;

        return { width, height  };
    }

    function getStartingPosition() {
        const { width, height } = getPlayerSize();
        const { width: levelWidth, height: levelHeight } = getLevelViewBoundingBox();
        return { x: 100, y: levelHeight - height };
    }

    function getLevelViewBoundingBox() {
        return { x: 0, y: 0, width: 1000, height: 1000 };
    }

    function getWorldBoundingBox() {
        return { x: 0, y: 0, width: 10000, height: 1000 };
    }

    function getGravity() {
        return { x: 0, y: 0.01 };
    }

    return {
        getGravity,
        getPlayerSize,
        getStartingPosition,
        getLevelViewBoundingBox,
        getWorldBoundingBox,
        getPlatforms
    };
};