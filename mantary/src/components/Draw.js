import protagonistImgSrc from '../../images/protagonist.png';
import protagonistWalkImgSrc from '../../images/walk.webp';
import protagonistJumpImgSrc from '../../images/jump.gif';

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
        // getWorldWidth,
        // getWorldHeight,
        getLevelViewBoundingBox,
        getPlayerWidth,
        getPlayerHeight,
        getFacing,
        isOnGround,
        getVelocityX,
        // getVelocityY,
        getPlatforms,
    } = f;

    const borderSize = 5;
    let playerDiv = null;
    let playerImg = null;
    let boundary = null;
    let scale = 1;
    let canvas = null;
    let lastState = null;
    let platformDivs = [];
    let platforms = [];
    let levelDiv = null;

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

    function drawPlatforms() {
        updateScale();
        platforms = getPlatforms();        
        // Create a div for each platform.
        platforms.forEach((platform) => {
            const div = createElement("div");
            div.style.position = "absolute";
            div.style.left = platform.x * scale + "px";
            div.style.top = platform.y * scale + "px";
            div.style.width = platform.width * scale + "px";
            div.style.height = platform.height * scale + "px";
            div.style.backgroundColor = "black";
            levelDiv.appendChild(div);
            platformDivs.push(div);
        });
    }

    function setupDraw() {
        initBodyStyle();

        boundary = createElement("div");
        boundary.style.border = borderSize + "px solid black";
        boundary.style.position = "absolute";
        bodyAppendChild(boundary);
        
        levelDiv = createElement('div');
        levelDiv.style.position = 'absolute';
        bodyAppendChild(levelDiv);

        canvas = createElement("canvas");
        canvas.style.position = 'absolute';
        levelDiv.appendChild(canvas);

        drawPlatforms();

        const div = createElement("div");
        div.id = "player";
        div.style.position = "absolute";
        playerDiv = div;
        const img = createElement("img");
        img.src = protagonistImgSrc;
        img.style.width = "100%";
        div.appendChild(img);
        playerImg = img;
        bodyAppendChild(div);
    }

    function updateScale() {
        const innerWidth = getWindowInnerWidth() - 2 * borderSize;
        const innerHeight = getWindowInnerHeight() - 2 * borderSize;
        boundary.style.width = innerWidth + "px";
        boundary.style.height = innerHeight + "px";

        const windowBBox = getLevelViewBoundingBox();
        const screenWidth = windowBBox.width;
        const screenHeight = windowBBox.height;
        scale = Math.min(innerWidth / screenWidth, innerHeight / screenHeight);
    }

    function updateDraw() {
        updateScale();
        
        const playerWidth = getPlayerWidth() * scale;
        const playerHeight = getPlayerHeight() * scale;
        playerDiv.style.width = playerWidth + "px";
        playerDiv.style.height = playerHeight + "px";
        if (getFacing() == "left") {
            playerDiv.style.transform = "scaleX(-1)";
        } else {
            playerDiv.style.transform = "scaleX(1)";
        }
        if (isOnGround()) {
            if (getVelocityX() != 0) {
                if (lastState != "walk") {
                    playerImg.src = protagonistWalkImgSrc;
                    lastState = "walk";
                }
            } else {
                if (lastState != "idle") {
                    playerImg.src = protagonistImgSrc;
                    lastState = "idle";
                }
            }
        } else {
            if (lastState != "jump") {
                playerImg.src = protagonistJumpImgSrc;
                lastState = "jump";
            }
        }
        
        const x = getWorldX() * scale;
        const y = getWorldY() * scale;
        const centerX = innerWidth / 2;
        const playerScreenX = x * scale < centerX ? x * scale : centerX;
        const worldScreenX = x * scale < centerX ? 0 : x * scale - centerX;
        // getWorldX()

        drawGrid(canvas, innerWidth, innerHeight, 40 * scale);

        playerDiv.style.left = playerScreenX + "px";
        playerDiv.style.top = y + "px";
        playerDiv.style.width = playerWidth + "px";
        playerDiv.style.height = playerHeight + "px";

        levelDiv.style.left = -worldScreenX + "px";
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