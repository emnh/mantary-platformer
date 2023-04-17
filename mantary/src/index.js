import '../style.css';

import * as immutable from 'immutable';
import * as importedFunctions from './imports.js';

function game(state) {
    console.log("Game started");
    importedFunctions.startComponents(state.components);
};

function runTestSuite(state) {
    delete state.components.draw;
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

    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const musicEnabled = urlParams.has('music');
    const fullscreenEnabled = urlParams.has('fullscreen');
    console.log("Music enabled (Add /#music to URL): ", musicEnabled);
    console.log("Fullscreen enabled (Add /#fullscreen to URL): ", fullscreenEnabled);
    console.log("To enable go to: ", window.location.href.replace(location.hash,"") + "#music&fullscreen");
    
    const level = system.Level();
    const docInterface = system.DocInterface(window, document, setTimeout);
    const playerDeps =
        system.mergeComponents(system, { components: { docInterface, level } }, system);
    const player = system.Player(playerDeps);
    const drawDeps =
        system.mergeComponents(system, { components: { docInterface, player, level } }, system);
    const draw = system.Draw(drawDeps, fullscreenEnabled);
    const audioDeps = system.mergeComponents(system, { components: { level } }, system);
    const audio = system.Audio(audioDeps, musicEnabled);
    
    return {
        system,
        draw,
        player,
        docInterface,
        audio,
    };
};

const state = {};
state.components = getComponents();
importedFunctions.docReady(() => main(state), state.components.docInterface);