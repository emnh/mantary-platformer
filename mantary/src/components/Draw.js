export function Draw(f) {

    const {
        createElement,
        bodyAppendChild,
        initBodyStyle,
        getWindowInnerWidth,
        getWindowInnerHeight,
        registerRaf,
        unregisterRaf,
        getWorldX,
        getWorldY,
        getWorldWidth,
        getWorldHeight,
        getLevelViewBoundingBox,
        getPlayerWidth,
        getPlayerHeight,
    } = f;

    const borderSize = 5;
    let playerDiv = null;
    let boundary = null;
    let scale = 1;
    let canvas = null;

    // TODO: Refactor to make it a pure function.
    function drawGrid(canvas, width, height, gridSize) {
        // Get the 2D rendering context for the canvas
        const ctx = canvas.getContext('2d');

        // Define the size of the canvas
        canvas.width = width;
        canvas.height = height;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through the canvas and draw the grid
        for (let x = 0; x <= canvas.width; x += gridSize) {
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.rect(x, y, gridSize, gridSize);
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }
        }
    }

    function setupDraw() {
        const div = createElement("div");
        div.id = "player";
        div.style.position = "absolute";
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.backgroundColor = "green";
        playerDiv = div;
        bodyAppendChild(div);

        boundary = createElement("div");
        boundary.style.border = borderSize + "px solid black";
        boundary.style.position = "absolute";
        bodyAppendChild(boundary);

        canvas = createElement("canvas");
        bodyAppendChild(canvas);

        initBodyStyle();
    }

    function updateDraw() {
        const innerWidth = getWindowInnerWidth() - 2 * borderSize;
        const innerHeight = getWindowInnerHeight() - 2 * borderSize;
        boundary.style.width = innerWidth + "px";
        boundary.style.height = innerHeight + "px";

        const windowBBox = getLevelViewBoundingBox();
        const screenWidth = windowBBox.width;
        const screenHeight = windowBBox.height;

        scale = Math.min(innerWidth / screenWidth, innerHeight / screenHeight);
        
        const playerWidth = getPlayerWidth() * scale;
        const playerHeight = getPlayerHeight() * scale;
        
        const x = getWorldX() * scale;
        const y = getWorldY() * scale;
        const centerX = innerWidth / 2;
        const playerScreenX = x * scale < centerX ? x * scale : centerX;
        // getWorldX()

        drawGrid(canvas, innerWidth, innerHeight, 40 * scale);
        canvas.style.left = -getWorldX() + "px";
        canvas.style.position = 'absolute';

        playerDiv.style.left = playerScreenX + "px";
        playerDiv.style.top = y + "px";
        playerDiv.style.width = playerWidth + "px";
        playerDiv.style.height = playerHeight + "px";
    }

    function start() {
        setupDraw();
        registerRaf("updateDraw", updateDraw);
    }

    function stop() {
        unregisterRaf(draw);
    }

    return { start, stop };
}