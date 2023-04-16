export function ConsoleInterface(console) {
    
    function log(...args) {
        console.log(...args);
    }

    return { log };
}