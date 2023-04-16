export function startComponents(importedComponents) {
    for (const componentName in importedComponents) {
        const component = importedComponents[componentName];
        component.start();
    }
}