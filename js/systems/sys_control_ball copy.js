import { normalize } from "../math/vec2.js";
const QUERY = 64 /* Transform2D */ | 2 /* ControlBall */ | 32 /* Move */ | 1 /* Collide */;
export function sys_control_ball(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let control = game[1 /* ControlBall */][entity];
    let transform = game[6 /* Transform2D */][entity];
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
    let collide = game[0 /* Collide */][entity];
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
        if (game.World[collision.Other.EntityId] & 32 /* Move */) {
            let move = game[5 /* Move */][collision.Other.EntityId];
            control.Direction[0] += move.Direction[0];
            control.Direction[1] += move.Direction[1];
        }
    }
    let move = game[5 /* Move */][entity];
    move.Direction[0] = control.Direction[0];
    move.Direction[1] = control.Direction[1];
    normalize(move.Direction, move.Direction);
}
//# sourceMappingURL=sys_control_ball copy.js.map