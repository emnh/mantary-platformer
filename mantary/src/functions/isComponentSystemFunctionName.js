export function isComponentSystemFunctionName(name) {
    return ["start", "stop", "serialize", "deserialize"].includes(name);
}