const QUERY = 256 /* Transform2D */ | 16 /* ControlPaddle */;
export function sys_control_paddle(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let transform = game[8 /* Transform2D */][entity];
    let control = game[4 /* ControlPaddle */][entity];
    let x = transform.Translation[0] + game.InputEvent.mouse_x;
    if (x < control.Width / 2) {
        transform.Translation[0] = control.Width / 2;
    }
    else if (game.ViewportWidth - control.Width / 2 < x) {
        transform.Translation[0] = game.ViewportWidth - control.Width / 2;
    }
    else {
        transform.Translation[0] = x;
    }
    transform.Dirty = true;
}
//# sourceMappingURL=sys_control_paddle.js.map