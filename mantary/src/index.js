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
    const fireworksEnabled = urlParams.has('shaderbg');
    console.log("Music enabled (Add /#music to URL): ", musicEnabled);
    console.log("Fullscreen enabled (Add /#fullscreen to URL): ", fullscreenEnabled);
    console.log("To enable go to: ", window.location.href.replace(location.hash,"") + "#music&fullscreen");
    console.log("Fireworks enabled (Add /#shaderbg=lscGRl to URL): ", fireworksEnabled);

    if (fireworksEnabled) {
        let shader = null;
        if (urlParams.has('shaderbg')) {
            const shaderbg = urlParams.get('shaderbg');
            if (shaderbg.length > 0) {
                shader = shaderbg;
            } else {
                const shaders = [
                    'lscGRl', // fireworks
                    'fsX3zB', // matrix rain
                    'ltfGD7', // windwaker ocean
                    'msjGzw', // walk like an egyptian
                    '3dcyzS', // raymarching pebbles
                    '3tXBWj', // perlin hills (best background for the game I guess)
                ];
                shader = shaders[Math.floor(shaders.length * Math.random())];
            }
            console.log("Shader: ", shader);
        }
        
        if (shader != null) {
            const bg = document.body.getElementsByClassName("background")[0];
            document.body.style.color = "transparent";
            bg.innerHTML = 
                `<iframe
                    allowtransparence="true" width="640" height="360"
                    frameborder="0" src="https://www.shadertoy.com/embed/${shader}?gui=false&t=10&paused=false&muted=true"
                    frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%">
                    </iframe>`;
        }
        
    }
    
    const level = system.Level(system);
    const fireballs = system.Fireballs(system);
    const docInterface = system.DocInterface(window, document, setTimeout);
    const playerDeps =
        system.mergeComponents(system, { components: { docInterface, level, fireballs } }, system);
    const player = system.Player(playerDeps);
    const drawDeps =
        system.mergeComponents(system, { components: { docInterface, player, level, fireballs } }, system);
    const draw = system.Draw(drawDeps, fullscreenEnabled);
    const audioDeps = system.mergeComponents(system, { components: { level, fireballs, player } }, system);
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