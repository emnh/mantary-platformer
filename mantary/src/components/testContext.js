export function TestContext(testName, f) {

    const { reportTest, reportAssertion, fitParentToChildren } = f;

    let state = {
        container: null,
        containerId: null,
        description: null,
        itText: null,
        name: null
    };

    function start() {
        state = reportTest(testName, {...f, setContainer });
        state.name = testName;
    }

    function stop() {
        state = {};
    }

    function setContainer(container) {
        state.container = container;
    }

    function contextAppendChild(element) {
        state.container.appendChild(element);
    }

    function describe(text, fn) {
        console.log("Decribe:", text);
        state.description = text;
        fn();
        fitParentToChildren(state.container);
    };

    function expect(actual) {
        return {
            toBe: function (expected) {
                const msg = state.description + ": " + state.itText + ": ";
                if (actual !== expected) {
                    const err = new Error(`Expected ${expected}, but got ${actual}`);
                    reportAssertion(state.name, state.containerId, msg + err.toString(), false, f);
                    // console.error(err);
                    throw err;
                } else {
                    reportAssertion(state.name, state.containerId, msg, true, f);
                }
            }
        }
    }

    function it(text, testFunc) {
        state.itText = text;
        try {
            testFunc();
            // TODO: console interface and dependency injection
            console.log(text + ":  ✓ Test passed!");
        } catch (error) {
            console.log(text + `:  ✗ Test failed: ${error.message}`);
        }
    }

    return { start, stop, setContainer, contextAppendChild, describe, expect, it };
}