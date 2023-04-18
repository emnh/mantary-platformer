import protagonistImgSrc from '../../images/protagonist.png';
import protagonistWalkImgSrc from '../../images/walk.webp';
import protagonistJumpImgSrc from '../../images/jump.gif';

import platformImg1Src from '../../images/platform1.png';
import platformImg2Src from '../../images/platform2.png';
import platformImg3Src from '../../images/platform3.png';
import platformImg4Src from '../../images/platform4.png';
import platformImg5Src from '../../images/platform5.png';
import platformImg6Src from '../../images/platform6.png';
import coinImgSrc from '../../images/coin.png';
import fireballImgSrc from '../../images/fireball.png';

const smallPlatformSrcs = [
    platformImg2Src,
    platformImg3Src,
    platformImg4Src,
];
const longPlatformSrcs = [
    platformImg5Src,
    platformImg6Src,
];

export function Draw(f, fullscreenEnabled) {

    const {
        // getVelocityY,
        // getWorldHeight,
        // getWorldWidth,
        bodyAppendChild,
        createElement,
        getCoinCount,
        getCoins,
        getElementById,
        getFacing,
        getFireballs,
        getLevelViewBoundingBox,
        getPlatforms,
        getPlayerHeight,
        getPlayerWidth,
        getVelocityX,
        getWindowInnerHeight,
        getWindowInnerWidth,
        getWorldX,
        getWorldY,
        initBodyStyle,
        isOnGround,
        performanceNow,
        registerConsumeCoinCallback,
        registerRaf,
        requestFullscreen,
        unregisterRaf,
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
    let coins = [];
    let coinDivs = [];
    let coinStatusCountElement = null;
    let fireballDivs = [];

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
            div.style.left = platform.x + "px";
            div.style.top = platform.y + "px";
            div.style.width = platform.width + "px";
            div.style.height = platform.height + "px";
            // div.style.backgroundColor = "black";
            const img = createElement("img");
            if (platform.width / platform.height > 2.0) {
                img.src = longPlatformSrcs[Math.floor(Math.random() * longPlatformSrcs.length)];
                img.style.top = -platform.height * 0.75 + "px";
            } else {
                img.src = smallPlatformSrcs[Math.floor(Math.random() * smallPlatformSrcs.length)];
                img.style.top = -platform.height * 0.5 + "px";
            }
            img.style.width = "100%";
            img.style.position = "absolute";
            div.appendChild(img);
            levelDiv.appendChild(div);
            platformDivs.push(div);
        });
    }

    function drawCoinStatus() {
        const width = getWindowInnerWidth();
        const height = getWindowInnerHeight();
        const div = createElement("div");
        div.style.position = "fixed";
        // div.style.left = width - 200 + "px";
        div.style.right = "0px";
        div.style.left = "0px;"
        div.style.top = "2vh";
        div.style.width = "auto";
        div.style.height = "3vh";
        const span = createElement("span");
        // span.style.position = "absolute";
        // span.style.marginTop = "50%";

        span.style.right = "0px";
        span.style.paddingLeft = "10%";
        // div.style.marginRight = "-10%";
        // span.style.fontSize = "3vh";
        span.style.fontSize = "400%";
        // span.style.position = "absolute";
        // span.style.float = "right";
        span.style.display = "inline-block";
        span.style.color = "white";
        
        coinStatusCountElement = span;
        // div.style.backgroundColor = "black";
        const img = createElement("img");
        img.src = coinImgSrc;
        // img.style.width = "3vh";
        img.style.width = "25%";
        // img.style.float = "right";
        img.style.display = "inline-block";
        // img.style.position = "relative";
        div.appendChild(img);
        div.appendChild(span);

        bodyAppendChild(div);
    };

    function drawCoins() {
        updateScale();
        coins = getCoins();        
        // Create a div for each platform.
        coins.forEach((coin) => {
            const div = createElement("div");
            div.style.position = "absolute";
            div.style.left = coin.x + "px";
            div.style.top = coin.y + "px";
            div.style.width = coin.width + "px";
            div.style.height = coin.height + "px";
            // div.style.backgroundColor = "black";
            const img = createElement("img");
            img.src = coinImgSrc;
            img.style.width = "100%";
            img.style.position = "absolute";
            div.appendChild(img);
            levelDiv.appendChild(div);
            coinDivs.push(div);
        });
        
        registerConsumeCoinCallback((index) => {
            coinDivs[index].style.display = "none";
            coinDivs.splice(index, 1);
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
        drawCoins();
        drawCoinStatus();

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

    function drawFireballs() {
        const fireballs = getFireballs();
        // console.log("Count of fireballs: " + fireballs.length + ".", fireballs);
        const updatedIds = {};
        fireballs.forEach((fireball) => {
            const fireballId = "fireball" + fireball.id;
            const fireballImgId = "fireballImg" + fireball.id;
            updatedIds[fireballId] = true;
            const previous = getElementById(fireballId);
            const div = previous || createElement("div");
            div.style.left = fireball.x + "px";
            div.style.top = fireball.y + "px";
            const rad = 20.0 * performanceNow() * 0.001;
            div.style.transform = `rotate(${rad}rad)`;
            if (!previous) {
                div.id = fireballId;                
                div.style.position = "absolute";
                div.style.width = fireball.width + "px";
                div.style.height = fireball.height + "px";
                const img = getElementById(fireballImgId) || createElement("img");
                img.src = fireballImgSrc;
                img.style.width = "100%";
                img.style.position = "absolute";
                div.appendChild(img);
                levelDiv.appendChild(div);
                fireballDivs.push(div);
            }
        });
        fireballDivs.forEach((div) => {
            if (!updatedIds[div.id]) {
                div.remove();
            }
        });
    }

    function updateDraw() {
        coinStatusCountElement.innerHTML = getCoinCount();

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
        const playerScreenX = x < centerX ? x : centerX;
        const worldScreenX = x < centerX ? 0 : x - centerX;
        // getWorldX()

        // drawGrid(canvas, innerWidth, innerHeight, 40 * scale);

        playerDiv.style.left = playerScreenX + "px";
        playerDiv.style.top = y + "px";
        playerDiv.style.width = playerWidth + "px";
        playerDiv.style.height = playerHeight + "px";

        levelDiv.style.left = -worldScreenX + "px";
        levelDiv.style.transform = "scale(" + scale + ")";

        coinDivs.forEach((div) => {
            const width = 10.0 * (Math.sin(10.0 * performanceNow() * 0.001) + 1.0) * 0.5;
            const img = div.getElementsByTagName("img")[0];
            img.style.top = width + '%';
            // img.style.left = (50 - width) + '%';
            // img.style.width = width + '%';
        });

        drawFireballs();
    }

    function fullscreen() {
        let firstFS = fullscreenEnabled;

        const handler = function (event) {
            if ('fwasdWASD'.includes(event.key) ||
                ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
                ) {
                if (firstFS) {
                    requestFullscreen();
                    firstFS = false;
                }
            }
            if (event.key == 'f') {
                requestFullscreen();
            }
        };
        const handler2 = function (event) {
            if (firstFS) {
                requestFullscreen();
                firstFS = false;
            }
        };
        addEventListener('keydown', handler);
        addEventListener('touchstart', handler2);
    }

    function start() {
        setupDraw();
        registerRaf("updateDraw", updateDraw);
        fullscreen();
    }

    function stop() {
        unregisterRaf(draw);
    }

    return { start, stop };
}