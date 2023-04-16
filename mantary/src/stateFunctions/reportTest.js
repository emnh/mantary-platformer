export function reportTest({ functions: f, components: c }, initialization, assertions) {
    console.log("Reporting test...");
    // TODO: Look for first function named test instead of fixed index?
    // Might be different stack on different browsers.
    const name = "#report-container-" + f.getCallingFunctionName(5);
    console.log("Container:", name);
    const container = c.docInterface.createElement("div");
    c.docInterface.appendChild(container);
    c.testContext.setContainer(container);
    container.id = name;
    const context = {
        container
    };
    initialization(context);
    for (const i in assertions) {
        const assertion = assertions[i];
        const description = assertion.description;
        try {
            const result = assertion(context);
            f.reportAssertion(name, description, result);
        } catch (err) {
            f.reportAssertion(name, description + ": " + err.toString(), false);
            console.error(err);
        }
        
    }
}