export function bindFunctions(importedFunctions) {
    const boundFunctions = {};
    for (const funcName in importedFunctions) {
        const func = importedFunctions[funcName];
        boundFunctions[func.name] = (...args) => func(boundFunctions, ...args);
    }
    console.log(boundFunctions);
    return boundFunctions;
}