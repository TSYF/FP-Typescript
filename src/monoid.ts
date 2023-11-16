import { List, match } from "./linkedList";
import { Semigroup, addSemigroup, multiplySemigroup, appendSemigroup } from "./semigroup";

export interface Monoid<A> extends Semigroup<A> {
    identity: A;
}

export const addMonoid: Monoid<number> = { ...addSemigroup, identity: 0 }
export const multiplyMonoid: Monoid<number> = { ...multiplySemigroup, identity: 1 }
export const appendMonoid: Monoid<string> = { ...appendSemigroup, identity: "" }

const concatAllMonoid =
    <A>(monoid: Monoid<A>) =>
    (xs: List<A>): A =>
        match(
            () => monoid.identity,
            (head: A, tail) =>  monoid.concat(head, concatAllMonoid(monoid)(tail))
        )(xs)