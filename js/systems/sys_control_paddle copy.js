const QUERY = 64 /* Transform2D */ | 4 /* ControlPaddle */;
export function sys_control_paddle(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let transform = game[6 /* Transform2D */][entity];
    let control = game[2 /* ControlPaddle */][entity];
    let x = transform.Translation[0] + game.InputEvent.mouse_x;
    if (control.Width / 2 < x && x < game.ViewportWidth - control.Width / 2) {
        transform.Translation[0] = x;
        transform.Dirty = true;
    }
}
//# sourceMappingURL=sys_control_paddle copy.js.map