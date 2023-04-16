export function runTests(tests, boundFunctions) {
    console.log("Running tests...");
    for (const test of tests) {
        test({
            functions: boundFunctions
        });
    }
}