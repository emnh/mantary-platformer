export function enumerateFunctions(global) {
    const functions = [];

    for (const propName in global) {
        if (typeof global[propName] === 'function') {
            functions.push(global[propName]);
        }
    }

    return functions;
}