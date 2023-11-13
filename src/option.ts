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


type Option<A> = Some<A> | None;

interface Some<A> {
    readonly _tag: "Some";
    readonly value: A;
    readonly toString: () => string;
}

interface None {
    readonly _tag: "None"
}

const some = <A>(x: A): Option<A> => ({ _tag: "Some", value: x, toString() { return JSON.stringify(this)} });
const none: Option<never> = { _tag: "None" };

const isNone = <A>(x: Option<A>): x is None => x._tag === "None";

type DivideTwo2 = (x: number) => Option<number>;
const divideTwo2: DivideTwo2 = (x) => (x === 0 ? none : some(2/x));

const composed2 = compose(
    (x: Option<number>) => isNone(x) ? none : some(increment(x.value)),
    divideTwo2
);

console.log(composed2(8)); //?
console.log(composed2(0)); //?