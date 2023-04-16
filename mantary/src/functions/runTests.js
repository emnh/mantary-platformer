export function runTests(tests, functions) {
    console.log("Running tests...");
    for (const test of tests) {
        test({
            functions
        });
    }
}