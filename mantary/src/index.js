// import './style.css';

import * as immutable from 'immutable';
import * as importedFunctions from './imports.js';

function game(state) {
    console.log("Game started");
    importedFunctions.startComponents(state.components);
};

function runTestSuite(state) {
    const tests = importedFunctions.enumerateTestFunctions(importedFunctions);
    importedFunctions.startComponents(state.components);
    const testContext = importedFunctions.TestContext;
    importedFunctions.runTests(tests, state, testContext);
};

function main(state) {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    if (urlParams.has('test')) {
        runTestSuite(state);
    } else {
        game(state);
    }
}

function getComponents() {
    const system = importedFunctions.newComponentDecorator(() => ({
        log: (...args) => console.log(...args),
        performanceNow: () => performance.now(),
        requestAnimationFrame,
        cancelAnimationFrame,
        clearTimeout,
        immutableMap: immutable.Map,
        ...importedFunctions
    }))();
    
    const docInterface = system.DocInterface(document, setTimeout);
    const playerDeps = importedFunctions.mergeComponents(system, { components: { docInterface } }, system);
    const player = system.Player(playerDeps);
    const draw = system.Draw(docInterface, player);
    
    return {
        system,
        draw,
        player,
        docInterface,
    };
};

const state = {};
state.components = getComponents();
importedFunctions.docReady(() => main(state), state.components.docInterface);