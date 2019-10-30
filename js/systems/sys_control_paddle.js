const QUERY = 256 /* Transform2D */ | 16 /* ControlPaddle */ | 64 /* Move */;
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
    let move = game[6 /* Move */][entity];
    let x = transform.Translation[0];
    if (x < control.Width / 2) {
        transform.Translation[0] = control.Width / 2;
        transform.Dirty = true;
    }
    else if (game.ViewportWidth - control.Width / 2 < x) {
        transform.Translation[0] = game.ViewportWidth - control.Width / 2;
        transform.Dirty = true;
    }
    else {
        if (game.InputState.ArrowLeft && !game.InputState.ArrowRight) {
            move.Direction = [-1, 0];
        }
        if (game.InputState.ArrowRight && !game.InputState.ArrowLeft) {
            move.Direction = [1, 0];
        }
    }
}
//# sourceMappingURL=sys_control_paddle.js.map