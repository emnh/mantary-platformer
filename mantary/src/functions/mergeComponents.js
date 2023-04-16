export function mergeComponents(target, state) {
    // TODO: Check for duplicate function names.
    let testDict = { ...target, ...state.functions };
    // console.log(testDict);
    for (const key in state.components) {
        const component = state.components[key];
        for (const componentFunctionName in component) {
            if (testDict.isComponentSystemFunctionName(componentFunctionName)) {
                continue;
            }
            if (componentFunctionName in testDict) {
                const msg = "Component function name already exists in test dictionary: ";
                throw new Error(msg + componentFunctionName);
            }
            testDict[componentFunctionName] = component[componentFunctionName];
        }
    }
    return testDict;
};