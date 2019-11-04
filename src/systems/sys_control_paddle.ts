import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {normalize} from "../math/vec2.js";

const QUERY = Has.ControlPaddle | Has.Move;

export function sys_control_paddle(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let direction = <Vec2>[0, 0];

    if (game.InputState.ArrowLeft) {
        direction[0] += -1;
    }
    if (game.InputState.ArrowRight) {
        direction[0] += 1;
    }
    if (game.InputState.ArrowUp) {
        direction[1] += -1;
    }
    if (game.InputState.ArrowDown) {
        direction[1] += 1;
    }

    normalize(direction, direction);

    let move = game.World.Move[entity];
    move.Direction = direction;
}
