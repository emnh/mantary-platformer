export function reportTest(initialization, assertions, {
    bodyAppendChild,
    contextAppendChild,
    createElement,
    fitParentToChildren,
    getElementById,
    getTestFunctionName,
    reportAssertion,
    setContainer,
}) {
    console.log("Reporting test...");
    // TODO: Look for first function named test instead of fixed index?
    // Might be different stack on different browsers.
    const name = getTestFunctionName();
    const containerId = "#report-container-" + name;
    console.log("Container:", containerId);
    const container = createElement("div");
    container.style.border = "1px solid black";
    // container.style.position = "relative";
    container.style.width = "auto";
    container.style.height = "auto";
    container.style.padding = "10px";
    container.style.margin = "10px";
    // container.style.float = "left";
    container.style.display = "inline-block";
    bodyAppendChild(container);
    setContainer(container);
    container.id = containerId;
    initialization();
    const fns = {
        bodyAppendChild,
        contextAppendChild,
        createElement,
        fitParentToChildren,
        getElementById,
    };
    console.log("FNs:", fns);
    for (const i in assertions) {
        const assertion = assertions[i];
        const description = assertion.description;
        try {
            const result = assertion();
            reportAssertion(name, containerId, description, result, fns);
        } catch (err) {
            reportAssertion(name, containerId, description + ": " + err.toString(), false, fns);
            console.error(err);
        }
    }
    fitParentToChildren(container);
}