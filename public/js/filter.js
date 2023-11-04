import * as R from './ramda';
import { append, addClass, attr, text, elem, final, $, clear } from './helpers';
function app(state, mountIn) {
    R.compose(append(view(state)), clear())(mountIn);
}
function fullName({ firstName, lastName, age }) {
    return `${firstName} ${lastName} - ${age}`;
}
function view(state) {
    const el = elem("div");
    const add = R.flip(append);
    state.filter(person => person.age > 25)
        .map(buildPerson)
        .reduce(add, el);
    return el;
}
function buildPerson(person, index) {
    return R.compose(append(text(fullName(person))), attr("title", fullName(person)), attr("data-index", index), attr("style", "border-width: 2px !important;"), addClass("mb-1"), addClass(`text-primary`), addClass("rounded"), addClass(`border-primary`), addClass("border"), addClass("bg-warning"), addClass("p-3"))(elem("div"));
}
app(final([
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
]), $("#message-list"));
