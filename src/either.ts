import { compose } from "../public/ts/ramda";
import { increment } from "./utils";

function divideTwoIfEven(num: number): number {
    if (num === 0) throw "Can't divide by zero";
    if (num % 2 !== 0) throw "I can't even...";
    return 2/num;
}

// console.log(divideTwoIfEven(8)); //?
// divideTwoIfEven(0); //?
// divideTwoIfEven(5); //?

export type Either<E, A> = Left<E> | Right<A>;

export interface Left<E> {
    readonly _tag: "Left";
    readonly left: E;
}

export interface Right<A> {
    readonly _tag: "Right";
    readonly right: A;
}

export const left = <E, A=never>(error: E): Either<E, A> => ({ _tag: "Left", left: error })
export const right = <A, E=never>(value: A): Either<E, A> => ({ _tag: "Right", right: value })

export const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left";

function divideTwoIfEven2(num: number): Either<string, number> {
    if (num === 0) return left("Can't divide by zero");
    if (num % 2 !== 0) return left("I can't even...");
    return right(2/num);
}

// console.log(divideTwoIfEven2(8)); //?
// console.log(divideTwoIfEven2(0)); //?
// console.log(divideTwoIfEven2(5)); //?

const composed = compose(
    (x: Either<string, number>) => isLeft(x) ? x : right(increment(x.right)),
    divideTwoIfEven2
);

// console.log("\n========= Composed =========\n");
// console.log(composed(8));
// console.log(composed(5));
// console.log(composed(0));