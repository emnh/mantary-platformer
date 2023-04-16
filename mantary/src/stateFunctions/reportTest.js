export function reportTest(functions, initialization, assertions) {
    console.log("Reporting test...", functions);
    // TODO: Look for first function named test instead of fixed index?
    // Might be different stack on different browsers.
    const name = "#report-container-" + functions.getCallingFunctionName(5);
    console.log("Container:", name);
    const container = document.createElement("div");
    document.body.appendChild(container);
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
            functions.reportAssertion(description, result);
        } catch (err) {
            functions.reportAssertion(description + ": " + err.toString(), false);
            console.error(err);
        }
        
    }
}