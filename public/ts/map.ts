import * as R from './ramda';
import { append, addClass, attr, text, elem, final, $, on, clear } from './helpers';

function app (
    state: readonly Person[],
    mountIn: HTMLElement
) {

    R.compose(
        append(view(state)),
        clear()
    )(mountIn);

}

function fullName(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
}

function view(state: readonly Person[]): HTMLElement {
    const el = elem("div");
    const add = R.flip(append)(el);

    state.map(buildPerson)
        .forEach(add);

    return el;
}

function buildPerson(person: Person, index: number) {

    return R.compose(
        append(text(fullName(person))),
        attr("title", person),
        attr("data-index", index),
        attr("style", "border-width: 2px !important;"),
        addClass("mb-1"),
        addClass(`text-primary`),
        addClass("rounded"),
        addClass(`border-primary`),
        addClass("border"),
        addClass("bg-warning"),
        addClass("p-3"),
    )(elem("div"));
}

app(
    final([
        {
            firstName: "John",
            lastName: "Doe",
            age: 33
        },
        {
            firstName: "Jane",
            lastName: "Doe",
            age: 29
        },
        {
            firstName: "Johnny",
            lastName: "Doe",
            age: 8
        }
    ]),
    $("#message-list")!
);