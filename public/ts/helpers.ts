import * as R from "./ramda";

const elem = (tag: string): HTMLElement => document.createElement(tag);
const text = (inText: string) => document.createTextNode(inText);

const on = R.curry(function (eventType: keyof ElementEventMap, element: Element, fn: (this: Element, ev?: Event) => void) {
    element.addEventListener(eventType, fn);
})

const addClass = R.curry((elClass: string, element: HTMLElement) => {
    element.classList.add(elClass);
    return element;
});

// function addClass(elClass: string) {
//     return function (element: HTMLElement) {
//         element.classList.add(elClass);
//         return element;
//     }
// };

const append = R.curry((node: Node, element: HTMLElement) => {
    element.appendChild(node)
    return element;
});

const attr = R.curry((attrName: string, attrVal: string, element: HTMLElement) => {
    element.setAttribute(attrName, attrVal);
    return element;
});

const { freeze: final } = Object;

type ElementSelector = {
    <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
    <K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
    <E extends Element = Element>(selectors: string): E | null;
}

type CustomElementSelector = {
    attr?: Function;
    val?: Function;
} & ElementSelector;

const $: CustomElementSelector = document.querySelector.bind(document)!;

$.attr = R.curry((element: string, attr: string) => $(element)?.getAttribute(attr)!);
$.val = R.curry((element: string, newVal?: string) => newVal ? (<HTMLInputElement>$(element))!.value = newVal : (<HTMLInputElement>$(element))?.value!);

const $$ = document.querySelectorAll.bind(document)!;

export { elem, text, addClass, append, attr, final, $, $$, on };