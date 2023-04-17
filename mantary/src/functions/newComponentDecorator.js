export function newComponentDecorator(componentFunction) {
    return (...args) => {
        const component = componentFunction(...args);
        const componentSystemFunctionNames = ["start", "stop", "serialize", "deserialize"];;
        // Add missing functions to the component.
        for (const key in componentSystemFunctionNames) {
            const name = componentSystemFunctionNames[key];
            if (component.hasOwnProperty(name) === false) {
                component[name] = () => {};
            }
        }
        // The dependency on Object.freeze is kind of cheating.
        // Or not, because it is built in to javascript.
        // Maybe we should put this function in a special folder.
        // Or maybe include it in signature.cjs.
        return Object.freeze(component);
    };
}