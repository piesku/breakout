const QUERY = 256 /* Transform2D */ | 64 /* Move */;
export function sys_move(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let move = game[6 /* Move */][entity];
    if (move.Direction) {
        let transform = game[8 /* Transform2D */][entity];
        transform.Translation[0] += move.Direction[0] * move.Speed * delta;
        transform.Translation[1] += move.Direction[1] * move.Speed * delta;
        transform.Dirty = true;
        move.Direction = undefined;
    }
}
//# sourceMappingURL=sys_move.js.map