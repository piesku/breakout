import { add, normalize } from "../math/vec2.js";
const QUERY = 32 /* Transform2D */ | 4 /* ControlPaddle */;
export function sys_control_paddle(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let direction = [0, 0];
    let speed = 300;
    if (game.InputState.ArrowLeft) {
        add(direction, direction, [-1, 0]);
    }
    if (game.InputState.ArrowRight) {
        add(direction, direction, [1, 0]);
    }
    if (game.InputState.ArrowUp) {
        add(direction, direction, [0, -1]);
    }
    if (game.InputState.ArrowDown) {
        add(direction, direction, [0, 1]);
    }
    normalize(direction, direction);
    let transform = game[5 /* Transform2D */][entity];
    transform.Translation[0] += direction[0] * speed * delta;
    transform.Translation[1] += direction[1] * speed * delta;
    transform.Dirty = true;
}
//# sourceMappingURL=sys_control_paddle copy.js.map