const QUERY = Has.Transform | 64 /* Shake */;
export function sys_shake(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let shake = game[6 /* Shake */][entity];
    if (shake.Duration > 0) {
        shake.Duration -= delta;
        let transform = game[Get.Transform][entity];
        transform.Translation = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
        transform.Dirty = true;
        if (shake.Duration <= 0) {
            shake.Duration = 0;
            transform.Translation = [0, 0, 0];
        }
    }
}
//# sourceMappingURL=sys_shake.js.map