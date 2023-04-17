export function isComponentSystemFunctionName(name, { getComponentSystemFunctionNames, immutableMap }) {
    return getComponentSystemFunctionNames({ immutableMap }).includes(name);
}