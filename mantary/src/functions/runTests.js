export function runTests(tests, state, testContextInit) {
    console.log("Running tests...");
    for (const test of tests) {
        const testDict = state.components.system.mergeComponents({}, state, state.components.system);
        const testContext = testContextInit(test.name, testDict);
        testContext.start();
        const testDict2 = state.components.system.mergeComponents(testDict, { components: { testContext } }, state.components.system);
        test(testDict2);
        testContext.stop();
    }
}