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
    let control = game[2 /* ControlBall */][entity];
    let transform = game[8 /* Transform2D */][entity];
    let collide = game[1 /* Collide */][entity];
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
        if (game.World[collision.Other.EntityId] & 64 /* Move */) {
            let move = game[6 /* Move */][collision.Other.EntityId];
            if (move.Direction) {
                control.Direction[0] += move.Direction[0];
                control.Direction[1] += move.Direction[1];
            }
        }
        normalize(control.Direction, control.Direction);
    }
    let move = game[6 /* Move */][entity];
    move.Direction = control.Direction;
}
//# sourceMappingURL=sys_control_ball.js.map