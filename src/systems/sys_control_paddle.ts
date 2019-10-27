import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.ControlPaddle;

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

    // game.Add({
    //     ...get_blu_tail(100, 20, "red"),
    //     Translation: [...transform.Translation] as [number, number],
    // });

    let x = transform.Translation[0] + game.InputEvent.mouse_x;
    if (x < control.Width / 2) {
        transform.Translation[0] = control.Width / 2;
    } else if (game.ViewportWidth - control.Width / 2 < x) {
        transform.Translation[0] = game.ViewportWidth - control.Width / 2;
    } else {
        transform.Translation[0] = x;
    }
    transform.Dirty = true;
}
