import { compose } from "../public/ts/ramda";
import { list, strList } from "./categoryUtils";
import { Either, Right, left, match as matchEither, right } from "./either";
import { List, cons, match as matchList, nil, showList } from "./linkedList";
import { Option, isNone, match as matchOption, none, some } from "./option";
import { increment } from "./utils";

type StrLength = (x: string) => number
const strLength: StrLength = str => str.length

console.log(strLength("STRING"));
// console.log(strLength(null));

type OptionStrLength = (x: Option<string>) => Option<number>
// const optionStrLenth: OptionStrLength = str => isNone(str) ? str : some(str.value.length);
const optionStrLenth: OptionStrLength = matchOption(
    () => none,
    (x: string) => some(strLength(x))
);

type OptionIncrement = (Fx: Option<number>) => Option<number>
const optionIncrement: OptionIncrement = matchOption(
    () => none,
    (value: number) => some(increment(value))
)

console.log(optionIncrement(some(12)));
console.log(optionIncrement(none));

type MapOption = <A, B>(f: (x: A) => B) =>
    (Fx: Option<A>) => Option<B>
// const map_option: MapOption = f => Fx => matchOption(
//     () => none,
//     (x: Parameters<typeof f>[0]) => some(f(x))
// )(Fx);

const map_option: MapOption = f => matchOption(
    () => none,
    x => some(f(x))
)


const optionIncrement2 = map_option(increment);
const optionStrLenth2 = map_option(strLength);

console.log(optionIncrement2(some(12)));
console.log(optionIncrement2(none));

console.log(optionStrLenth2(some("STRING")));
console.log(optionStrLenth2(none));

const concat = (...args: string[]) => args.join("");

const optConcat = map_option(concat);

const incrementLength = compose( increment, strLength )
console.log(incrementLength("watataaaa"));

const function1 = compose(map_option(increment), map_option(strLength))
const function2 = map_option(incrementLength)

console.log(function1(some("WATATAAAa")));
console.log(function2(some("WATATAAAaAaA")));

type MapList = <A, B>(f: (a: A) => B) => (Fx: List<A>) => List<B>
const map_list: MapList = f => matchList(
    () => nil,
    (head, tail) => cons(f(head), map_list(f)(tail))
)

const strLengthAll = map_list(strLength)
const incrementAll = map_list(increment)

const listIncrementLength = compose( incrementAll, strLengthAll )

console.log(showList(list));
console.log(showList(incrementAll(list)));
console.log(showList(strList));
console.log(showList(strLengthAll(strList)));
console.log(showList(listIncrementLength(strList)));

type MapEither = <E, A, B>(f: (e: A) => B) => (x: Either<E, A>) => Either<E, B>
const map_either: MapEither = f => matchEither(
    (l) => left(l),
    (r) => right(f(r))
)

const incrementEither = map_either(increment);
const strLenthEither = map_either(strLength);
const incrementLengthEither = map_either(compose( strLength, increment ));

console.log(incrementEither(right(12)));
console.log(strLenthEither(right("Wea")));
console.log(incrementLengthEither(right(12)));

//* How to create a general Map function type.
// type Map = <A, B, ...>(f: A => B) => F<..., A> => F<..., B>; //* Purely theoretical

// console.log(optConcat("Hello"));

/* 
type OptionFunctor = <A>(x: A | null) => Option<A>
const toOption: OptionFunctor = (x) => x === null ? none : some(x);

console.log(optionStrLenth(some("STRING")));
console.log(optionStrLenth(none));
console.log(toOption(null));
console.log(toOption("STRING"));
console.log(optionStrLenth(toOption<string>(null)));
console.log(optionStrLenth(toOption("asdas"))); */