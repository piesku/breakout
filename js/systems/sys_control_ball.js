import { normalize } from "../math/vec2.js";
const QUERY = 256 /* Transform2D */ | 4 /* ControlBall */ | 64 /* Move */ | 2 /* Collide */;
export function sys_control_ball(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let transform = game[8 /* Transform2D */][entity];
    let move = game[6 /* Move */][entity];
    let collide = game[1 /* Collide */][entity];
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
//# sourceMappingURL=sys_control_ball.js.map