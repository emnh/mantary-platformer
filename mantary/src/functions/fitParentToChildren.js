export function fitParentToChildren(parent) {
    // Initialize the minimum and maximum X and Y coordinates
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Iterate over all child elements to find the minimum and maximum X and Y coordinates
    for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children[i];

        // Recursively fit the child element to its own children, if any
        if (child.children.length > 0) {
            const [minX2, minY2, maxX2, maxY2] = fitParentToChildren(child);
            minX = Math.min(minX, minX2);
            minY = Math.min(minY, minY2);
            maxX = Math.max(maxX, maxX2);
            maxY = Math.max(maxY, maxY2);
        }

        const rect = child.getBoundingClientRect();

        minX = Math.min(minX, rect.left);
        minY = Math.min(minY, rect.top);
        maxX = Math.max(maxX, rect.right);
        maxY = Math.max(maxY, rect.bottom);
    }

    // Set the width and height of the parent element to encapsulate the bounding boxes of the children
    parent.style.width = maxX - minX + "px";
    parent.style.height = maxY - minY + "px";

    return [minX, minY, maxX, maxY];
}