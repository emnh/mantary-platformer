export function bindFunctions(functions) {
    const boundFunctions = {};
    for (const funcName in functions) {
        const func = functions[funcName];
        boundFunctions[func.name] = (...args) => func(boundFunctions, ...args);
    }
    console.log(boundFunctions);
    return boundFunctions;
}