import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
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
    let move = game.World.Move[entity];
    move.Direction[0] = 0;
    move.Direction[1] = 0;

    if (game.InputState.ArrowLeft) {
        move.Direction[0] += -1;
    }
    if (game.InputState.ArrowRight) {
        move.Direction[0] += 1;
    }
    if (game.InputState.ArrowUp) {
        move.Direction[1] += -1;
    }
    if (game.InputState.ArrowDown) {
        move.Direction[1] += 1;
    }

    normalize(move.Direction, move.Direction);
}
