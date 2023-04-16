// import './style.css';

// import { checkCollisionDivs } from './src/functions/checkCollision.js';
import { testCollision } from './src/functions/checkCollision.js';
import { drawDivs } from './src/functions/drawDivs.js';
import { report } from './src/functions/report.js';

drawDivs();

function runTests() {
    testCollision();
    report("Two divs should be colliding", true);
    report("Two divs should be colliding", false)
};

runTests();