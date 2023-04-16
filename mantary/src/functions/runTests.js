export function runTests(tests) {
    console.log("Running tests...");
    for (const test of tests) {
        test();
    }
}