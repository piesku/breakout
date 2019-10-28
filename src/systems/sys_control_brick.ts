import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.ControlBrick | Has.Collide | Has.Fade;

export function sys_control_brick(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let collide = game[Get.Collide][entity];
    let fade = game[Get.Fade][entity];

    if (collide.Collisions.length > 0) {
        fade.Step = 0.05;
    }
}
