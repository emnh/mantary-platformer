import { fitParentToChildren } from "./fitParentToChildren";

export function reportAssertion(name, id, message, success,
    { bodyAppendChild,
        createElement,
        getElementById
    }) {
    let reportContainer = getElementById(id);
    if (!reportContainer) {
        reportContainer = createElement("div");
        reportContainer.id = id;
        reportContainer.style.border = "1px solid black";
        reportContainer.style.display = "inline-block";
        bodyAppendChild(reportContainer);
    }

    const report = createElement("div");
    // report.style.display = "inline";
    report.style.position = "relative";
    // report.style.float = "left";
    report.style.display = "block";

    const nameElement = createElement("h2");
    nameElement.style.display = "inline-block";
    nameElement.textContent = name + ":";
    report.appendChild(nameElement);

    const messageElement = createElement("p");
    messageElement.style.display = "inline-block";
    messageElement.style.marginLeft = "10px";
    messageElement.textContent = message;
    report.appendChild(messageElement);

    const iconElement = createElement("span");
    iconElement.style.display = "inline-block";
    iconElement.style.fontSize = "24px";

    if (success) {
        iconElement.textContent = "✅";
        iconElement.style.color = "green";
    } else {
        iconElement.textContent = "❌";
        iconElement.style.color = "red";
    }

    report.appendChild(iconElement);
    reportContainer.appendChild(report);

    // fitParentToChildren(report);
}