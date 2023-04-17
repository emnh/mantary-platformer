// import './style.css';

import * as immutable from 'immutable';
import * as importedFunctions from './imports.js';

function game(state) {
    console.log("Game started");
    importedFunctions.startComponents(state.components);
    // const functions = importedFunctions.enumerateFunctions(importedFunctions);
    // for (const func of functions) {
    //     console.log(func.name);
    // }
    importedFunctions.drawDivs(state.components.docInterface);
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
    const deps = {
        log: (...args) => console.log(...args),
        performanceNow: () => performance.now(),
        requestAnimationFrame,
        cancelAnimationFrame,
        clearTimeout,
        immutableMap: immutable.Map,
        ...importedFunctions
    };
    
    const docInterface = deps.DocInterface(document, setTimeout);
    const player = deps.Player(importedFunctions.mergeComponents(deps, { components: { docInterface } }));
    const draw = deps.Draw(docInterface, player);
    
    return {
        draw,
        player,
        docInterface,
    };
};

const state = {};
state.components = getComponents();
state.functions = importedFunctions.bindFunctions(state, importedFunctions)
importedFunctions.docReady(() => main(state), state.components.docInterface);