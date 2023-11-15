import { compose } from "../public/ts/ramda";
import { Either, isLeft, left, right } from "./either";
import { Cons, List, curriedCons, isNil, nil, showList } from "./linkedList";
import { Option, isNone, none, some } from "./option";
import { match as tspMatch } from 'ts-pattern';


//* Option

/* type Match = <A, B>(onNone: () => B, onSome: (a: A) => B)
    => (x: Option<A>) => B;
type MatchW = <A, B, C>(onNone: () => B, onSome: (a: A) => B | C)
    => (x: Option<A>) => B | C;

const match: Match = (onNone, onSome) =>
    x => isNone(x) ? onNone() : onSome(x.value);

const matchW: MatchW = (onNone, onSome) =>
    x => isNone(x) ? onNone() : onSome(x.value);



const maybeNum: Option<number> = some(9);
const maybeNumNone: Option<number> = none;
const numberMatch = match(
    () => "Not a Number",
    x => `${x} is a number!`
);

const maybeNumW: Option<number | string> = some("Shit");
const maybeNumNoneW: Option<number> = none;
const numberMatchW = matchW(
    () => -5,
    x => `${x} is a number!`
);

console.log(numberMatch(maybeNum));
console.log(numberMatch(maybeNumNone));

console.log(numberMatchW(maybeNumW));
console.log(numberMatchW(maybeNumNoneW)); */


//* Either

/* type Match = <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B)
    => (x: Either<E, A>) => B;


const leftVal = left("Error message");
const rightVal = right(123);

const match: Match = (onLeft, onRight) =>
    x => isLeft(x) ? onLeft(x.left) : onRight(x.right);

    
const matcher = match(
    x => `${x} is Left`,
    x => `${x} is Right`
);

const l: Either<string, number> = left('"Shit\'s gone down"')
const r: Either<string, number> = right(69)
    
console.log(matcher(l));
console.log(matcher(r)); */

//* List
export type Match = <A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B)
    => (xs: List<A>) => B;
export const match: Match = (onNil, onCons) =>
    (xs) => isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

/* 
const matcher = match(
    () => "Empty List",
    (head: number, tail: List<number>) => `${head}, ${showList(tail)}`
);

const list = compose(
    curriedCons(1),
    curriedCons(1),
    curriedCons(2),
    curriedCons(3),
    curriedCons(5),
    curriedCons(8),
    curriedCons(13)
)(nil);

console.log(matcher(list));
console.log(matcher(nil)); */

//** List with ts-pattern

// const list: List<number> = nil;
const list = compose(
    curriedCons(1),
    curriedCons(1),
    curriedCons(2),
    curriedCons(3),
    curriedCons(5),
    curriedCons(8),
    curriedCons(13)
)(nil);

const result = tspMatch(list)
    .with({ _tag: "Nil" }, () => "List is empty")
    .with({ _tag: "Cons" }, ({ head, tail }: Cons<number>) => `Head is: ${head}`)
    .exhaustive();

// console.log(result);