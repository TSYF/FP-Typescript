export interface Magma<A> {
    concat: (x: A, y: A) => A
}

/* console.log(addAll( list ));
console.log(multiplyAll( list ));
console.log(appendAll( strList ));
console.log(concatAll(addSemigroup)(0)(list));
console.log(concatAll(multiplySemigroup)(1)(list));
console.log(concatAll(appendSemigroup)("")(strList));
console.log(concatAllMonoid(addMonoid)(list));
console.log(concatAllMonoid(multiplyMonoid)(list));
console.log(concatAllMonoid(appendMonoid)(strList)); */