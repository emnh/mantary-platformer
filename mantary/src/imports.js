/*
This file is generated by signature.cjs. Do not edit it directly.
Mon Apr 17 2023 11:14:41 GMT+0200 (Central European Summer Time)
./components/Audio.js: function Audio(f, musicEnabled)
./components/DocInterface.js: function DocInterface(window, doc, setTimeout)
./components/Draw.js: function Draw(f)
./components/Level.js: function Level()
./components/Player.js: function Player(f)
./components/TestContext.js: function TestContext(testName, f)
./functions/checkCollisionDivs.js: function checkCollisionDivs(div1, div2, )
./functions/checkCollisionRects.js: function checkCollisionRects(rect1, rect2)
./functions/checkCollisionRectsXYWH.js: function checkCollisionRectsXYWH(rect1, rect2, )
./functions/docReady.js: function docReady(fn, )
./functions/enumerateFunctions.js: function enumerateFunctions(global)
./functions/enumerateTestFunctions.js: function enumerateTestFunctions(global)
./functions/fitParentToChildren.js: function fitParentToChildren(parent)
./functions/game/addEventListeners.js: function addEventListeners(keysPressed, updateCallback, )
./functions/game/getDefaultKeyBindings.js: function getDefaultKeyBindings(f)
./functions/game/handleKeyBindings.js: function handleKeyBindings(keyBindings, pressedKeys, lastPressedKeys)
./functions/generateGuid.js: function generateGuid()
./functions/getCallingFunctionName.js: function getCallingFunctionName(generateGuid, index)
./functions/getComponentSystemFunctionNames.js: function getComponentSystemFunctionNames()
./functions/getTestFunctionName.js: function getTestFunctionName()
./functions/isComponentSystemFunctionName.js: function isComponentSystemFunctionName(name, )
./functions/mergeComponents.js: function mergeComponents(target, state, f)
./functions/newComponentDecorator.js: function newComponentDecorator(componentFunction)
./functions/reportAssertion.js: function reportAssertion(name, id, message, success, )
./functions/reportTest.js: function reportTest(name, )
./functions/runTests.js: function runTests(tests, state, testContextInit)
./functions/startComponents.js: function startComponents(importedComponents)
./functions/stopComponents.js: function stopComponents(importedComponents)
./tests/testCollisionDivs.js: function testCollisionDivs(f)
./tests/testCollisionRects.js: function testCollisionRects(f)
*/

import { Audio } from './components/Audio.js';
import { DocInterface } from './components/DocInterface.js';
import { Draw } from './components/Draw.js';
import { Level } from './components/Level.js';
import { Player } from './components/Player.js';
import { TestContext } from './components/TestContext.js';
import { addEventListeners } from './functions/game/addEventListeners.js';
import { checkCollisionDivs } from './functions/checkCollisionDivs.js';
import { checkCollisionRects } from './functions/checkCollisionRects.js';
import { checkCollisionRectsXYWH } from './functions/checkCollisionRectsXYWH.js';
import { docReady } from './functions/docReady.js';
import { enumerateFunctions } from './functions/enumerateFunctions.js';
import { enumerateTestFunctions } from './functions/enumerateTestFunctions.js';
import { fitParentToChildren } from './functions/fitParentToChildren.js';
import { generateGuid } from './functions/generateGuid.js';
import { getCallingFunctionName } from './functions/getCallingFunctionName.js';
import { getComponentSystemFunctionNames } from './functions/getComponentSystemFunctionNames.js';
import { getDefaultKeyBindings } from './functions/game/getDefaultKeyBindings.js';
import { getTestFunctionName } from './functions/getTestFunctionName.js';
import { handleKeyBindings } from './functions/game/handleKeyBindings.js';
import { isComponentSystemFunctionName } from './functions/isComponentSystemFunctionName.js';
import { mergeComponents } from './functions/mergeComponents.js';
import { newComponentDecorator } from './functions/newComponentDecorator.js';
import { reportAssertion } from './functions/reportAssertion.js';
import { reportTest } from './functions/reportTest.js';
import { runTests } from './functions/runTests.js';
import { startComponents } from './functions/startComponents.js';
import { stopComponents } from './functions/stopComponents.js';
import { testCollisionDivs } from './tests/testCollisionDivs.js';
import { testCollisionRects } from './tests/testCollisionRects.js';

const reqs = { getComponentSystemFunctionNames };
const AudioComponent = newComponentDecorator(Audio, reqs);
const DocInterfaceComponent = newComponentDecorator(DocInterface, reqs);
const DrawComponent = newComponentDecorator(Draw, reqs);
const LevelComponent = newComponentDecorator(Level, reqs);
const PlayerComponent = newComponentDecorator(Player, reqs);
const TestContextComponent = newComponentDecorator(TestContext, reqs);

export {
addEventListeners,
AudioComponent as Audio,
checkCollisionDivs,
checkCollisionRects,
checkCollisionRectsXYWH,
DocInterfaceComponent as DocInterface,
docReady,
DrawComponent as Draw,
enumerateFunctions,
enumerateTestFunctions,
fitParentToChildren,
generateGuid,
getCallingFunctionName,
getComponentSystemFunctionNames,
getDefaultKeyBindings,
getTestFunctionName,
handleKeyBindings,
isComponentSystemFunctionName,
LevelComponent as Level,
mergeComponents,
newComponentDecorator,
PlayerComponent as Player,
reportAssertion,
reportTest,
runTests,
startComponents,
stopComponents,
testCollisionDivs,
testCollisionRects,
TestContextComponent as TestContext
};