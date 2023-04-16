export function reportTest({ functions: f, components: c }, initialization, assertions) {
    console.log("Reporting test...");
    // TODO: Look for first function named test instead of fixed index?
    // Might be different stack on different browsers.
    const name = f.getTestFunctionName();
    const containerId = "#report-container-" + name;
    console.log("Container:", containerId);
    const container = c.docInterface.createElement("div");
    c.docInterface.appendChild(container);
    c.testContext.setContainer(container);
    container.id = containerId;
    const context = {
        container
    };
    initialization(context);
    const fns = {...f, ...c.docInterface };
    console.log("FNs:", fns);
    for (const i in assertions) {
        const assertion = assertions[i];
        const description = assertion.description;
        try {
            const result = assertion(context);
            f.reportAssertion(name, containerId, description, result, fns);
        } catch (err) {
            f.reportAssertion(name, containerId, description + ": " + err.toString(), false, fns);
            console.error(err);
        }
        
    }
}