type Increment = (x: number) => number;
const increment: Increment = (x) => x+1;

type DivideTwo = (x: number) => number;
const divideTwo: DivideTwo = (x) => 2/x;

export { increment, divideTwo };