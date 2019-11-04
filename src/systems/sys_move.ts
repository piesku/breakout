import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Move;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let speed = 300;

    let transform = game.World.Transform2D[entity];
    let move = game.World.Move[entity];
    transform.Translation[0] += move.Direction[0] * speed * delta;
    transform.Translation[1] += move.Direction[1] * speed * delta;
    transform.Dirty = true;
}
