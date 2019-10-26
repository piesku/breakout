import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {normalize} from "../math/vec2.js";

const QUERY = Has.Transform2D | Has.ControlBall | Has.Move | Has.Collide;

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
    let collide = game[Get.Collide][entity];

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

    if (collide.Collisions.length > 0) {
        game[Get.Shake][game.Camera].Duration = 0.2;

        let collision = collide.Collisions[0];
        if (collision.Hit[0]) {
            transform.Translation[0] += collision.Hit[0];
            let from_center = collide.Center[1] - collision.Other.Center[1];
            let other_half = collision.Other.Size[1] / 2;
            move.Direction[0] = -move.Direction[0];
            move.Direction[1] = from_center / other_half;
        }
        if (collision.Hit[1]) {
            transform.Translation[1] += collision.Hit[1];
            let from_center = collide.Center[0] - collision.Other.Center[0];
            let other_half = collision.Other.Size[0] / 2;
            move.Direction[0] = from_center / other_half;
            move.Direction[1] = -move.Direction[1];
        }

        normalize(move.Direction, move.Direction);
    }
}
