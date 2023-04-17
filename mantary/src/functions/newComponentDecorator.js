export function newComponentDecorator(componentFunction, { getComponentSystemFunctionNames }) {
    return (...args) => {
        const component = componentFunction(...args);
        const componentSystemFunctionNames = getComponentSystemFunctionNames();
        // Add missing functions to the component.
        for (const key in componentSystemFunctionNames) {
            const name = componentSystemFunctionNames[key];
            if (component.hasOwnProperty(name) === false) {
                component[name] = () => {};
            }
        }
        return Object.freeze(component);
    };
}