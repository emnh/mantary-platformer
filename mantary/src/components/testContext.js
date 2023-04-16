export function testContext(f) {

    const { reportTest, reportAssertion, fitParentToChildren } = f;

    let state = {
        container: null,
        containerId: null,
        description: null,
        name: null
    };

    function start() {
        state = reportTest({...f, setContainer });
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
        state.description = text;
        fn();
        fitParentToChildren(state.container);
    };

    function expect(actual) {
        return {
            toBe: function (expected) {
                if (actual !== expected) {
                    const err = new Error(`Expected ${expected}, but got ${actual}`);
                    reportAssertion(state.name, state.containerId, state.description + ": " + err.toString(), false, f);
                    console.error(err);
                    throw err;
                } else {
                    reportAssertion(state.name, state.containerId, state.description, expected, f);
                }
            }
        }
    }

    function it(text, testFunc) {
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