export function report(name, message, success) {
  const container = document.createElement("div");

  const nameElement = document.createElement("h2");
  nameElement.style.display = "inline-block";
  nameElement.textContent = name;
  container.appendChild(nameElement);

  const messageElement = document.createElement("p");
  messageElement.style.display = "inline-block";
  messageElement.style.marginLeft = "10px";
  messageElement.textContent = message;
  container.appendChild(messageElement);

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

  container.appendChild(iconElement);

  const existingElement = document.querySelector(`#report-${name}`);
  if (existingElement) {
    existingElement.replaceWith(container);
  } else {
    container.id = `report-${name}`;
    document.body.appendChild(container);
  }
}
Modify the function to append to the existing element.