export function mergeComponents(target, state) {
    // TODO: Check for duplicate function names.
    let testDict = { ...target, ...state.functions };
    // console.log(testDict);
    for (const key in state.components) {
        const component = state.components[key];
        for (const componentFunctionName in component) {
            console.log(
                "cf",
                componentFunctionName,
                component.hasOwnProperty(componentFunctionName),
                // component.constructor.prototype.hasOwnProperty(componentFunctionName),
                Object.keys(component),
                component.get(componentFunctionName));
            if (testDict.isComponentSystemFunctionName(componentFunctionName, testDict)) {
                continue;
            }
            if (componentFunctionName in testDict) {
                const msg = `Component function name "${componentFunctionName}" in component ${key} already exists in test dictionary: `;
                throw new Error(msg + componentFunctionName);
            }
            testDict[componentFunctionName] = component[componentFunctionName];
        }
    }
    return testDict;
};