export function reportAssertion({ functions: f, components: c}, name, message, success) {
  const doc = c.docInterface;
  
  let reportContainer = doc.getElementById(name);
  if (!reportContainer) {
    reportContainer = doc.createElement("div");
    reportContainer.id = "report-container";
    reportContainer.style.border = "1px solid black";
    reportContainer.style.display = "inline-block";
    doc.appendChild(reportContainer);
  }

  const report = doc.createElement("div");

  const nameElement = doc.createElement("h2");
  nameElement.style.display = "inline-block";
  nameElement.textContent = name;
  report.appendChild(nameElement);

  const messageElement = doc.createElement("p");
  messageElement.style.display = "inline-block";
  messageElement.style.marginLeft = "10px";
  messageElement.textContent = message;
  report.appendChild(messageElement);

  const iconElement = doc.createElement("span");
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
}