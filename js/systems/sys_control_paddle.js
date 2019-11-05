import { add, normalize } from "../math/vec2.js";
const QUERY = 8 /* ControlPaddle */ | 32 /* Move */;
export function sys_control_paddle(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let move = game[5 /* Move */][entity];
    move.Direction[0] = 0;
    move.Direction[1] = 0;
    if (game.InputState.ArrowLeft) {
        add(move.Direction, move.Direction, [-1, 0]);
    }
    if (game.InputState.ArrowRight) {
        add(move.Direction, move.Direction, [1, 0]);
    }
    if (game.InputState.ArrowUp) {
        add(move.Direction, move.Direction, [0, -1]);
    }
    if (game.InputState.ArrowDown) {
        add(move.Direction, move.Direction, [0, 1]);
    }
    normalize(move.Direction, move.Direction);
}
//# sourceMappingURL=sys_control_paddle.js.map