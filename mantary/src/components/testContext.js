export function TestContext(testName, f) {

    const { reportTest, reportAssertion, fitParentToChildren } = f;

    let state = {
        container: null,
        containerId: null,
        subcontainer: null,
        description: null,
        itText: null,
        name: null
    };

    function start() {

    }

    function stop() {
        state = {};
    }

    function setContainer(container) {
        state.container = container;
    }

    function contextAppendChild(element) {
        if (state.hasOwnProperty("subcontainer") && state.subcontainer !== null) {
            state.subcontainer.appendChild(element);
        } else {
            state.container.appendChild(element);
        }
    }

    function extractAlphaNumeric(str) {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    function describe(text, fn) {
        const name = testName + extractAlphaNumeric(text);
        const { container, containerId } = reportTest(name, { ...f, setContainer });
        state.container = container;
        state.containerId = containerId;
        state.name = testName;
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
                    reportAssertion(state.name, state.subcontainer.id, msg + err.toString(), false, f);
                    // f.fitParentToChildren(state.container);
                    // console.error(err);
                    throw err;
                } else {
                    reportAssertion(state.name, state.subcontainer.id, msg, true, f);
                    // f.fitParentToChildren(state.container);
                }
            }
        }
    }

    function it(text, testFunc) {
        state.itText = text;
        state.subcontainer = f.createElement("div");
        state.subcontainer.id = state.containerId + "-" + extractAlphaNumeric(text);
        state.subcontainer.style.border = "1px solid black";
        state.subcontainer.style.padding = "1em";
        state.subcontainer.style.margin = "1em";
        state.container.appendChild(state.subcontainer);
        try {
            testFunc();
            f.log(text + ":  ✓ Test passed!");
        } catch (error) {
            f.log(text + `:  ✗ Test failed: ${error.message}`);
        }
    }

    return { start, stop, setContainer, contextAppendChild, describe, expect, it };
}