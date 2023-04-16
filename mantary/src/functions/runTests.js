export function runTests(tests, state, testContextInit) {
    console.log("Running tests...");
    for (const test of tests) {
        const testDict = state.functions.mergeComponents({}, state);
        const testContext = testContextInit(test.name, testDict);
        testContext.start();
        const testDict2 = state.functions.mergeComponents(testDict, { components: { testContext } });
        test(testDict2);
        testContext.stop();
    }
}