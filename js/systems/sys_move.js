const QUERY = 64 /* Transform2D */ | 32 /* Move */;
export function sys_move(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let transform = game[6 /* Transform2D */][entity];
    let move = game[5 /* Move */][entity];
    transform.Translation[0] += move.Direction[0] * move.Speed * delta;
    transform.Translation[1] += move.Direction[1] * move.Speed * delta;
    transform.Dirty = true;
}
//# sourceMappingURL=sys_move.js.map