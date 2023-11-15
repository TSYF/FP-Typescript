import { curry } from "../public/ts/ramda";
import { Monoid } from "./monoid";

export interface Group<A> extends Monoid<A> {
    inverse: (x: A) => A;
}

export const addGroup: Group<number> = {
    concat: (x, y) => x + y,
    identity: 0,
    inverse: a => -a
}

export const multiplyGroup: Group<number> = {
    concat: (x, y) => x * y,
    identity: 1,
    inverse: a => a * -1
}

// export const appendGroup: Group<string> = {
//     concat: (x, y) => x.concat(y),
//     identity: "",
//     inverse: a => 
// }


const walletBalance = addGroup.concat(
    addGroup.identity,
    addGroup.concat(
        80,
        addGroup.concat(
            20,
            addGroup.inverse(30)
        )
    )
)
console.log(walletBalance);


type Encrypt = (plain: string, key: number) => string
type Decrypt = (encrypted: string, key: number) => string

const alphabet = "abcdefghijklmnñopqrstuvwxyz"

const caesarGroup: Group<number> = {
    concat: (x, y) => (x + y) % alphabet.length,
    identity: 0,
    inverse: a => (alphabet.length - a) % alphabet.length
}

const encrypt: Encrypt = (plain, key) =>
    plain.toLocaleLowerCase()
        .split('')
        .map((character) => {
            const index = alphabet.indexOf(character);
            
            return index === -1
                ? character
                : alphabet[caesarGroup.concat(index, key)]
        })
        .join('')

const decrypt: Decrypt = (encripted, key) => encrypt(encripted, caesarGroup.inverse(key))

console.log(encrypt("Hello world!", 5));
console.log(decrypt(encrypt("Hello world!", 5), 5));