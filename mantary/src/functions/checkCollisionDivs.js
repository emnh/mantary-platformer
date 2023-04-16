export function checkCollisionDivs(div1, div2, { checkCollisionRects }) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    return checkCollisionRects(rect1, rect2);
}