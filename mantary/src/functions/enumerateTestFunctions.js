function enumerateTestFunctions() {
    const testFunctions = [];

    for (const propName in global) {
        if (typeof global[propName] === 'function' && propName.startsWith('test')) {
            testFunctions.push(global[propName]);
        }
    }

    return testFunctions;
}