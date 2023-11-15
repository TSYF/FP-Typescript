import { compose, curry } from "../public/ts/ramda";

export type List<A> = Nil | Cons<A>;

export interface Cons<A> {
    readonly _tag: "Cons";
    readonly head: A;
    readonly tail: List<A>;
}

export interface Nil {
    readonly _tag: "Nil";
}


export const nil: List<never> = { _tag: "Nil" };
export const cons = <A>(head: A, tail: List<A>): List<A> => ({
    _tag: "Cons",
    head,
    tail
});

export const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === "Nil";

export const curriedCons = curry(cons);

const myList = compose(
    curriedCons(1),
    curriedCons(2),
    curriedCons(3)
)(nil);
const myList2 = cons(1, cons(2, cons(3, nil)));

// console.log(myList);
// console.log(myList2);



export type ShowList = <A>(xs: List<A>) => string;
export const showList: ShowList = (xs) =>
    isNil(xs) ?
    `` :
    xs.head + (isNil(xs.tail) ? "" : `, ${showList(xs.tail)}`);


// console.log(showList(myList));