"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = exports.pipe = exports.compose = void 0;
function compose(...callbacks) {
    if (callbacks.length === 0) {
        return (thing) => thing;
    }
    if (callbacks.length === 1) {
        return callbacks[0];
    }
    return (thing) => callbacks.reduceRight((result, callback) => callback(result), thing);
}
exports.compose = compose;
function pipe(...callbacks) {
    if (callbacks.length === 0) {
        return (thing) => thing;
    }
    if (callbacks.length === 1) {
        return callbacks[0];
    }
    return (thing) => callbacks.reduce((result, callback) => callback(result), thing);
}
exports.pipe = pipe;
function curry(callback) {
    return function curried(...a) {
        return a.length >= callback.length
            ? callback(...a)
            : (...b) => curried(...a, ...b);
    };
}
exports.curry = curry;
