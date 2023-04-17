let memoized = null;

export function getComponentSystemFunctionNames({ newComponentDecorator }) {
    if (newComponentDecorator === undefined) {
        throw new Error("getComponentSystemFunctionNames: newComponentDecorator is undefined.");
    }
    if (memoized === null) {
        memoized = [];
        for (const key in newComponentDecorator(() => ({}))()) {
            memoized.push(key);
        }
    }
    // console.log("Memoized: ", memoized);
    return memoized;
}