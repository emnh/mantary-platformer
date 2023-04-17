export function getComponentSystemFunctionNames({ immutableMap }) {
    const exampleMap = immutableMap({});
    const keys = ["start", "stop", "serialize", "deserialize"];
    for (const key in exampleMap) {
        // If using immutable.Map, then this will add these properties:
        // ['size', '_root', '__ownerID', '__hash', '__altered' ]
        // Additionally it will add all methods that are defined on immutable Map.
        
        // if (exampleMap.hasOwnProperty(key)) {
        keys.push(key);
        // }
    }
    return keys;
}