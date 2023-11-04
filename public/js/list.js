import * as R from './ramda';
import { append, addClass, attr, text, elem, final, $, on, clear } from './helpers';
function app(state, mountIn, dispatch) {
    R.compose(append(view(state)), clear())(mountIn);
    const stop = dispatch((e) => {
        stop();
        // const newText = (<HTMLInputElement>$("#message-text")).value;
        const newText = $.val("#message-text");
        const newState = [
            ...state,
            newText
        ];
        // (<HTMLInputElement>$("#message-text")).value = "";
        $.val("#message-text", "");
        app(newState, mountIn, dispatch);
    });
}
function view(state) {
    const el = elem("div");
    return state.length > 0 ? R.pipe(...state.map((val, index) => append(message(val, index))))(el) : el;
}
function message(content, index, color = "dark") {
    return R.compose(append(text(content)), attr("title", content), attr("data-index", index), attr("style", "border-width: 2px !important;"), addClass("mb-1"), addClass(`text-${color}`), addClass("rounded"), addClass(`border-${color}`), addClass("border"), addClass("bg-info"), addClass("p-3"))(elem("div"));
}
const btnClick = on("click")($("#message-button"));
app(final([]), $("#message-list"), btnClick);
