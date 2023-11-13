declare global {
    interface Number {
        '+': (num: Num) => Num;
        '-': (num: Num) => Num;
        '*': (num: Num) => Num;
        '/': (num: Num) => Num;
    }
}