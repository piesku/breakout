import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.ControlPaddle | Has.Move;

export function sys_control_paddle(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game[Get.Transform2D][entity];
    let control = game[Get.ControlPaddle][entity];
    let move = game[Get.Move][entity];

    let x = transform.Translation[0];
    if (x < control.Width / 2) {
        transform.Translation[0] = control.Width / 2;
        transform.Dirty = true;
    } else if (game.ViewportWidth - control.Width / 2 < x) {
        transform.Translation[0] = game.ViewportWidth - control.Width / 2;
        transform.Dirty = true;
    } else {
        if (game.InputState.ArrowLeft && !game.InputState.ArrowRight) {
            move.Direction = [-1, 0];
        }
        if (game.InputState.ArrowRight && !game.InputState.ArrowLeft) {
            move.Direction = [1, 0];
        }
    }
}
