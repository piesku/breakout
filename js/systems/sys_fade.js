const QUERY = 256 /* Transform2D */ | 1024 /* Fade */;
export function sys_fade(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let fade = game[10 /* Fade */][entity];
    let draw = game[5 /* Draw */][entity];
    let transform = game[8 /* Transform2D */][entity];
    if (draw.Alpha > 0) {
        draw.Alpha -= fade.Step;
        let current_step = draw.Alpha / fade.Step;
        transform.Scale = [Math.max(0, draw.Alpha), Math.max(0, draw.Alpha)];
        transform.Dirty = true;
        if (draw.Alpha <= 0) {
            game.Destroy(entity);
        }
    }
}
//# sourceMappingURL=sys_fade.js.map