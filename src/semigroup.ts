import { List, match } from "./linkedList"
import { Magma } from "./magma"
import { Monoid } from "./monoid"

export interface Semigroup<A> extends Magma<A> {}


export const addSemigroup: Semigroup<number> = { concat: (x, y) => x + y }
export const multiplySemigroup: Semigroup<number> = { concat: (x, y) => x * y }
export const appendSemigroup: Semigroup<string> = { concat: (x, y) => x.concat(y) }


const concatAll =
    <A>(semigroup: Semigroup<A>) =>
    (identity: A) =>
    (xs: List<A>): A =>
        match(
            () => identity,
            (head: A, tail) =>  semigroup.concat(head, concatAll(semigroup)(identity)(tail))
        )(xs)