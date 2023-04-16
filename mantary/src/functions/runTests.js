export function runTests(tests, state, testContext) {
    console.log("Running tests...");
    for (const test of tests) {
        state.components.testContext = testContext();
        state.components.testContext.start();
        let testDict = { ...state.functions };
        // console.log(testDict);
        for (const key in state.components) {
            const component = state.components[key];
            for (const componentFunctionName in component) {
                if (state.functions.isComponentSystemFunctionName(componentFunctionName)) {
                    continue;
                }
                if (componentFunctionName in testDict) {
                    const msg = "Component function name already exists in test dictionary: ";
                    throw new Error(msg + componentFunctionName);
                }
                testDict[componentFunctionName] = component[componentFunctionName];
            }
        }
        console.log(testDict);
        test(testDict);
        state.components.testContext.stop();
    }
}