import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {normalize} from "../math/vec2.js";

const QUERY = Has.ControlBall | Has.Move;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let move = game.World.Move[entity];
    move.Direction[0] = 1;
    move.Direction[1] = 1;

    normalize(move.Direction, move.Direction);
}
