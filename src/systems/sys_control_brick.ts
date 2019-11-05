import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {linear} from "../math/easing.js";

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
    let translation = game[Get.Transform2D][entity].Translation;
    let entry = game[Get.Entry][entity];
    let fade = game[Get.Fade][entity];

    if (collide.Collisions.length > 0) {
        fade.Step = 0.025;
        entry.Initial = translation;
        entry.Final = [translation[0], game.ViewportHeight + 20];
        entry.Time = 0.5;
        entry.CurrentTime = 0;
        entry.Easing = linear;
        game.World[entity] |= Has.Entry;
    }
}
