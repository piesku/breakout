import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {add, normalize} from "../math/vec2.js";

const QUERY = Has.Transform2D | Has.ControlPaddle;

export function sys_control_paddle(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let direction = <Vec2>[0, 0];
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

    let transform = game[Get.Transform2D][entity];
    transform.Translation[0] += direction[0] * speed * delta;
    transform.Translation[1] += direction[1] * speed * delta;
    transform.Dirty = true;
}
