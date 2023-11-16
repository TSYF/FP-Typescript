import { compose } from "../public/ts/ramda"
import { List, curriedCons as cCons, match, nil } from "./linkedList"
import { Monoid } from "./monoid"
import { Semigroup } from "./semigroup"

export type AddAll = (xs: List<number>) => number
export const addAll: AddAll =
    match(
        () => 0,
        (head, tail) => head + addAll(tail)
    )

export type MultiplyAll = (xs: List<number>) => number
export const multiplyAll: MultiplyAll =
    match(
        () => 1,
        (head, tail) => head * multiplyAll(tail)
    )

export type AppendAll = (xs: List<string>) => string
export const appendAll: AppendAll =
    match(
        () => "",
        (head, tail) => head + appendAll(tail)
    )

export const list = compose(
    cCons(1),
    cCons(1),
    cCons(2),
    cCons(3),
    cCons(5),
    cCons(8)
)(nil)

export const strList = compose(
    cCons("The"),
    cCons(" "),
    cCons("quick"),
    cCons(" "),
    cCons("brown"),
    cCons(" "),
    cCons("fox")
)(nil)
