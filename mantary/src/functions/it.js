export function it(text, testFunc) {
    try {
        testFunc();
        console.log(text +":  ✓ Test passed!");
    } catch (error) {
        console.log(text + `:  ✗ Test failed: ${error.message}`);
    }
}