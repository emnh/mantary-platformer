export function checkCollisionRectsXYWH(rect1, rect2, { checkCollisionRects }) {
    const convert = function(rect) {
        return {
            left: rect.x,
            right: rect.x + rect.width,
            top: rect.y,
            bottom: rect.y + rect.height
        };
    };
    return checkCollisionRects(convert(rect1), convert(rect2));
}