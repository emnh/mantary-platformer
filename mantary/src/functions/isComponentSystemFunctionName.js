export function isComponentSystemFunctionName(name, { getComponentSystemFunctionNames, newComponentDecorator }) {
    return getComponentSystemFunctionNames({ newComponentDecorator }).includes(name);
}