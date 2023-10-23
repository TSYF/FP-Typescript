import * as R from "./ramda";
const elem = (tag) => document.createElement(tag);
const text = (inText) => document.createTextNode(inText);
const on = R.curry(function (eventType, element, fn) {
    element.addEventListener(eventType, fn);
});
const addClass = R.curry((elClass, element) => {
    element.classList.add(elClass);
    return element;
});
// function addClass(elClass: string) {
//     return function (element: HTMLElement) {
//         element.classList.add(elClass);
//         return element;
//     }
// };
const append = R.curry((node, element) => {
    element.appendChild(node);
    return element;
});
const attr = R.curry((attrName, attrVal, element) => {
    element.setAttribute(attrName, attrVal);
    return element;
});
const { freeze: final } = Object;
const $ = document.querySelector.bind(document);
$.attr = R.curry((element, attr) => $(element)?.getAttribute(attr));
$.val = R.curry((element, newVal) => newVal ? $(element).value = newVal : $(element)?.value);
const $$ = document.querySelectorAll.bind(document);
export { elem, text, addClass, append, attr, final, $, $$, on };
