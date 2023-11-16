import { compose } from "../public/ts/ramda";
import { Either, isLeft, left, right } from "./either";
import { Cons, List, curriedCons, isNil, nil, showList } from "./linkedList";
import { Option, isNone, none, some } from "./option";
// import { match as tspMatch } from 'ts-pattern';


//* Option

/* 
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

/*
const leftVal = left("Error message");
const rightVal = right(123);

const matcher = match(
    x => `${x} is Left`,
    x => `${x} is Right`
);

const l: Either<string, number> = left('"Shit\'s gone down"')
const r: Either<string, number> = right(69)
    
console.log(matcher(l));
console.log(matcher(r)); */

//* List
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
/* 
const result = tspMatch(list)
    .with({ _tag: "Nil" }, () => "List is empty")
    .with({ _tag: "Cons" }, ({ head, tail }: Cons<number>) => `Head is: ${head}`)
    .exhaustive();
 */
// console.log(result);