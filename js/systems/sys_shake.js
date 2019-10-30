const QUERY = 256 /* Transform2D */ | 512 /* Shake */;
export function sys_shake(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let shake = game[9 /* Shake */][entity];
    if (shake.Duration > 0) {
        shake.Duration -= delta;
        let transform = game[8 /* Transform2D */][entity];
        transform.Translation = [
            shake.Strength - Math.random() * (shake.Strength * 2),
            shake.Strength - Math.random() * (shake.Strength * 2),
        ];
        transform.Dirty = true;
        if (shake.Duration <= 0) {
            shake.Duration = 0;
            transform.Translation = [0, 0];
        }
    }
}
//# sourceMappingURL=sys_shake.js.map