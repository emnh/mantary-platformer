// import './style.css';

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

function test(state) {
    const tests = importedFunctions.enumerateTestFunctions(importedFunctions);
    importedFunctions.startComponents(state.components);
    const testContext = importedFunctions.testContext;
    importedFunctions.runTests(tests, state, testContext);
};

function main(state) {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    if (urlParams.has('test')) {
        test(state);
    } else {
        game(state);
    }
}

function getComponents() {
    const player = importedFunctions.player();
    const docInterface = importedFunctions.docInterface(document);
    return {
        player,
        docInterface
    }
};

const state = {};
state.components = getComponents();
state.functions = importedFunctions.bindFunctions(state, importedFunctions)
importedFunctions.docReady(() => main(state), state.components.docInterface);