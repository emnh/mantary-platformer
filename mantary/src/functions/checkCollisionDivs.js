export function checkCollisionDivs(checkCollisionRects, div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return checkCollisionRects(rect1, rect2);
}

export function testCollision(options) {
    // Create two divs
    const div1 = document.createElement("div");
    div1.style.width = "100px";
    div1.style.height = "100px";
    div1.style.backgroundColor = "red";
    div1.style.position = "absolute";
    div1.style.left = "50px";
    div1.style.top = "50px";
    document.body.appendChild(div1);

    const div2 = document.createElement("div");
    div2.style.width = "100px";
    div2.style.height = "100px";
    div2.style.backgroundColor = "blue";
    div2.style.position = "absolute";
    div2.style.left = "80px";
    div2.style.top = "80px";
    document.body.appendChild(div2);

    options.functions.report(
        "Checking collision divs",
        options.functions.checkCollisionDivs(
            options.functions.checkCollisionRects,
            div1, div2));
};