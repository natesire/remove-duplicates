export {};

declare global { // this spec is inside a module
    interface Array<T> {
        root(): T;
    }
}

Array.prototype.root = function () {
    return this[0];
}