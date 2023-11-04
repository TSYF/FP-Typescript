function compose(...callbacks) {
    if (callbacks.length === 0) {
        return (thing) => thing;
    }
    if (callbacks.length === 1) {
        return callbacks[0];
    }
    return (thing) => callbacks.reduceRight((result, callback) => callback(result), thing);
}
function pipe(...callbacks) {
    if (callbacks.length === 0) {
        return (thing) => thing;
    }
    if (callbacks.length === 1) {
        return callbacks[0];
    }
    return (thing) => callbacks.reduce((result, callback) => {
        return callback(result);
    }, thing);
}
function curry(callback) {
    return function curried(...a) {
        return a.length >= callback.length
            ? callback(...a)
            : (...b) => curried(...a, ...b);
    };
}
function flip(fn) {
    return curry((first, second) => fn(second, first));
}
export { compose, pipe, curry, flip };
