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
    let control = game[Get.ControlBall][entity];
    let transform = game[Get.Transform2D][entity];
    let collide = game[Get.Collide][entity];

    if (transform.Translation[0] < 0) {
        transform.Translation[0] = 0;
        control.Direction[0] = -control.Direction[0];
    }

    if (transform.Translation[0] > game.ViewportWidth) {
        transform.Translation[0] = game.ViewportWidth;
        control.Direction[0] = -control.Direction[0];
    }

    if (transform.Translation[1] < 0) {
        transform.Translation[1] = 0;
        control.Direction[1] = -control.Direction[1];
    }

    if (transform.Translation[1] > game.ViewportHeight) {
        transform.Translation[1] = game.ViewportHeight;
        control.Direction[1] = -control.Direction[1];
    }

    if (collide.Collisions.length > 0) {
        let collision = collide.Collisions[0];
        if (collision.Hit[0]) {
            transform.Translation[0] += collision.Hit[0];
            control.Direction[0] = -control.Direction[0];
        }
        if (collision.Hit[1]) {
            transform.Translation[1] += collision.Hit[1];
            control.Direction[1] = -control.Direction[1];
        }
        if (game.World[collision.Other.EntityId] & Has.Move) {
            let move = game[Get.Move][collision.Other.EntityId];
            if (move.Direction) {
                control.Direction[0] += move.Direction[0];
                control.Direction[1] += move.Direction[1];
            }
        }
        normalize(control.Direction, control.Direction);
    }

    let move = game[Get.Move][entity];
    move.Direction = control.Direction;
}
