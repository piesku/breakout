import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.ControlBall | Has.Move;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game[Get.Transform2D][entity];
    let move = game[Get.Move][entity];

    if (transform.Translation[0] < 0) {
        transform.Translation[0] = 0;
        move.Direction[0] = -move.Direction[0];
    }

    if (transform.Translation[0] > game.ViewportWidth) {
        transform.Translation[0] = game.ViewportWidth;
        move.Direction[0] = -move.Direction[0];
    }

    if (transform.Translation[1] < 0) {
        transform.Translation[1] = 0;
        move.Direction[1] = -move.Direction[1];
    }

    if (transform.Translation[1] > game.ViewportHeight) {
        transform.Translation[1] = game.ViewportHeight;
        move.Direction[1] = -move.Direction[1];
    }
}
