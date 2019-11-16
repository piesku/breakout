import {DrawRect} from "../components/com_draw.js";
import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Fade;

export function sys_fade(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let fade = game[Get.Fade][entity];
    let draw = game[Get.Draw][entity] as DrawRect;
    let transform = game[Get.Transform2D][entity];
    if (draw.Alpha > 0) {
        draw.Alpha -= fade.Step;
        transform.Scale = [Math.max(0, draw.Alpha), Math.max(0, draw.Alpha)];
        transform.Dirty = true;

        if (draw.Alpha <= 0) {
            game.Destroy(entity);
        }
    }
}
