export function checkCollisionDivs(functions, div1, div2) {
    const checkCollisionRects = functions.checkCollisionRects;
    console.log("checkCollisionRects", checkCollisionRects);
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    return checkCollisionRects(rect1, rect2);
}

export function testCollision(state) {

    function initialization(context) {
        const div = document.createElement("div");
        context.container.appendChild(div);

        const div1 = document.createElement("div");
        div1.style.width = "100px";
        div1.style.height = "100px";
        div1.style.backgroundColor = "red";
        div1.style.position = "absolute";
        div1.style.left = "50px";
        div1.style.top = "50px";
        div.appendChild(div1);

        const div2 = document.createElement("div");
        div2.style.width = "100px";
        div2.style.height = "100px";
        div2.style.backgroundColor = "blue";
        div2.style.position = "absolute";
        div2.style.left = "80px";
        div2.style.top = "80px";
        div.appendChild(div2);

        context.div1 = div1;
        context.div2 = div2;
    }

    function assertion(context) {
        return state.functions.checkCollisionDivs(context.div1, context.div2);
    }

    assertion.description = "Checking collision divs";

    state.functions.reportTest(initialization, [assertion]);
};