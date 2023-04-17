export function mergeComponents(target, state, f) {
    const testDict = { ...target };
    const isComponentSystemFunctionName = f.isComponentSystemFunctionName;
    // console.log(testDict);
    for (const key in state.components) {
        const component = state.components[key];
        for (const componentFunctionName in component) {
            // console.log(
            //     "cf",
            //     componentFunctionName,
            //     component.hasOwnProperty(componentFunctionName),
            //     // component.constructor.prototype.hasOwnProperty(componentFunctionName),
            //     Object.keys(component));
            if (isComponentSystemFunctionName(componentFunctionName, f)) {
                continue;
            }
            if (testDict.hasOwnProperty(componentFunctionName)) {
                console.log("Test Dict: ", testDict);
                console.log("Component: ", component);
                const msg = `Component function name "${componentFunctionName}" in component ${key} already exists in test dictionary: `;
                throw new Error(msg + componentFunctionName);
            }
            testDict[componentFunctionName] = component[componentFunctionName];
        }
    }
    return Object.freeze(testDict);
};