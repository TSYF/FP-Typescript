import { compose } from "../public/ts/ramda";
import { match } from "./adt";
import { List, curriedCons as cCons, isNil, nil } from "./linkedList";

type AddAll = (xs: List<number>) => number
const addAll: AddAll =
    match(
        () => 0,
        (head, tail) => head + addAll(tail)
    )

type MultiplyAll = (xs: List<number>) => number
const multiplyAll: MultiplyAll =
    match(
        () => 1,
        (head, tail) => head * multiplyAll(tail)
    )

type AppendAll = (xs: List<string>) => string
const appendAll: AppendAll =
    match(
        () => "",
        (head, tail) => head + appendAll(tail)
    )


const list = compose(
    cCons(1),
    cCons(1),
    cCons(2),
    cCons(3),
    cCons(5),
    cCons(8)
)(nil)
const strList = compose(
    cCons("The"),
    cCons(" "),
    cCons("quick"),
    cCons(" "),
    cCons("brown"),
    cCons(" "),
    cCons("fox")
)(nil)
    

interface Magma<A> {
    concat: (x: A, y: A) => A
}

interface Semigroup<A> extends Magma<A> {}

const addSemigroup: Semigroup<number> = { concat: (x, y) => x + y }
const multiplySemigroup: Semigroup<number> = { concat: (x, y) => x * y }
const appendSemigroup: Semigroup<string> = { concat: (x, y) => x.concat(y) }

const concatAll =
    <A>(semigroup: Semigroup<A>) =>
    (identity: A) =>
    (xs: List<A>): A =>
        match(
            () => identity,
            (head: A, tail) =>  semigroup.concat(head, concatAll(semigroup)(identity)(tail))
        )(xs)

interface Monoid<A> extends Semigroup<A> {
    identity: A;
}

const addMonoid: Monoid<number> = { ...addSemigroup, identity: 0 }
const multiplyMonoid: Monoid<number> = { ...multiplySemigroup, identity: 1 }
const appendMonoid: Monoid<string> = { ...appendSemigroup, identity: "" }

const concatAllMonoid =
    <A>(monoid: Monoid<A>) =>
    (xs: List<A>): A =>
        match(
            () => monoid.identity,
            (head: A, tail) =>  monoid.concat(head, concatAllMonoid(monoid)(tail))
        )(xs)

console.log(addAll( list ));
console.log(multiplyAll( list ));
console.log(appendAll( strList ));
console.log(concatAll(addSemigroup)(0)(list));
console.log(concatAll(multiplySemigroup)(1)(list));
console.log(concatAll(appendSemigroup)("")(strList));
console.log(concatAllMonoid(addMonoid)(list));
console.log(concatAllMonoid(multiplyMonoid)(list));
console.log(concatAllMonoid(appendMonoid)(strList));