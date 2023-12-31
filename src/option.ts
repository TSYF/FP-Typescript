/* type SumAll = (xs: number[]) => number;
const sumAll: SumAll = xs => {
    if (xs.length === 0) return 0;
    const [head, ...rest] = xs;

    return head + sumAll(rest);
}

console.log(sumAll([1, 2, 4, 5, 6, 3])); //?


// Maybe
type Option<A> = A | None

type Some<A> = {
    value: A
}

const a: Some<number> = { value: 1 };

type None = typeof none;


const some = <A,>(x: A) => ({
    value: x
});

const b = some<number>(1);

typeof a; //?
typeof b; //?

const none = Symbol("None");
 */

import { compose, pipe } from "../public/ts/ramda";
import { divideTwo, increment } from "./utils";

divideTwo(8); //?
divideTwo(0); //?

const composed = compose(
    increment,
    divideTwo
)

composed(8); //?
composed(0); //?


export type Option<A> = Some<A> | None;

export interface Some<A> {
    readonly _tag: "Some";
    readonly value: A;
    readonly toString: () => string;
}

export interface None {
    readonly _tag: "None"
}

export const some = <A>(x: A): Option<A> => ({ _tag: "Some", value: x, toString() { return JSON.stringify(this)} });
export const none: Option<never> = { _tag: "None" };

export const isNone = <A>(x: Option<A>): x is None => x._tag === "None";

type DivideTwo2 = (x: number) => Option<number>;
const divideTwo2: DivideTwo2 = (x) => (x === 0 ? none : some(2/x));

const composed2 = compose(
    (x: Option<number>) => isNone(x) ? none : some(increment(x.value)),
    divideTwo2
);

export type Match = <A, B>(onNone: () => B, onSome: (a: A) => B)
    => (x: Option<A>) => B;
export type MatchW = <A, B, C>(onNone: () => B, onSome: (a: A) => B | C)
    => (x: Option<A>) => B | C;

export const match: Match = (onNone, onSome) =>
    x => isNone(x) ? onNone() : onSome(x.value);

export const matchW: MatchW = (onNone, onSome) =>
    x => isNone(x) ? onNone() : onSome(x.value);


// console.log(composed2(8)); //?
// console.log(composed2(0)); //?