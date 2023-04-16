export function reportAssertion(functions, name, message, success) {
  let reportContainer = document.querySelector(name);
  if (!reportContainer) {
    reportContainer = document.createElement("div");
    reportContainer.id = "report-container";
    reportContainer.style.border = "1px solid black";
    reportContainer.style.display = "inline-block";
    document.body.appendChild(reportContainer);
  }

  const report = document.createElement("div");

  const nameElement = document.createElement("h2");
  nameElement.style.display = "inline-block";
  nameElement.textContent = name;
  report.appendChild(nameElement);

  const messageElement = document.createElement("p");
  messageElement.style.display = "inline-block";
  messageElement.style.marginLeft = "10px";
  messageElement.textContent = message;
  report.appendChild(messageElement);

  const iconElement = document.createElement("span");
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