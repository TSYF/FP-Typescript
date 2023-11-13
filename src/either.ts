import { compose } from "../public/ts/ramda";
import { increment } from "./utils";

function divideTwoIfEven(num: number): number {
    if (num === 0) throw "Can't divide by zero";
    if (num % 2 !== 0) throw "I can't even...";
    return 2/num;
}

console.log(divideTwoIfEven(8)); //?
// divideTwoIfEven(0); //?
// divideTwoIfEven(5); //?

type Either<E, A> = Left<E> | Right<A>;

interface Left<E> {
    readonly _tag: "Left";
    readonly value: E;
}

interface Right<A> {
    readonly _tag: "Right";
    readonly value: A;
}

const left = <E, A=never>(error: E): Either<E, A> => ({ _tag: "Left", value: error })
const right = <A, E=never>(value: A): Either<E, A> => ({ _tag: "Right", value })

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left";

function divideTwoIfEven2(num: number): Either<string, number> {
    if (num === 0) return left("Can't divide by zero");
    if (num % 2 !== 0) return left("I can't even...");
    return right(2/num);
}

console.log(divideTwoIfEven2(8)); //?
console.log(divideTwoIfEven2(0)); //?
console.log(divideTwoIfEven2(5)); //?

const composed = compose(
    (x: Either<string, number>) => isLeft(x) ? x : right(increment(x.value)),
    divideTwoIfEven2
);

console.log("\n========= Composed =========\n");
console.log(composed(8));
console.log(composed(5));
console.log(composed(0));