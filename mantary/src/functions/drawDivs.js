export function drawDivs({ createElement, appendChild }){
    // Create the red div
    const redDiv = createElement("div");
    redDiv.style.width = "100px";
    redDiv.style.height = "100px";
    redDiv.style.border = "solid 1px red";
    redDiv.style.marginRight = "20px";
    redDiv.style.display = "inline-block";

    // Create the blue div
    const blueDiv = createElement("div");
    blueDiv.style.width = "100px";
    blueDiv.style.height = "100px";
    blueDiv.style.border = "solid 1px blue";
    blueDiv.style.marginRight = "20px";
    blueDiv.style.display = "inline-block";

    // Create the black div
    const blackDiv = createElement("div");
    blackDiv.style.width = "100px";
    blackDiv.style.height = "100px";
    blackDiv.style.border = "solid 1px black";
    blackDiv.style.display = "inline-block";

    // Create a container div and add the square divs to it
    const containerDiv = createElement("div");
    containerDiv.appendChild(redDiv);
    containerDiv.appendChild(blueDiv);
    containerDiv.appendChild(blackDiv);

    // Add the container div to the c.docInterface
    appendChild(containerDiv);
}