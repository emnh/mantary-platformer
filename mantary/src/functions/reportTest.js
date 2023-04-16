export function reportTest(name, {
    bodyAppendChild,
    contextAppendChild,
    createElement,
    fitParentToChildren,
    getElementById,
    setContainer,
}) {
    console.log("Reporting test...");
    // TODO: Look for first function named test instead of fixed index?
    // Might be different stack on different browsers.
    // const name = getTestFunctionName();
    const containerId = "#report-container-" + name;
    console.log("Container:", containerId);
    const container = createElement("div");
    container.style.border = "1px solid black";
    // container.style.position = "relative";
    container.style.width = "auto";
    container.style.height = "auto";
    container.style.padding = "10px";
    container.style.margin = "2em";
    // container.style.float = "left";
    container.style.display = "block";
    bodyAppendChild(container);
    setContainer(container);
    container.id = containerId;    
    const fns = {
        bodyAppendChild,
        contextAppendChild,
        createElement,
        fitParentToChildren,
        getElementById,
    };

    return {
        name,
        container,
        containerId
    };
}