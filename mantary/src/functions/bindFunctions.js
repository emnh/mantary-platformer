export function bindFunctions(state, importedFunctions) {
    state.functions = {};
    const boundFunctions = state.functions;
    for (const funcName in importedFunctions) {
        const func = importedFunctions[funcName];
        // console.log(func);
        if (func.hasOwnProperty('stateful') && func.stateful) {
            // Stateful function, bind it to state
            boundFunctions[func.name] = (...args) => func(state, ...args);
        } else {
            // Pure function, just add it
            boundFunctions[func.name] = func;
        }
    }
    console.log(boundFunctions);
    return boundFunctions;
}