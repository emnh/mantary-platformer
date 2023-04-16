export function getTestFunctionName() {
    const error = new Error();
    // console.log("getCallingFunctionName: error.stack:", error.stack);
    try {
        const functions = error.stack.split('\n');
        for (const i in functions) {
            const func = functions[i];
            if (func.includes('at test')) {
                // console.log("Test func", func);
                const functionName = func.trim().split(' ')[1];
                return functionName;
            }
        }
    } catch (err) {
        console.error(err);
        return "error-" + err.toString();
    }
}