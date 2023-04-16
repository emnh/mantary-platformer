export function runTests(tests, state) {
    console.log("Running tests...");
    for (const test of tests) {
        test(state);
    }
}