import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Move;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let move = game[Get.Move][entity];
    if (move.Direction) {
        let transform = game[Get.Transform2D][entity];
        transform.Translation[0] += move.Direction[0] * move.Speed * delta;
        transform.Translation[1] += move.Direction[1] * move.Speed * delta;
        transform.Dirty = true;
        move.Direction = undefined;
    }
}
