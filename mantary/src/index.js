// import './style.css';

import * as importedFunctions from './imports.js';

function game(state) {
    console.log("Game started");
    const functions = importedFunctions.enumerateFunctions(importedFunctions);
    for (const func of functions) {
        console.log(func.name);
    }
};

function runTests() {
    const tests = importedFunctions.enumerateTestFunctions(importedFunctions);
    const boundFunctions = importedFunctions.bindFunctions(importedFunctions);
    importedFunctions.runTests(tests, boundFunctions);
};

function main(state) {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    if (urlParams.has('test')) {
        runTests();
    } else {
        game(state);
    }
}

const state = {};
importedFunctions.docReady(() => main(state));