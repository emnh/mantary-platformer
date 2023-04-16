export function stopComponents(importedComponents) {
    for (const componentName in importedComponents) {
        const component = importedComponents[componentName];
        component.stop();
    }
}