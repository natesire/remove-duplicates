export {};

declare global { // this spec is inside a module
    interface Array<T> {
        first(): T;
    }
}

Array.prototype.first = function () {
    return this[0];
}