export function getCallingFunctionName(functions, index) {
    const error = new Error();
    // console.log("getCallingFunctionName: error.stack:", error.stack);
    try {
        const functionName = error.stack.split('\n')[index].trim().split(' ')[1];
        const name = functionName;
        return name;
    } catch (err) {
        console.error(err);
        return functions.generateGuid();
    }
}