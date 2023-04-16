export function checkCollision(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

export function testCollision() {
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

    return checkCollision(div1, div2);
};


