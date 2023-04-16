// import './style.css';

// import { checkCollisionDivs } from './src/functions/checkCollision.js';
import { testCollision } from './functions/checkCollision.js';
import { drawDivs } from './functions/drawDivs.js';
import { report } from './functions/report.js';
import { docReady } from './functions/docReady.js';
import { runTests } from './orchestrations/runTests.js';

const keyBindings = {
    'a': moveLeft,
    'd': moveRight,
    'w': moveUp,
    's': moveDown,
    'A': moveLeft,
    'D': moveRight,
    'W': moveUp,
    'S': moveDown,
    'ArrowLeft': moveLeft,
    'ArrowRight': moveRight,
    'ArrowUp': moveUp,
    'ArrowDown': moveDown,
};





function game() {

};

function main() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    if (urlParams.has('test')) {
        runTests();
    } else {
        game();
    }
}

const state = {};
docReady(main);