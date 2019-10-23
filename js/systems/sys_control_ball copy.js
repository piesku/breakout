const QUERY = 128 /* Transform2D */ | 4 /* ControlBall */ | 32 /* Move */ | 2 /* Collide */;
export function sys_control_ball(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let transform = game[7 /* Transform2D */][entity];
    let move = game[5 /* Move */][entity];
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
            move.Direction[0] = -move.Direction[0];
        }
        if (collision.Hit[1]) {
            transform.Translation[1] += collision.Hit[1];
            move.Direction[1] = -move.Direction[1];
        }
    }
}
//# sourceMappingURL=sys_control_ball copy.js.map