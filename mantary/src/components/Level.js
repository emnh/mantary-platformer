export function Level() {

    function getLevelViewBoundingBox() {
        return { x: 0, y: 0, width: 500, height: 800 };
    }

    function getWorldBoundingBox() {
        return { x: 0, y: 0, width: 1000, height: 800 };
    }

    return { getLevelViewBoundingBox, getWorldBoundingBox };
};