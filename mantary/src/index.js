// import './style.css';

import * as importedFunctions from './imports.js';

function game(state) {
    console.log("Game started");
    const currentScript = document.getElementById('index');
    const functions = importedFunctions.enumerateFunctions(importedFunctions);
    // Log all functions
    console.log("Current script", document.currentScript);
    for (const func of functions) {
        console.log(func.name);
    }
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