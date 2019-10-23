import { App } from "../ui/App.js";
let prev;
export function sys_ui(game, delta) {
    let next = App(game);
    if (next !== prev) {
        game.UI.innerHTML = prev = next;
    }
}
//# sourceMappingURL=sys_ui.js.map